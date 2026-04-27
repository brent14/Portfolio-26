export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const fluidFragmentShader = /* glsl */ `
  uniform sampler2D uPrevTrails;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform vec2 uResolution;
  uniform float uDecay;
  uniform bool uIsMoving;
  uniform float uWarpScale;
  uniform float uWarpStrength;
  uniform float uTime;
  uniform float uBrushSize;
  uniform float uBrushIntensity;

  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 warp = vec2(
      gnoise(vUv * uWarpScale + vec2(uTime * 0.12, uTime * 0.07)),
      gnoise(vUv * uWarpScale + vec2(5.2 + uTime * 0.09, 1.3 + uTime * 0.11))
    ) * uWarpStrength;

    vec4 prevState = texture2D(uPrevTrails, vUv + warp);

    float newValue = prevState.r * uDecay;

    if (uIsMoving) {
      vec2 mouseDirection = uMouse - uPrevMouse;
      float lineLength = length(mouseDirection);

      if (lineLength > 0.001) {
        vec2 mouseDir = mouseDirection / lineLength;

        vec2 toPixel = vUv - uPrevMouse;
        float projAlong = dot(toPixel, mouseDir);
        projAlong = clamp(projAlong, 0.0, lineLength);

        vec2 closestPoint = uPrevMouse + projAlong * mouseDir;
        float dist = length(vUv - closestPoint);

        float lineWidth = uBrushSize;
        float intensity = smoothstep(lineWidth, 0.0, dist) * uBrushIntensity;

        newValue += intensity;
      }
    }

    gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
  }
`

export const displayFragmentShader = /* glsl */ `
  uniform sampler2D uFluid;
  uniform sampler2D uFluidB;
  uniform sampler2D uTopTexture;
  uniform sampler2D uMiddleTexture;
  uniform sampler2D uVideoTexture;
  uniform vec2 uResolution;
  uniform float uDpr;
  uniform vec2 uTopTextureSize;
  uniform vec2 uMiddleTextureSize;
  uniform vec2 uVideoTextureSize;
  uniform float uTime;
  uniform float uNoiseScale;
  uniform float uNoiseAmount;

  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp   = 0.5;
    float freq  = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amp * gnoise(p * freq);
      freq  *= 2.1;
      amp   *= 0.48;
    }
    return value;
  }

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;

    vec2 s = uResolution / textureSize;

    float scale = max(s.x, s.y);

    vec2 scaledSize = textureSize * scale;

    vec2 offset = (uResolution - scaledSize) * 0.5;

    return (uv * uResolution - offset) / scaledSize;
  }

  void main() {
    float fluid  = texture2D(uFluid,  vUv).r;
    float fluidB = texture2D(uFluidB, vUv).r;

    vec2 noiseUV = vUv * uNoiseScale;
    float noise  = fbm(noiseUV) * uNoiseAmount;

    float threshold = 0.02;
    float edgeWidth = 0.004 / uDpr;

    float maskA      = smoothstep(0.0, 0.01, fluid);
    float noisyFluidA = fluid + noise * maskA;

    float maskB       = smoothstep(0.0, 0.01, fluidB);
    float noisyFluidB = fluidB + noise * maskB;

    vec2 topUV    = getCoverUV(vUv, uTopTextureSize);
    vec2 middleUV = getCoverUV(vUv, uMiddleTextureSize);
    vec2 videoUV  = getCoverUV(vUv, uVideoTextureSize);

    vec4 topColor    = texture2D(uTopTexture,    topUV);
    vec4 middleColor = texture2D(uMiddleTexture, middleUV);
    vec4 videoColor  = texture2D(uVideoTexture,  videoUV);

    float tA = smoothstep(threshold, threshold + edgeWidth, noisyFluidA);
    float tB = smoothstep(threshold, threshold + edgeWidth, noisyFluidB);

    // Detect #30724b green (hue ~145°, sat ~0.58, val ~0.45) in the middle layer
    vec3 c = middleColor.rgb;
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    vec3 hsv = vec3(abs(q.z + (q.w - q.y) / (6.0 * d + 1e-10)), d / (q.x + 1e-10), q.x);

    float hueMatch = smoothstep(0.341, 0.401, hsv.x) * (1.0 - smoothstep(0.401, 0.461, hsv.x));
    float isGreen = hueMatch * smoothstep(0.15, 0.35, hsv.y) * smoothstep(0.10, 0.35, hsv.z);
    float fluidMask = 1.0 - isGreen;

    vec4 finalColor;
    finalColor.rgb = mix(topColor.rgb, middleColor.rgb, tA);
    finalColor.a   = 1.0;
    finalColor.rgb = mix(finalColor.rgb, videoColor.rgb, tB * fluidMask * videoColor.a);

    gl_FragColor = finalColor;
  }
`

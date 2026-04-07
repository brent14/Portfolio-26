#!/usr/bin/env bash
# Launch Chrome with remote debugging for Claude Code CDP connection.
#
# Usage:
#   ./scripts/chrome-debug.sh            # default port 9222
#   ./scripts/chrome-debug.sh 9333       # custom port
#
# Then in Claude Code, add the MCP server:
#   claude mcp add playwright-chrome -- npx @playwright/mcp@latest --cdp-endpoint http://localhost:9222

PORT="${1:-9222}"

# macOS Chrome path
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -f "$CHROME" ]; then
  echo "Chrome not found at: $CHROME"
  echo "Install Chrome or update the path in this script."
  exit 1
fi

# Check if port is already in use
if lsof -i :"$PORT" -sTCP:LISTEN > /dev/null 2>&1; then
  echo "Port $PORT already in use — Chrome debug may already be running."
  echo "Connect with: npx @playwright/mcp@latest --cdp-endpoint http://localhost:$PORT"
  exit 0
fi

echo "Starting Chrome with remote debugging on port $PORT..."
echo "Connect Claude Code with:"
echo "  claude mcp add playwright-chrome -- npx @playwright/mcp@latest --cdp-endpoint http://localhost:$PORT"
echo ""

"$CHROME" \
  --remote-debugging-port="$PORT" \
  --user-data-dir="/tmp/chrome-debug-$PORT" \
  --no-first-run \
  --no-default-browser-check \
  "$@" &

echo "Chrome PID: $!"
echo "To stop: kill $!"

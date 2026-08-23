#!/bin/zsh
# Serve the live X Freeze site (xfreeze.com) locally with SPA rewrites.
cd "$(dirname "$0")"
PORT=5299
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "already on http://127.0.0.1:$PORT"
else
  PORT=$PORT python3 ./serve.py >/tmp/xfreeze-portfolio.log 2>&1 &
  echo "started http://127.0.0.1:$PORT  pid $!"
fi
open -a "Google Chrome" "http://127.0.0.1:$PORT"

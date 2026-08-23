#!/usr/bin/env python3
"""Local server for the X Freeze site. Rewrites /about /articles /contact /support to index.html."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
ROUTES = {"/about", "/articles", "/contact", "/support"}
PORT = int(os.environ.get("PORT", "5299"))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _rewrite(self):
        path = self.path.split("?", 1)[0].rstrip("/") or "/"
        if path in ROUTES:
            self.path = "/index.html"

    def do_GET(self):
        self._rewrite()
        return super().do_GET()

    def do_HEAD(self):
        self._rewrite()
        return super().do_HEAD()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"http://127.0.0.1:{PORT}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        sys.exit(0)

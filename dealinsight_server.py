






#!/usr/bin/env python3
"""
DealInsight Local Server
Serves your Pipeline Tracker and saves all data to files on disk.
No more browser storage that disappears!

Usage: python3 dealinsight_server.py
Then open: http://localhost:8080/DealInsight_Pipeline.html
"""

import http.server
import json
import os
import sys

PORT = 8080
DATA_FILE = "dealinsight_data.json"
PHOTOS_DIR = "dealinsight_photos"

class DealInsightHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/state":
            self._send_json(self._read_state())
        elif self.path.startswith("/api/photo/"):
            photo_id = self.path[11:]  # strip /api/photo/
            photo_path = os.path.join(PHOTOS_DIR, f"{photo_id}.txt")
            if os.path.exists(photo_path):
                with open(photo_path, "r") as f:
                    self._send_json({"id": photo_id, "data": f.read()})
            else:
                self._send_json(None)
        elif self.path == "/api/photos/all":
            photos = {}
            if os.path.isdir(PHOTOS_DIR):
                for fname in os.listdir(PHOTOS_DIR):
                    if fname.endswith(".txt"):
                        pid = fname[:-4]
                        with open(os.path.join(PHOTOS_DIR, fname), "r") as f:
                            photos[pid] = f.read()
            self._send_json(photos)
        else:
            super().do_GET()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)

        if self.path == "/api/state":
            try:
                data = json.loads(body)
                with open(DATA_FILE, "w") as f:
                    json.dump(data, f)
                self._send_json({"ok": True})
            except Exception as e:
                self._send_error(str(e))

        elif self.path.startswith("/api/photo/"):
            photo_id = self.path[11:]
            os.makedirs(PHOTOS_DIR, exist_ok=True)
            try:
                payload = json.loads(body)
                data_url = payload.get("data", "")
                if data_url:
                    with open(os.path.join(PHOTOS_DIR, f"{photo_id}.txt"), "w") as f:
                        f.write(data_url)
                else:
                    # Empty = delete
                    path = os.path.join(PHOTOS_DIR, f"{photo_id}.txt")
                    if os.path.exists(path):
                        os.remove(path)
                self._send_json({"ok": True})
            except Exception as e:
                self._send_error(str(e))
        else:
            self._send_error("Unknown endpoint")

    def _read_state(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r") as f:
                return json.load(f)
        return None

    def _send_json(self, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(body))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def _send_error(self, msg):
        body = json.dumps({"error": msg}).encode("utf-8")
        self.send_response(500)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def log_message(self, format, *args):
        # Only log errors and API calls, not every static file
        msg = format % args
        if "/api/" in msg or "404" in msg or "500" in msg:
            print(f"  {msg}")

if __name__ == "__main__":
    os.makedirs(PHOTOS_DIR, exist_ok=True)
    server = http.server.HTTPServer(("", PORT), DealInsightHandler)
    print(f"""
╔══════════════════════════════════════════════╗
║          deal insight  Local Server          ║
╠══════════════════════════════════════════════╣
║  Open in Chrome:                             ║
║  http://localhost:{PORT}/DealInsight_Pipeline.html  ║
║                                              ║
║  Data saves to: {DATA_FILE}     ║
║  Photos save to: {PHOTOS_DIR}/          ║
║                                              ║
║  Press Ctrl+C to stop the server             ║
╚══════════════════════════════════════════════╝
""")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()

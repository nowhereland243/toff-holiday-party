import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor

# Base URL
BASE_URL = "https://www.cosmos.so"
# Local Base Dir
LOCAL_DIR = "v7_cosmos"

# Ensure directories exist
os.makedirs(os.path.join(LOCAL_DIR, "audio"), exist_ok=True)

# List of assets to download (relative path starting with /)
assets = [
    "/vortex40-267x400.jpg",
    "/vortex15-330x400.png",
    "/vortex36-400x400.jpg",
    "/vortex25-400x366.jpg",
    "/vortex37-320x400.jpg",
    "/vortex26-267x400.jpg",
    "/vortex23-267x400.jpg",
    "/vortex11-267x400.jpg",
    "/vortex12-320x400.jpg",
    "/vortex20-267x400.jpg",
    "/vortex31-267x400.jpg",
    "/vortex32-321x400.jpg",
    "/vortex33-267x400.jpg",
    "/vortex38-400x267.jpg",
    "/vortex34-267x400.jpg",
    "/vortex35-320x400.jpg",
    "/vortex28-286x400.jpg",
    "/vortex27-326x400.jpg",
    "/vortex29-329x400.jpg",
    "/vortex7-320x400.jpg",
    "/audio/crunch-full-length.mp3",
    "/audio/ambient-audio.mp3",
    "/android-chrome-192x192.png"
]

def download_asset(asset_path):
    url = BASE_URL + asset_path
    # Remove leading slash for local path join
    local_path = os.path.join(LOCAL_DIR, asset_path.lstrip('/'))
    
    if not os.path.exists(local_path):
        try:
            print(f"Downloading {url} to {local_path}")
            with urllib.request.urlopen(url, timeout=10) as response:
                if response.status == 200:
                    with open(local_path, 'wb') as f:
                        f.write(response.read())
                    print(f"Downloaded {asset_path}")
                else:
                    print(f"Failed {asset_path}: {response.status}")
        except Exception as e:
            print(f"Error {asset_path}: {e}")
    else:
        print(f"Exists {asset_path}")

print(f"Downloading {len(assets)} assets...")
with ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(download_asset, assets)

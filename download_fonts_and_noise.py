import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor

# Base URL
BASE_URL = "https://www.cosmos.so"
# Local Base Dir
LOCAL_DIR = "v7_cosmos"

# Ensure directories exist
os.makedirs(os.path.join(LOCAL_DIR, "fonts/favorit"), exist_ok=True)
os.makedirs(os.path.join(LOCAL_DIR, "fonts/gt-super"), exist_ok=True)

# List of assets to download (relative path starting with /)
assets = [
    "/background-noise.png",
    "/fonts/favorit/Favorit-Light.woff2",
    "/fonts/favorit/Favorit-Regular.woff2",
    "/fonts/favorit/Favorit-Medium.woff2",
    "/fonts/favorit/Favorit-Bold.woff2",
    "/fonts/gt-super/GTSuperDisplay-Light.woff2"
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

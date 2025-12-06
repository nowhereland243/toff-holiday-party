import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor

os.makedirs("v7_cosmos/images/sequence", exist_ok=True)

def download_image(i):
    filename = f"manifesto{str(i).zfill(3)}.jpg"
    url = f"https://www.cosmos.so/images/sequence/{filename}"
    path = f"v7_cosmos/images/sequence/{filename}"
    if not os.path.exists(path):
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                if response.status == 200:
                    with open(path, 'wb') as f:
                        f.write(response.read())
                    # print(f"Downloaded {filename}")
                else:
                    print(f"Failed {filename}: {response.status}")
        except Exception as e:
            print(f"Error {filename}: {e}")

print("Downloading 300 images...")
with ThreadPoolExecutor(max_workers=20) as executor:
    executor.map(download_image, range(300))

# Download other assets
assets = [
    ("https://www.cosmos.so/manifest.json", "v7_cosmos/manifest.json"),
    ("https://www.cosmos.so/Auto-Captions-V6.mp4", "v7_cosmos/Auto-Captions-V6.mp4"),
    ("https://www.cosmos.so/Auto-Captions-Square-V1.mp4", "v7_cosmos/Auto-Captions-Square-V1.mp4")
]

print("Downloading other assets...")
for url, path in assets:
    try:
        with urllib.request.urlopen(url, timeout=20) as response:
            if response.status == 200:
                with open(path, 'wb') as f:
                    f.write(response.read())
                print(f"Downloaded {path}")
            else:
                print(f"Failed {path}: {response.status}")
    except Exception as e:
        print(f"Error {path}: {e}")

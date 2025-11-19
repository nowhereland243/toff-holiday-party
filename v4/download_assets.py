import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE_URL = "https://davidlynch.uprock.pro/"
INPUT_FILE = "index.html"
OUTPUT_FILE = "index.html"
ASSETS_DIR = "assets"

def download_file(url, local_path):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def process_html():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Tags and attributes to process
    tags_to_process = [
        ('link', 'href'),
        ('script', 'src'),
        ('img', 'src'),
        ('img', 'data-origin-src') # Handle lazy loading or custom attributes if present
    ]

    for tag_name, attr in tags_to_process:
        for tag in soup.find_all(tag_name):
            url = tag.get(attr)
            if url and not url.startswith('http') and not url.startswith('data:') and not url.startswith('#'):
                # Construct full URL
                full_url = urljoin(BASE_URL, url)
                
                # Create local path
                parsed_url = urlparse(full_url)
                path = parsed_url.path
                if path.startswith('/'):
                    path = path[1:]
                
                local_path = os.path.join(ASSETS_DIR, path)
                
                # Download
                print(f"Downloading {full_url} to {local_path}...")
                if download_file(full_url, local_path):
                    # Update HTML attribute
                    tag[attr] = local_path
            elif url and url.startswith(BASE_URL):
                 # Handle absolute URLs that point to the same domain
                path = urlparse(url).path
                if path.startswith('/'):
                    path = path[1:]
                local_path = os.path.join(ASSETS_DIR, path)
                print(f"Downloading {url} to {local_path}...")
                if download_file(url, local_path):
                    tag[attr] = local_path

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    process_html()

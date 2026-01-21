#!/usr/bin/env python3
"""
Icon generator - creates PNG and favicon files from SVG
"""

import os
import subprocess
import sys

# Check if cairosvg is installed, if not try to install it
try:
    import cairosvg
except ImportError:
    print("Installing cairosvg for SVG conversion...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "cairosvg", "pillow"])
    import cairosvg

from PIL import Image

def generate_icons():
    """Generate all icon sizes from SVG"""
    svg_path = "public/icon.svg"
    output_dir = "public"
    
    if not os.path.exists(svg_path):
        print(f"Error: {svg_path} not found!")
        return False
    
    print(f"📐 Reading SVG from {svg_path}")
    
    # Read SVG content
    with open(svg_path, 'r') as f:
        svg_content = f.read()
    
    # Define icon sizes to generate
    sizes = [
        (512, "icon-512.png"),
        (192, "icon-192.png"),
        (96, "icon-96.png"),
        (32, "favicon.png"),
        (16, "favicon-16.png"),
    ]
    
    print(f"🎨 Generating icon sizes: {', '.join([f'{size[0]}x{size[0]}' for size in sizes])}")
    
    # Generate PNG files
    for size, filename in sizes:
        output_path = os.path.join(output_dir, filename)
        print(f"  Converting to {size}x{size}... {filename}")
        
        try:
            # Convert SVG to PNG using cairosvg
            cairosvg.svg2png(bytestring=svg_content.encode('utf-8'), 
                           write_to=output_path,
                           output_width=size,
                           output_height=size)
            print(f"  ✅ Created {filename}")
        except Exception as e:
            print(f"  ❌ Failed to create {filename}: {e}")
            return False
    
    print(f"\n✨ Icon generation complete!")
    print(f"Files created in {output_dir}:")
    for _, filename in sizes:
        path = os.path.join(output_dir, filename)
        if os.path.exists(path):
            size = os.path.getsize(path)
            print(f"  ✓ {filename} ({size} bytes)")
    
    return True

if __name__ == "__main__":
    success = generate_icons()
    sys.exit(0 if success else 1)

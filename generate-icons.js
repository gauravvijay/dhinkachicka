#!/usr/bin/env node
/**
 * Icon generator using Sharp
 * Converts SVG icon to multiple PNG sizes for favicon and app icons
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = [
  { size: 512, name: 'icon-512.png', desc: 'App icon' },
  { size: 192, name: 'icon-192.png', desc: 'Android icon' },
  { size: 96, name: 'icon-96.png', desc: 'Icon' },
  { size: 32, name: 'favicon.png', desc: 'Favicon' },
  { size: 16, name: 'favicon-16.png', desc: 'Favicon 16x16' },
];

const SVG_PATH = path.join(__dirname, 'public', 'icon.svg');
const OUTPUT_DIR = path.join(__dirname, 'public');

async function generateIcons() {
  try {
    console.log('🎨 Starting icon generation from SVG...\n');

    if (!fs.existsSync(SVG_PATH)) {
      throw new Error(`SVG file not found: ${SVG_PATH}`);
    }

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Read SVG
    const svgBuffer = fs.readFileSync(SVG_PATH);

    // Generate each size
    for (const { size, name, desc } of SIZES) {
      const outputPath = path.join(OUTPUT_DIR, name);
      process.stdout.write(`  📐 Generating ${size}x${size} (${desc})... `);

      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png({ quality: 90 })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`✅ ${name} (${(stats.size / 1024).toFixed(2)} KB)`);
    }

    console.log('\n✨ Icon generation complete!');
    console.log(`\n📦 Generated files in ${OUTPUT_DIR}:`);
    for (const { name } of SIZES) {
      const fullPath = path.join(OUTPUT_DIR, name);
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        console.log(`   ✓ ${name} (${(stats.size / 1024).toFixed(2)} KB)`);
      }
    }

  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();

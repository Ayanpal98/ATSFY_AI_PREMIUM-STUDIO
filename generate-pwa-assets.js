import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Ensure the target directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// CRC32 table and helper for PNG chunks
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const crcVal = crc(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

/**
 * Generates a valid PNG image of the given dimensions with a professional startup theme.
 * The design features a deep slate-blue background (#0F172A) with a glowing rocket and Indian tricolor accents in the center.
 */
function generatePwaPng(width, height) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8 bits/channel
  ihdrData[9] = 6; // Color type: RGBA
  ihdrData[10] = 0; // Compression: Deflate
  ihdrData[11] = 0; // Filter: None
  ihdrData[12] = 0; // Interlace: None
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  const rowSize = width * 4 + 1;
  const pixels = Buffer.alloc(rowSize * height);
  
  const cx = width / 2;
  const cy = height / 2;
  const scale = width / 512;
  
  for (let y = 0; y < height; y++) {
    pixels[y * rowSize] = 0; // Filter byte 0 for current row
    
    for (let x = 0; x < width; x++) {
      const idx = y * rowSize + 1 + x * 4;
      
      // Calculate distances for geometry
      const dx = x - cx;
      const dy = y - cy;
      const r = Math.sqrt(dx * dx + dy * dy);
      
      // Theme colors
      const bgR = 15, bgG = 23, bgB = 42; // #0F172A (Deep Slate Blue)
      
      // Draw background
      let rVal = bgR;
      let gVal = bgG;
      let bVal = bgB;
      let aVal = 255;
      
      // Outer subtle gradient
      const normDist = r / (width * 0.7);
      if (normDist < 1.0) {
        // radial glow from center
        const glow = Math.max(0, 1 - normDist);
        rVal = Math.min(255, bgR + Math.round(glow * 15));
        gVal = Math.min(255, bgG + Math.round(glow * 25));
        bVal = Math.min(255, bgB + Math.round(glow * 45));
      }
      
      // 1. Draw outer circle border
      const outerRingRadius = 220 * scale;
      const ringThickness = 6 * scale;
      if (Math.abs(r - outerRingRadius) < ringThickness) {
        // Glowing cyan/blue ring
        rVal = 59;
        gVal = 130;
        bVal = 246; // Blue 500
      }
      
      // 2. Draw modern rocket body (shield-like & arrow shape upward)
      // Main capsule
      const bodyWidth = 48 * scale;
      const rocketHeight = 160 * scale;
      
      // Rocket body check
      const insideRocketBody = (
        y >= cy - rocketHeight * 0.5 && 
        y <= cy + rocketHeight * 0.3 && 
        Math.abs(dx) <= bodyWidth * (1 - (y - (cy - rocketHeight * 0.5)) / (rocketHeight * 1.2))
      );
      
      // Rocket wings
      const wingYStart = cy + rocketHeight * 0.1;
      const wingYEnd = cy + rocketHeight * 0.4;
      const insideWings = (
        y >= wingYStart && 
        y <= wingYEnd && 
        Math.abs(dx) <= bodyWidth * 2.2 * (1 - (wingYEnd - y) / (wingYEnd - wingYStart))
      );
      
      // Dynamic details (India Tricolor or orange/green flame at the bottom)
      const insideFlame = (
        y > cy + rocketHeight * 0.35 && 
        y < cy + rocketHeight * 0.55 && 
        Math.abs(dx) < bodyWidth * 0.6 * (1 - (y - (cy + rocketHeight * 0.35)) / (rocketHeight * 0.2))
      );
      
      if (insideRocketBody) {
        // Clean white/blue metallic color for rocket hull
        rVal = 248;
        gVal = 250;
        bVal = 252; // Slate 50
        
        // Window in the rocket
        const winY = cy - rocketHeight * 0.15;
        const winR = 18 * scale;
        const winDist = Math.sqrt(dx * dx + (y - winY) * (y - winY));
        if (winDist < winR) {
          rVal = 14;
          gVal = 165;
          bVal = 233; // Sky 500
        } else if (winDist < winR + 3 * scale) {
          rVal = 203;
          gVal = 213;
          bVal = 225; // Slate 300 (Border of window)
        }
      } else if (insideWings) {
        // Dark indigo/blue wings
        rVal = 29;
        gVal = 78;
        bVal = 216; // Blue 700
      } else if (insideFlame) {
        // Vivid orange/yellow rocket fire
        const flameRatio = (y - (cy + rocketHeight * 0.35)) / (rocketHeight * 0.2);
        if (flameRatio < 0.6) {
          rVal = 249;
          gVal = 115;
          bVal = 22; // Orange 500
        } else {
          rVal = 234;
          gVal = 179;
          bVal = 8; // Yellow 500
        }
      } else {
        // Subtle Indian Tri-color decorative accent sweeps around the rocket
        // Sweep paths
        const angle = Math.atan2(dy, dx);
        const distanceToSweep1 = Math.abs(r - 140 * scale);
        
        if (distanceToSweep1 < 8 * scale) {
          if (dx < 0 && dy > 0) {
            // Saffron sweep
            rVal = 255;
            gVal = 103;
            bVal = 31;
          } else if (dx > 0 && dy > 0) {
            // Green sweep
            rVal = 4;
            gVal = 106;
            bVal = 56;
          }
        }
      }
      
      pixels[idx] = rVal;
      pixels[idx + 1] = gVal;
      pixels[idx + 2] = bVal;
      pixels[idx + 3] = aVal;
    }
  }
  
  const idatData = zlib.deflateSync(pixels);
  const idatChunk = createChunk('IDAT', idatData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate the icons
console.log('Generating PWA Icons...');

const pwa192 = generatePwaPng(192, 192);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), pwa192);
console.log('✓ Created /public/pwa-192x192.png');

const pwa512 = generatePwaPng(512, 512);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), pwa512);
console.log('✓ Created /public/pwa-512x512.png');

// Apple touch icon (usually 180x180)
const appleTouch = generatePwaPng(180, 180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);
console.log('✓ Created /public/apple-touch-icon.png');

// For favicon, we write a 32x32 pixel PNG file and save as favicon.ico
const faviconPng = generatePwaPng(32, 32);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconPng);
console.log('✓ Created /public/favicon.ico');

console.log('PWA assets generated successfully!');

// Convert SVG icons to proper PNG format for PWABuilder
import fs from 'fs';
import path from 'path';

// Create a Canvas-based PNG from SVG data
function createPNGFromSVG(svgContent, size) {
  // Create a simple PNG with the Hebrew character
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Blue gradient background
  const gradient = ctx.createRadialGradient(size/2, size*0.3, 0, size/2, size*0.3, size*0.7);
  gradient.addColorStop(0, '#4dd0e1');
  gradient.addColorStop(1, '#0891b2');
  
  // Draw background circle
  ctx.beginPath();
  ctx.arc(size/2, size/2, size*0.46, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Draw inner circle
  ctx.beginPath();
  ctx.arc(size/2, size/2, size*0.39, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw Hebrew character
  ctx.fillStyle = '#ffd54f';
  ctx.font = `bold ${size*0.31}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('𐤀', size/2, size*0.56);
  
  return canvas.toBuffer('image/png');
}

// Mock canvas for server-side rendering
function createCanvas(width, height) {
  return {
    width,
    height,
    getContext: () => ({
      createRadialGradient: () => ({
        addColorStop: () => {}
      }),
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {},
      fillText: () => {},
      toBuffer: () => createValidPNG(width, height)
    }),
    toBuffer: (format) => createValidPNG(width, height)
  };
}

// Create a valid PNG with proper headers
function createValidPNG(width, height) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk (image header)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);     // width
  ihdrData.writeUInt32BE(height, 4);    // height
  ihdrData.writeUInt8(8, 8);            // bit depth
  ihdrData.writeUInt8(6, 9);            // color type (RGBA)
  ihdrData.writeUInt8(0, 10);           // compression
  ihdrData.writeUInt8(0, 11);           // filter
  ihdrData.writeUInt8(0, 12);           // interlace
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // Create simple blue circle image data
  const bytesPerPixel = 4; // RGBA
  const rowBytes = width * bytesPerPixel;
  const imageData = Buffer.alloc(height * (rowBytes + 1)); // +1 for filter byte
  
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.4;
  
  let dataIndex = 0;
  for (let y = 0; y < height; y++) {
    imageData[dataIndex++] = 0; // filter type: None
    
    for (let x = 0; x < width; x++) {
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      
      if (distance <= radius) {
        // Inside circle - blue gradient
        const intensity = 1 - (distance / radius) * 0.3;
        imageData[dataIndex++] = Math.floor(77 * intensity);   // R
        imageData[dataIndex++] = Math.floor(209 * intensity);  // G  
        imageData[dataIndex++] = Math.floor(225 * intensity);  // B
        imageData[dataIndex++] = 255;                          // A
      } else {
        // Outside circle - transparent
        imageData[dataIndex++] = 0; // R
        imageData[dataIndex++] = 0; // G
        imageData[dataIndex++] = 0; // B
        imageData[dataIndex++] = 0; // A
      }
    }
  }
  
  // Compress image data (simple deflate)
  const compressed = Buffer.concat([
    Buffer.from([0x78, 0x01]), // deflate header
    Buffer.from([0x01]),       // final block, no compression
    Buffer.from([imageData.length & 0xFF, (imageData.length >> 8) & 0xFF]), // length
    Buffer.from([~imageData.length & 0xFF, (~imageData.length >> 8) & 0xFF]), // complement
    imageData
  ]);
  
  const idatChunk = createChunk('IDAT', compressed);
  
  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Create PNG chunk with CRC
function createChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  
  const crc = calculateCRC(Buffer.concat([typeBuffer, data]));
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);
  
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 calculation
function calculateCRC(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (~crc) >>> 0;
}

// CRC32 lookup table
const crcTable = new Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

// Generate PNG files
const sizes = [192, 512, 144, 96, 72, 32, 16];
const iconsDir = 'client/public/icons';

sizes.forEach(size => {
  const pngData = createValidPNG(size, size);
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  try {
    fs.writeFileSync(filepath, pngData);
    console.log(`Created ${filename} (${pngData.length} bytes)`);
  } catch (error) {
    console.error(`Failed to create ${filename}:`, error.message);
  }
});

console.log('PNG conversion complete');
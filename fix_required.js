const fs = require('fs');
const path = require('path');

const propertiesDir = './nodes/Linkup/properties';

// Get all TypeScript files in properties directory
const files = fs.readdirSync(propertiesDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');

files.forEach(file => {
  const filePath = path.join(propertiesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all parameters with * in displayName and add required: true if not present
  content = content.replace(
    /(displayName: "[^"]*\*[^"]*",\s*name: "[^"]*",\s*type: "(?:string|options)",\s*(?:options: \[[^\]]*\],\s*)?default: "[^"]*",)(\s*(?!required:))/g,
    '$1\n        required: true,$2'
  );
  
  // Remove duplicate required: true lines
  content = content.replace(/(\s*required: true,\s*required: true,)/g, '\n        required: true,');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
});

console.log('All files processed!');

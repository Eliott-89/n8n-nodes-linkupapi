const fs = require('fs');

// Lire le fichier
let content = fs.readFileSync('nodes/Linkup/Linkup.node.ts', 'utf8');

// Supprimer les displayOptions des collections
content = content.replace(/displayOptions:\s*{\s*show:\s*{[^}]+}\s*},?\s*/g, '');

// Écrire le fichier modifié
fs.writeFileSync('nodes/Linkup/Linkup.node.ts', content);

console.log('DisplayOptions supprimés avec succès !'); 
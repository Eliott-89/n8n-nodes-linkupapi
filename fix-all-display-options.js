const fs = require('fs');

// Lire le fichier
let content = fs.readFileSync('nodes/Linkup/Linkup.node.ts', 'utf8');

// Supprimer tous les displayOptions (plusieurs lignes)
content = content.replace(/displayOptions:\s*{\s*show:\s*{[^}]+}\s*},?\s*/g, '');
content = content.replace(/displayOptions:\s*{\s*hide:\s*{[^}]+}\s*},?\s*/g, '');

// Écrire le fichier modifié
fs.writeFileSync('nodes/Linkup/Linkup.node.ts', content);

console.log('Tous les displayOptions supprimés avec succès !'); 
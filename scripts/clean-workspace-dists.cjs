const fs = require('fs');
const path = require('path');

function main() {
  const base = path.resolve(process.cwd(), 'packages');
  if (!fs.existsSync(base)) return;

  for (const ent of fs.readdirSync(base, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    fs.rmSync(path.join(base, ent.name, 'dist'), { recursive: true, force: true });
  }
}

main();



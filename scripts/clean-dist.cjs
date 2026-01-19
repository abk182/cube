const fs = require('fs');
const path = require('path');

function main() {
  const relTarget = process.argv[2] || 'dist';
  const target = path.resolve(process.cwd(), relTarget);
  fs.rmSync(target, { recursive: true, force: true });
}

main();



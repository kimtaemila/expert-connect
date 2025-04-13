
// Simple server starter script
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Expert Knowledge Graph API Server...');

// Run the server using ts-node
const server = spawn('npx', ['ts-node', '--skipProject', path.join(__dirname, 'src/server/index.ts')], {
  stdio: 'inherit',
  env: { ...process.env }
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill('SIGINT');
});

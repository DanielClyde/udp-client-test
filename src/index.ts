import { UDPSocket } from './client';

const client = new UDPSocket();
client.init().then(() => client.start());

process.on('SIGINT', () => kill());
process.on('SIGTERM', () => kill());

async function kill() {
  await client.stop();
  process.exit();
}

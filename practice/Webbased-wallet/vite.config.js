import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      events: 'events',
      util: 'util',
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': {}
  },
});

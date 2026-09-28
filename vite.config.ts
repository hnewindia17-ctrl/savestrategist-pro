import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackStart } from '@tanstack/start/vite';
import { nitro } from 'nitro/vite';

export default defineConfig({
  plugins: [
    TanStackStart(),
    react(),
    nitro()
  ],
  tanstackStart: {
    server: {
      entry: "server"
    }
  }
});

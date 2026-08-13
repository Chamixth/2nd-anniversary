import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/2nd-anniversary/",
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // pics/ is a scratch folder for source images being dropped in mid-edit —
      // watching it crashes the dev server if a file is still being written to disk.
      ignored: ["**/pics/**"],
    },
  },
})

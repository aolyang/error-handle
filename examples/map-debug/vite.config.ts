import { defineConfig } from "vite";

export default defineConfig(() => {

  return {
    server: {
      proxy: {
        "/api/v1": "https://bukenengyou/bad/api"
      }
    },
    build: {
      sourcemap: "hidden",
    }
  }
})

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      proxy: {
        // 代理所有 /api 请求到 JSON 服务器
        "/api": {
          target: "http://localhost:4321", // JSON 服务器地址
          changeOrigin: true, // 是否修改请求头的 origin
          // rewrite: (path) => path.replace(/^\/api/, ""), // 可选：重写路径
        },
      },
    },
  };
});

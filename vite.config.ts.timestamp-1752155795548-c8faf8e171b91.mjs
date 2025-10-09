// vite.config.ts
import { defineConfig } from "file:///C:/Users/akiliedge-solutions/Desktop/projects/billways_sacco/billways-sacco-nexus/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/akiliedge-solutions/Desktop/projects/billways_sacco/billways-sacco-nexus/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/akiliedge-solutions/Desktop/projects/billways_sacco/billways-sacco-nexus/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\akiliedge-solutions\\Desktop\\projects\\billways_sacco\\billways-sacco-nexus";
var vite_config_default = defineConfig(({ mode }) => ({
  base: mode === "production" ? "/billwayssacco/" : "/",
  // Add this line
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: "dist",
    // Ensure this matches GitHub Pages deployment directory
    assetsDir: "assets"
    // Organize assets properly
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxha2lsaWVkZ2Utc29sdXRpb25zXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcYmlsbHdheXNfc2FjY29cXFxcYmlsbHdheXMtc2FjY28tbmV4dXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFraWxpZWRnZS1zb2x1dGlvbnNcXFxcRGVza3RvcFxcXFxwcm9qZWN0c1xcXFxiaWxsd2F5c19zYWNjb1xcXFxiaWxsd2F5cy1zYWNjby1uZXh1c1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWtpbGllZGdlLXNvbHV0aW9ucy9EZXNrdG9wL3Byb2plY3RzL2JpbGx3YXlzX3NhY2NvL2JpbGx3YXlzLXNhY2NvLW5leHVzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIGJhc2U6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/ICcvYmlsbHdheXNzYWNjby8nIDogJy8nLCAvLyBBZGQgdGhpcyBsaW5lXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA4MDgwLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgY29tcG9uZW50VGFnZ2VyKCksXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLCAvLyBFbnN1cmUgdGhpcyBtYXRjaGVzIEdpdEh1YiBQYWdlcyBkZXBsb3ltZW50IGRpcmVjdG9yeVxyXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJywgLy8gT3JnYW5pemUgYXNzZXRzIHByb3Blcmx5XHJcbiAgfVxyXG59KSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFtYixTQUFTLG9CQUFvQjtBQUNoZCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsTUFBTSxTQUFTLGVBQWUsb0JBQW9CO0FBQUE7QUFBQSxFQUNsRCxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUEsRUFDNUMsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLEVBQ2I7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=

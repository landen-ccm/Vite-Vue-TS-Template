// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Brandon.Beckwith/Repos/Vite-Vue-TS-Template/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Brandon.Beckwith/Repos/Vite-Vue-TS-Template/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///C:/Users/Brandon.Beckwith/Repos/Vite-Vue-TS-Template/node_modules/unplugin-vue-router/dist/vite.mjs";
import AutoImport from "file:///C:/Users/Brandon.Beckwith/Repos/Vite-Vue-TS-Template/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/Brandon.Beckwith/Repos/Vite-Vue-TS-Template/node_modules/unplugin-vue-components/dist/vite.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Brandon.Beckwith/Repos/Vite-Vue-TS-Template/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({}),
    vue(),
    Components({
      dts: true,
      extensions: ["vue", "ts"],
      dirs: ["src/components", "src/components/**/*"]
    }),
    AutoImport({
      dts: true,
      imports: ["vue"]
    })
  ],
  server: {
    open: true
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxCcmFuZG9uLkJlY2t3aXRoXFxcXFJlcG9zXFxcXFZpdGUtVnVlLVRTLVRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxCcmFuZG9uLkJlY2t3aXRoXFxcXFJlcG9zXFxcXFZpdGUtVnVlLVRTLVRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9CcmFuZG9uLkJlY2t3aXRoL1JlcG9zL1ZpdGUtVnVlLVRTLVRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgVnVlUm91dGVyKHt9KSxcclxuICAgIHZ1ZSgpLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAndHMnXSxcclxuICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cycsICdzcmMvY29tcG9uZW50cy8qKi8qJ11cclxuICAgIH0pLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgaW1wb3J0czogWyd2dWUnXVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgb3BlbjogdHJ1ZVxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1YsU0FBUyxlQUFlLFdBQVc7QUFDM1gsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUxrTSxJQUFNLDJDQUEyQztBQVExUSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxVQUFVLENBQUMsQ0FBQztBQUFBLElBQ1osSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBLE1BQ3hCLE1BQU0sQ0FBQyxrQkFBa0IscUJBQXFCO0FBQUEsSUFDaEQsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

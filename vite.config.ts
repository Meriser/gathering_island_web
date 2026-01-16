import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import { colors } from "./src/colors/colors";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 載入環境變數
  const env = loadEnv(mode, process.cwd());

  // 將 TypeScript 顏色物件轉換為 SCSS 變數字串
  const generateScssVariables = () => { 
    // 取得 colors 物件的每個色彩分類
    const colorEntries = Object.entries(colors).map(([category, variants]) => { 
      // 取得每個分類下所有變數
      const variantEntries = Object.entries(variants).map(([variant, value]) => { 
        // 將變數名稱與顏色值格式化為 SCSS 字串
        return `    ${variant}: ${value}`; 
      // 各變數字串用逗號與換行連接
      }).join(',\n'); 
      // 將分類名稱與所有變數組成 SCSS map
      return `  ${category}: (\n${variantEntries}\n  )`; 
    // 各分類 map 之間用逗號與換行連接
    }).join(',\n'); 
    
    // 組合整個 $colors map 與 get-color 輔助函式為一完整 SCSS 字串
    return `$colors: (\n${colorEntries}\n);\n\n// 輔助函數來取得顏色值\n@function get-color($category, $variant: 'DEFAULT') {\n  @return map-get(map-get($colors, $category), $variant);\n}`;
  };

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 配置 HTML 插件以支持環境變數注入
      createHtmlPlugin({
        inject: {
          data: {
            VITE_APP_TITLE: env.VITE_APP_TITLE || "Vue Web Template",
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@api": resolve(__dirname, "src/api"),
        "@assets": resolve(__dirname, "src/assets"),
        "@colors": resolve(__dirname, "src/colors"),
        "@components": resolve(__dirname, "src/components"),
        "@enum": resolve(__dirname, "src/enum"),
        "@hooks": resolve(__dirname, "src/hooks"),
        "@router": resolve(__dirname, "src/router"),
        "@schemas": resolve(__dirname, "src/schemas"),
        "@types": resolve(__dirname, "src/types"),
        "@stores": resolve(__dirname, "src/stores"),
        "@styles": resolve(__dirname, "src/styles"),
        "@utils": resolve(__dirname, "src/utils"),
        "@views": resolve(__dirname, "src/views"),
      },
    },
    // 添加 server 配置
    server: {
      // 指定 port
      port: 8080,
      proxy: {
        "/api": {
          target: "https://gathering-island.onrender.com",
          changeOrigin: true,
          secure: true,
          // 將以 /api 開頭的請求路徑重寫，去除 /api 前綴
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          // 暫時忽略 import 語法警告，但未來新版 sass 可能會棄用，需注意
          silenceDeprecations: ["import"],
          // 自動注入顏色變數到所有 SCSS 檔案
          additionalData: generateScssVariables(),
        },
      },
    },
  };
});
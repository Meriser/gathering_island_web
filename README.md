# Gathering Island

Gathering Island 是一款專為活動打造的網頁平台。只需完成註冊，即可輕鬆發布活動並邀請他人參加，或是探索各類精彩活動，結識志同道合的夥伴，一同享受參與的樂趣。

## ✨ 技術棧

- **Vue 3** + **TypeScript** + **Vite**
- **Element Plus** - UI 組件庫
- **Tailwind CSS** - 原子化 CSS
- **Pinia** - 狀態管理
- **Vue Router** - 路由與權限守衛
- **Vee-Validate + Zod** - 表單驗證
- **Axios** - HTTP 請求
- **TanStack Query** - 服務器狀態管理
- **Day.js** - 日期處理
- **SweetAlert2** - 彈窗提示

## 📋 環境要求

- Node.js >= 18.x
- pnpm >= 8.x

## 🚀 快速開始

### 1. 安裝 pnpm（如未安裝）

```bash
npm install -g pnpm
```

### 2. 安裝依賴

```bash
pnpm install
```

### 3. 環境變數

環境變數檔案分為開發（dev）和生產（prod）兩種， 
`.env.dev`（開發環境）與 `.env.prod`（生產環境）檔案。
可根據不同環境設置專屬變數，例如 API 網址：

```env
# .env.dev 開發環境
VITE_API_BASE_URL=http://localhost:8080/api

# .env.prod 生產環境
VITE_API_BASE_URL=https://gathering-island.onrender.com/api
```

每次啟動對應環境時，自動載入相應 env 檔案，實現不同配置。

### 4. 啟動開發

```bash
# 開發模式
pnpm dev

# 生產模式預覽
pnpm prod
```

預設運行於 `http://localhost:8080`

### 5. 構建專案

```bash
# 類型檢查 + 構建
pnpm build

# 類型檢查
pnpm type-check

# 預覽構建結果
pnpm preview
```

## 📁 專案結構

```
src/
├── api/           # API 接口
├── assets/        # 靜態資源
├── colors/        # 主題色設定
├── components/    # 公共元件
├── enum/          # 枚舉（集中管理專案中的常數和列舉型別）
├── hooks/         # 自訂 composable（組合式函式）
├── router/        # 路由
├── schemas/       # Zod Schema
├── stores/        # Pinia 狀態管理
├── styles/        # 樣式
├── types/         # 型別定義
├── utils/         # 工具函式
├── views/         # 頁面
├── App.vue        # 入口組件
└── main.ts        # 進入點
```

## ⚙️ 路徑別名

```typescript
@/          → src/
@api/       → src/api/
@assets/    → src/assets/
@colors/    → src/colors/
@components/→ src/components/
@enum/      → src/enum/
@hooks/     → src/hooks/
@router/    → src/router/
@schemas/   → src/schemas/
@stores/    → src/stores/
@styles/    → src/styles/
@types/     → src/types/
@utils/     → src/utils/
@views/     → src/views/
```

## 🎨 SCSS 全局變數

專案已自動注入 SCSS 變數，可直接使用：

```scss
.example {
  color: $primary;
  background: $light;
}
```

變數定義於 `src/colors/color.ts`

## 🔐 認證流程

1. 用戶登入 → 驗證帳密
2. 取得 Token → 存入 `authStore`
3. 路由守衛自動檢查認證狀態
4. 攜帶 Token 訪問受保護的 API

## 📝 開發指南

### 新增頁面

1. 在 `src/views/` 創建組件
2. 在 `src/router/index.ts` 新增路由

```typescript
{
  path: '/users',
  name: 'Users',
  component: () => import('@/views/Users.vue'),
  meta: { requiresAuth: true } // 需要登入
}
```

### 新增 API

在 `src/api/` 創建模組：

```typescript
// src/api/user/api.ts
import axios from 'axios'
import { USER_PATH } from './path'

export const getUserList = () => {
  return axios.get(USER_PATH.LIST)
}
```

### 新增 Store

在 `src/stores/` 創建 Store：

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  
  const fetchUsers = async () => {
    // 實現邏輯
  }
  
  return { users, fetchUsers }
})
```

## 📏 Commit 規範

本專案採用 Conventional Commits 規範，請遵循以下格式：

```
<type>(<scope>): <subject>
```

### Commit Types

| Type | 說明 | 範例 |
|------|------|------|
| **feat** | 新增/修改功能 | `feat: 新增使用者管理頁面` |
| **fix** | 修復 bug | `fix: 修正登入驗證錯誤` |
| **docs** | 文件變更 | `docs: 更新 API 文檔` |
| **style** | 程式碼格式（不影響功能） | `style: 調整程式碼縮排` |
| **refactor** | 重構（非新增功能或修 bug） | `refactor: 優化 API 請求邏輯` |
| **perf** | 效能改善 | `perf: 優化列表渲染效能` |
| **test** | 測試相關 | `test: 新增登入功能測試` |
| **chore** | 建構/工具變動 | `chore: 更新依賴套件` |
| **revert** | 撤銷先前的 commit | `revert: feat(auth): 撤銷登入功能` |

### Commit 範例

```bash
# 新增功能
git commit -m "feat(auth): 新增忘記密碼功能"

# 修復 bug
git commit -m "fix(api): 修正 API 錯誤處理邏輯"

# 更新文件
git commit -m "docs: 更新 README 安裝說明"

# 重構程式碼
git commit -m "refactor(store): 簡化 user store 結構"

# 效能優化
git commit -m "perf(table): 使用虛擬滾動優化大量資料渲染"

# 建構工具
git commit -m "chore: 升級 vite 至 5.0"
```

### 注意事項

- **type** 必須小寫
- **scope**（選填）表示影響範圍，如：auth、api、ui
- **subject** 簡短描述變更內容
- 每個 commit 只做一件事
- commit message 要清楚描述變更內容

## 🔗 相關資源

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/)

---

**有任何問題歡迎提出 Issue！**

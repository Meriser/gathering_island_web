import { z } from 'zod'

// 登入 Schema
export const loginSchema = z.object({
  email: z
    .string({ required_error: '請輸入 Email' })
    .min(1, '請輸入 Email'),
  password: z
    .string({ required_error: '請輸入密碼' })
    .min(1, '密碼至少需要 1 個字元')
    .max(12, '密碼最多 12 個字元'),
})

// 導出 TypeScript 類型
export type LoginFormData = z.infer<typeof loginSchema>
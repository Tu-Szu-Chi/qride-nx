# 重要注意事項

## 認證系統

**modules/auth**

1. JWT Token 處理
   - JWT配置 (modules/auth/auth.module.ts)
   - Token 過期自動刷新機制 (authService.refreshToken)
   - 登出時需清除所有 token

2. 權限控制(BO)
   - 嚴格區分 admin 和 agent 角色權限
   - API 端點需要正確的權限驗證
   - 前端路由需要權限配置

## 安全性考慮

1. API 安全
   - 所有請求需要帶上 Authorization header
   - 敏感數據傳輸需要加密(未實作)

## 性能優化(未實作)

1. 前端優化
   - 使用 Code Splitting 減少初始加載大小
   - 合理使用緩存策略

2. 後端優化
   - API 響應需要緩存處理
   - 大量數據查詢需要分頁
   - 文件上傳需要大小限制


## 錯誤處理

1. 前端錯誤處理
   - 統一的錯誤處理機制 (common/src/bizCode.ts)

2. 後端錯誤處理
   - 統一的錯誤響應格式
   - 詳細的錯誤日誌

## 特殊配置

1. DB駝峰轉換 (db.config.ts::CamelCasePool)



# 任务卡工作台（Vercel + 阿里云 DashScope）

这个版本解决了浏览器直连 DashScope 时的跨域/Failed to fetch 问题：  
前端页面不直接请求 DashScope，而是请求同站点的 `/api/dashscope`，由 Vercel 后端转发到 DashScope。  
DashScope API Key 存在 Vercel 环境变量里，不会暴露在浏览器。

## 部署步骤（全程不需要安装任何东西）

### 1. 准备
- 一个 GitHub 账号
- 一个 Vercel 账号（可用 GitHub 登录）
- 你已经在阿里云百炼创建好的 DashScope API Key（sk-...）

### 2. 上传到 GitHub
1) 在 GitHub 新建仓库（例如 `taskcard-workbench`）  
2) 上传本项目所有文件：`index.html` 和 `api/dashscope.js`

### 3. 用 Vercel 部署
1) 打开 Vercel，新建 Project，选择刚才的 GitHub 仓库并 Import  
2) 部署前或部署后，到：
   - Project → Settings → Environment Variables
   - 新增：`DASHSCOPE_API_KEY` = 你的 `sk-...`
   - Save
3) 回到 Deployments，点 Redeploy（让环境变量生效）

### 4. 使用
- 打开 Vercel 提供的域名（例如 `https://xxx.vercel.app`）
- 直接在页面中使用（无需在网页里填写 Key）

## 常见问题
- **仍然报错**：请检查 Vercel 环境变量是否设置对（变量名必须是 `DASHSCOPE_API_KEY`），并且 Redeploy 过。
- **模型名**：建议在页面里把复杂任务模型设置为你百炼控制台开通的型号，如 `qwen3.5-plus` / `qwen3-max`。

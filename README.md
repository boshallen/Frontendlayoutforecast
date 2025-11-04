
  # Front-end Layout (Copy)

  This is a code bundle for Front-end Layout (Copy). The original project is available at https://www.figma.com/design/h2Jn1UGaB16wJzlxSo8BDu/Front-end-Layout--Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Project Structure

    Frontendlayoutforecast/
  ├── index.html             # 应用入口 HTML
  ├── package.json           # 项目依赖与脚本配置
  ├── vite.config.ts         # Vite 构建配置（开发服务器、代理等）
  ├── src/
  │   ├── main.tsx           # 前端应用入口（React 渲染 App.tsx）
  │   ├── App.tsx            # 根组件，负责路由与全局布局
  │   ├── components/        # 页面与功能组件
  │   │   ├── PredictionResults.tsx    # 房价预测结果展示
  │   │   ├── LocationSelector.tsx     # 省/市/区/小区选择组件
  │   │   ├── AIReasoningChat.tsx      # LLM 解释对话界面（你需要重点完善）
  │   │   ├── DashboardView.tsx, HistoryView.tsx, SettingsView.tsx # 页面视图
  │   │   └── ui/            # 基于 shadcn/ui 的通用组件库（输入框、弹窗、按钮等）
  │   ├── styles/            # 全局样式
  │   └── guidelines/        # 设计规范说明（文档类）
  📦 技术栈：
    •	React 18 + TypeScript
    •	Vite 作为构建工具
    •	shadcn/ui + Tailwind CSS 提供 UI 组件
    •	前后端通信可通过 fetch 或 axios
    •	LLM 对话模块将与 Flask 后端 /ask 接口交互

  
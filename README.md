# 前端布局项目（Front-end Layout）

这是一个用于房地产价格预测与解释的前端项目。该项目提供用户界面，允许用户选择省、市、区以及具体小区，获取房价预测结果，并通过大语言模型（LLM）对预测结果进行解释。项目基于 React 和 TypeScript 构建，结合 shadcn/ui 和 Tailwind CSS 实现现代化界面设计。

# Front-end Layout (Copy)

This is a code bundle for Front-end Layout (Copy). The original project is available at https://www.figma.com/design/h2Jn1UGaB16wJzlxSo8BDu/Front-end-Layout--Copy-.

## Running the code

1. Run `npm i` to install the dependencies.

2. Run `npm run dev` to start the development server.

3. Run `npm run build` to build the production bundle.

4. To connect with the backend, ensure the Flask server is running and configure the proxy or API base URL accordingly.

## Project Structure

  Frontendlayoutforecast/
├── index.html             # 应用入口 HTML
├── package.json           # 项目依赖与脚本配置
├── vite.config.ts         # Vite 构建配置（开发服务器、代理等）
├── src/
│   ├── main.tsx           # 前端应用入口（React 渲染 App.tsx）
│   ├── App.tsx            # 根组件，负责路由与全局布局
│   ├── components/        # 页面与功能组件
│   │   ├── PredictionResults.tsx    # 房价预测结果展示组件，显示预测数据和图表
│   │   ├── LocationSelector.tsx     # 省/市/区/小区选择组件，支持层级联动选择
│   │   ├── AIReasoningChat.tsx      # LLM 解释对话界面，展示与大语言模型的交互内容
│   │   ├── DashboardView.tsx, HistoryView.tsx, SettingsView.tsx # 主要页面视图组件
│   │   └── ui/            # 基于 shadcn/ui 的通用组件库（输入框、弹窗、按钮等）
│   ├── styles/            # 全局样式
│   └── guidelines/        # 设计规范说明（文档类）
📦 技术栈：
  • React 18 + TypeScript
  • Vite 作为构建工具
  • shadcn/ui + Tailwind CSS 提供 UI 组件
  • 前后端通信可通过 fetch 或 axios
  • LLM 对话模块将与 Flask 后端 /ask 接口交互

## Backend Integration

本项目前端通过调用 Flask 后端提供的 API 实现数据交互。主要接口包括：

- `/predict`：接收用户选择的地理信息，返回房价预测结果。
- `/ask`：接收用户输入的解释请求，返回由大语言模型生成的解释文本。

请确保 Flask 服务器已启动并监听相应端口，前端可通过配置代理或直接调用后端地址完成联调。

## Development Notes

- 使用 React 18 和 TypeScript 保证代码类型安全和组件复用。
- 采用 Vite 作为构建工具，实现快速开发和热更新。
- UI 组件基于 shadcn/ui 和 Tailwind CSS，方便定制样式。
- LLM 对话模块需重点完善，确保与后端接口稳定交互。
- 注意跨域问题，开发阶段可通过 Vite 代理解决。
- 代码结构清晰，便于后续功能扩展和维护。
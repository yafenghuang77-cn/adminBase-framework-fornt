# Rsbuild project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
pnpm run dev
```

Build the app for production:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

## 系统首页

已迁移参考项目的系统首页与公共布局，保留原有文案、品牌 Logo、菜单层级、卡片样式及响应式断点。实际构建使用 Rsbuild，路由使用 TanStack Router。

- `src/index.tsx`：应用挂载与入口级错误边界，渲染异常时提供刷新入口。
- `src/App.tsx`：主题、语言和全局网络提示。
- `src/layouts/WorkspaceLayout.tsx`：顶部栏、侧栏、品牌和语言菜单、用户菜单及布局设置抽屉。
- `src/pages/Home/`：项目工作台、常用功能、框架能力和接入说明。
- `src/config/navigation.tsx`：侧栏菜单与页面名称；`src/config/settings.ts`：默认布局配置。
- `src/state/`：品牌、语言与布局偏好的状态及本地持久化。
- `src/router.ts`：集中配置首页、业务占位页和兜底路由，页面按需加载；后续接入业务页面时，在此替换对应的占位路由。

根地址自动进入 `/welcome`。首页外的业务模块目前显示占位页，登录、用户、权限、文件与性能统计业务留待后续迁移；首页的介绍文案沿用参考项目。品牌、语言和布局设置可切换，并在刷新后恢复。

## 前端规范

规范与参考 Umi 项目保持一致，并适配当前 Rsbuild、ESLint 9 和 ESM 工具链：

- `eslint.config.mjs`：ESLint 平面配置，覆盖 JS/TS、React、Hooks、可访问性、导入排序和 TypeScript 类型写法；禁止 `debugger` 与 `console.log`，允许 `console.warn/error`。格式规则通过 `eslint-config-prettier` 与 Prettier 协调。
- `.prettierrc` / `.prettierignore`：每行 100 字符、2 空格缩进、单引号、分号、尾逗号、LF 换行，自动整理 `package.json`。跳过依赖、构建产物和工具资源。
- `.stylelintrc.js`：检查 CSS / Less，支持 Tailwind CSS 自定义指令。
- `.lintstagedrc` / `.husky/pre-commit`：提交前只对暂存文件执行检查和自动修复；失败会阻止提交。
- `.editorconfig` / `.vscode/`：统一编辑器缩进、换行及保存时的格式化和自动修复；按推荐安装 ESLint、Prettier、Stylelint 扩展。

```bash
pnpm run lint          # 检查脚本和样式，警告也视为失败
pnpm run lint:fix      # 自动修复脚本和样式
pnpm run format       # 格式化项目文件
pnpm run format:check # 只检查格式，适合 CI
pnpm run typecheck    # 检查源代码和测试的 TypeScript 类型
pnpm run lint:staged  # 手动检查暂存文件
```

安装依赖时，`prepare` 会自动初始化 Husky；已有依赖的工作区可运行 `pnpm run prepare`。ESLint 使用当前项目的 `eslint.config.mjs`，不再使用旧版 `.eslintrc`。原有 `rslint.config.ts` 保留，默认检查入口统一为 ESLint 和 Stylelint。测试使用 Rstest 的显式导入，无需套用参考项目的 Jest 全局变量配置。

## Learn more

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!

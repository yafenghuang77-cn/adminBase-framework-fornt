# AdminBase Framework

基于 React、TypeScript 和 Vite 的后台管理项目。

## 开发

```bash
pnpm install
pnpm dev
pnpm build
```

依赖安装完成后，`prepare` 会运行 Husky，启用项目的 Git 提交钩子。已有依赖时，可运行 `pnpm prepare` 初始化钩子。

依赖使用带具体版本号的范围声明，按 npm 已发布版本及插件兼容要求选取，不使用 `latest` 标签。代码规范工具使用 ESLint 9.x 最新版；TypeScript 限定在 6.0.x，以匹配 typescript-eslint 当前的支持范围。其余依赖通常使用稳定版的 `^x.y.z`；Pro Components 使用支持 Ant Design 6 的官方 beta 版本 `^3.1.15-7`，保留 `antd ^6.6.6`。执行 `pnpm install` 后会同步锁文件及本地依赖。

## 代码检查与格式化

使用 ESLint 检查 JS/TS、Prettier 统一格式、Stylelint 检查 CSS/Less，TypeScript 负责完整类型检查。导入和导出排序由 ESLint 的 `simple-import-sort` 插件负责。

| 命令                | 用途                                       |
| ------------------- | ------------------------------------------ |
| `pnpm lint`         | 检查 JS/TS 和 CSS/Less，警告也会使检查失败 |
| `pnpm lint:js`      | 仅运行 ESLint                              |
| `pnpm lint:style`   | 仅运行 Stylelint                           |
| `pnpm lint:fix`     | 自动修复可修复的代码和样式问题             |
| `pnpm format`       | 使用 Prettier 格式化项目文件               |
| `pnpm format:check` | 只检查格式，不修改文件                     |
| `pnpm typecheck`    | 检查应用、测试和 TS 配置文件的类型         |
| `pnpm check`        | 依次执行类型、代码、样式和格式检查         |

规则沿用原 Umi 项目的主要约定：两空格、单引号、分号、100 字符行宽、LF 换行；禁止 `var`、`debugger`、显式 `any` 和普通 `console.log`，允许 `console.warn` / `console.error`。React Hooks 用法、依赖数组、JSX 和无障碍问题也会检查。未使用参数、变量和捕获异常可通过 `_` 前缀明确忽略；TypeScript 自身的未使用检查仍会单独运行。

配置入口：

- `eslint.config.mjs`：ESLint flat config，配置 JS/TS、React、Hooks、无障碍、Jest 和导入导出排序规则。
- `.prettierrc.json`：与旧项目一致的格式选项，通过 `prettier-plugin-packagejson` 整理 `package.json` 字段。
- `.prettierignore`：格式化忽略项。
- `stylelint.config.mjs`：CSS/Less 检查，允许 Tailwind 指令。
- `.editorconfig`：缩进、换行和文件编码。
- `tsconfig.app.json`、`tsconfig.node.json`：开启严格类型检查和返回值检查。

使用 ESLint、TypeScript、React、无障碍和 Jest 的推荐预设，并显式保留旧项目从 Umi 继承的独立检查，例如参数重新赋值、空代码块、按钮类型和测试断言。`no-invalid-this`、React 废弃 API 和导出排序也由 ESLint 或现成插件直接检查。导入分组沿用旧配置，`eslint-config-prettier` 关闭与 Prettier 冲突的格式规则，不依赖 Umi 或自定义检查器。

类型检查覆盖 `src`、`tests`、根目录 TS 配置，以及 `config` / `scripts` / `tools` 下的 TS 文件。当前项目原有的未使用变量、未使用参数和可擦除语法检查继续保留。

产物、测试报告、生成的 PDF.js 资源不参与源码检查和格式化；锁文件也不参与格式化。

## Git 提交校验

1. `pre-commit` 通过 lint-staged 检查本次暂存文件，先修复代码或样式，再用 Prettier 格式化；检查失败则阻止提交。
2. lint-staged 自动更新修复后文件的暂存内容，并默认保护部分暂存文件中尚未暂存的修改。提交前请检查暂存差异。
3. `commit-msg` 使用 Commitlint 检查提交信息，格式为 `type(scope): 描述`，其中 scope 可省略。

```text
feat: 新增用户管理页面
fix(auth): 修复登录状态失效
chore: 更新代码规范
```

允许类型与旧项目保持一致：`feat`、`fix`、`docs`、`style`、`refactor`、`perf`、`test`、`workflow`、`build`、`ci`、`chore`、`types`、`wip`、`release`、`dep`、`deps`、`example`、`examples`、`merge`、`revert`。使用 Commitlint 内置解析器与原生规则配置旧消息模式，类型匹配不区分大小写，并支持旧项目的 `Merge` / `Revert` / `Version` 消息。普通的 `更新代码` 不符合提交格式。

提交钩子只检查暂存文件，不自动运行全量类型检查、构建或测试。提交前可执行 `pnpm check`，发布前执行 `pnpm build`。`pnpm lint:staged` 可手动检查暂存文件，该命令会自动修复并更新暂存内容。

## 编辑器

VS Code / Cursor 打开项目后，按扩展推荐安装 **ESLint**、**Prettier**、**Stylelint** 和 **EditorConfig**，即可使用保存时格式化和自动修复。编辑器扩展只提供即时反馈，终端命令和提交钩子不依赖编辑器。

工具用法参考：[ESLint](https://eslint.org/docs/latest/use/configure/configuration-files)、[typescript-eslint](https://typescript-eslint.io/getting-started/)、[Prettier](https://prettier.io/docs/configuration)、[lint-staged](https://github.com/lint-staged/lint-staged)、[Husky](https://typicode.github.io/husky/)、[Commitlint](https://commitlint.js.org/)。

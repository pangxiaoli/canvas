# canvas

todo

## 技术选型

-   [React 18](https://react.docschina.org/)
-   [Ts 5](https://www.typescriptlang.org)
-   [Vite](https://cn.vitejs.dev/)
-   [react-router 6](https://reactrouter.com/en/main)
-   [redux tool-kit](https://cn.redux.js.org/redux-toolkit/overview/)
-   [konva](https://konvajs.org/)

## 约定

### 目录结构

```tree
├─public // 全局静态文件，供 html 使用，如 favicon.ico
└─src
    ├─assets // 供 vite 使用
    |  ├─fonts
    │  ├─i18n
    |  ├─icon
    │  ├─img
    │  └─themes
    ├─components // 通用组件
    ├─hooks
    ├─http
    ├─mock
    ├─router
    ├─screens
    │  ├─layout
    │  └─pages
    └─store
```

### 组件

-   `/src/components` 只存放独立通用组件，他们的状态由自己维护，应当编写为纯函数，**不允许依赖 redux store**
-   页面单独拆分的组件放到对应 pages 目录，允许依赖 redux store
-   组件对外只暴露 `index.ts/tsx`
-   禁止以不明意义的缩写为变量名

可以添加以下代码片段到 vscode 中，输入`rrc`生成一个组件：

```json
{
    "cpmponent": {
        "prefix": "rrc",
        "body": [
            "import classNames from 'classnames';",
            "import React, { HTMLAttributes } from 'react';",
            "import './style.less';",
            "$0",
            "export type I$1Props = HTMLAttributes<HTMLElement>;",
            "$0",
            "const $1: React.FC<I$1Props> = ({ className, ...resetProps}) => {",
            "\treturn (",
            "\t\t<div className={classNames( '$2', className )} {...resetProps}>",
            "\t\t.$3",
            "\t\t</div>",
            "\t);",
            "};",
            "$0",
            "export default $1;"
        ],
        "description": "a tsx component"
    }
}
```

### redux

**将 react 仅仅作为 view 层使用，复杂逻辑以及请求等全都交给 reducer**

-   尽量避免在组件内部维护大量 state, 只允许少量 view 相关 state 存在
-   reducer 必须为纯函数, 绝对禁止 reducer 依赖外部变量
-   action creator 依赖的变量尽量直接从 store state 获取，不要先让 react 拿到后再传给 redux。同理，尽量不要在 react 的同一个事件里多次 diapatch 多个 action，应该在一个顶层 action creator 里 dispatch 其他的 action
-   单元测试

### 样式

-   使用 less 作为预处理器
-   如非必要，禁止使用 style 行内样式
-   使用 BEM 命名，如：`.article`， `.article_button`， `.article_button--primary`
-   禁止使用 less 连字符拼接类名，但允许拼接伪类或伪元素，如：

    ```less
    .acticle {
        // 👎
        &_button {
        }

        // 👍
        .acticle_button::after {
        }

        // 👍
        &:hover {
        }
    }
    ```

### git

#### commit

格式：`<type>(<scope>): <subject>`

**type(必须)**

-   feat：新功能
-   fix/to：修复 bug
    -   fix：产生 diff 并修复此问题。适合于一次提交直接修复问题
    -   to：只产生 diff 不修复此问题。适合于多次提交。最终修复问题提交时使用fix
-   docs：文档
-   style：格式（不影响代码运行的变动）
-   refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
-   test：单元测试
-   chore：构建过程或辅助工具的变动
-   revert：回滚到上一个版本
-   merge：代码合并

**scope(可选)**

本次提交的影响范围，如某个组件、页面或者 hook 等

**subject(必须)**

对本次 commit 目的的简短描述，不超过50个字符，结尾不加句号或其他标点符号

#### merge

-   pull 的时候使用 rebase
-   新功能及 bug 在新分支提交，完成后发起 mr
-   保证 master 分支正常运行

### mock

mock 的接口为实际接口最前加一级路由：/mock/

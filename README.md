# Pro-React-NextJS

> [Professional React &amp; Next.js](https://github.com/ByteGrad/Professional-React-and-Next.js-Course)

## 00.example-vit-app

使用 Vit 创建的一个简单的 React 应用程序。

- 官网：<https://cn.vitejs.dev>

### 安装

```sh
npm create vite@latest
```

### React 基础

1. 用<></>来代替 div，但是这样就不能加 class 了，而且不会在页面结构渲染出来，只是一个占位符
2. class 是关键字，应该使用 className 代替
3. 遵循组件化的思想，将页面拆分成多个组件，每个组件只负责自己的功能，然后再组合起来
4. React 组件名称的首字母必须大写
5. 组件书写规范

```jsx
// 有两种书写格式：
// 1. 函数式组件，也叫无状态组件
// 一般在单独的文件中定义时使用
export default function App() {
  return (
    <div className="App">
    <h1>Hello World</h1>
  );
}
```

```jsx
// 2. 箭头函数式组件，其他情况下使用
const App = () => {
  return (
    <div className="App">
    <h1>Hello World</h1>
  );
}
export default App;
```

6.绑定事件

`Button.jsx`:

```jsx
export default function Button() {
  // 1. 通过 onClick 属性绑定事件
  // ()=>{} 就是一个匿名函数，当点击按钮时，就会执行这个函数
  // return <button onClick={()=>{}}></button>

  // 如果只是简单处理，直接在 onClick 中写函数体即可
  // return <button onClick={()=>{console.log('点击了按钮')}}></button>

  // 复杂处理就要单独定义一个函数，然后在 onClick 中调用
  // 2. 事件处理函数的命名规范：handle+事件名
  const handleClick = () => {
    console.log("点击了按钮1");
    console.log("点击了按钮2");
  };

  return <button onClick={handleClick}></button>;

  // 注意：onClick 后面不要加括号，否则会立即执行
}
```

7.props 传递数据

在 App.jsx 中：

```jsx
import Button from './Button';
export default function App() {
  return (
    <div className="App">
      <Button text="按钮1" /> {/* 传递数据 */}
  )
}
```

在 Button.jsx 中：

```jsx
export default function Button(props) {
  // {text: "按钮1"}，props 是一个对象，里面存储了所有传递过来的数据
  console.log(props);

  // 使用 props 中的数据
  // return <button>{props.text}</button>
  // 如果传递的数据比较多，可以使用解构赋值
  const { text } = props;
  return <button>{text}</button>;
}
```

甚至可以直接解构赋值：

```jsx
export default function Button({ text }) {
  return <button>{text}</button>;
}
```

8.使用 React hooks

```jsx
import { useState } from "react"; // 引入 useState
export default function Button() {
  // 1. 定义一个状态
  // useState() 接收一个参数，就是状态的初始值
  // 返回一个数组，第一个元素是状态，第二个元素是一个函数，用来修改状态
  const [count, setCount] = useState(0); // count 是状态，setCount 是修改状态的函数

  // 2. 使用状态
  return (
    // 点击 button 时，修改状态
    <button onClick={() => setCount((count) => count + 1)}> {count} </button>
  );
}
```

为什么使用 hook？

React 组件在更新状态时，会重新渲染，如果状态发生变化，就会重新渲染，如果状态没有发生变化，也会重新渲染，这样会影响性能。
使用 hook 可以避免这个问题。

9.useEffect

前面 useSate 是用来定义状态的，而 useEffect 是用来处理副作用的。

useEffect 是一个函数，用来处理副作用，比如：发送网络请求、操作 DOM 等。

> 格式：useEffect(函数, [依赖的状态])

- useEffect 接收一个函数作为参数，这个函数就是用来处理副作用的。
  - 函数中可以写任何代码，比如：发送网络请求、操作 DOM 等。
  - 函数中可以返回一个函数，这个函数就是用来清除副作用的。
- useEffect 的第二个参数是一个数组，用来指定依赖的状态，当依赖的状态发生变化时，就会重新执行 useEffect 中的函数。
  - 数组为空表示该组件只运行一次
  - 不写第二个参数，表示每次状态发生变化时，都会重新执行 useEffect 中的函数。
  - [state]，表示指定依赖的状态，当依赖的状态发生变化时，就会重新执行 useEffect 中的函数。

```jsx
import { useState, useEffect } from "react";
export default function Button() {
  const [count, setCount] = useState(0);
  // 1. 定义一个副作用
  useEffect(() => {
    console.log("副作用");
    // 2. 返回一个函数，用来清除副作用
    return () => {
      console.log("清除副作用"); // 当组件卸载时，就会执行这个函数
    };
  }, [count]); // 依赖的状态发生变化时，就会重新执行 useEffect 中的函数
  return (
    <button onClick={() => setCount((count) => count + 1)}> {count} </button>
  );
}
```

10.React 中的基础 JS

- 为什么返回内容要用小括号包裹？
  - 因为 JSX 语法中，只能有一个根元素，如果有多个元素，就需要用小括号包裹。
- 字符串拼接

```jsx
// 使用 + 号拼接
const age = 18;
const str1 = "年龄：" + age; // 年龄：18
// 【推荐】使用模板字符串拼接
const str2 = `年龄：${age}`; // 年龄：18
```

- 简单的条件渲染

```jsx
// 1. if 语句
const value = 5;

if (value > 3) {
  return <span>大于3</span>;
}

return <span>{value}</span>;
```

不推荐上面这么写.

```jsx
// 推荐使用三元运算符，且只有一个return
const value = 5;
return <span>{value>3 ? '大于3' : value}</span>

// 还有简写的形式，如果条件成立，就会返回后面的内容，
// 前面 false，都不执行后面，称为短路
retrun <span>{value>3 && '大于3'}</span> // 大于3
```

- 短路&&
  - 如果前面的表达式为 true，就会返回后面的内容，如果前面的表达式为 false，就会返回前面的表达式。
  - 一般用来做条件渲染。
  - 如果前面的表达式为 false，就不会执行后面的表达式，这样可以提高性能。
- 短路||
  - 如果前面的表达式为 true，就会返回前面的表达式，如果前面的表达式为 false，就会返回后面的内容。
  - 一般用来设置默认值。
  - 如果前面的表达式为 true，就不会执行后面的表达式，这样可以提高性能。

> 注意：假值有以下 6 个： null、 undefined、 NaN、 false、 0、 ''(空字符串)

```jsx
function add(a, b) {
  // 真值短路
  // 短路或 || 经常用来设置函数参数的默认值
  a = a || 0;
  b = b || 0;
  console.log(a + b);
}

add(); // 0
add(1); // 1
add(1, 2); // 3
add(100, 200); // 300
```

- 数组操作
  - map()：遍历数组，返回一个新的数组，新数组中的元素是回调函数的返回值。
  - forEach()：遍历数组，没有返回值。
  - filter()：遍历数组，返回一个新的数组，新数组中的元素是回调函数中返回 true 的元素。
  - find()：遍历数组，返回第一个满足条件的元素，如果没有满足条件的元素，就返回 undefined。
  - some()：遍历数组，返回一个布尔值，只要有一个元素满足条件，就返回 true，否则返回 false。
  - every()：遍历数组，返回一个布尔值，只有所有元素都满足条件，才返回 true，否则返回 false。

```jsx
const arr = [1, 2, 3, 4, 5];
// 1. map()
const newArr = arr.map((item) => {
  return item * 2; // 返回一个新的数组，新数组中的元素是回调函数的返回值
});
console.log(newArr); // [2, 4, 6, 8, 10]
console.log(arr); // [1, 2, 3, 4, 5]
// 2. forEach()
arr.forEach((item) => {
  console.log(item); // 1 2 3 4 5
});
// 3. filter()
const newArr2 = arr.filter((item) => {
  return item > 3; // 返回一个新的数组，新数组中的元素是回调函数中返回 true 的元素
});

const newArr3 = [arr, 6];
console.log(newArr3); // [Array(5), 6]

const newArr4 = [...arr, 6]; // 展开运算符,也称解构赋值
console.log(newArr4); // [1, 2, 3, 4, 5, 6]
```

11.React 中的基础 CSS

`Count.css`: 此时的样式是全局的，可能影响到其他组件。
若要局部样式，可以修改名称为：`Count.module.css`

```css
.count {
  color: red;
}
```

`Count.jsx`:

```jsx
import style from './Count.module.css'; // 引入局部样式

exprot default function Count() {
  // reutrn <span className="count">0</span>
  return <span className={style.count}>0</span> // 使用局部样式
}
```

但其实上面写法也不推荐，React 推荐使用 Tailwind CSS，一个基于原子类的 CSS 框架。

将在后面项目中介绍使用

## 01.fancy-counter

- React hook
  - useState, useEffect 简单使用
  - 以 use 开头的函数被称为 Hook
- 项目整体结构分解组件化
- 嵌套组件
  - props 传递数据：
- 父子组件
  - 父组件向子组件传递数据
- radix-ui

## 02.word-analytics

### 受控组件和非受控组件

在 HTML 中，表单元素如 `<input>`，`<textarea>` 和 `<select>` 表单元素通常保持自己的状态，并根据用户输入进行更新。而在 React 中，可变状态一般保存在组件的 state(状态) 属性中，并且只能通过 `setState()` 更新。

我们可以通过使 React 的 `state` 成为 “单一数据源原则” 来结合这两个形式。然后渲染表单的 React 组件也可以控制在用户输入之后的行为。

这种形式，其值由 React 控制的输入表单元素称为“**受控组件**”。

那么相反的，值并不由 React 进行控制，该组件自己输入，减少等等，该元素成为**非受控组件**。

> - 受控组件：数据由 React 控制( state )
> - 非受控组件：数据由 DOM 控制

### `<textarea>`

`<textarea>` 组件可以渲染一个多行文本输入框

- 可以是非受控组件，使用 `defaultValue` 参数传递数据
- 可以是受控组件，使用 `value` 参数传递数据，必须同时传递一个 `onChange` 处理函数，用于更新传递的值
- 一个文本框在其生命周期内无法在受控和非受控之间切换，不能同时既是受控组件又是非受控组件

### 统计字数

```js
// 汉字算两个字符，其他都算一个字符
export const countWords = (text) => {
  var cn = 0;
  if (text.match(/[\u4e00-\u9fa5]/g) != null) {
    cn = text.match(/[\u4e00-\u9fa5]/g).length;
  }
  var total = cn + text.length;
  return { total, cn };
};
```

## 03.basics-nextjs

### 安装 Nextjs

```sh
npx create-next-app@latest
```

### 目录结构

```txt
basics-nextjs
│  .eslintrc.json
│  .gitignore
│  next-env.d.ts
│  next.config.mjs
│  package-lock.json
│  package.json
│  postcss.config.mjs
│  README.md
│  tailwind.config.ts
│  tsconfig.json
│
├─app
│      favicon.ico
│      globals.css
│      layout.tsx
│      page.tsx
│
└─public
        next.svg
        vercel.svg
```

结构说明：

- app: 存放全局样式和布局组件
  - `page.tsx`是页面组件
  - `layout.tsx`是布局组件，一些可以共用的组件，比如：导航栏、页脚等。
  - `page.tsx`中的`<Layout>`标签就是布局组件，可以将`<Layout>`标签中的内容放到`layout.tsx`中的`{children}`中。
  - `globals.css`是全局样式，可以在里面定义一些全局样式，比如：`body`、`a`等。
- public: 存放静态资源，比如图片、字体等
- components: 存放公共组件
- styles: 存放样式文件，比如：`index.module.css`，`about.module.css`
- utils: 存放工具函数
- lib: 存放第三方库，比如：`axios`
- types: 存放类型定义文件，比如：`index.d.ts`

### 路由分类

- 动态路由：`/posts/[id].tsx`
  - `[]`中的内容是动态的，比如：`[id]`，就表示 id 是动态的，可以是任意值。
  - `/posts/[...id]`, `...`表示可以有多个参数，比如：`[...id]`，就表示 id 可以是多个参数，比如：`1/2/3`，就表示 id 是 1、2、3。
- 分组路由：`/(auth)/...`
  - `()`中的内容是分组的，比如：`(auth)`，就表示 auth 是分组的，可以是任意值。
- 并行路由：可以根据不同用户角色显示不同内容
  - `/@admin/...`
  - `/@user/...`
- 拦截路由：允许在当前布局中从应用程序的另一部分加载路由，当您想在不切换到其他上下文的情况下显示路由的内容时使用
  - (.) to match segments on the same level
  - (..) to match segments one level above
  - (..)(..) to match segments two levels above
  - (...) to match segments from the root app directory

### 渲染分类

- SSR(Server-side Rendering)：服务端渲染，又称动态渲染，首屏直出，SEO 友好
  - 需要导出一个名为 getServerSideProps 的异步函数。服务器将在每次请求时调用此函数
  - 每次请求时都会生成页面 HTML
- CSR(Client-side Rendering)：客户端渲染，又称静态渲染，首屏不直出，不 SEO 友好
  - 仅在客户端渲染，首屏不直出，不 SEO 友好
  - 通过`useEffect`来获取数据，然后渲染页面
  - 通过`useRouter`来获取路由对象，然后通过`router.query`来获取路由参数
- SSG(Static Site Generation)：静态网站生成，又称预渲染，首屏直出，SEO 友好
  - 需要导出一个名为 getStaticProps 的异步函数。服务器将在构建时调用此函数
  - 仅在构建时(`next build`)生成 HTML
- ISR(Incremental Static Regeneration)：增量静态再生，又称增量预渲染，首屏直出，SEO 友好
  - 需要导出一个名为 getStaticProps 的异步函数。服务器将在构建时调用此函数
  - 通过`revalidate`参数来设置多久重新生成页面，单位秒
  - 仅在构建时生成 HTML，然后在每次请求时，如果页面过期，就会重新生成 HTML，然后返回给客户端。
  - 如果页面没有过期，就会直接返回缓存的 HTML，不会重新生成 HTML。
  - 如果页面过期，但是有多个请求，只会有一个请求重新生成 HTML，其他请求会等待，直到重新生成 HTML 完成，然后再返回给客户端。

SSG 无数据：

```jsx
// 不需要获取预处理数据，在nextjs构建时就生成HTML页面
function About() {
  return <div>About</div>;
}

export default About;
```

SSG 有数据：

```jsx
export default function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
```

ISR

```jsx
// 就是在SSG的基础上，增加了revalidate参数，用来设置多久重新生成页面，单位秒
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default Blog;
```

### 数据库操作

> 使用 Neon Postgres 和 drizzle-orm

1.安装依赖：

```sh
npm i drizzle-orm @neondatabase/serverless
# -D 表示只在Dev环境安装
npm i -D drizzle-kit
# 管理环境变量
npm i dotenv
```

注意：可能出现的问题

```txt
$ npm i drizzle-orm @neondatabase/serverless
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error
npm error While resolving: 03.basics-nextjs@0.1.0
npm error Found: react@18.3.1
npm error node_modules/react
npm error   peer react@"^18.2.0" from next@14.2.5
npm error   node_modules/next
npm error     next@"14.2.5" from the root project
npm error   peer react@"^18.3.1" from react-dom@18.3.1
npm error   node_modules/react-dom
npm error     peer react-dom@"^18.2.0" from next@14.2.5
npm error     node_modules/next
npm error       next@"14.2.5" from the root project
npm error     react-dom@"^18" from the root project
npm error   2 more (styled-jsx, the root project)
npm error
npm error Could not resolve dependency:
npm error drizzle-orm@"*" from the root project
npm error
npm error Conflicting peer dependency: react@18.2.0
npm error node_modules/react
npm error   peer react@"18.2.0" from react-native@0.74.3
npm error   node_modules/react-native
npm error     peer react-native@">0.73.0" from @op-engineering/op-sqlite@6.2.11
npm error     node_modules/@op-engineering/op-sqlite
npm error       peerOptional @op-engineering/op-sqlite@">=2" from drizzle-orm@0.32.0
npm error       node_modules/drizzle-orm
npm error       peerOptional @op-engineering/op-sqlite@">=2" from drizzle-orm@0.32.0
npm error       node_modules/drizzle-orm
npm error         drizzle-orm@"*" from the root project
npm error       node_modules/drizzle-orm
npm error         drizzle-orm@"*" from the root project
npm error         drizzle-orm@"*" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
```

解决方法：

```sh
# 更新npm
npm update --save
npm update --save-dev
```

2.配置环境变量

在根目录下创建`.env`文件，然后添加如下内容：

```txt
DATABASE_URL=postgres://postgres:123456@localhost:5432/postgres
```

3.创建数据库表
`schema.ts`:

```ts
export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});
```

4.配置 drizzle
`drizzle.config.ts`

```ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

5.生成数据库表

```sh
# 生成DB表操作语句
npx drizzle-kit generate --config ./server/drizzle.config.ts
# 迁移
npx drizzle-kit migrate --config ./server/drizzle.config.ts
# 推送
npx drizzle-kit push --config ./server/drizzle.config.ts
```

6.使用数据库

```ts
import { db } from "./db";
import { InsertUser, usersTable } from "./schema";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}
```

7.使用页面查看数据表

> 需要再开一个终端执行，不可关闭

```ts
npx drizzle-kit studio --config ./server/drizzle.config.ts
```

Drizzle Studio is up and running on https://local.drizzle.studio

### Tailwind CSS

Tailwind CSS 的工作原理是扫描所有 HTML 文件、JavaScript 组件以及任何 模板中的 CSS 类（class）名，然后生成相应的样式代码并写入 到一个静态 CSS 文件中。

他快速、灵活、可靠，没有运行时负担

1.安装：

```sh
# NextJS 自带，无需安装
npm install -D tailwindcss
```

2.配置文件：

```js
/** @type {import('tailwindcss').Config} */
// 配置文件中添加所有模板文件的路径。
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3.将加载 Tailwind 的指令添加到 CSS 文件中

在你的主 CSS 文件中通过 @tailwind 指令添加每一个 Tailwind 功能模块。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4.开启 Tailwind CLI 构建

```sh
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

5.安装 shadcn-ui

```sh
npx shadcn-ui@latest init
```

```sh
# 添加一个按钮测试
npx shadcn-ui@latest add button
```

## 04.nextjs-auth-v5

### useTransition

`useTransition` 是一个帮助你在不阻塞 UI 的情况下更新状态的 React Hook。

```jsx
const [isPending, startTransition] = useTransition();
```

使用：
在组件顶层调用 useTransition，将某些状态更新标记为 transition。

```jsx
import { useTransition } from "react";

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  // ……
}
```

useTransition 返回一个由两个元素组成的数组：

- isPending，告诉你是否存在待处理的 transition。
- startTransition 函数，你可以使用此方法将状态更新标记为 transition

### prisma

> quickstart: https://www.prisma.io/docs/getting-started/quickstart 1.安装：

```sh
npm install prisma --save-dev
npm i @prisma/client
```

2.初始化：

```sh
npx prisma init
```

3.编写模型：

```tsx
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

4.生成模型：

```sh
npx prisma generate
```

5.连接数据库：

```sh
npx prisma db push
```

> 注意：该操作会覆盖数据库，慎用！

6.使用：

### Auth.js

> https://authjs.dev
> 前面已经安装 prisma ,这里需要安装对应的依赖

安装依赖：

```sh
npm install @auth/prisma-adapter
```

```sh
# hash 密码
npm i bcrypt
# 安装类型声明
npm i @types/bcrypt -D
#########################
# 也可以使用 bcryptjs
npm i bcryptjs
# 安装类型声明
npm i @types/bcryptjs -D
```

### 中间件

中间件允许您在请求完成之前运行代码。然后根据传入的请求，可以通过重写、重定向、修改请求或响应标头或直接响应来修改响应。

中间件函数可以执行以下操作：

- 身份验证和授权：在授予对特定页面或 API 路由的访问权限之前，确保用户身份并检查会话 Cookie。
- 服务器端重定向：根据特定条件（例如，区域设置、用户角色）在服务器级别重定向用户。
- 路径重写：通过基于请求属性动态重写 API 路由或页面的路径，支持 A/B 测试、功能卷展栏或遗留路径。
- 机器人检测：通过检测和阻止机器人流量来保护您的资源。
- 日志记录和分析：在页面或 API 处理之前，捕获并分析请求数据以获取见解。
- 功能标记：动态启用或禁用功能，以实现无缝的功能推出或测试。

中间件文件

```ts
// 根目录下创建 middleware.ts
import { auth } from "@/auth";

export default auth((req) => {
  // req.auth
});

// Optionally, don't invoke Middleware on some paths
// 规则匹配上的路径，中间件不会被调用
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### !和!!的区别

- ! 是逻辑非运算符，用于将一个值转换为布尔值，如果值为 true，则返回 false，如果值为 false，则返回 true。
  - 可以将变量转换为布尔值
  - null、undefined、0、NaN、''、false 会被转换为 false，其他值都为 true。
- !! 是双重逻辑非运算符，用于将一个值转换为布尔值，如果值为 true，则返回 true，如果值为 false，则返回 false。
  - 常用来判断一个值是否为空，如果值为空，则返回 false，否则返回 true。

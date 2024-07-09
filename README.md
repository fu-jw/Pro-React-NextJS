# Pro-React-NextJS

>[Professional React &amp; Next.js](https://github.com/ByteGrad/Professional-React-and-Next.js-Course)

## 00.example-vit-app

使用Vit创建的一个简单的React应用程序。

- 官网：<https://cn.vitejs.dev>

### 安装

```sh
npm create vite@latest
```

### React 基础

1. 用<></>来代替div，但是这样就不能加class了，而且不会在页面结构渲染出来，只是一个占位符
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
    console.log('点击了按钮1');
    console.log('点击了按钮2');
  }

  return <button onClick={handleClick}></button>

  // 注意：onClick 后面不要加括号，否则会立即执行
}
```

7.props 传递数据

在App.jsx中：

```jsx
import Button from './Button';
export default function App() {
  return (
    <div className="App">
      <Button text="按钮1" /> {/* 传递数据 */}
  )
}
```

在Button.jsx中：

```jsx
export default function Button(props) {
  // {text: "按钮1"}，props 是一个对象，里面存储了所有传递过来的数据
  console.log(props); 

  // 使用 props 中的数据 
  // return <button>{props.text}</button> 
  // 如果传递的数据比较多，可以使用解构赋值
  const {text} = props;
  return <button>{text}</button> 
}
```

甚至可以直接解构赋值：

```jsx
export default function Button({text}) {
  return <button>{text}</button> 
}
```

8.使用React hooks

```jsx
import {useState} from 'react'; // 引入 useState
export default function Button() {
  // 1. 定义一个状态
  // useState() 接收一个参数，就是状态的初始值
  // 返回一个数组，第一个元素是状态，第二个元素是一个函数，用来修改状态
  const [count, setCount] = useState(0); // count 是状态，setCount 是修改状态的函数
  
  // 2. 使用状态
  return (
     // 点击 button 时，修改状态
    <button onClick={() => setCount((count) => count + 1)}> {count} </button>
  )
}
```

为什么使用hook？
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
  - [state]，可以指定依赖的状态，当依赖的状态发生变化时，就会重新执行 useEffect 中的函数。

```jsx
import {useState, useEffect} from 'react';
export default function Button() {
  const [count, setCount] = useState(0);
  // 1. 定义一个副作用
  useEffect(() => {
    console.log('副作用');
    // 2. 返回一个函数，用来清除副作用
    return () => {
      console.log('清除副作用'); // 当组件卸载时，就会执行这个函数
    }
  }, [count]); // 依赖的状态发生变化时，就会重新执行 useEffect 中的函数
  return (
    <button onClick={() => setCount((count) => count + 1)}> {count} </button>
  )
}
```

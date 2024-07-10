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
  - [state]，表示指定依赖的状态，当依赖的状态发生变化时，就会重新执行 useEffect 中的函数。

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

10.React中的基础JS

- 为什么返回内容要用小括号包裹？
  - 因为 JSX 语法中，只能有一个根元素，如果有多个元素，就需要用小括号包裹。
- 字符串拼接

```jsx
// 使用 + 号拼接
const age = 18;
const str1 = '年龄：' + age; // 年龄：18
// 【推荐】使用模板字符串拼接
const str2 = `年龄：${age}`; // 年龄：18
```

- 简单的条件渲染

```jsx
// 1. if 语句
const value = 5;

if (value>3) {
  return <span>大于3</span>
}

return <span>{value}</span>
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

>注意：假值有以下6个： null、 undefined、 NaN、 false、 0、 ''(空字符串)

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
})
console.log(newArr); // [2, 4, 6, 8, 10]
console.log(arr); // [1, 2, 3, 4, 5]
// 2. forEach()
arr.forEach((item) => {
  console.log(item); // 1 2 3 4 5
})
// 3. filter()
const newArr2 = arr.filter((item) => {
  return item > 3; // 返回一个新的数组，新数组中的元素是回调函数中返回 true 的元素
})

const newArr3 = [arr, 6]
console.log(newArr3); // [Array(5), 6]

const newArr4 = [...arr, 6] // 展开运算符,也称解构赋值
console.log(newArr4); // [1, 2, 3, 4, 5, 6]
```

11.React中的基础CSS

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

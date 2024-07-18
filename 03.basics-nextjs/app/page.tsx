// "use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  // 默认情况下，所有组件都在服务器端执行
  // 如下打印，只会在terminal出现，并不会在浏览器的控制台出现
  // 若想要在控制台，需要在首行添加："use client";
  // console.log("hello");

  return (
    <>
      <h1>Hello NextJS</h1>
      <Button className="">Click me</Button>
      <Button variant="secondary">Secondary</Button>
    </>
  );
}

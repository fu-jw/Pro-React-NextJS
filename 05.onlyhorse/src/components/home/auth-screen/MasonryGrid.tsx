"use client";

import Image from "next/image";
import { useState } from "react";

const MasonryGrid = () => {
  // 鼠标悬停时获取图片index
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  // 鼠标悬停的位置
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // 实现的效果：鼠标悬停在图片时，图片跟随鼠标进行局部放大
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (hoverIndex === index) {
      // react 是鼠标悬停时当前的 DOMRect对象，用于获取元素的大小及其相对于视口的位置
      const react = (e.target as HTMLDivElement).getBoundingClientRect();
      // 计算鼠标的位置
      // react.left：指当前对象的左边距；react.top：指当前对象的上边距
      // react.width，react.height 指当前元素的宽，高
      // event.clientX - react.left：指鼠标距离当前元素的左边的距离
      // x,y 值用于确定在 CSS 类中应用的 transform 属性的 translateX,translateY 值
      // 从而实现图片在水平和垂直方向上的局部移动。
      const x = ((e.clientX - react.left) / react.width) * 100;
      const y = ((e.clientY - react.top) / react.height) * 100;

      // 设置值
      setMousePosition({ x, y });
    }
  };
  return (
    <div className="p-5 sm:p-8">
      {/* [&>div:not(:first-child)]:mt-8的含义：除了first child以为所有的div 都设置margin-top为 32px */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-8">
        {/* 循环生成15个图片节点 */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-md"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            onMouseMove={(e) => handleMouseMove(e, i)}
          >
            {/* hover:scale-150 : 鼠标悬停放大1.5倍 */}
            {/* transition-transform duration-500 ease-in-out :过渡效果，持续时间，进、出过渡 */}
            <Image
              src={`/featured/featured${i + 1}.jpg`}
              className="cursor-pointer hover:scale-150 transition-transform duration-500 ease-in-out"
              alt="Featured Horse"
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;

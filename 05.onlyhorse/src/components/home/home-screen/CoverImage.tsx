import Image from "next/image";
import React from "react";

const CoverImage = () => {
  return (
    <div className="h-44 overflow-hidden relative">
      <Image
        src={"/featured/featured10.jpg"}
        alt="Horse Cover Image"
        className="h-full w-full object-cover select-none pointer-events-none"
        fill
      />

      {/* 添加模糊效果：从黑色到透明，from-slate-800 to-transparent */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

export default CoverImage;

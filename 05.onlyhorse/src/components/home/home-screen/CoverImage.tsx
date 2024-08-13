import prisma from "@/db/prisma";
import { Heart, Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";

const CoverImage = async ({ adminName }: { adminName: string }) => {
  const imageCount = await prisma.post.count({
    where: {
      mediaType: "image",
    },
  });

  const videoCount = await prisma.post.count({
    where: {
      mediaType: "video",
    },
  });

  // const totalLikes = await prisma.like.count();

  const totalLikes = await prisma.post.aggregate({
    _sum: {
      likes: true,
    },
  });

  // 格式化数字
  function formatNumber(num: number) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  return (
    <div className="h-44 overflow-hidden relative">
      {/* 背景图 */}
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

      {/* 相关内容 */}
      <div className="flex justify-between items-center absolute top-0 left-0 px-2 py-1 z-20 w-full">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-white">
            {/* 用户名 */}
            <p className="font-bold">{adminName}</p>

            {/* 统计区 */}
            <div className="flex gap-2 items-center">
              {/* 图片数 */}
              <div className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                <span className="text-sm font-bold">{imageCount}</span>
              </div>

              {/* 视频数 */}
              <span className="text-xs">•</span>
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                <span className="text-sm font-bold">{videoCount}</span>
              </div>

              {/* 点赞数 */}
              <span className="text-xs">•</span>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-bold">
                  {formatNumber(totalLikes._sum.likes || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;

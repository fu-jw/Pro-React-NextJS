import { ModeToggle } from "@/components/ModeToggle";
import HeroSection from "./HeroSection";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import TodaysHighlight from "./TodaysHighlight";
import RotatedText from "@/components/decorators/RotatedText";
import MasonryGrid from "./MasonryGrid";
import Features from "./Features";
import { Testimonials } from "./Testimonials";

const AuthScreen = () => {
  return (
    // 弹性布局，垂直方向
    <div className="flex flex-col">
      <HeroSection />

      <div className="mb-20 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Highlight 部分 */}
          <p className="text-3xl md:text-5xl tracking-tight mt-4 mb-8 font-semibold text-center">
            Today's{" "}
            <UnderlinedText className="underline-offset-8 md:underline-offset-[12px] decoration-wavy">
              Highlight
            </UnderlinedText>
            <span className="text-2xl md:text-4xl ml-1">👇</span>
          </p>

          {/* 今日 highlight 内容 */}
          <div className="flex flex-col gap-10 mt-10">
            <TodaysHighlight />

            {/* Meet the Stars of Our Farm */}
            <div className="mt-24">
              <p className="text-2xl md:text-5xl text-center tracking-tighter font-bold">
                Meet the <RotatedText>Stars</RotatedText> of Our Farm
              </p>
              {/* 照片区域 */}
              <MasonryGrid />
            </div>

            {/* Features */}
            <Features />
            {/* 滚动留言 */}
            <Testimonials />
            {/* 价格部分 */}

            {/* 团队部分 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;

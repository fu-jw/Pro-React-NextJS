const HeroSection = () => {
  return (
    <div className="flex h-screen w-full">
      
      {/* 首页左半部分 */}
      <div className="flex-1 flex overflow-hidden bg-[#00b0f0a6] 
        relative justify-center items-center z-10">
      
        <img src="/of-logo.svg" alt="Only Horse Logo"
          className="absolute -left-1/4 opacity-15 -bottom-52 lg:scale-150
          xl:scale-105 scale-[2] pointer-events-none select-none"
        />
      </div>

      {/* 首页右半部分 */}

      <div className="flex-1">

      </div>
    </div>
  );
};

export default HeroSection;

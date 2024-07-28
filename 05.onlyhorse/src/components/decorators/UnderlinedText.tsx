import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const UnderlinedText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string; // 为空，就是下面默认值
}) => {
  return (
    // 动态属性
    <span
      className={cn(
        "underline underline-offset-4 decoration-dashed decoration-sky-400",
        className
      )}
    >
      {children}
    </span>
  );
};

export default UnderlinedText;

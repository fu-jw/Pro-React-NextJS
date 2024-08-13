import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { centsToDollars, cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import ZoomedImage from "./ZoomedImage";
import { Product } from "@prisma/client";

// 推荐商品的详细信息
const SuggestedProduct = ({ product }: { product: Product }) => {
  return (
    <Card className="flex flex-col">
      {/* 卡头信息：商品名称和价格 */}
      <CardHeader className="px-2 flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-sm font-medium">
          <p className="w-28 text-ellipsis overflow-hidden text-nowrap">
            {product.name}
          </p>
        </CardTitle>

        <div>
          {/* 美元符号：$ */}
          <DollarSign className="inline h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{centsToDollars(product.price)}</span>
        </div>
      </CardHeader>

      {/* 卡内容：商品图片和下单按钮 */}
      <CardContent className="flex flex-col flex-1 gap-2 p-2">
        <ZoomedImage imgSrc={product.image} className="h-44" />
        <div className="flex justify-center mt-auto">
          <Link
            href={`/merch/${product.id}`}
            className={cn("w-full", buttonVariants({ size: "sm" }))}
          >
            Buy
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export default SuggestedProduct;

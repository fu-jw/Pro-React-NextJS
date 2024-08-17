import { Suspense } from "react";
// import { useSearchParams } from "react-router-dom";
import BaseLayout from "@/components/BaseLayout";
import PurchaseSummary from "./PurchaseSummary";

const Page = () => {
  return (
    <BaseLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <PurchaseSummary />
      </Suspense>
    </BaseLayout>
  );
};
export default Page;

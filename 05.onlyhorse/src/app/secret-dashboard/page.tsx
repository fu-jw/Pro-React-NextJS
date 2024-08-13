import BaseLayout from "@/components/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./content/ContentTab";
import StoreTab from "./store/StoreTab";
import AnalyticsTab from "./analytics/AnalyticsTab";

const Page = () => {
  return (
    <BaseLayout renderRightPanel={false}>
      {/* Tab 标签页 */}
      <Tabs
        defaultValue="content"
        className="w-full mx-auto my-10 px-2 md:px-10"
      >
        {/* tab 标签页头部显示内容 */}
        <TabsList className="flex flex-col md:flex-row w-full md:w-3/4 mx-auto h-auto">
          <TabsTrigger value="content" className="w-full md:w-auto">
            Content
          </TabsTrigger>
          <TabsTrigger value="store" className="w-full md:w-auto">
            Store
          </TabsTrigger>
          <TabsTrigger value="analytics" className="w-full md:w-auto">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* tab 对应的标签内容 */}
        <TabsContent value="content">
          <ContentTab />
        </TabsContent>
        <TabsContent value="store">
          <StoreTab />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </BaseLayout>
  );
};
export default Page;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChipSearchContent from "@/components/tabs/chip-search-content";
// import FindAlternativesContent from "@/components/tabs/find-alternatives-content"; // Removed
import AskAiContent from "@/components/tabs/ask-ai-content-new";
import CategoryQueryContent from "@/components/tabs/category-query-content";
import { Search, Lightbulb, LayoutGrid } from "lucide-react"; // Removed Replace

export default function HomePage() {
  return (
    // Add padding-bottom to account for the fixed TabsList
    // Height of TabsList is h-16 (64px), pb-20 gives some buffer (80px)
    <div className="w-full pb-20">
      <Tabs defaultValue="chip-search" className="w-full">
        {/* TabsList is now fixed to the bottom, styled as a bottom navigation bar */}
        <TabsList className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-stretch border-t bg-background shadow-top">
          <TabsTrigger
            value="chip-search"
            className="flex-1 flex flex-col items-center justify-center gap-1 p-2 text-xs sm:text-sm data-[state=active]:text-accent data-[state=active]:bg-accent/5 focus:outline-none rounded-none transition-none"
          >
            <Search className="h-5 w-5" /> 精准搜索
          </TabsTrigger>
          {/* <TabsTrigger
            value="find-alternatives"
            className="flex-1 flex flex-col items-center justify-center gap-1 p-2 text-xs sm:text-sm data-[state=active]:text-accent data-[state=active]:bg-accent/5 focus:outline-none rounded-none transition-none"
          >
            <Replace className="h-5 w-5" /> 查找替代品
          </TabsTrigger> */}
          <TabsTrigger
            value="category-query"
            className="flex-1 flex flex-col items-center justify-center gap-1 p-2 text-xs sm:text-sm data-[state=active]:text-accent data-[state=active]:bg-accent/5 focus:outline-none rounded-none transition-none"
          >
            <LayoutGrid className="h-5 w-5" /> 分类查询
          </TabsTrigger>
          <TabsTrigger
            value="ask-ai"
            className="flex-1 flex flex-col items-center justify-center gap-1 p-2 text-xs sm:text-sm data-[state=active]:text-accent data-[state=active]:bg-accent/5 focus:outline-none rounded-none transition-none"
          >
            <Lightbulb className="h-5 w-5" /> 询问 AI
          </TabsTrigger>
        </TabsList>

        {/* TabsContent remains here, content will be rendered above the fixed TabsList */}
        <TabsContent value="chip-search">
          <ChipSearchContent />
        </TabsContent>
        {/* <TabsContent value="find-alternatives">
          <FindAlternativesContent />
        </TabsContent> */}
        <TabsContent value="ask-ai">
          <AskAiContent />
        </TabsContent>
        <TabsContent value="category-query">
          <CategoryQueryContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

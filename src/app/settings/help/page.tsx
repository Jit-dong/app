"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, FileQuestion } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function HelpPage() {
  const { toast } = useToast();

  const handleSubmitFeedback = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic form data handling, in a real app this would go to a backend
    const formData = new FormData(event.currentTarget);
    const feedback = formData.get('feedback_message');

    if (feedback && feedback.toString().trim().length > 0) {
      toast({
        title: "反馈已提交",
        description: "感谢您的宝贵意见，我们会尽快处理！",
      });
      event.currentTarget.reset(); // Reset form
    } else {
       toast({
        title: "提交失败",
        description: "反馈内容不能为空。",
        variant: "destructive"
      });
    }
  };


  return (
    <div className="space-y-6">
      <Link href="/settings" passHref legacyBehavior>
        <Button variant="outline" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回设置
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileQuestion className="h-6 w-6 text-accent" /> 常见问题 (FAQ)</CardTitle>
          <CardDescription>查找常见问题的解答。</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>如何使用 AI 问答功能？</AccordionTrigger>
              <AccordionContent>
                在“询问 AI”标签页，您可以直接输入您的问题，例如芯片选型需求、参数对比、技术术语解释等。您也可以上传 Datasheet 让 AI 帮您解读。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>精准搜索结果不准确怎么办？</AccordionTrigger>
              <AccordionContent>
                尝试使用更精确的关键词，或调整筛选条件。如果问题仍然存在，欢迎您通过下方的反馈渠道告知我们，帮助我们改进。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>如何清除应用缓存？</AccordionTrigger>
              <AccordionContent>
                在“个人信息设置”页面的“通知与隐私”部分，您可以找到“清除缓存”选项。点击后确认即可。
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>如何联系技术支持？</AccordionTrigger>
              <AccordionContent>
                您可以通过本页面的“意见反馈”功能联系我们，或者发送邮件至 support@aispec.example.com。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6 text-accent" /> 意见反馈</CardTitle>
          <CardDescription>我们非常重视您的意见和建议，请在此处告诉我们。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <Label htmlFor="feedback_message">您的反馈内容：</Label>
              <Textarea
                id="feedback_message"
                name="feedback_message"
                placeholder="请详细描述您遇到的问题或您的宝贵建议..."
                rows={5}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">提交反馈</Button>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}

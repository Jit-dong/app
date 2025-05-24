"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { chipSuggestion, type ChipSuggestionOutput } from "@/ai/flows/chip-suggestion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Lightbulb } from "lucide-react";

const FormSchema = z.object({
  description: z.string().min(10, {
    message: "描述必须至少包含 10 个字符。",
  }),
});

export default function ChipSuggestionForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ChipSuggestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      setResult(null);
      try {
        const suggestion = await chipSuggestion(data);
        setResult(suggestion);
        toast({
          title: "建议已就绪",
          description: "AI 已提供芯片建议。",
        });
      } catch (error) {
        console.error("获取建议时出错:", error);
        toast({
          title: "错误",
          description: "获取建议失败。请重试。",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述您的芯片需求</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="例如：我需要一个低功耗微控制器，具有 Wi-Fi 功能，至少 2 个 ADC 通道和 SPI 接口，用于电池供电的传感器。"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? <LoadingSpinner size={16} label="正在获取建议..." /> : <> <Lightbulb className="mr-2 h-4 w-4" /> 获取建议</>}
          </Button>
        </form>
      </Form>

      {isPending && !result && (
        <div className="flex justify-center py-8">
          <LoadingSpinner label="AI 正在思考..." />
        </div>
      )}

      {result && (
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              AI 建议
            </CardTitle>
            <CardDescription>根据您的需求，这是一个可能的元件：</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-primary-foreground bg-primary/80 px-3 py-1 rounded-t-md">建议元件：</h3>
              <p className="p-3 border rounded-b-md bg-card">{result.recommendation}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-secondary-foreground bg-secondary px-3 py-1 rounded-t-md">理由：</h3>
              <p className="p-3 border rounded-b-md bg-card whitespace-pre-wrap">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

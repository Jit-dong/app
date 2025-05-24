"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { suggestComponentFromBOM, type SuggestComponentFromBOMOutput } from "@/ai/flows/chip-suggestion-bom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { FileText, Lightbulb } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["text/csv", "application/vnd.ms-excel", "text/plain", "application/octet-stream"]; // Adjust as needed

const FormSchema = z.object({
  bomFile: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, "BOM 文件是必需的。")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `最大文件大小为 5MB。`)
    .refine(
      (files) => ALLOWED_FILE_TYPES.includes(files?.[0]?.type) || files?.[0]?.name.endsWith('.csv') || files?.[0]?.name.endsWith('.txt'),
      "只允许 .csv, .txt 文件，或常见的 BOM MIME 类型。"
    ),
  description: z.string().optional(),
});

export default function BomSuggestionForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SuggestComponentFromBOMOutput | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });

  const convertFileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      setResult(null);
      if (!data.bomFile || data.bomFile.length === 0) {
        toast({ title: "错误", description: "请选择一个 BOM 文件。", variant: "destructive" });
        return;
      }

      try {
        const bomFile = data.bomFile[0];
        const bomDataUri = await convertFileToDataUri(bomFile);
        
        const suggestion = await suggestComponentFromBOM({
          bomDataUri,
          description: data.description || "",
        });
        setResult(suggestion);
        toast({
          title: "建议已就绪",
          description: "AI 已根据您的 BOM 提供了元件建议。",
        });
      } catch (error) {
        console.error("获取 BOM 建议时出错:", error);
        toast({
          title: "错误",
          description: "获取建议失败。请确保文件有效并重试。",
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
            name="bomFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>上传物料清单 (BOM)</FormLabel>
                <FormControl>
                   <Input 
                    type="file" 
                    accept=".csv,.txt,text/csv,text/plain,application/vnd.ms-excel"
                    onChange={(e) => field.onChange(e.target.files)}
                    ref={fileInputRef}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </FormControl>
                <FormDescription>
                  上传您的 BOM 文件（.csv, .txt）。最大 5MB。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>附加要求（可选）</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="例如：寻找 U1 的直接替代品，或更具成本效益的替代方案。"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? <LoadingSpinner size={16} label="正在处理 BOM..." /> : <> <FileText className="mr-2 h-4 w-4" /> 从 BOM 获取建议</>}
          </Button>
        </form>
      </Form>

      {isPending && !result && (
        <div className="flex justify-center py-8">
          <LoadingSpinner label="AI 正在分析您的 BOM..." />
        </div>
      )}

      {result && (
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              AI 建议 (来自 BOM)
            </CardTitle>
            <CardDescription>根据您的 BOM 和要求，这是一个可能的元件：</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-primary-foreground bg-primary/80 px-3 py-1 rounded-t-md">建议元件：</h3>
              <p className="p-3 border rounded-b-md bg-card">{result.suggestedComponent}</p>
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

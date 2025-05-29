import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/layout/logo";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Link href="/settings" passHref legacyBehavior>
        <Button variant="outline" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回设置
        </Button>
      </Link>
      <Card>
        <CardHeader className="items-center text-center">
          <Logo className="h-16 w-16 mb-4" width={64} height={64} />
          <CardTitle className="text-2xl">Junction Magic</CardTitle>
          <CardDescription>版本 V2.5.1 (Build 20250510)</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-center space-y-4">
          <p>Junction Magic是一款由 AI 驱动的电子元件规格查询和智能建议工具，旨在帮助工程师和采购人员快速找到所需元件，获取专业建议，优化设计和采购流程。</p>
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} 芯智科技有限公司. 保留所有权利.</p>
            <p>
              <Link href="#" className="text-accent hover:underline">官方网站</Link> | <Link href="/settings/privacy-policy" className="text-accent hover:underline">隐私政策</Link> | <Link href="/settings/user-agreement" className="text-accent hover:underline">用户协议</Link>
            </p>
          </div>
          <div>
            <h4 className="font-semibold">联系我们：</h4>
            <p>邮箱：contact@aispec.example.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


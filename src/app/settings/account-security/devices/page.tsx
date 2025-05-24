import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginDevicesPage() {
  return (
    <div className="space-y-6">
      <Link href="/settings" passHref legacyBehavior>
        <Button variant="outline" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回设置
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>登录设备管理</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">此功能正在开发中。</p>
          <p className="mt-2">您可以在这里查看和管理您账户的登录设备。</p>
        </CardContent>
      </Card>
    </div>
  );
}

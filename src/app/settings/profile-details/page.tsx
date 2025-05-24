import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProfileDetailsPage() {
  return (
    <div className="space-y-6">
       <Link href="/settings" passHref legacyBehavior>
          <Button variant="outline" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回设置
          </Button>
        </Link>
      <Card>
        <CardHeader>
          <CardTitle>编辑个人资料</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">此功能正在开发中。</p>
          <p className="mt-2">您可以在这里修改您的昵称、性别和地区信息。</p>
        </CardContent>
      </Card>
    </div>
  );
}

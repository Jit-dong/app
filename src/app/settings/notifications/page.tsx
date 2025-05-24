"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SettingsItem from "@/components/settings/settings-item";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function NotificationSettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [aiNotifications, setAiNotifications] = useState(true);
  const [systemAnnouncements, setSystemAnnouncements] = useState(true);
  const [recommendationsUpdates, setRecommendationsUpdates] = useState(false);

  return (
    <div className="space-y-6">
      <Link href="/settings" passHref legacyBehavior>
        <Button variant="outline" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回设置
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>消息通知设置</CardTitle>
          <CardDescription>管理您希望如何接收来自芯智的通知。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
            <SettingsItem 
                label="接收推送通知"
                actionSlot={<Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />}
            />
            <SettingsItem 
                label="AI助手通知"
                value="小智对话的新消息、任务完成等"
                actionSlot={<Switch checked={aiNotifications} onCheckedChange={setAiNotifications} disabled={!pushEnabled} />}
            />
            <SettingsItem 
                label="系统公告"
                actionSlot={<Switch checked={systemAnnouncements} onCheckedChange={setSystemAnnouncements} disabled={!pushEnabled} />}
            />
            <SettingsItem 
                label="个性化推荐更新"
                actionSlot={<Switch checked={recommendationsUpdates} onCheckedChange={setRecommendationsUpdates} disabled={!pushEnabled} />}
                isLast
            />
        </CardContent>
      </Card>
    </div>
  );
}

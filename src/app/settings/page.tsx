"use client";

import React, { useState } from 'react';
import SettingsSection from '@/components/settings/settings-section';
import SettingsItem from '@/components/settings/settings-item';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  UserCircle,
  Smile,
  BadgeInfo,
  Users,
  MapPin,
  Smartphone,
  Mail,
  Lock,
  ShieldCheck,
  KeyRound,
  Building2,
  Briefcase,
  Factory,
  Tags,
  BellRing,
  FileText,
  Trash2,
  Info,
  HelpCircle,
  LogOut,
  Repeat
} from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleClearCache = () => {
    toast({
      title: "缓存已清除",
      description: "应用缓存已成功清除 (23.5MB)。", // Example size
    });
  };

  const handleLogout = () => {
    toast({
      title: "已退出登录",
      description: "您已成功退出当前账号。",
    });
    // Add actual logout logic here, e.g., redirect to login page
  };
  
  const handleSwitchAccount = () => {
    toast({
      title: "切换账号",
      description: "此功能即将推出。",
    });
  }

  return (
    <div className="pb-16 space-y-6"> {/* Added pb-16 for bottom buttons */}
      {/* 第一部分：基础信息 */}
      <SettingsSection title="基础信息">
        <SettingsItem
          avatarSrc="https://picsum.photos/seed/avatar/80/80"
          avatarFallback="小"
          label="头像"
          onItemClick={() => toast({ title: "修改头像", description: "功能开发中..."})}
          clickable
        />
        <SettingsItem
          icon={Smile}
          label="昵称"
          value="小智控"
          href="/settings/profile-details"
          clickable
        />
        <SettingsItem icon={BadgeInfo} label="用户ID" value="AISPEC_123ABC789" />
        <SettingsItem
          icon={Users}
          label="性别"
          value="男"
          href="/settings/profile-details"
          clickable
        />
        <SettingsItem
          icon={MapPin}
          label="地区"
          value="广东 深圳"
          href="/settings/profile-details"
          isLast
          clickable
        />
      </SettingsSection>

      {/* 第二部分：账户安全 */}
      <SettingsSection title="账户安全">
        <SettingsItem
          icon={Smartphone}
          label="绑定手机"
          value="186****8888"
          href="/settings/account-security/phone"
          clickable
        />
        <SettingsItem
          icon={Mail}
          label="绑定邮箱"
          value="去绑定"
          href="/settings/account-security/email"
          clickable
        />
        <SettingsItem
          icon={Lock}
          label="修改密码"
          href="/settings/account-security/password"
          clickable
        />
        <SettingsItem
          icon={ShieldCheck}
          label="登录设备管理"
          href="/settings/account-security/devices"
          clickable
        />
        <SettingsItem
          icon={KeyRound}
          label="两步验证"
          actionSlot={
            <Switch
              checked={is2FAEnabled}
              onCheckedChange={setIs2FAEnabled}
              aria-label="两步验证开关"
            />
          }
          isLast
        />
      </SettingsSection>

      {/* 第三部分：专业信息 */}
      <SettingsSection title="专业信息">
        <SettingsItem
          icon={Building2}
          label="我的公司"
          value="芯智科技有限公司"
          href="/settings/professional-info"
          clickable
        />
        <SettingsItem
          icon={Briefcase}
          label="我的职位"
          value="硬件研发工程师"
          href="/settings/professional-info"
          clickable
        />
        <SettingsItem
          icon={Factory}
          label="所属行业"
          value="汽车电子"
          href="/settings/professional-info"
          clickable
        />
        <SettingsItem
          icon={Tags}
          label="关注领域"
          value="电源管理, MCU, IoT"
          href="/settings/professional-info"
          isLast
          clickable
        />
      </SettingsSection>

      {/* 第四部分：通知与隐私 */}
      <SettingsSection title="通知与隐私">
        <SettingsItem
          icon={BellRing}
          label="消息通知设置"
          href="/settings/notifications"
          clickable
        />
        <SettingsItem
          icon={FileText}
          label="隐私政策"
          href="/settings/privacy-policy"
          clickable
        />
        <SettingsItem
          icon={FileText}
          label="用户协议"
          href="/settings/user-agreement"
          clickable
        />
        <SettingsItem
          icon={Trash2}
          label="清除缓存"
          value="23.5MB"
          onItemClick={() => document.getElementById('clearCacheTrigger')?.click()}
          isLast
          clickable
        />
         <AlertDialog>
          <AlertDialogTrigger asChild>
            <button id="clearCacheTrigger" className="hidden">清除缓存</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定清除应用缓存吗？</AlertDialogTitle>
              <AlertDialogDescription>
                此操作将清除本地缓存数据，但不会影响您的账户信息。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearCache}>确定</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SettingsSection>

      {/* 第五部分：关于与支持 */}
      <SettingsSection title="关于与支持">
        <SettingsItem
          icon={Info}
          label="关于芯智"
          value="版本 V2.5.1"
          href="/settings/about"
          clickable
        />
        <SettingsItem
          icon={HelpCircle}
          label="帮助与反馈"
          href="/settings/help"
          isLast
          clickable
        />
      </SettingsSection>

      {/* 底部操作按钮 */}
      <div className="space-y-3 pt-6">
        <Button variant="outline" className="w-full" onClick={handleSwitchAccount}>
          <Repeat className="mr-2 h-4 w-4" /> 切换账号
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
             <LogOut className="mr-2 h-4 w-4" /> 退出登录
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>您确定要退出当前账号吗？</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>确定</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

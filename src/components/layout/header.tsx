import Link from 'next/link';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { User, QrCode } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-transparent backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          {/* 右侧按钮 - 绝对定位 */}
          <div className="absolute right-0 flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="扫码功能">
              <QrCode className="h-5 w-5" />
            </Button>
            <Link href="/settings" passHref legacyBehavior>
              <Button variant="ghost" size="icon" aria-label="个人信息设置">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* 居中的Logo和文字 */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="h-12 w-12 group-hover:opacity-90 transition-opacity" width={48} height={48} />
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
                Junction Magic
              </span>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-950/20 dark:to-blue-950/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🔍 芯片智能查询
                </span>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}


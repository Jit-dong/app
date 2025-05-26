import Link from 'next/link';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { User, QrCode } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors" />
            <div>
              <span className="text-xl font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
                Junction Magic
              </span>

            </div>
          </Link>
          <div className="flex items-center gap-2">
            {/* Navigation items can be added here if needed outside of tabs */}
            <Button variant="ghost" size="icon" aria-label="扫码功能">
              <QrCode className="h-5 w-5" />
            </Button>
            <Link href="/settings" passHref legacyBehavior>
              <Button variant="ghost" size="icon" aria-label="个人信息设置">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}


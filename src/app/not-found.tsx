import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4"> {/* Adjust min-height based on header/footer */}
      <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-3">404 - 页面未找到</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        哎呀！您要查找的页面不存在。它可能已被移动或删除。
      </p>
      <Link href="/" passHref legacyBehavior>
        <Button size="lg">
          返回首页
        </Button>
      </Link>
    </div>
  )
}

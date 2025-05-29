import Image from 'next/image';
import type { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

export default function Logo({ className, width = 24, height = 24, ...props }: LogoProps) {
  return (
    <div className={className} {...props}>
      <Image
        src="/brands/logo.png"
        alt="芯智标志"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}

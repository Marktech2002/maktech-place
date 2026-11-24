'use client';

import Image, { type StaticImageData } from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

import Button from '~/src/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/src/components/ui/Dialog';
import { cn } from '~/src/util';

export default function ArticleImagePreview({
  image,
  alt,
  children,
  className,
  style,
}: {
  image: StaticImageData;
  alt: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        aria-label={`Enlarge image. ${alt}`}
        className={cn('block cursor-zoom-in', className)}
        style={style}
      >
        {children}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-max max-w-[calc(100vw-2rem)] gap-2">
        <DialogTitle className="sr-only">Image preview</DialogTitle>
        <DialogClose asChild>
          <Button className="justify-self-end" size="sm">
            Close
          </Button>
        </DialogClose>
        <Image
          src={image}
          alt={alt}
          unoptimized
          className="h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-full justify-self-center rounded-md object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}

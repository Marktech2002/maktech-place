'use client';

import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { motion, useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';

import Button from '~/src/components/ui/Button';

const initialPosition = { x: 0, y: 0, rotate: -4, scale: 1 };
const spring = { type: 'spring', duration: 1.2, bounce: 0.25 } as const;

export default function DraggableStickers({
  articles,
}: {
  articles: { title: string; context: string; href: string }[];
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const wasDragged = useRef(false);
  const controls = useAnimationControls();
  const [canReset, setCanReset] = useState(false);

  return (
    <div className="min-w-0">
      <div
        ref={constraintsRef}
        className="relative mx-auto flex min-h-32 w-full max-w-lg flex-wrap items-center justify-center gap-4"
      >
        {articles.map(({ title, context, href }) => (
          <motion.div
            key={href}
            className="w-fit max-w-[90%] cursor-grab touch-none"
            initial={initialPosition}
            animate={controls}
            variants={{ home: initialPosition }}
            drag
            dragConstraints={constraintsRef}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 10, power: 0.4 }}
            transition={spring}
            whileDrag={{ scale: 1.08, cursor: 'grabbing', rotate: 0 }}
            onPointerDown={() => {
              wasDragged.current = false;
            }}
            onDragStart={() => {
              wasDragged.current = true;
            }}
            onDragEnd={() => setCanReset(true)}
          >
            <Link
              href={href}
              draggable={false}
              className="group border-panel-border bg-panel-background text-text-primary hover:border-theme-2 focus-visible:outline-theme-1 cursor-inherit shadow-card relative flex w-max flex-col gap-1.5 rounded-[1.25rem] border px-2.5 py-2 pl-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              onClick={(event) => {
                if (event.detail > 0 && wasDragged.current) event.preventDefault();
              }}
            >
              <span
                aria-hidden="true"
                className="bg-theme-2 absolute inset-y-2 left-1.5 w-0.5 rounded-full"
              />
              <span className="text-text-secondary flex items-center justify-between gap-1 text-[9px] leading-none">
                {context}
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="group-hover:text-text-primary size-3 shrink-0"
                />
              </span>
              <span className="font-archivo text-xs leading-tight whitespace-nowrap">{title}</span>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 flex justify-center">
        <Button
          disabled={!canReset}
          onClick={() => {
            void controls.start('home');
            setCanReset(false);
          }}
        >
          Reset position
        </Button>
      </div>
    </div>
  );
}

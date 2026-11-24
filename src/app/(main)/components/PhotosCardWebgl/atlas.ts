// Must match the order of `photos` in ../photos.ts. Rebuild with `pnpm atlas:photos` after editing.
// Paths are relative to /public.
export const photosAtlas = {
  src: '/home/photos-atlas.webp',
  cellWidth: 960,
  cellHeight: 960,
  columns: 4,
  cells: [
    'home/photos/camera-roll-13.jpg',
    'home/photos/camera-roll-12.jpg',
    'home/photos/camera-roll-11.png',
    'home/photos/camera-roll-10.jpg',
    'home/photos/camera-roll-09.jpg',
    'home/photos/camera-roll-08.jpg',
    'home/photos/camera-roll-07.jpg',
    'home/photos/camera-roll-06.png',
    'home/photos/camera-roll-05.png',
    'home/photos/camera-roll-04.jpg',
    'home/photos/camera-roll-03.jpg',
    'home/photos/camera-roll-02.jpg',
    'home/photos/camera-roll-01.jpg',
  ],
} as const;

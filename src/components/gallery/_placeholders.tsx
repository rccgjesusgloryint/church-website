// components/gallery/_placeholders.ts
export const shimmerDataURL = (w = 16, h = 12) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#e5e7eb" offset="20%"/>
          <stop stop-color="#f3f4f6" offset="50%"/>
          <stop stop-color="#e5e7eb" offset="70%"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#e5e7eb"/>
      <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/>
    </svg>`
  ).toString("base64")}`;

export function ImageSkeleton({ aspect = "4/3" }: { aspect?: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-md">
      <div className="absolute inset-0 bg-muted animate-pulse" />
      <div className="w-full" style={{ aspectRatio: aspect }} />
    </div>
  );
}

interface EventCardProps {
  image: string;
}

export function ImageCard({ image }: EventCardProps) {
  return (
    <div className="flex items-center justify-center">
      <img
        src={image || "/placeholder.svg"}
        alt={"title"}
        className="w-1/2 h-1/2 object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

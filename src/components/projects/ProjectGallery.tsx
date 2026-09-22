import Image from "next/image";

export default function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {images.map((src) => (
        <div key={src} className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}

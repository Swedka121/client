import Image from "next/image";

function ImageResourceServer({ path }: { path: string }) {
  return (
    <div className="relative w-[1fr] h-200 rounded-lg bg-gray-500 flex items-center justify-center overflow-hidden hover:scale-[0.95] transition-all">
      <Image
        src={path}
        alt="image"
        width={800}
        height={800}
        className="absolute h-full w-auto md:object-cover object-contain"
      ></Image>
    </div>
  );
}

export default ImageResourceServer;

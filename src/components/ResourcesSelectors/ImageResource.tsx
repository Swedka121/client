import Image from "next/image";

function ImageResource({ path, click }: { path: string; click: () => void }) {
  return (
    <div
      className="w-[1fr] h-60 rounded-lg bg-gray-500 flex items-center justify-center overflow-hidden hover:scale-[0.95] transition-all"
      onClick={click}
    >
      <Image
        src={path}
        alt="image"
        width={800}
        height={800}
        className="h-full w-auto"
      ></Image>
    </div>
  );
}

export default ImageResource;

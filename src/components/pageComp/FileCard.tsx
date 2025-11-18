import Button from "@components/ui/Button";
import Card, { CardTitle } from "@components/ui/Card";
import { useStorageStore } from "@stores/storageStore";
import { FileIcon, ImageIcon, TrashIcon } from "lucide-react";

function FileCard({
  path,
  size,
  mime,
}: {
  path: string;
  size: number;
  mime: string;
}) {
  const IMAGES = ["png", "jpeg", "webp"];

  const storageStore = useStorageStore();

  if (IMAGES.includes(mime)) {
    return (
      <Card className="w-full flex flex-col justify-center gap-3 items-center">
        <h3 className="text-[0.7rem] flex flex-row gap-2 items-center">
          <ImageIcon />
          {path}
        </h3>
        <div className="w-60 h-60 flex items-center justify-center overflow-hidden rounded-lg">
          <img
            className="w-full object-contain rounded-lg"
            src={`http://localhost:4565/public/${path}`}
          ></img>
        </div>
        <div className="flex flex-row justify-start gap-5 w-full">
          <p>{Number(size / 1000 / 1000).toFixed(2)}Mb</p>
          <p>{mime}</p>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            storageStore.deleteFile(path);
          }}
        >
          Delete
        </Button>
      </Card>
    );
  }
  return (
    <Card className="w-full flex flex-col justify-center gap-3 items-center">
      <h3 className="text-[0.7rem] flex flex-row gap-2 items-center">
        <FileIcon />
        {path}
      </h3>
      <div className="w-60 h-60 flex items-center justify-center">
        <img
          className="w-full object-contain rounded-lg"
          src="./assets/document_undefined.jpg"
        ></img>
      </div>
      <div className="flex flex-row justify-start gap-5 w-full">
        <p>{Number(size / 1000 / 1000).toFixed(2)}Mb</p>
        <p>{mime}</p>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          storageStore.deleteFile(path);
        }}
      >
        Delete
      </Button>
    </Card>
  );
}

export default FileCard;

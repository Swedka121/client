"use client";
import { useEffect, useState, useTransition } from "react";
import { useGalleryStore } from "../../../../../stores/galleryStore";
import { Spinner } from "@/components/ui/spinner";
import { Plus, TrashIcon } from "lucide-react";
import AreYouSureToDeleteDialog from "@/components/ui/areYouSureToDeleteDialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageSelector from "@/components/ResourcesSelectors/ImageSelector";
import ImageResource from "@/components/ResourcesSelectors/ImageResource";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";

function Page() {
  const galleryCollection = useGalleryStore();
  const transition = useTransition();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    transition[1](async () => {
      await galleryCollection.load();
    });
  }, []);
  return (
    <section className="w-full h-full p-8">
      <Dialog open={isDialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogTrigger className="w-full h-15">
          <Button className="w-full h-15">
            Додати колекцію
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Оберіть назву нової колекції</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Назва колекції"
            onChange={async (ev) => {
              setInputValue(ev.target.value);
            }}
            value={inputValue}
          ></Input>
          <DialogClose>
            <Button
              className="w-full"
              onClick={() => {
                galleryCollection.addNewCollection(inputValue);
                setInputValue("");
              }}
            >
              Додати
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      {transition[0] ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-[10px] mt-[20px]">
          {Array.from(galleryCollection.collections.entries()).map((el) => (
            <div className="w-full h-max" key={el[0]}>
              <div className="w-full flex justify-between items-center h-auto">
                <h3 className="w-full text-start h-max text-[2rem]">{el[0]}</h3>
                <div className="flex flex-row gap-[10px]">
                  {el[0] == "Основна" ? (
                    <Button className="size-8" disabled={true}>
                      <TrashIcon />
                    </Button>
                  ) : (
                    <AreYouSureToDeleteDialog
                      callback={() => {
                        galleryCollection.deleteCollection(el[0]);
                      }}
                    >
                      <DialogTrigger>
                        <Button className="size-8">
                          <TrashIcon />
                        </Button>
                      </DialogTrigger>
                    </AreYouSureToDeleteDialog>
                  )}
                </div>
              </div>
              <div className="w-full h-auto grid grid-cols-6 auto-rows-fr gap-4">
                <ImageSelector
                  callbackSuccess={(resourceId) => {
                    galleryCollection.addImageToCollection(el[0], resourceId);
                  }}
                  callbackFailed={() => {}}
                >
                  <DialogTrigger>
                    <div className="w-[1fr] h-60 border-black border-[3px] rounded-lg flex items-center justify-center hover:scale-[0.95] transition-all">
                      <Plus />
                    </div>
                  </DialogTrigger>
                </ImageSelector>
                {el[1].map((el2) => (
                  <ImageResource
                    path={
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                      "/resources/" +
                      el2._id
                    }
                    click={() => {
                      galleryCollection.deleteImageFromCollection(
                        el[0],
                        el2._id
                      );
                    }}
                    key={el2._id}
                  />
                ))}
              </div>
              <div className="w-full h-[1px] bg-gray-500 mt-[10px]"></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Page;

"use client";

import { ReactNode, useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useResourcesStore } from "../../../stores/resourcesStore";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import Link from "next/link";
import FileResource from "./FileResource";
import { Input } from "../ui/input";

function FileSelector({
  children,
  callbackSuccess,
  callbackFailed,
}: {
  children: ReactNode;
  callbackSuccess: (resourceId: string) => void;
  callbackFailed: () => void;
}) {
  const resourcesStore = useResourcesStore();
  const transition = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterId, setFilterId] = useState("");
  useEffect(() => {
    transition[1](() => {
      resourcesStore.load();
    });
  }, []);
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          if (!isSuccess) callbackFailed();
        }

        setIsDialogOpen(open);
      }}
      open={isDialogOpen}
    >
      {children}

      <DialogContent className="sm:max-w-[90vw] w-[90vw] h-[90vh] flex flex-col items-start">
        <DialogHeader className="h-max">Оберіть файл</DialogHeader>

        {transition[0] ? (
          <Spinner />
        ) : (
          <>
            <Input
              className="w-full h-10"
              placeholder="Пошук по Id"
              value={filterId}
              onChange={(ev) => {
                setFilterId(ev.target.value);
              }}
            ></Input>
            {resourcesStore.getFiltredFiles(filterId).length > 0 ? (
              <div className="w-full h-max overflow-y-scroll">
                <div className="grid grid-cols-6 auto-rows-fr gap-4 h-auto p-4">
                  {resourcesStore.getFiltredFiles(filterId).map((el) => (
                    <FileResource
                      key={el._id}
                      real_name={el.real_name}
                      author={el.author}
                      click={() => {
                        setIsSuccess(true);
                        callbackSuccess(el._id);
                        setIsDialogOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col gap-[20px]">
                <p>Ви ще не додали файли до ресурсів!</p>
                <Link href="/profile/admin/resources">
                  <Button>Додати файл</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FileSelector;

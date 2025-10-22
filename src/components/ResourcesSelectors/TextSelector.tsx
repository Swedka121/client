"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import z from "zod";

function TextSelector({
  children,
  callbackSuccess,
  callbackFailed,
}: {
  children: ReactNode;
  callbackSuccess: (data: string) => void;
  callbackFailed: () => void;
}) {
  const [data, setData] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onClickHandle() {
    const stringSchema = z.string().min(3).max(800);

    try {
      stringSchema.parse(data);
      callbackSuccess(data);
      setIsSuccess(true);
      setIsDialogOpen(false);
    } catch {}
  }
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

      <DialogContent className="flex flex-col items-start gap-2">
        <DialogHeader className="h-max">
          Введіть текст який хочете додати
        </DialogHeader>
        <Input
          className="w-full h-10"
          placeholder="Введіть текст"
          onChange={(ev) => setData(ev.target.value)}
          value={data}
        ></Input>
        <Button className="w-full h-10" onClick={onClickHandle}>
          Додати
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default TextSelector;

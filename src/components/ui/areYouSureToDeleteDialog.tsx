import { ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "./dialog";
import { Button } from "./button";

function AreYouSureToDeleteDialog({
  children,
  callback,
}: {
  children: ReactNode;
  callback: () => void;
}) {
  return (
    <Dialog>
      {children}
      <DialogContent>
        <p>Ви впевнені, що дійсно хочете видалити це?</p>
        <DialogFooter className="flex mt-10">
          <DialogClose>
            <Button variant={"outline"}>Скасувати</Button>
          </DialogClose>
          <DialogClose>
            <Button
              variant={"destructive"}
              onClick={() => {
                callback();
              }}
            >
              Видалити
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AreYouSureToDeleteDialog;

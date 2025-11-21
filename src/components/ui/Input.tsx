import { Eye, EyeClosed } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassname?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className, labelClassname, type, ...rest }: InputProps,
    ref
  ) => {
    const [passType, setPassType] = useState(true);
    if (type == "password") {
      return (
        <div className="flex flex-col gap-1 h-max w-full">
          {label ? (
            <label className={"font-bold text-[1.5rem] " + labelClassname}>
              {label}
            </label>
          ) : null}
          <div
            className={
              "flex flex-row items-center justify-between " + className
            }
          >
            <input
              {...rest}
              ref={ref}
              className="p-3 border-2 border-(--secd-color) bg-(--white-main) text-(--black-main) rounded-lg text-[0.9rem] font-light w-7/9"
              type={passType ? "password" : "text"}
            ></input>
            <button
              className="h-full w-2/9 flex items-center justify-center bg-none border-none"
              type="button"
              onClick={() => {
                setPassType(!passType);
              }}
            >
              {passType ? (
                <Eye color="var(--static-white-main)" />
              ) : (
                <EyeClosed color="var(--static-white-main)" />
              )}
            </button>
          </div>

          {error ? (
            <p className="text-(--black-main) font-[0.5rem] font-regular bg-(--white-main) p-4 rounded-md border-1 border-(--main-color)">
              {error}
            </p>
          ) : null}
        </div>
      );
    } else
      return (
        <div className="flex flex-col gap-1 h-max w-full">
          {label ? (
            <label className={"font-bold text-[1.5rem] " + labelClassname}>
              {label}
            </label>
          ) : null}
          <input
            type={type}
            {...rest}
            ref={ref}
            className={
              "p-3 border-2 border-(--secd-color) bg-(--white-main) text-(--black-main) rounded-lg text-[0.9rem] font-light " +
              className
            }
          ></input>
          {error ? (
            <p className="text-(--black-main) font-[0.5rem] font-regular bg-(--white-main) p-4 rounded-md border-1 border-(--main-color)">
              {error}
            </p>
          ) : null}
        </div>
      );
  }
);

Input.displayName = "Input";

export default Input;

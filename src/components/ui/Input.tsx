import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassname?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, labelClassname, ...rest }: InputProps, ref) => {
    return (
      <div className="flex flex-col gap-1 h-max w-full">
        {label ? (
          <label className={"font-bold text-[1.5rem] " + labelClassname}>
            {label}
          </label>
        ) : null}
        <input
          {...rest}
          ref={ref}
          className={
            "p-3 border-2 border-(--secd-color) bg-(--white-main) text-(--black-main) rounded-lg text-[0.9rem] font-light " +
            className
          }
        ></input>
        {error ? (
          <p className="text-(--black-main) font-[0.5rem] font-light">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, disabled = false, ...args }: ButtonProps) {
  if (!disabled) {
    return (
      <button
        {...args}
        className={
          args.className +
          " p-4 w-10 text-(--static-white-main) bg-(--main-color) rounded-lg font-[Deco] font-medium hover:scale-[0.95] transition-all"
        }
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        {...args}
        className={
          args.className +
          " p-4 w-10 text-(--static-white-main) bg-gray-500 rounded-lg font-[Deco] font-medium hover:scale-[0.95] transition-all"
        }
      >
        {children}
      </button>
    );
  }
}

export default Button;

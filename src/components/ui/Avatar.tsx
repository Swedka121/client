import { HTMLProps } from "react";

interface DicProps extends HTMLProps<HTMLDivElement> {
  image: string;
}

function Avatar({ image, className, ...args }: DicProps) {
  return (
    <div
      className={
        "rounded-full overflow-hidden flex justify-center items-center " +
        className
      }
      {...args}
    >
      <img
        className="h-full w-auto object-cover"
        src={`${import.meta.env.VITE_SERVER_URL}/public/${image}`}
      ></img>
    </div>
  );
}

export default Avatar;

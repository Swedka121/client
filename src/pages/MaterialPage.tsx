import { ArrowLeft, FileIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { marked } from "marked";
import { useEffect } from "react";

function MaterialPage() {
  const router = useNavigate();
  const [params, setParams] = useSearchParams();

  const title = params.get("title");
  const data = params.get("data");

  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <section className="flex flex-col">
      <div className="w-full h-20 flex flex-row items-center pt-4 pb-4 ">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router(-1);
          }}
        />
      </div>
      <div className="w-full h-fit">
        <div className="w-full flex flex-row gap-5 items-center">
          <div className="h-15 w-15 bg-(--main-color) rounded-full flex items-center justify-center">
            <FileIcon color="var(--static-white-main)" />
          </div>
          <h2 className="text-[3rem] font-medium">{title}</h2>
        </div>
        <div className="markdown-container prose max-w-full text-(--black-main) mt-10">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(data),
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default MaterialPage;

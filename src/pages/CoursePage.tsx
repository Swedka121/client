import Button from "@components/ui/Button";
import Card from "@components/ui/Card";
import { useCourseStore } from "@stores/courseStore";
import { ArrowLeft, FileIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

function CoursePage() {
  const { id } = useParams();
  const courseStore = useCourseStore();
  const [page, setPage] = useState<"material" | "member">("material");
  const [in_, tr] = useTransition();
  const navigate = useNavigate();

  useEffect(() => {
    tr(async () => {
      await courseStore.loadDetailedCourse(Number(id));
      console.log(useCourseStore.getState());
    });
  }, []);

  if (in_) return <p>Loading...</p>;

  return (
    <section className="flex flex-col">
      <div className="w-full h-20 flex flex-row items-center pt-4 pb-4">
        <Link to="/app/main">
          <ArrowLeft />
        </Link>
        {courseStore.detailed_role == 1 ? (
          <div className="flex flex-row items-center gap-5 right-25 absolute">
            <p className="font-bold">Code: {courseStore.detailed_code}</p>
            <Link to={"/app/create_material"}>
              <Button className="w-75 ml-30">Create material</Button>
            </Link>
            <Button
              className="w-75"
              onClick={() => {
                courseStore.deleteCourse(Number(id));
                navigate("/app/main");
              }}
            >
              Delete course
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative w-full h-160 bg-gray-100">
          <div className="absolute left-[-5vw] w-[100vw] bg-black h-full overflow-hidden flex items-center">
            <img
              className="w-full"
              src={`http://localhost:4565/public/${courseStore.detailed_baner}`}
            ></img>
          </div>
        </div>
        <div className="w-full h-30 flex flex-row items-center gap-5">
          <img
            className="h-25 w-25 rounded-full"
            src={`http://localhost:4565/public/${courseStore.detailed_avatar}`}
          ></img>
          <h2 className="text-[1.6rem] font-bold">
            {courseStore.detailed_name}
          </h2>
        </div>
        {page == "material" ? (
          <div className="w-full h-fit flex flex-col gap-5">
            {courseStore.materials.map((el) => (
              <Card
                key={el.title}
                className="w-full flex flex-row items-center gap-5 text-[1.2rem] font-medium relative"
              >
                <Link
                  to={`/app/material?title=${el.title}&data=${encodeURIComponent(el.data)}`}
                  className="flex flex-row gap-5 w-7/9 items-center"
                >
                  <div className="h-15 w-15 bg-(--main-color) rounded-full flex items-center justify-center">
                    <FileIcon />
                  </div>
                  <h2>{el.title}</h2>
                </Link>
                {courseStore.detailed_role == 1 ? (
                  <Button
                    className="w-50 right-10 absolute z-2"
                    onClick={() => {
                      courseStore.deleteMaterial(el.id);
                    }}
                  >
                    Delete
                  </Button>
                ) : null}
              </Card>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
}

export default CoursePage;

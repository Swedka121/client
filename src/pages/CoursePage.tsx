import Avatar from "@components/ui/Avatar";
import Button from "@components/ui/Button";
import Card from "@components/ui/Card";
import { Skeleton, SkeletonBody } from "@components/ui/Skeleton";
import { replaceParam, useLanguagePack } from "@hooks/useLanguagePack";
import { useCourseStore } from "@stores/courseStore";
import { useLoadingStore } from "@stores/loadingStore";
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
  const languagePack = useLanguagePack();

  useEffect(() => {
    tr(async () => {
      await courseStore.loadDetailedCourse(Number(id));
    });
  }, []);

  return (
    <section className="flex flex-col">
      <div className="w-full h-20 flex flex-row items-center pt-4 pb-4">
        <Link to="/app/main">
          <ArrowLeft />
        </Link>
        {courseStore.detailed_role == 1 ? (
          <div className="flex flex-row items-center gap-5 right-25 absolute">
            <p className="font-bold">
              {replaceParam(
                1,
                languagePack.page_course_code,
                courseStore.detailed_code
              )}
            </p>
            <Link to={"/app/create_material"}>
              <Button className="w-75 ml-30">
                {languagePack.page_course_add_new}
              </Button>
            </Link>
            <Button
              className="w-75"
              onClick={() => {
                courseStore.deleteCourse(Number(id));
                navigate("/app/main");
              }}
            >
              {languagePack.page_course_delete_course}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative w-full h-160 bg-gray-100">
          <div className="absolute left-[-5vw] w-[100vw] bg-black h-full overflow-hidden flex items-center">
            <img
              className="w-full"
              src={`${import.meta.env.VITE_SERVER_URL}/public/${courseStore.detailed_baner}`}
            ></img>
          </div>
        </div>
        <div className="w-full h-30 flex flex-row items-center gap-5">
          <Avatar
            className="w-25 h-25"
            image={courseStore.detailed_avatar}
          ></Avatar>

          <h2 className="text-[1.6rem] font-bold">
            {courseStore.detailed_name}
          </h2>
        </div>

        <div className="w-full h-fit flex flex-col gap-5">
          {courseStore.materials.length == 0 ? (
            <div className="absolute left-0 w-[100vw] h-[50vh] flex justify-center items-center flex-col gap-5">
              <img
                className="rounded-md w-100 h-100"
                src="./assets/document_undefined.jpg"
              ></img>
              <h2 className="w-150 text-center font-bold text-[2rem]">
                {languagePack.opps_no_content}
              </h2>
            </div>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6].map((el) => (
                <SkeletonBody className="w-full h-fit" key={el}>
                  <Card className="w-full flex flex-row items-center gap-5 text-[1.2rem] font-medium relative">
                    <Skeleton className="w-15 h-15 rounded-full" />
                    <Skeleton className="w-100 h-5" />
                  </Card>
                </SkeletonBody>
              ))}
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
                      <FileIcon color="var(--static-white-main)" />
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
                      {languagePack.page_course_delete_material}
                    </Button>
                  ) : null}
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CoursePage;

import Animate from "@components/Animate";
import CourseCard, {
  CourseCardSkeleton,
} from "@components/pageComp/CourseCard";
import HeaderMain from "@components/pageComp/HeaderMain";
import Button from "@components/ui/Button";
import Card, { CardTitle } from "@components/ui/Card";
import { Skeleton, SkeletonBody } from "@components/ui/Skeleton";
import Tag from "@components/ui/Tag";
import { replaceParam, useLanguagePack } from "@hooks/useLanguagePack";
import { useCourseStore } from "@stores/courseStore";
import { useProfileStore } from "@stores/profileStore";
import { animate, ReactRef } from "animejs";
import { Plus } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router";

function MainPage() {
  const pack = useLanguagePack();
  const rootRef = useRef(null);

  const profileStore = useProfileStore();
  const courseStore = useCourseStore();
  const languagePack = useLanguagePack();

  return (
    <section className="flex flex-col">
      <HeaderMain />
      <div className="flex flex-row gap-5 items-center">
        <h1 className="text-[3rem] font-bold">
          {replaceParam(1, pack.page_home_title, profileStore.name)}
        </h1>
      </div>
      <div className="flex flex-row gap-2 flex-wrap w-full mt-10">
        <Link to={"/app/course_create"}>
          <Button className="w-fit">{languagePack.page_home_create_new}</Button>
        </Link>
        <Link to={"/app/connect_code"}>
          <Button className="w-fit">{languagePack.page_home_add_code}</Button>
        </Link>
      </div>
      <div className="flex flex-row gap-2 flex-wrap w-full mt-2">
        <Tag
          name={languagePack.page_home_filter_all}
          clickCallback={() => {
            courseStore.setSelectedRole("All");
          }}
          selected={courseStore.selectedRole == "All"}
        />
        <Tag
          name={languagePack.page_home_filter_teacher}
          clickCallback={() => {
            courseStore.setSelectedRole("Teacher");
          }}
          selected={courseStore.selectedRole == "Teacher"}
        />
        <Tag
          name={languagePack.page_home_filter_student}
          clickCallback={() => {
            courseStore.setSelectedRole("Student");
          }}
          selected={courseStore.selectedRole == "Student"}
        />
      </div>
      <Animate rootRef={rootRef}>
        <div
          ref={rootRef}
          className="grid grid-cols-2 4xl:grid-cols-6 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-3 grid-rows-auto w-full h-fit gap-4 mt-2"
        >
          {[1, 2, 3].map((el) => (
            <CourseCardSkeleton key={el} />
          ))}
          {courseStore.getFiltredCourses().length == 0 ? (
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
            courseStore
              .getFiltredCourses()
              .map((el) => <CourseCard key={el.id} {...el} />)
          )}
        </div>
      </Animate>
    </section>
  );
}

export default MainPage;

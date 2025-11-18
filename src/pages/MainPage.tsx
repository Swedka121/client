import Animate from "@components/Animate";
import CourseCard from "@components/pageComp/CourseCard";
import HeaderMain from "@components/pageComp/HeaderMain";
import Button from "@components/ui/Button";
import Card, { CardTitle } from "@components/ui/Card";
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
          <Button className="w-50">Create new</Button>
        </Link>
        <Link to={"/app/connect_code"}>
          <Button className="w-50">Add by code</Button>
        </Link>
      </div>
      <div className="flex flex-row gap-2 flex-wrap w-full mt-2">
        <Tag
          name="All"
          clickCallback={() => {
            courseStore.setSelectedRole("All");
          }}
          selected={courseStore.selectedRole == "All"}
        />
        <Tag
          name="Teacher"
          clickCallback={() => {
            courseStore.setSelectedRole("Teacher");
          }}
          selected={courseStore.selectedRole == "Teacher"}
        />
        <Tag
          name="Student"
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
          {courseStore.getFiltredCourses().length == 0 ? (
            <div className="w-full h-fit"></div>
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

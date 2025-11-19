import Card, { CardTitle } from "@components/ui/Card";
import Tag from "@components/ui/Tag";
import { replaceParam, useLanguagePack } from "@hooks/useLanguagePack";
import { Link } from "react-router";

function CourseCard({
  id,
  name,
  avatar,
  teacher_member,
  my_role,
}: {
  name: string;
  avatar: string;
  my_role: "Teacher" | "Student";
  id: number;
  teacher_member: { avatar: string; name: string };
}) {
  const languagePack = useLanguagePack();

  return (
    <Link to={`/app/course/${id}`}>
      <Card className="w-full h-full max-h-65">
        <CardTitle>
          <div className="w-16 h-16 overflow-hidden rounded-full">
            <img
              className="w-full object-cover"
              src={`https://apis.swedka121.com/eduquiz/public/${avatar}`}
            ></img>
          </div>
          <p className="w-3/5 text-[0.9rem]">{name}</p>
        </CardTitle>
        <div className="flex flex-row items-center gap-2 text-[0.8rem] font-regular mt-3">
          <Tag
            selected={false}
            name={replaceParam(
              1,
              languagePack.page_home_card_teacher_is,
              `@${teacher_member.name}`
            )}
            clickCallback={() => {
              console.log("clicked");
            }}
          ></Tag>
          <Tag
            selected={false}
            name={
              my_role == "Teacher"
                ? languagePack.page_home_card_my_role_teacher
                : languagePack.page_home_card_my_role_student
            }
            clickCallback={() => {
              console.log("clicked");
            }}
          ></Tag>
        </div>
      </Card>
    </Link>
  );
}

export default CourseCard;

import Card, { CardTitle } from "@components/ui/Card";
import Tag from "@components/ui/Tag";
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
            name={`Teacher @${teacher_member.name}`}
            clickCallback={() => {
              console.log("clicked");
            }}
          ></Tag>
          <Tag
            selected={false}
            name={`My role ${my_role}`}
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

import UserList from "@/components/AdminComp/UsersList";
import { Card, CardContent } from "@/components/ui/card";

function Page() {
  return (
    <Card className="w-1/2">
      <CardContent>
        <UserList />
      </CardContent>
    </Card>
  );
}

export default Page;

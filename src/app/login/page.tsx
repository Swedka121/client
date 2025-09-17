import LoginQueryMessageError from "@/components/LoginComp/LoginQueryMessageError";
import LoginQueryMessageSuccess from "@/components/LoginComp/LoginQueryMessageSuccess";
import StarterComp from "@/components/LoginComp/StarterComp";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";

function Page() {
  return (
    <Container>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Card className="w-2/6 h-2/3">
          <StarterComp />
          <LoginQueryMessageError />
          <LoginQueryMessageSuccess />
        </Card>
      </div>
    </Container>
  );
}

export default Page;

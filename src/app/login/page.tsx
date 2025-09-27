import LoginQueryMessageError from "@/components/LoginComp/LoginQueryMessageError";
import LoginQueryMessageSuccess from "@/components/LoginComp/LoginQueryMessageSuccess";
import StarterComp from "@/components/LoginComp/StarterComp";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Suspense } from "react";

function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  return (
    <Container>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Card className="w-2/6 h-2/3">
          <Suspense fallback={<p>...</p>}>
            <StarterComp searchParams={searchParams} />
            <LoginQueryMessageError searchParams={searchParams} />
            <LoginQueryMessageSuccess searchParams={searchParams} />
          </Suspense>
        </Card>
      </div>
    </Container>
  );
}

export default Page;

import Button from "@components/ui/Button";
import { Link } from "react-router";

function ErrorPage() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-24">
      <h1 className="text-[3rem]">Opps... some went wrong 🥲</h1>
      <Link to={"/"}>
        <Button className="w-90">To main page</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;

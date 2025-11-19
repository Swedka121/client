import Container from "@components/Container";
import Button from "@components/ui/Button";
import { useRefreshToken } from "@hooks/useRefreshToken";
import { useEffect, useState, useTransition } from "react";
import { Link } from "react-router";

function StartPage() {
  const { isAuthorized, logout } = useRefreshToken();
  const [inTr, transition] = useTransition();
  const [isAuthorizedState, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    transition(async () => {
      setIsAuthorized(await isAuthorized());
    });
  }, []);

  return (
    <Container>
      <div className="w-full h-[100vh] flex justify-center items-center flex-col">
        <img
          src="./assets/logo.svg"
          alt="logo"
          className="hover:scale-[0.9] transition-all h-50"
        ></img>
        {inTr ? (
          <p>Loading...</p>
        ) : isAuthorizedState ? (
          <>
            <Link to={"/app/main"} className="mt-20">
              <Button className="w-90">Start</Button>
            </Link>
          </>
        ) : (
          <Link to={"/login"} className="mt-20">
            <Button className="w-90">Login</Button>
          </Link>
        )}
      </div>
    </Container>
  );
}

export default StartPage;

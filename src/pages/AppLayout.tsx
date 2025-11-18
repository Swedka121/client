import Container from "@components/Container";
import { useRefreshToken } from "@hooks/useRefreshToken";
import { useCourseStore } from "@stores/courseStore";
import { useProfileStore } from "@stores/profileStore";
import { useStorageStore } from "@stores/storageStore";
import { useEffect, useState, useTransition } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router";

export function AppLayout() {
  const { isAuthorized } = useRefreshToken();
  const [inTr, transition] = useTransition();
  const [isAuthorizedState, setIsAuthorized] = useState<boolean>(false);
  const navigation = useNavigate();

  const profileStore = useProfileStore();
  const storageStore = useStorageStore();
  const courseStore = useCourseStore();

  useEffect(() => {
    transition(async () => {
      const authorized = await isAuthorized();
      setIsAuthorized(authorized);

      if (!authorized) navigation("/login");

      await profileStore.load();
      await storageStore.load();
      await courseStore.load();
    });
  }, []);

  return inTr ? (
    <p>Loading...</p>
  ) : (
    <Container>
      <div className="w-full h-full">
        <Outlet />
        <div className="h-20"></div>
      </div>
    </Container>
  );
}

import Container from "@components/Container";
import { useRefreshToken } from "@hooks/useRefreshToken";
import { useCourseStore } from "@stores/courseStore";
import { useLoadingStore } from "@stores/loadingStore";
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

      useLoadingStore.getState().setLoading(true);

      await profileStore.load();
      await storageStore.load();
      await courseStore.load();

      useLoadingStore.getState().setLoading(false);
    });
  }, []);

  return (
    <Container>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </Container>
  );
}

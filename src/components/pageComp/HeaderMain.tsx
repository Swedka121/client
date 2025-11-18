import { useLanguagePack } from "@hooks/useLanguagePack";
import { animate } from "animejs";
import { Home, Settings, User } from "lucide-react";
import { ReactElement, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Link, useNavigation } from "react-router";

function LinkID({
  link,
  text,
  icon,
  active,
}: {
  link: string;
  text: string;
  icon: ReactElement;
  active: boolean;
}) {
  return (
    <Link
      to={link}
      className={`flex flex-row gap-2 ${active ? "hover:text-(--secd-color) transition-all" : "text-(--main-color) cursor-default"}`}
    >
      {icon}
      {text}
    </Link>
  );
}

function HeaderMain() {
  const pack = useLanguagePack();
  const location = useLocation();

  return (
    <header className="w-full h-max flex flex-row pt-4 pb-4 justify-between items-center">
      <div className="w-15 h-15 overflow-hidden flex items-center justify-center">
        <img
          className="rounded-full w-30 h-30 object-cover"
          src="./assets/logo.png"
        ></img>
      </div>
      <div className="w-max flex flex-row gap-5">
        <LinkID
          icon={<Home />}
          text={pack.header_home_tab}
          link="/app/main"
          active={location.pathname != "/main"}
        />

        <LinkID
          icon={<User />}
          text={pack.header_profile_tab}
          link="/app/profile"
          active={location.pathname != "/profile"}
        />

        <LinkID
          icon={<Settings />}
          text={pack.header_settings_tab}
          link="/app/settings"
          active={location.pathname != "/settings"}
        />
      </div>
    </header>
  );
}

export default HeaderMain;

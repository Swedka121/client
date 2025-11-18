import HeaderMain from "@components/pageComp/HeaderMain";
import Button from "@components/ui/Button";
import { languagePack, modeDark } from "../app";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { Earth, Moon, Settings } from "lucide-react";
import { animate, createScope, ReactRef, Scope } from "animejs";
import { useLanguagePack } from "@hooks/useLanguagePack";

function Animation({
  children,
  rootRef,
}: {
  children: ReactNode;
  rootRef: ReactRef;
}) {
  useEffect(() => {
    let delay = 0;
    rootRef.current.childNodes.forEach((el) => {
      delay += 100;
      animate(el, {
        duration: 300,
        ease: "in",
        delay,
        scale: [{ from: 0.6, to: 1, duration: 300, ease: "inOut" }],
        y: [{ from: 50, to: 0, ease: "inOut", duration: 500 }],
        opacity: [{ from: 0, to: 1, ease: "inOut", duration: 300 }],
      });
    });
  }, []);
  return children;
}

function SettingsPage() {
  const darkMode = useContext(modeDark);
  const languagePackCtx = useContext(languagePack);
  const pack = useLanguagePack();
  const root = useRef(null);
  return (
    <div className="flex flex-col">
      <HeaderMain />
      <div className="flex flex-row gap-5 items-center">
        <Settings size={48} />
        <h1 className="text-[3rem] font-bold">{pack.page_setting_title}</h1>
      </div>
      <Animation rootRef={root}>
        <article ref={root} className="flex flex-col mt-10">
          <div className="w-full h-30 flex flex-row items-center justify-between gap-10 border-t-1 border-b-1 border-(--main-white)">
            <div className="flex flex-row gap-5">
              <Moon size={32} />
              <h2 className="text-[1.5rem]">
                {pack.settings_setting_name_theme}
              </h2>
            </div>

            <Button
              className="w-50"
              onClick={() => {
                darkMode.switch();
              }}
            >
              {darkMode.dark
                ? pack.settings_setting_value_theme_off
                : pack.settings_setting_value_theme_on}
            </Button>
          </div>
          <div className="w-full h-30 flex flex-row items-center justify-between gap-10 border-t-1 border-b-1 border-(--main-white) mt-[-1px]">
            <div className="flex flex-row gap-5">
              <Earth size={32} />
              <h2 className="text-[1.5rem]">
                {pack.settings_setting_name_language}
              </h2>
            </div>

            <Button
              className="w-50"
              onClick={() => {
                languagePackCtx.set(languagePackCtx.lang == "ua" ? "en" : "ua");
              }}
            >
              {pack.settings_setting_value_language}
            </Button>
          </div>
        </article>
      </Animation>
    </div>
  );
}

export default SettingsPage;

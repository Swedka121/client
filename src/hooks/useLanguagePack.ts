import { languagePack } from "../app";
import { useContext } from "react";

export const translations = {
  en: {
    header_home_tab: "Home",
    header_settings_tab: "Settings",
    header_profile_tab: "Profile",
    settings_setting_name_theme: "Theme",
    settings_setting_name_language: "Language",
    settings_setting_value_theme_on: "On Dark mode",
    settings_setting_value_theme_off: "On Light mode",
    settings_setting_value_language: "English (US)",
    page_setting_title: "Settings",
    page_profile_title: "Profile",
    page_home_title: "Welcome, %s1%!",
    page_card_profile_data: "Profile data",
    page_card_profile_change: "Change profile data",
    page_card_profile_change_username_title: "Username",
    page_card_profile_change_username_placeholder:
      "Type your new username here",
    page_card_profile_change_username_button: "Change",
    page_card_profile_change_avatar_title: "Avatar",
    page_card_profile_change_avatar_placeholder: "Type your new url for avatar",
    page_card_profile_change_avatar_button: "Change",
  },
  ua: {
    header_home_tab: "Головна",
    header_settings_tab: "Налаштування",
    header_profile_tab: "Профіль",
    settings_setting_name_theme: "Тема",
    settings_setting_name_language: "Мова",
    settings_setting_value_theme_on: "Темна тема",
    settings_setting_value_theme_off: "Світла тема",
    settings_setting_value_language: "Українська (Україна)",
    page_setting_title: "Налаштування",
    page_profile_title: "Профіль",
    page_home_title: "Ласкаво просимо, %s1%!",
    page_card_profile_data: "Profile data",
    page_card_profile_change: "Change profile data",
    page_card_profile_change_username_title: "Username",
    page_card_profile_change_username_placeholder:
      "Type your new username here",
    page_card_profile_change_username_button: "Change",
    page_card_profile_change_avatar_title: "Avatar",
    page_card_profile_change_avatar_placeholder: "Type your new url for avatar",
    page_card_profile_change_avatar_button: "Change",
  },
} as const;

export type LanguageCode = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)["en"];

export function useLanguagePackByCode(pack: LanguageCode) {
  return translations[pack];
}
export function useLanguagePack() {
  const context = useContext(languagePack);
  const lang = context?.lang ?? "en";
  return translations[lang];
}

export function replaceParam(param: number, rep: string, text: string) {
  return rep.replace(`%s${param}%`, text);
}

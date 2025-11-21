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
    page_card_profile_delete_user: "Delete",
    page_card_profile_logout: "Logout",
    page_card_profile_file_storage: "File storage",
    page_card_profile_file_storage_delete: "Delete file",
    page_home_create_new: "Create new course",
    page_home_add_code: "Add by code",
    page_home_filter_all: "All",
    page_home_filter_teacher: "Teacher",
    page_home_filter_student: "Student",
    page_home_card_teacher_is: "Teacher %s1%",
    page_home_card_my_role_student: "My role Student",
    page_home_card_my_role_teacher: "My role Teacher",
    page_create_course_baner_title: "Banner",
    page_create_course_baner_desc:
      "The banner will be located at the top of your course page. For the banner to look good on all devices, use an image of at least 2028 x 1152 pixels.",
    page_create_course_change_button: "Change",
    page_create_course_avatar_title: "Avatar",
    page_create_course_avatar_desc:
      "The course avatar is the course icon displayed next to the course card on the main page.",
    page_create_course_avatar_course_name_title: "Course name",
    page_create_course_avatar_course_name_desc:
      "The course name will be displayed next to the course card on the main page.",
    page_create_course_create_button: "Create",
    page_connect_title: "Your code",
    page_connect_placeholder: "Your 10-symbol code",
    page_connect_button: "Connect",
    page_course_add_new: "Add new material",
    page_course_code: "Code: %s1%",
    page_course_delete_course: "Delete course",
    page_course_delete_material: "Delete material",
    page_material_new_main_title: "Material title",
    page_material_new_save_button: "Save material",
    please_wait_loading: "Please wait, loading...",
    opps_no_content: "Opsss... Content for this page is undefined",
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
    page_card_profile_data: "Дані профілю",
    page_card_profile_change: "Змінити дані профілю",
    page_card_profile_change_username_title: "Ім'я користувача",
    page_card_profile_change_username_placeholder:
      "Введіть нове ім'я користувача",
    page_card_profile_change_username_button: "Змінити",
    page_card_profile_change_avatar_title: "Аватар",
    page_card_profile_change_avatar_placeholder:
      "Введіть нове посилання для аватара",
    page_card_profile_change_avatar_button: "Змінити",
    page_card_profile_delete_user: "Видалити",
    page_card_profile_logout: "Вийти",
    page_card_profile_file_storage: "Файлове сховище",
    page_card_profile_file_storage_delete: "Видалити файл",
    page_home_create_new: "Створити новий курс",
    page_home_add_code: "Додати за кодом",
    page_home_filter_all: "Всі",
    page_home_filter_teacher: "Викладач",
    page_home_filter_student: "Студент",
    page_home_card_teacher_is: "Викладач %s1%",
    page_home_card_my_role_student: "Моя роль Студент",
    page_home_card_my_role_teacher: "Моя роль Викладач",
    page_create_course_baner_title: "Банер",
    page_create_course_baner_desc:
      "Банер буде розташовано вгорі сторінки вашого курсу. Щоб банер мав гарний вигляд на всіх пристроях, використовуйте зображення розміром принаймні 2028 x 1152 пікселів",
    page_create_course_change_button: "Змінити",
    page_create_course_avatar_title: "Аватар",
    page_create_course_avatar_desc:
      "Аватарка курсу – це значок курсу, що відображається біля картки курсу на головній сторінці.",
    page_create_course_avatar_course_name_title: "Назва курсу",
    page_create_course_avatar_course_name_desc:
      "Назва курсу буде відображатись біля картки курсу на головній сторінці",
    page_create_course_create_button: "Створити",
    page_connect_title: "Ваш код",
    page_connect_placeholder: "Ваш 10-символьний код",
    page_connect_button: "Підключитись",
    page_course_add_new: "Додати новий матеріал",
    page_course_code: "Код: %s1%",
    page_course_delete_course: "Видалити курс",
    page_course_delete_material: "Видалити матеріал",
    page_material_new_main_title: "Заголовок матеріалу",
    page_material_new_save_button: "Зберегти матеріал",
    please_wait_loading: "Будь-ласка зачекайте, завантаження...",
    opps_no_content: "Ой... Ми не змогли знайти контент для цієї сторінки",
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

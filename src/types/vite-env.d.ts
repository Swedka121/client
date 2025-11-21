/// <reference types="vite/client" />

/**
 * Цей файл оголошує спеціальний інтерфейс для об'єкта import.meta.env,
 * який ін'єктується інструментом Vite. Це необхідно, щоб TypeScript
 * не видавав помилку про неіснуюче поле 'env'.
 */
interface ImportMetaEnv {
  // Оголошуємо всі змінні, які ми використовуємо з .env файлів.
  // Вони повинні мати префікс VITE_.
  readonly VITE_SERVER_URL: string;
  // Додайте тут інші змінні середовища, які ви використовуєте, наприклад:
  // readonly VITE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

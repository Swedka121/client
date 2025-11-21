/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

// Цей файл розширює глобальний тип ProcessEnv для використання у Node.js-середовищі
// (Main Process та Preload Script).
// Це дозволяє TypeScript знати, що змінні VITE_... існують у process.env.

// Розширюємо стандартний інтерфейс Node.js ProcessEnv
declare namespace NodeJS {
  interface ProcessEnv {
    // Всі змінні з ваших .env файлів, що починаються з VITE_,
    // повинні бути тут оголошені.

    // Змінна, що використовується у src/main.ts та src/preload.ts
    readonly VITE_SERVER_URL: string;

    // Сюди автоматично додається стандартна змінна режиму
    readonly NODE_ENV: "development" | "production" | "test";

    // Додайте інші змінні VITE_, якщо вони використовуються в Node.js-коді
    // readonly VITE_API_KEY: string;
  }
}

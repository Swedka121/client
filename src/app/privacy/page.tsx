import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <MainHeader />
      <section className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed min-h-[100vh] pt-50">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold mb-2">English</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This website is created for Lyceum No. 23 in Zhytomyr, Ukraine. We
              only collect your Google profile information (profile picture,
              username, and email address) when you log in with Google OAuth.
            </p>
            <p className="mb-4">
              We do not share, sell, or transfer your personal information to
              third parties. The data is used solely for authentication
              purposes.
            </p>
            <p className="mb-4">
              If you would like to delete your account, please contact the site
              administrator at{" "}
              <a
                href="mailto:hamacok46@gmail.com"
                className="text-blue-600 underline"
              >
                hamacok46@gmail.com
              </a>
              . Your data will be removed from our system through the admin
              panel.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-10">
          <CardHeader>
            <h2 className="text-xl font-semibold mb-2 mt-6">Українською</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Цей вебсайт створено для Ліцею №23 м. Житомир, Україна. Ми
              збираємо лише дані вашого Google-профілю (фото профілю, ім’я
              користувача та електронну пошту) при вході через Google OAuth.
            </p>
            <p className="mb-4">
              Ми не передаємо ваші персональні дані третім сторонам. Вони
              використовуються виключно для авторизації.
            </p>
            <p>
              Якщо ви бажаєте видалити свій акаунт, будь ласка, зверніться до
              адміністратора сайту за адресою
              <a
                href="mailto:hamacok46@gmail.com"
                className="text-blue-600 underline"
              >
                {" "}
                hamacok46@gmail.com
              </a>
              . Ваші дані будуть видалені з нашої системи через адміністративну
              панель.
            </p>
          </CardContent>
        </Card>
      </section>
      <MainFooter />
    </>
  );
}

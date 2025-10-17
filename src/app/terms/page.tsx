import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/ui/container";

function Page() {
  return (
    <>
      <MainHeader />
      <Container>
        <section className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed min-h-[100vh] pt-50">
          <h1 className="text-3xl font-bold mb-6 text-center">Terms of Use</h1>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold mb-2">English</h2>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                By using this website of Lyceum No. 23 in Zhytomyr, you agree to
                use it solely for educational and informational purposes.
              </p>
              <p className="mb-4">
                Login is available only via Google OAuth. We collect and use
                your Google profile information (profile picture, username, and
                email) exclusively for authentication.
              </p>
              <p className="mb-4">
                You may request deletion of your account by contacting the site
                administrator at{" "}
                <a
                  href="mailto:hamacok46@gmail.com"
                  className="text-blue-600 underline"
                >
                  hamacok46@gmail.com
                </a>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="mt-10">
            <CardHeader>
              <h2 className="text-xl font-semibold mb-2 mt-6">Українською</h2>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Використовуючи цей вебсайт Ліцею №23 м. Житомир, ви погоджуєтесь
                використовувати його виключно з освітньою та інформаційною
                метою.
              </p>
              <p className="mb-4">
                Вхід можливий лише через Google OAuth. Ми збираємо та
                використовуємо дані вашого Google-профілю (фото, ім’я
                користувача та пошту) виключно для авторизації.
              </p>
              <p>
                Ви можете надіслати запит на видалення акаунта, звернувшись до
                адміністратора сайту за адресою
                <a
                  href="mailto:hamacok46@gmail.com"
                  className="text-blue-600 underline"
                >
                  {" "}
                  hamacok46@gmail.com
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </section>
      </Container>

      <MainFooter />
    </>
  );
}

export default Page;

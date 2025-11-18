import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { email, string } from "zod";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import da from "zod/v4/locales/da.js";
import { useAccessToken, useRefreshToken } from "@hooks/useRefreshToken";
import { useAuthStore } from "@stores/authStore";

interface LoginForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const formSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    email: z.email(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

const REG_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(
      user_local_input: {
        username: $username
        email: $email
        password: $password
      }
    ) {
      accessToken
      refreshToken
    }
  }
`;

function RegistrationPage() {
  const { setRefreshToken } = useRefreshToken();
  const { setAccessToken } = useAccessToken();
  const navigate = useNavigate();
  const [signUp, { data, error }] = useMutation<{
    signUp: { refreshToken: string; accessToken: string };
  }>(REG_MUTATION);
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),

    mode: "onChange",
  });

  const onsub = form.handleSubmit(async (data) => {
    const result = await signUp({
      variables: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });

    console.log(result.data.signUp);

    await setRefreshToken(result.data.signUp.refreshToken);
    await setAccessToken(result.data.signUp.accessToken);

    useAuthStore.getState().trigger();
    navigate("/app/main");
  });

  return (
    <div className="w-full h-full flex flex-row">
      <section className="w-3/5 h-[100vh] bg-(--main-color)">
        <form
          className="w-120 h-full m-auto flex justify-center flex-col gap-5"
          onSubmit={onsub}
        >
          <h2 className="text-[5rem] font-bold text-(--white-main)">
            Hello There!
          </h2>
          <Input
            placeholder="Input your username"
            label="Username"
            labelClassname="text-(--white-main)"
            error={form.formState.errors?.username?.message}
            {...form.register("username")}
          ></Input>
          <Input
            placeholder="Input your email"
            label="Email"
            labelClassname="text-(--white-main)"
            error={form.formState.errors?.email?.message}
            {...form.register("email")}
          ></Input>
          <Input
            placeholder="Input your password"
            label="Password"
            labelClassname="text-(--white-main)"
            error={form.formState.errors?.password?.message}
            {...form.register("password")}
          ></Input>
          <Input
            placeholder="Repeat you password"
            label="Repeat you password"
            labelClassname="text-(--white-main)"
            error={form.formState.errors?.repeatPassword?.message}
            {...form.register("repeatPassword")}
          ></Input>
          <Button
            type="submit"
            value={"Submit"}
            className="bg-(--secd-color) w-full"
            disabled={!form.formState.isValid}
          >
            Register
          </Button>
        </form>
      </section>
      <section className="w-2/5 h-[100vh] bg-(--white-main) flex justify-center items-center flex-col gap-10">
        <img
          src="./assets/login-ill.jpg"
          className="rounded-[100%] w-100"
        ></img>
        <h2 className="w-3/4 text-(--black-main) w-full text-center font-bold text-[2.0rem]">
          Have a account?
        </h2>
        <Link to={"/login"}>
          <Button disabled={false} className="w-100">
            Login
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default RegistrationPage;

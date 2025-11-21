import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@apollo/client/react";
import { useAccessToken, useRefreshToken } from "@hooks/useRefreshToken";
import { gql } from "@apollo/client";
import { useAuthStore } from "@stores/authStore";

interface LoginForm {
  username: string;
  password: string;
}

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(user_local_input: { username: $username, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;
function LoginPage() {
  const [signIn, { data, loading, error }] = useMutation<{
    signIn: {
      refreshToken: string;
      accessToken: string;
    };
  }>(SIGN_IN);
  const { setAccessToken } = useAccessToken();
  const { setRefreshToken } = useRefreshToken();
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const result = await signIn({
      variables: { username: data.username, password: data.password },
    });

    console.log(result.data.signIn);

    await setRefreshToken(result.data.signIn.refreshToken);
    await setAccessToken(result.data.signIn.accessToken);

    useAuthStore.getState().trigger();
    navigate("/app/main");
  });

  return (
    <div className="w-full h-full flex flex-row">
      <section className="w-3/5 h-[100vh] bg-(--main-color)">
        <form
          className="w-120 h-full m-auto flex justify-center flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[5rem] font-bold text-(--static-white-main)">
            Hello There!
          </h2>
          <Input
            placeholder="Input your username"
            label="Username"
            labelClassname="text-(--static-white-main)"
            error={form.formState.errors?.username?.message}
            {...form.register("username")}
          ></Input>
          <Input
            placeholder="Input your password"
            label="Password"
            labelClassname="text-(--static-white-main)"
            error={form.formState.errors?.password?.message}
            type="password"
            {...form.register("password")}
          ></Input>
          <Button
            type="submit"
            value={"Submit"}
            className="bg-(--secd-color) w-full"
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </form>
      </section>
      <section className="w-2/5 h-[100vh] bg-(--white-main) flex justify-center items-center flex-col gap-10">
        <img
          src="./assets/login-ill.jpg"
          className="rounded-[100%] w-100"
        ></img>
        <h2 className="w-3/4 text-(--black-main) w-full text-center font-bold text-[2.0rem]">
          Don't have a account?
        </h2>
        <Link to={"/registartion"}>
          <Button disabled={false} className="w-100">
            Registartion
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default LoginPage;

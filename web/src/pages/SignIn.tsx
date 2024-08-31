import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
  password: z
    .string({ message: "A senha é obrigatoria" })
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [isVisiblePasswordField, setIsVisiblePasswordField] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  });

  async function handleSignIn(data: SignInFormSchema) {
    try {
      const response = await api.post("/signin", data);

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 12);

      cookies.set("token", response.data, { path: "/",  expires: expirationDate });

      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="p-16 rounded-lg flex flex-col justify-start bg-accent border-2 shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center text-blue-500">
          Bem vindo de volta!
        </h1>
        <span className="text font-light text-center my-2">
          Entre e gerencie suas atividades
        </span>

        <label className="mt-2" htmlFor="">
          Email
        </label>
        <input
          className="text-lg font-light p-2 rounded-md border border-slate-500 focus-primary"
          type="text"
          placeholder="Escreva seu melhor email"
          {...register("email")}
          onBlur={() => trigger("email")}
        />
        {errors.email && (
          <p className="text-red-500 font-semibold">{errors.email.message}</p>
        )}

        <label className="mt-2" htmlFor="">
          Senha
        </label>
        <div className="relative flex items-center">
          <input
            className="w-full text-lg font-light p-2 rounded-md border border-slate-500 pr-8 focus-primary"
            type={isVisiblePasswordField ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            onBlur={() => trigger("password")}
          />
          <button
            onClick={() => setIsVisiblePasswordField(!isVisiblePasswordField)}
            type="button"
            className="absolute right-3"
          >
            {isVisiblePasswordField ? (
              <EyeSlash size={24} />
            ) : (
              <Eye size={24} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 font-semibold">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isFormSubmitting}
          className="bg-blue-500 disabled:bg-blue-800 mt-8 mb-2 hover:bg-blue-700 transition-colors rounded-md px-3 py-2 text-center font-medium text-lg text-white"
        >
          {isFormSubmitting ? "Entrando..." : "Entrar"}
        </button>
        <span className="text-center text-sm font-light cursor-default">
          Ainda não tem uma conta?{" "}
          <a
            className="text-blue-700 font-medium cursor-pointer hover:text-blue-500 transition-colors"
            href="/sign-up"
          >
            Registre-se grátis
          </a>
        </span>
      </form>
    </main>
  );
}

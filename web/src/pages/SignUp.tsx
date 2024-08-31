import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const subscribeFormSchema = z
  .object({
    name: z.string({ message: "Nome é obrigatório" }),
    email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
    password: z
      .string({ message: "A senha é obrigatoria" })
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirm_password: z.string({ message: "Confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser iguais",
    path: ["confirm_password"],
  });

type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>;

export function SignUp() {
  const [isVisiblePasswordField, setIsVisiblePasswordField] = useState(false);
  const [isVisibleConfirmPasswordField, setIsVisibleConfirmPasswordField] =
    useState(false);

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  const navigate = useNavigate();

  async function handleRegisterUser(data: SubscribeFormSchema) {
    try {
      await api.post("/register", data);

      navigate("/sign-in");

    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(handleRegisterUser)} className="p-16 rounded-lg flex flex-col justify-start bg-accent border-2 shadow-lg">
        <h1 className="text-4xl font-bold text-blue-500">Registre-se gratis</h1>
        <span className="text font-light">
          Seja bem-vindo! Estamos felizes em te-lo na nosso sistema
        </span>

        <label className="mt-4" htmlFor="name">
          Nome
        </label>
        <input
          className="text-lg font-light p-2 rounded-md border border-slate-500 focus-primary"
          type="text"
          placeholder="Como podemos lhe chamar"
          {...register("name")}
          onBlur={() => trigger("name")}
        />
        {errors.name && (
          <p className="text-red-500 font-semibold">{errors.name.message}</p>
        )}

        <label className="mt-2" htmlFor="email">
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

        <label className="mt-2" htmlFor="password">
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

        <label className="mt-2" htmlFor="confirm_password">
          Confirme sua senha
        </label>
        <div className="relative flex items-center">
          <input
            className="w-full text-lg font-light p-2 rounded-md border border-slate-500 pr-8 focus-primary"
            type={isVisibleConfirmPasswordField ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirm_password")}
            onBlur={() => trigger("confirm_password")}
          />
          <button
            onClick={() =>
              setIsVisibleConfirmPasswordField(!isVisibleConfirmPasswordField)
            }
            type="button"
            className="absolute right-3"
          >
            {isVisibleConfirmPasswordField ? (
              <EyeSlash size={24} />
            ) : (
              <Eye size={24} />
            )}
          </button>
        </div>
        {errors.confirm_password && (
          <p className="text-red-500 font-semibold">
            {errors.confirm_password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isFormSubmitting}
          className="bg-blue-500 mt-8 mb-2 hover:bg-blue-700 transition-colors rounded-md px-3 py-2 text-center font-medium text-lg text-white disabled:bg-blue-800"
        >
          {isFormSubmitting ? "Cadastrando..." : "Cadastre-se"}
        </button>
        <span className="text-center text-sm font-light cursor-default">
          Já tem uma conta?{" "}
          <a
            className="text-blue-700 font-medium cursor-pointer hover:text-blue-500 transition-colors"
            href="/sign-in"
          >
            Faça login
          </a>
        </span>
      </form>
    </main>
  );
}

"use client";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import NextLink from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { subtitle, title } from "@/components/primitives";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";

// Definindo o esquema de validação com Zod
const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
});

// Tipo para os dados do formulário
type FormData = z.infer<typeof schema>;

const simulateApiCall = (data: FormData) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "teste@teste.com") {
        resolve("Login bem-sucedido");
      } else {
        reject("Credenciais inválidas");
      }
    }, 1000);
  });
};

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      const message = await simulateApiCall(data);

      setSuccessMessage(message);
    } catch (error) {
      setServerError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full h-full flex flex-col gap-5 justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col text-left justify-center gap-2">
        <div>
          <span className="text-3xl lg:text-4xl">Entre com sua&nbsp;</span>
          <span
            className={title({
              color: "violet",
              size: "sm",
            })}
          >
            conta&nbsp;
          </span>
        </div>

        <span className={subtitle()}>
          Faça o login com sua conta para continuar
        </span>
      </div>
      <div className="flex flex-col justify-center h-full w-full gap-4 text-left">
        <div>
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            variant="underlined"
            {...register("name")}
            isInvalid={!!errors.name}
            size="lg"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1 ml-2">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <Input
            label="Email"
            placeholder="Digite seu email"
            variant="underlined"
            {...register("email")}
            isInvalid={!!errors.email}
            size="lg"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 ml-2">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            variant="underlined"
            {...register("password")}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
              </button>
            }
            isInvalid={!!errors.password}
            size="lg"
            type={isVisible ? "text" : "password"}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 ml-2">
              {errors.password.message}
            </span>
          )}
        </div>
        {serverError && (
          <span className="text-red-500 text-sm mt-1">{serverError}</span>
        )}
        {successMessage && (
          <span className="text-green-500 text-sm mt-1">{successMessage}</span>
        )}
        <div className="w-full">
          <Button
            className="w-full flex items-center justify-center" // Alinha o conteúdo do botão
            color="primary"
            disabled={loading}
            size="md"
            type="submit"
          >
            {loading ? "Entrando" : "Entrar"}
          </Button>
        </div>
        <div className="w-full text-center">
          Ainda não possui uma conta? Realize o{" "}
          <NextLink
            className="data-[active=true]:text-primary data-[active=true]:font-large text-primary"
            href={"/register"}
          >
            Cadastro
          </NextLink>
        </div>
      </div>
    </form>
  );
}

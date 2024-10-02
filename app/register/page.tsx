"use client";
import { Checkbox, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import NextLink from "next/link";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { title, subtitle } from "@/components/primitives";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos e a política de privacidade",
  }),
});

type FormData = z.infer<typeof schema>;

const simulateApiCall = (data: FormData): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.email === "teste@teste.com"
        ? resolve()
        : reject("Email já cadastrado");
    }, 1000);
  });
};

export default function RegisterPage() {
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
      await simulateApiCall(data);
      setSuccessMessage(
        "Registro bem-sucedido! Você sera redirecionado para a sua pagina.",
      );
    } catch (error) {
      setServerError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="container w-full h-full flex flex-col gap-5 justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col text-left justify-center gap-2">
        <div>
          <span className="text-3xl lg:text-4xl">Crie uma nova&nbsp;</span>
          <span
            className={title({
              color: "violet",
              size: "sm",
            })}
          >
            conta&nbsp;
          </span>
        </div>

        <span className={subtitle()}>Cadastre-se começar uma nova conta!</span>
      </div>
      <div className="flex flex-col justify-center h-full w-full gap-4">
        <InputField
          error={errors.name}
          label="Nome"
          register={register("name")}
          type="text"
        />
        <InputField
          error={errors.email}
          label="Email"
          register={register("email")}
          type="email"
        />
        <InputField
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
          error={errors.password}
          label="Senha"
          register={register("password")}
          type={isVisible ? "text" : "password"}
        />
        <CheckboxField
          error={errors.agreeToTerms}
          register={register("agreeToTerms")}
        />
        {serverError && (
          <span className="text-red-500 text-sm mt-1">{serverError}</span>
        )}
        {successMessage && (
          <span className="text-green-500 text-sm mt-1">{successMessage}</span>
        )}
        <Button
          className="w-full"
          color="primary"
          disabled={loading}
          size="md"
          type="submit"
        >
          {loading ? "Registrando..." : "Criar Conta"}
        </Button>
        <div className="w-full text-center">
          Já possui uma conta?{" "}
          <NextLink className="text-primary font-bold" href="/login">
            Entrar
          </NextLink>
        </div>
      </div>
    </form>
  );
}

interface InputFieldProps {
  label: string;
  type: string;
  register: ReturnType<UseFormRegister<FormData>>;
  error?: { message?: string };
  endContent?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  error,
  endContent,
}) => (
  <div className="w-full text-left">
    <Input
      label={label}
      placeholder={`Digite seu ${label.toLowerCase()}`}
      type={type}
      variant="underlined"
      {...register}
      endContent={endContent}
      isInvalid={!!error}
      size="lg"
    />
    {error && (
      <span className="text-red-500 text-sm mt-1 ml-2">{error.message}</span>
    )}
  </div>
);

interface CheckboxFieldProps {
  register: ReturnType<UseFormRegister<FormData>>;
  error?: { message?: string };
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ register, error }) => (
  <div className="flex items-center flex-col">
    <Checkbox {...register} size="sm">
      Eu concordo com os termos e a política de privacidade
    </Checkbox>
    {error && (
      <span className="text-red-500 text-sm mt-1 ml-2">{error.message}</span>
    )}
  </div>
);

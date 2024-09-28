"use client";
import { Checkbox, Input, Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";
import { useState } from "react";
import NextLink from "next/link";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
        "Registro bem-sucedido! Você sera redirecionado para a sua pagina."
      );
    } catch (error) {
      setServerError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container w-full h-full flex flex-col gap-5 justify-between"
    >
      <div className="flex flex-col text-left justify-center gap-2">
        <h1 className="text-2xl">Criar uma conta</h1>
        <h2 className="text-base">
          Cadastre-se para uma nova conta para começar
        </h2>
      </div>
      <div className="flex flex-col justify-center h-full w-full gap-4">
        <InputField
          label="Nome"
          type="text"
          register={register("name")}
          error={errors.name}
        />
        <InputField
          label="Email"
          type="email"
          register={register("email")}
          error={errors.email}
        />
        <InputField
          label="Senha"
          type={isVisible ? "text" : "password"}
          register={register("password")}
          error={errors.password}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
            </button>
          }
        />
        <CheckboxField
          register={register("agreeToTerms")}
          error={errors.agreeToTerms}
        />
        {serverError && (
          <span className="text-red-500 text-sm mt-1">{serverError}</span>
        )}
        {successMessage && (
          <span className="text-green-500 text-sm mt-1">{successMessage}</span>
        )}
        <Button
          type="submit"
          color="primary"
          size="md"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Criar Conta"}
        </Button>
        <div className="w-full text-center">
          Já possui uma conta?{" "}
          <NextLink href="/login" className="text-primary font-bold">
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
      variant="underlined"
      placeholder={`Digite seu ${label.toLowerCase()}`}
      type={type}
      {...register}
      isInvalid={!!error}
      size="lg"
      endContent={endContent}
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

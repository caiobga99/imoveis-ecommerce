"use client";
import { title } from "@/components/primitives";
import { Checkbox, Input, Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";
import { useState } from "react";
import NextLink from "next/link";
export default function LoginPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form className="w-full h-full flex flex-col gap-5 justify-between ">
      <div className="flex flex-col text-left justify-center gap-2 ">
        <h1 className="text-2xl">Entre com sua conta</h1>
        <h2 className="text-base">Faça o login com sua conta para continuar</h2>
      </div>
      <div className="flex flex-col justify-center h-full  w-full gap-4">
        <div>
          <Input
            isClearable
            type="name"
            label="Nome"
            variant="underlined"
            placeholder="Digite seu nome"
            onClear={() => console.log("input cleared")}
            className="w-[full]"
            size="lg"
          />
        </div>
        <div>
          <Input
            isClearable
            type="email"
            label="Email"
            variant="underlined"
            placeholder="Digite seu email"
            onClear={() => console.log("input cleared")}
            size="lg"
          />
        </div>
        <div className="w-full">
          <Input
            label="Password"
            variant="underlined"
            placeholder="Digite sua senha"
            size="lg"
            className="w-full"
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
            type={isVisible ? "text" : "password"}
          />
        </div>
        <div className="w-full">
          <Button color="primary" size="md" className="w-full">
            Entrar
          </Button>
        </div>
        <div className="w-full text-center">
          Ainda não possui uma conta? Realize o{" "}
          <NextLink
            href={"/register"}
            className={
              "data-[active=true]:text-primary data-[active=true]:font-large text-primary"
            }
          >
            Cadastro
          </NextLink>
        </div>
      </div>
    </form>
  );
}

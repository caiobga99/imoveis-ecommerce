"use client";
import { title } from "@/components/primitives";
import { Checkbox, Input, Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";
import { useState } from "react";
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form className="container  w-full h-full flex flex-col gap-5 justify-between ">
      <div className="flex flex-col text-left justify-center gap-2 ">
        <h1 className="text-2xl">Criar uma conta</h1>
        <h2 className="text-base">
          Cadastre-se para uma nova conta para começar
        </h2>
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
            className="w-full"
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
        <div className="">
          <Checkbox size="sm">
            Eu concordo com os termos e a politica de privacidade
          </Checkbox>
        </div>
        <div className="w-full">
          <Button color="primary" size="md" className="w-full">
            Entrar
          </Button>
        </div>
        <div className="w-full text-center ">
          Já possui uma conta?{" "}
          <NextLink
            href={"/login"}
            className={
              "data-[active=true]:text-primary data-[active=true]:font-large text-primary"
            }
          >
            Entrar
          </NextLink>
        </div>
      </div>
    </form>
  );
}

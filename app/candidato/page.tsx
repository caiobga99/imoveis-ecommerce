"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
  CardFooter,
  Card,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Image } from "@nextui-org/image";

import {
  EyeSlashFilledIcon,
  EyeFilledIcon,
  HeartIcon,
} from "@/components/icons";
import { MailIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Imovel } from "@/types/imovel";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido"),
  senha: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function InquilinoPage() {
  const [listaImoveis, setListaImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [favoritados, setFavoritados] = useState<Set<string>>(
    new Set(["AP2312"])
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const toggleFavoritar = (id: string) => {
    setFavoritados((prev) => {
      const newFavoritados = new Set(prev);

      newFavoritados.has(id)
        ? newFavoritados.delete(id)
        : newFavoritados.add(id);

      return newFavoritados;
    });
  };

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Dados enviados:", data);
    onOpenChange();
  };

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      const data: Imovel[] = [
        {
          id: "AP2312",
          tipo_imovel: "Apartamento",
          valor_aluguel: 1500,
          valor_venda: 350000,
          metros_quadrados: 100,
          qnt_camas: 3,
          qnt_carro: 2,
          endereco: "Avenida Barão do Rio Branco, Campinas, SP",
          valor_condominio: 400,
          imagem:
            "https://flip-prod-fotos.s3.amazonaws.com/c8ffa537-39e4-496c-a2b4-a1001c6997cb.jpeg",
        },
      ].filter((imovel) => favoritados.has(imovel.id));

      setListaImoveis(data);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, [favoritados]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading..." />
      </div>
    );
  }

  if (listaImoveis.length === 0) {
    return (
      <div className="container w-full h-full flex flex-col gap-5 justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex text-left items-center w-full justify-center gap-2">
            <div>
              <span className="text-3xl lg:text-4xl">Nome do&nbsp;</span>
              <span className={title({ color: "violet", size: "sm" })}>
                Inquilino&nbsp;
              </span>
            </div>
          </div>
          <Button onPress={onOpen}>Edit Profile</Button>
          <Modal
            isOpen={isOpen}
            placement="top-center"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Cadastre um novo imóvel
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      {...register("nome")}
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      isInvalid={!!errors.nome}
                      label="Nome"
                      placeholder="Digite seu Nome"
                      variant="bordered"
                    />
                    {errors.nome && (
                      <span className="text-red-500">
                        {errors.nome.message}
                      </span>
                    )}
                    <Input
                      {...register("email")}
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      isInvalid={!!errors.email}
                      label="Email"
                      placeholder="Digite seu Email"
                      variant="bordered"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                    <Input
                      label="Senha"
                      placeholder="Digite sua senha"
                      variant="bordered"
                      {...register("senha")}
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon />
                          ) : (
                            <EyeFilledIcon />
                          )}
                        </button>
                      }
                      isInvalid={!!errors.senha}
                      size="lg"
                      type={isVisible ? "text" : "password"}
                    />
                    {errors.senha && (
                      <span className="text-red-500">
                        {errors.senha.message}
                      </span>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Fechar
                    </Button>
                    <Button color="primary" onPress={handleSubmit(onSubmit)}>
                      Adicionar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <p className="flex w-full h-full justify-center items-center">
          Não há nenhum imóvel favoritado.
        </p>
      </div>
    );
  }

  const handleImageLoadStart = (id: string) => {
    setImageLoading((prev) => new Set(prev).add(id));
  };

  const handleImageLoadEnd = (id: string) => {
    setImageLoading((prev) => {
      const newLoading = new Set(prev);

      newLoading.delete(id);

      return newLoading;
    });
  };

  const renderImage = (imovel: Imovel) => {
    const isImageLoading = imageLoading.has(imovel.id);

    if (isImageLoading) {
      return (
        <Skeleton className="rounded-lg">
          <div className="h-full rounded-lg bg-default-300" />
        </Skeleton>
      );
    }

    if (imovel.imagem) {
      return (
        <Image
          removeWrapper
          alt="Imagem do imóvel"
          className="z-0 w-full h-full object-cover"
          src={imovel.imagem}
          onError={() => handleImageLoadEnd(imovel.id)}
          onLoad={() => handleImageLoadEnd(imovel.id)}
          onLoadStart={() => handleImageLoadStart(imovel.id)}
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Imagem indisponível</p>
      </div>
    );
  };

  const renderImovel = (imovel: Imovel) => (
    <div key={imovel.id} className="flex justify-center">
      <Card className="w-full max-w-xs h-[300px] relative">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {imovel.tipo_imovel}
          </p>
          <h4 className="text-white/90 font-medium text-xl">{imovel.id}</h4>
        </CardHeader>
        {renderImage(imovel)}
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-2 right-2 z-20"
          radius="full"
          variant="light"
          onPress={() => toggleFavoritar(imovel.id)}
        >
          <HeartIcon
            className={`transition-colors duration-200 ${
              favoritados.has(imovel.id) ? "text-red-600" : "text-gray-400"
            }`}
            fill="currentColor"
          />
        </Button>
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">
                R${imovel.valor_aluguel}
              </p>
              <p className="text-tiny text-white/60">{imovel.endereco}</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Detalhes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="container w-full h-full flex flex-col gap-5 justify-between">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex text-left items-center w-full justify-center gap-2">
          <div>
            <span className="text-3xl lg:text-4xl">Nome do&nbsp;</span>
            <span className={title({ color: "violet", size: "sm" })}>
              Inquilino&nbsp;
            </span>
          </div>
        </div>
        <Button onPress={onOpen}>Edit Profile</Button>
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastre um novo imóvel
                </ModalHeader>
                <ModalBody>
                  <Input
                    {...register("nome")}
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    isInvalid={!!errors.nome}
                    label="Nome"
                    placeholder="Digite seu Nome"
                    variant="bordered"
                  />
                  {errors.nome && (
                    <span className="text-red-500">{errors.nome.message}</span>
                  )}
                  <Input
                    {...register("email")}
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    isInvalid={!!errors.email}
                    label="Email"
                    placeholder="Digite seu Email"
                    variant="bordered"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                  <Input
                    label="Senha"
                    placeholder="Digite sua senha"
                    variant="bordered"
                    {...register("senha")}
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
                    isInvalid={!!errors.senha}
                    size="lg"
                    type={isVisible ? "text" : "password"}
                  />
                  {errors.senha && (
                    <span className="text-red-500">{errors.senha.message}</span>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" onPress={handleSubmit(onSubmit)}>
                    Adicionar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
        {listaImoveis.map(renderImovel)}
      </div>
    </div>
  );
}

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
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Image } from "@nextui-org/image";

import { MailIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Imovel } from "@/types/imovel";

const schema = z.object({
  endereco: z.string().min(1, "Endereço é obrigatório"),
  valor: z.number().min(1, "Valor é obrigatório"),
  tamanho: z.number().min(1, "Tamanho é obrigatório"),
  tipoCasa: z.string().min(1, "Tipo de casa é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function InquilinoPage() {
  interface ITipoCasa {
    key: number;
    label: string;
  }

  const tipo_casa: ITipoCasa[] = [
    { key: 1, label: "Casa" },
    { key: 2, label: "Apartamento" },
    { key: 3, label: "Condominio" },
    { key: 4, label: "Residencial" },
  ];

  const [listaImoveis, setListaImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Dados enviados:", data);
    onOpenChange(); 
  };

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      const data: Imovel[] = [
        {
          id: "AP3231",
          tipo_imovel: "Apartamento",
          valor_aluguel: 1200,
          valor_venda: 300000,
          metros_quadrados: 80,
          qnt_camas: 2,
          qnt_carro: 1,
          endereco: "Rua A, 123",
          valor_condominio: 300,
          imagem: "https://nextui.org/images/card-example-1.jpeg",
        },
        {
          id: "AP000",
          tipo_imovel: "Apartamento",
          valor_aluguel: 1500,
          valor_venda: 350000,
          metros_quadrados: 100,
          qnt_camas: 3,
          qnt_carro: 2,
          endereco: "Avenida Barão do Rio Branco, Campinas, SP",
          valor_condominio: 400,
          imagem: "https://nextui.org/images/card-example-2.jpeg",
        },
        {
          id: "AP00013",
          tipo_imovel: "Apartamento",
          valor_aluguel: 1500,
          valor_venda: 350000,
          metros_quadrados: 100,
          qnt_camas: 3,
          qnt_carro: 2,
          endereco: "Avenida Barão do Rio Branco, Campinas, SP",
          valor_condominio: 400,
          imagem: "https://nextui.org/images/card-example-5.jpeg",
        },
        {
          id: "AP12312",
          tipo_imovel: "Apartamento",
          valor_aluguel: 1500,
          valor_venda: 350000,
          metros_quadrados: 100,
          qnt_camas: 3,
          qnt_carro: 2,
          endereco: "Avenida Barão do Rio Branco, Campinas, SP",
          valor_condominio: 400,
          imagem:
            "https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
        },
        {
          id: "AP1231",
          tipo_imovel: "Apartamento",
          valor_aluguel: 1500,
          valor_venda: 350000,
          metros_quadrados: 100,
          qnt_camas: 3,
          qnt_carro: 2,
          endereco: "Avenida Barão do Rio Branco, Campinas, SP",
          valor_condominio: 400,
          imagem: "",
        },
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
      ];

      setListaImoveis(data);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading..." />
      </div>
    );
  }

  return (
    <div className="container w-full h-full flex flex-col gap-5 justify-between">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex text-left items-center w-full justify-center gap-2">
          <div>
            <span className="text-3xl lg:text-4xl">Pedro Araujo&nbsp;</span>
            <span className={title({ color: "violet", size: "sm" })}>
              Silva&nbsp;
            </span>
          </div>
        </div>
        <Button onPress={onOpen}>Add imóvel</Button>
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
                    {...register("endereco")}
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    isInvalid={!!errors.endereco}
                    label="Endereço"
                    placeholder="Digite seu endereço"
                    variant="bordered"
                  />
                  {errors.endereco && (
                    <span className="text-red-500">
                      {errors.endereco.message}
                    </span>
                  )}
                  <Input
                    {...register("valor", { valueAsNumber: true })}
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    isInvalid={!!errors.valor}
                    label="Valor"
                    placeholder="Digite o valor"
                    variant="bordered"
                  />
                  {errors.valor && (
                    <span className="text-red-500">{errors.valor.message}</span>
                  )}
                  <Input
                    {...register("tamanho", { valueAsNumber: true })}
                    isInvalid={!!errors.tamanho}
                    label="Tamanho"
                    placeholder="0"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">m²</span>
                      </div>
                    }
                    type="number"
                    variant="bordered"
                  />
                  {errors.tamanho && (
                    <span className="text-red-500">
                      {errors.tamanho.message}
                    </span>
                  )}
                  <Select
                    {...register("tipoCasa")}
                    isInvalid={!!errors.tipoCasa}
                    label="Selecione o tipo da moradia"
                    variant="bordered"
                  >
                    {tipo_casa.map((tipo) => (
                      <SelectItem key={tipo.key}>{tipo.label}</SelectItem>
                    ))}
                  </Select>
                  {errors.tipoCasa && (
                    <span className="text-red-500">
                      {errors.tipoCasa.message}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
        {listaImoveis.map(renderImovel)}
      </div>
    </div>
  );
}

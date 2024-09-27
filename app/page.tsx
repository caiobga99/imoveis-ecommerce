"use client";
import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/icons";
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Spinner,
  Skeleton,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { title } from "@/components/primitives";
import { Imovel } from "../types/imovel";

export default function Home() {
  const [listaImoveis, setListaImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoritados, setFavoritados] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());

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

  const toggleFavoritar = (id: string) => {
    setFavoritados((prev) => {
      const newFavoritados = new Set(prev);
      newFavoritados.has(id)
        ? newFavoritados.delete(id)
        : newFavoritados.add(id);
      return newFavoritados;
    });
  };

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
          <div className="h-full rounded-lg bg-default-300"></div>
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
          onLoad={() => handleImageLoadEnd(imovel.id)}
          onError={() => handleImageLoadEnd(imovel.id)}
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
    <div className="flex justify-center" key={imovel.id}>
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner label="Loading..." color="warning" />
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-1">
      <div className="inline-block max-w-xl text-center mb-4">
        <span className={title()}>Destaque de&nbsp;</span>
        <span className={title({ color: "violet" })}>imóveis&nbsp;</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
        {listaImoveis.map(renderImovel)}
      </div>
    </section>
  );
}

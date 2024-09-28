"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

import { title } from "@/components/primitives";
export default function FaqPage() {
  interface IFaqContent {
    title: string;
    content: string;
    id: number;
  }
  const faqContent: IFaqContent[] = [
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 1,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 2,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 3,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 6,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 7,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 5,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 51,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 52,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 5212,
    },
    {
      title: "O Ecommerce-Imoveis é seguro?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      id: 521,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-1">
      <div className="inline-block max-w-xl text-center mb-4">
        <span className={title({ size: "sm" })}>Perguntas&nbsp;</span>
        <span className={title({ color: "violet", size: "sm" })}>
          Frequentes&nbsp;
        </span>
      </div>
      <div className="gap-4 px-8 w-full">
        <Accordion
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          {faqContent.map(({ title, content, id }) => (
            <AccordionItem key={id} aria-label="Accordion 1" title={title}>
              {content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

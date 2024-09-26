export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Area do Candidato",
      href: "/candidato",
    },
    {
      label: "Area do Inquilino",
      href: "/inquilino",
    },
    {
      label: "FAQ",
      href: "/faq",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Area do Candidato",
      href: "/candidato",
    },
    {
      label: "Area do Inquilino",
      href: "/inquilino",
    },
    {
      label: "Registrar",
      href: "/register",
    },
    {
      label: "Entrar",
      href: "/login",
    },
    {
      label: "FAQ",
      href: "/faq",
    },

    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

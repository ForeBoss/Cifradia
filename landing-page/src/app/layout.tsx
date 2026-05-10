import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cifradia.com"),
  title: {
    default: "Cifradia | Consultoría TI",
    template: "%s | Cifradia",
  },
  description: "Consultoría, implementación y acompañamiento tecnológico para empresas que quieren crecer con más estructura, seguridad y claridad.",
  applicationName: "Cifradia",
  generator: "Next.js",
  keywords: ["consultoría TI", "Cifradia", "Microsoft 365", "Azure", "seguridad", "automatización", "datos"],
  authors: [{ name: "Cifradia" }],
  creator: "Cifradia",
  publisher: "Cifradia",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Cifradia",
    title: "Cifradia | Consultoría TI",
    description: "Consultoría, implementación y acompañamiento tecnológico para empresas que quieren crecer con más estructura, seguridad y claridad.",
    images: [{ url: "/assets/img/cifradia-logo.png", width: 512, height: 512, alt: "Cifradia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cifradia | Consultoría TI",
    description: "Consultoría, implementación y acompañamiento tecnológico para empresas que quieren crecer con más estructura, seguridad y claridad.",
    images: ["/assets/img/cifradia-logo.png"],
  },
  icons: {
    icon: [{ url: "/assets/img/cifradia-favicon.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/assets/img/cifradia-favicon.png",
    apple: "/assets/img/cifradia-favicon.png",
  },
  verification: {
    google: "oWUohpRGIu3yd4f9tFON_mYwPJgsM1aFZw8vByK5AcA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Outfit:wght@300;400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/cifradia-favicon.png" />
        <link rel="shortcut icon" href="/assets/img/cifradia-favicon.png" />
        <link rel="apple-touch-icon" href="/assets/img/cifradia-favicon.png" />
      </head>
      <body>
        {children}
        <Script id="reb2b-tracker" src="/assets/js/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

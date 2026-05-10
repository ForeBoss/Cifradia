import Script from "next/script";
import type { StaticPageKey } from "@/generated/static-pages";
import { staticPages } from "@/generated/static-pages";

type LegacyPageProps = {
  pageKey: StaticPageKey;
};

const LEGACY_SCRIPT_VERSION = "20260506-favicon-1";
const LEGACY_NAV_CLASS = 'hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2';
const CENTERED_NAV_CLASS = 'hidden md:flex items-center gap-8';

export function LegacyPage({ pageKey }: LegacyPageProps) {
  const page = staticPages[pageKey];
  const sanitizedHtml = page.html.includes(LEGACY_NAV_CLASS) ? page.html.replaceAll(LEGACY_NAV_CLASS, CENTERED_NAV_CLASS) : page.html;

  return (
    <>
      {/* El HTML proviene del sitio estático propio y se sirve SSR para conservar contenido y SEO. */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      {page.scripts.map((script, index) => {
        const scriptId = `legacy-${pageKey}-${index}`;

        if (script.type === "external") {
          const src = script.src.startsWith("/assets/js/")
            ? `${script.src}${script.src.includes("?") ? "&" : "?"}v=${LEGACY_SCRIPT_VERSION}`
            : script.src;

          return <Script key={scriptId} id={scriptId} src={src} strategy="afterInteractive" />;
        }

        return (
          <Script key={scriptId} id={scriptId} strategy="afterInteractive">
            {script.code}
          </Script>
        );
      })}
    </>
  );
}
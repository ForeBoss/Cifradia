import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const projectRoot = path.resolve(".");
const sourceRoot = path.resolve(projectRoot, "..", "..", "Cifradia", "landing-page");
const publicAssets = path.join(projectRoot, "public", "assets");
const legacyStyles = path.join(projectRoot, "src", "styles", "legacy");
const generatedDir = path.join(projectRoot, "src", "generated");

const pages = [
  { key: "home", file: "index.html", route: "/", description: "Consultoría TI integral para empresas que quieren crecer con estructura, seguridad y claridad." },
  { key: "blog", file: "blog.html", route: "/blog", description: "Aprendizajes, criterios y decisiones sobre infraestructura, nube, seguridad, datos y operación tecnológica." },
  { key: "contact", file: "contact.html", route: "/contact", description: "Página de contacto de Cifradia para solicitar asesoría tecnológica y coordinar una reunión virtual o presencial." },
  { key: "terms", file: "terms.html", route: "/terms", description: "Términos y condiciones de uso del sitio web de Cifradia y lineamientos generales para servicios de consultoría TI." },
];

function extractBetween(value, start, end) {
  const startIndex = value.indexOf(start);
  const endIndex = value.lastIndexOf(end);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error(`No se pudo extraer ${start}...${end}`);
  }
  return value.slice(startIndex + start.length, endIndex);
}

function extractTitle(html) {
  return html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || "Cifradia";
}

function extractDescription(html, fallback) {
  return html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim() || fallback;
}

function normalizeLinks(html) {
  return html
    .replace(/href="index\.html#([^"#]+)"/g, 'href="/#$1"')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="blog\.html"/g, 'href="/blog"')
    .replace(/href="contact\.html#([^"#]+)"/g, 'href="/contact#$1"')
    .replace(/href="contact\.html"/g, 'href="/contact"')
    .replace(/href="terms\.html"/g, 'href="/terms"')
    .replace(/href="blog-post\.html\?slug=([^"&]+)"/g, 'href="/blog/$1"')
    .replace(/href="playground\.html"/g, 'href="/#servicios"')
    .replace(/href="pricing\.html"/g, 'href="/contact"')
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/href="assets\//g, 'href="/assets/');
}

function splitScripts(body) {
  const scripts = [];
  const html = body.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (match, attrs, content) => {
    const src = attrs.match(/src=["']([^"']+)["']/i)?.[1];
    if (src) {
      scripts.push({ type: "external", src: src.replace(/^assets\//, "/assets/") });
    } else if (content.trim()) {
      scripts.push({ type: "inline", code: content.trim() });
    }
    return "";
  });
  return { html: html.trim(), scripts };
}

function toTs(value) {
  return JSON.stringify(value, null, 2);
}

async function buildStaticPages() {
  const output = {};

  for (const page of pages) {
    const source = await readFile(path.join(sourceRoot, page.file), "utf8");
    const body = extractBetween(source, "<body>", "</body>");
    const { html, scripts } = splitScripts(normalizeLinks(body));

    output[page.key] = {
      route: page.route,
      title: extractTitle(source),
      description: extractDescription(source, page.description),
      html,
      scripts,
    };
  }

  await writeFile(
    path.join(generatedDir, "static-pages.ts"),
    [
      "/* Archivo generado desde Cifradia/landing-page. No editar a mano. */",
      "export type StaticPageKey = keyof typeof staticPages;",
      `export const staticPages = ${toTs(output)} as const;`,
      "",
    ].join("\n"),
  );
}

async function buildBlogData() {
  const source = await readFile(path.join(sourceRoot, "assets", "js", "blog-posts.js"), "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context);

  const posts = Object.fromEntries(
    Object.entries(context.window.CIFRADIA_BLOG_POSTS).map(([slug, post]) => [
      slug,
      {
        ...post,
        sections: post.sections.map((section) => ({
          ...section,
          paragraphs: section.paragraphs || [],
          bullets: section.bullets || [],
        })),
      },
    ]),
  );

  await writeFile(
    path.join(generatedDir, "blog-data.ts"),
    [
      "/* Archivo generado desde assets/js/blog-posts.js. No editar a mano. */",
      "export const blogPosts = " + toTs(posts) + " as const;",
      "export const blogIcons = " + toTs(context.window.CIFRADIA_BLOG_ICONS) + " as const;",
      "export type BlogSlug = keyof typeof blogPosts;",
      "",
    ].join("\n"),
  );
}

async function copyAssetsAndStyles() {
  await rm(publicAssets, { recursive: true, force: true });
  await mkdir(path.dirname(publicAssets), { recursive: true });
  await cp(path.join(sourceRoot, "assets"), publicAssets, { recursive: true });

  await rm(legacyStyles, { recursive: true, force: true });
  await mkdir(legacyStyles, { recursive: true });
  await cp(path.join(sourceRoot, "assets", "css"), legacyStyles, { recursive: true });

  const mainCssPath = path.join(legacyStyles, "main.css");
  const mainCss = await readFile(mainCssPath, "utf8");
  await writeFile(
    mainCssPath,
    mainCss.replace(/@font-face\{font-family:ABC Favorit Mono[\s\S]*?font-display:swap\}/g, ""),
  );
}

async function main() {
  await mkdir(generatedDir, { recursive: true });
  await copyAssetsAndStyles();
  await buildStaticPages();
  await buildBlogData();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
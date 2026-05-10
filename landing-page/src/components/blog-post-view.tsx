import Image from "next/image";
import Link from "next/link";
import { blogIcons, blogPosts, type BlogSlug } from "@/generated/blog-data";

type BlogPostViewProps = {
  slug: BlogSlug;
};

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("") || "CF"
  );
}

export function BlogPostView({ slug }: BlogPostViewProps) {
  const post = blogPosts[slug];
  const icon = blogIcons[post.icon];

  return (
    <>
      <a id="cifradia-bar" href="https://www.cifradia.com/" target="_blank" rel="noreferrer" aria-label="Ir a Cifradia">
        ¿No tienes claro qué tecnología implementar? Te ayudamos a decidir con criterio.
      </a>

      <div className="app bg-[#F8F8F8] text-[#191919]">
        <header
          className="navbar-dash-march sticky top-0 z-50 w-full bg-[#F8F8F8]"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.25) 60%, transparent 60%)",
            backgroundSize: "12px 1px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left bottom",
          }}
        >
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-10">
            <Link className="flex items-center gap-1.5" href="/">
              <Image alt="Cifradia — Consultoría TI" className="h-11 w-auto block" src="/assets/img/cifradia-logo.png" width={220} height={64} priority style={{ filter: "none" }} />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link className="text-[15px] tracking-[-0.02em] text-neutral-700 hover:text-neutral-900 transition-colors" href="/">
                Inicio
              </Link>
              <Link className="text-[15px] tracking-[-0.02em] text-neutral-700 hover:text-neutral-900 transition-colors" href="/#servicios">
                Servicios
              </Link>
              <Link className="text-[15px] tracking-[-0.02em] text-neutral-900 transition-colors" href="/blog" aria-current="page">
                Blog
              </Link>
              <Link className="text-[15px] tracking-[-0.02em] text-neutral-700 hover:text-neutral-900 transition-colors" href="/contact">
                Contacto
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                className="inline-flex h-[36px] items-center justify-center gap-[10px] rounded-[2px] border border-[#191919] bg-[#191919] px-[14px] py-[8px] text-[15px] font-medium tracking-[-0.02em] text-white hover:bg-[#2a2a2a] transition-colors"
                href="/contact#formulario-contacto"
                style={{ fontFamily: '"General Sans", sans-serif' }}
              >
                Solicitar asesoría
              </Link>
            </div>

            <Link className="md:hidden inline-flex min-h-0 min-w-0 items-center justify-center text-[13px] font-medium tracking-[-0.02em] text-[#191919]" href="/blog">
              Blog
            </Link>
          </div>
        </header>

        <main id="blog-post-root">
          <section className="relative bg-[#F8F8F8]">
            <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-0">
              <div aria-hidden="true" className="hidden lg:block absolute top-0 bottom-0 left-0 border-l border-dashed border-black/20 z-20 pointer-events-none" />
              <div aria-hidden="true" className="hidden lg:block absolute top-0 bottom-0 right-0 border-l border-dashed border-black/20 z-20 pointer-events-none" />
              <div className="blog-post-shell">
                <div className="blog-post-wrap">
                  <Link className="blog-post-back" href="/blog">
                    ← Volver al blog
                  </Link>

                  <header className="blog-post-header">
                    <h1 className="blog-post-title">{post.title}</h1>
                    <div className="blog-post-author-row">
                      <div className="blog-post-avatar" aria-hidden="true">
                        {getInitials(post.author)}
                      </div>
                      <div className="blog-post-author-meta">
                        <div className="blog-post-author-name">{post.author}</div>
                        <div className="blog-post-author-role">{post.authorRole}</div>
                      </div>
                    </div>
                    <div className="blog-post-date">
                      {post.date} · {post.readTime}
                    </div>
                  </header>

                  <div className={`blog-card-media blog-card-media--${post.coverVariant} blog-post-cover`}>
                    <div className="blog-card-icon-wrap">
                      <span className="blog-card-icon-box" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} />
                    </div>
                  </div>

                  <p className="blog-post-lead">{post.lead}</p>

                  <section className="blog-post-summary">
                    <div className="blog-post-summary-title">Lo esencial</div>
                    <ul className="blog-post-summary-list">
                      {post.summary.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <div className="blog-post-content">
                    {post.sections.map((section) => (
                      <section className="blog-post-section" key={section.heading}>
                        <h2>{section.heading}</h2>
                        {section.paragraphs?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.bullets?.length ? (
                          <ul>
                            {section.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    ))}
                  </div>

                  <div className="blog-post-note">{post.note}</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative bg-[#202020] text-white border-t border-white/10">
          <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-14 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-10 cifradia-footer-grid">
              <div className="cifradia-footer-brand">
                <Link className="inline-flex items-center" href="/" aria-label="Ir al inicio de Cifradia">
                  <Image alt="Cifradia | Consultoría TI" className="cifradia-footer-logo" src="/assets/img/cifradia-logo-blanco.png" width={220} height={64} />
                </Link>
                <p className="mt-6 max-w-[340px] text-[15px] leading-[1.65] text-white/68" style={{ fontFamily: '"General Sans", sans-serif' }}>
                  Consultoría, implementación y acompañamiento tecnológico para empresas que quieren crecer con más estructura, seguridad y claridad.
                </p>
              </div>
              <div>
                <div className="font-mono uppercase text-[12px] tracking-wider text-white/45">Navegación</div>
                <ul className="mt-5 space-y-4">
                  <li>
                    <Link href="/" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/#servicios" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      Servicios
                    </Link>
                  </li>
                  <li>
                    <Link href="/#como-trabajamos" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      Cómo trabajamos
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-mono uppercase text-[12px] tracking-wider text-white/45">Explorar</div>
                <ul className="mt-5 space-y-4">
                  <li>
                    <Link href="/blog" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a href="https://cifradia.com/empresa" target="_blank" rel="noreferrer" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      Empresa
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-mono uppercase text-[12px] tracking-wider text-white/45">Legal</div>
                <ul className="mt-5 space-y-4">
                  <li>
                    <Link href="/terms" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      Términos y condiciones
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-mono uppercase text-[12px] tracking-wider text-white/45">Redes</div>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a href="https://www.linkedin.com/company/cifradia-ai" target="_blank" rel="noreferrer" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/cifradia" target="_blank" rel="noreferrer" className="text-[15px] text-white hover:text-white/70 transition-colors">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-white/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-mono text-[12px] text-white/45">© 2026 Cifradia. Todos los derechos reservados.</div>
              <div className="text-[13px] text-white/45" style={{ fontFamily: '"General Sans", sans-serif' }}>
                Bogotá, Colombia
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
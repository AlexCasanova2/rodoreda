import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import heroImage from "../assets/mpzkpz61-Rodoreda_ICEC.pdf.png";
import dossierPdf from "../mpzkpz61-Rodoreda_ICEC.pdf";

const navItems = [
  ["#sinopsis", "Sinopsi"],
  ["#personajes", "Personatges"],
  ["#contacto", "Contacte"],
];

const facts = [
  ["Título", "RODOREDA"],
  ["Format", "Llargmetratge"],
  ["Gènere", "Documental"],
  ["Públic", "General"],
  ["Durada", "90 min"],
  ["Idioma VO", "Català"],
  ["Imatge", "Digital 4K"],
  ["So", "Dolby Digital 5.1"],
  ["Productora", "Benecé Produccions SL"],
];

const features = [
  {
    title: "Arxiu personal",
    text: "Cartes, dietaris, fotografies, ràdio i videografia com a mapa d'una vida intensa.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 7h16M4 12h10M4 17h16" />
      </svg>
    ),
  },
  {
    title: "Converses íntimes",
    text: "Biògrafes, estudioses, lectores i testimonis expliquen els fets històrics i literaris de la seva trajectòria.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "La paraula de Mercè",
    text: "Laura Conejero i Lluís Homar donen veu a pensaments, emocions i cartes de Rodoreda i Armand Obiols.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
];

const people = [
  ["Sílvia Munt", "Conductora, directora i coguionista del documental. Va ser escollida per Rodoreda per interpretar la Colometa.", "Mirada guia"],
  ["Laura Conejero i Lluís Homar", "Transmissors dels pensaments i sentiments de Mercè Rodoreda i Armand Obiols.", "Veus interpretades"],
  ["Carme Arnau", "Historiadora de la literatura catalana i autora d'estudis fonamentals sobre Rodoreda.", "Biografia"],
  ["Marta Pessarrodona", "Poeta, narradora i crítica literària; amiga de Mercè Rodoreda.", "Memòria literària"],
  ["Mercè Ibarz", "Escriptora, periodista cultural i investigadora; autora de Mercè Rodoreda. Un retrat.", "Investigació"],
  ["Anna Mª Saludes", "Traductora i docent, especialista en Rodoreda a Florència i Pisa.", "Exili i traducció"],
  ["Marta Nadal", "Filòloga, crítica literària i autora de treballs sobre memòria, arxiu i obra rodorediana.", "Arxiu"],
  ["Quim Torra", "Autor d'una biografia documentada d'Armand Obiols, figura clau en la vida de Rodoreda.", "Obiols"],
];

const pressItems = [
  ["Dossier", "RODOREDA · Projecte documental", "Storyline, sinopsi, tractament visual, equip, producció i historial de Benecé.", "PDF"],
  ["Referència", "Web documental d'una sola pàgina", "Estructura inspirada en navegació de sinopsi, tràiler, participants, premsa i contacte.", "Web"],
  ["Tipografia", "ASVCodar LT Bold + Montserrat", "Títols en majúscules amb presència de cartell; lectura neta i sòbria per a textos llargs.", "Local"],
];

function getRevealProps(reduceMotion, delay = 0, y = 28) {
  if (reduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y, scale: 0.985 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.18 },
    transition: {
      type: "spring",
      stiffness: 52,
      damping: 16,
      mass: 1.05,
      delay,
    },
  };
}

export default function App() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#sinopsis");
  const reduceMotion = useReducedMotion();

  const heroReveal = getRevealProps(reduceMotion, 0.1, 36);
  const sectionReveal = getRevealProps(reduceMotion);
  const delayedSectionReveal = getRevealProps(reduceMotion, 0.12);
  useEffect(() => {
    document.body.style.overflow = isTrailerOpen || isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isTrailerOpen]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setIsTrailerOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className="topnav"
        data-od-id="topnav"
        initial={reduceMotion ? false : { opacity: 0, y: -20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          reduceMotion
            ? undefined
            : {
                type: "spring",
                stiffness: 70,
                damping: 18,
                mass: 1,
              }
        }
      >
        <div className="container topnav-inner">
          <a className="logo" href="#inicio" aria-label="Inici de RODOREDA">
            RODOREDA
          </a>
          <nav aria-label="Navegació principal">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} className={activeSection === href ? "is-active" : ""}>
                {label}
              </a>
            ))}
          </nav>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Tanca el menú" : "Obre el menú"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
          </button>
          <button className="btn btn-primary" type="button" onClick={() => setIsTrailerOpen(true)}>
            Veure avançament
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
          >
            <motion.div
              id="mobile-menu"
              className="mobile-menu-panel"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 110, damping: 18, mass: 0.95 }
              }
            >
              <nav className="mobile-menu-nav" aria-label="Navegació mòbil">
                {navItems.map(([href, label], index) => (
                  <motion.a
                    key={href}
                    href={href}
                    className={activeSection === href ? "is-active" : ""}
                    onClick={() => setIsMenuOpen(false)}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={reduceMotion ? undefined : { delay: 0.04 * index, duration: 0.34, ease: "easeOut" }}
                  >
                    {label}
                  </motion.a>
                ))}
                <motion.button
                  className="btn btn-primary mobile-menu-cta"
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsTrailerOpen(true);
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={reduceMotion ? undefined : { delay: 0.22, duration: 0.34, ease: "easeOut" }}
                >
                  Veure avançament
                </motion.button>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="content">
        <section className="section hero" id="inicio" data-od-id="hero">
          <img className="hero-image" src={heroImage} alt="Imatge del dossier del documental RODOREDA" />
          <div className="hero-film" aria-hidden="true" />
          <div className="hero-shell">
            <div className="hero-content">
              <motion.div
                className="hero-copy"
                {...heroReveal}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        y: {
                          duration: 7.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
              >
                <h1 className="hero-title">RODOREDA</h1>
                <motion.div
                  className="hero-note"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={reduceMotion ? undefined : { once: true, amount: 0.3 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          type: "spring",
                          stiffness: 48,
                          damping: 16,
                          mass: 1.1,
                          delay: 0.18,
                        }
                  }
                >
                  <p className="lead hero-lead">
                  Un viatge íntim i revelador per descobrir Mercè Rodoreda, l'escriptora més universal en llengua catalana, a través d'arxiu personal, testimonis i memòria viva.
                  </p>
                  <motion.div className="hero-cta" {...getRevealProps(reduceMotion, 0.28, 18)}>
                    <motion.button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setIsTrailerOpen(true)}
                      whileHover={reduceMotion ? undefined : { y: -1.5, scale: 1.01 }}
                      whileTap={reduceMotion ? undefined : { y: 0, scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    >
                      Veure avançament
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section" id="sinopsis" data-od-id="sinopsis">
          <div className="container grid-2-1">
            <motion.div className="stack" {...sectionReveal}>
              <p className="eyebrow">Storyline · Sinopsi</p>
              <h2>Buscar la dona darrere la màscara.</h2>
              <div className="intro-copy">
                <p>Sílvia Munt, marcada per la seva complicitat amb Rodoreda des del rodatge de <em>La plaça del Diamant</em>, guia aquest documental per entrar en la vida, els pensaments, la mirada, les contradiccions, els amors i la paraula d'una escriptora única.</p>
                <p>Amb la col·laboració de la Fundació Mercè Rodoreda, el film accedeix a fotografies, manuscrits, cartes i dietaris per dibuixar el mapa d'una vida travessada per la guerra, l'exili, la maternitat, el feminisme, la supervivència i la incomprensió.</p>
                <p>Rodoreda va començar a escriure per pura desesperació. A través de l'arxiu personal i dels testimonis de biògrafes i lectores, la pel·lícula recorre també la història de Catalunya i Europa durant el segle XX.</p>
              </div>
            </motion.div>
            <motion.aside className="card facts" aria-label="Fitxa del projecte" {...delayedSectionReveal}>
              {facts.map(([label, value]) => (
                <div key={label} className="fact">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </motion.aside>
          </div>
        </section>

        <section className="section visual-bg" data-od-id="tratamiento-visual">
          <img src={heroImage} alt="Fons enfosquit del dossier visual de RODOREDA" />
          <div className="container visual-content">
            <motion.div className="visual-intro" {...sectionReveal}>
              <p className="eyebrow">Tractament visual</p>
              <h2>La importància de l'objecte com a porta a un món íntim.</h2>
              <p className="lead visual-lead">El material d'arxiu es disposa sobre la taula i es filma amb plans de detall: fotografies, cartes, grafologia, objectes personals. L'objectiu no és il·lustrar una biografia, sinó atrapar l'emoció que desprenen les seves petjades.</p>
            </motion.div>
            <div className="grid-3 visual-features">
              {features.map((feature, index) => (
                <motion.div key={feature.title} className="feature card-flat" {...getRevealProps(reduceMotion, index * 0.08, 22)}>
                  <div className="feature-mark" aria-hidden="true">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" data-od-id="quote">
          <div className="container grid-2">
            <motion.div {...sectionReveal}>
              <div className="quote-mark">“</div>
              <blockquote className="quote">La vida privada de Mercè Rodoreda és un dels misteris més ben guardats de la molt misteriosa ciutat de Barcelona.</blockquote>
              <p className="quote-author">Gabriel García Márquez · <em>El País</em></p>
            </motion.div>
            <motion.div className="stack quote-copy" {...delayedSectionReveal}>
              <p>El documental assumeix aquest misteri sense clausurar-lo. Cerca claus: el desarrelament, el doble exili, la relació amb Armand Obiols, la ferocitat de l'escriptura i la manera com una obra literària pot sobreviure a tot.</p>
              <hr className="rule-strong" />
              <p className="meta">La plaça del Diamant va ser traduïda a més de 40 idiomes.</p>
            </motion.div>
          </div>
        </section>

        <section className="section" id="personajes" data-od-id="personajes">
          <div className="container stack section-gap-lg">
            <motion.div className="row-between" {...sectionReveal}>
              <div className="max-copy">
                <p className="eyebrow">Personatges</p>
                <h2>Veus per reconstruir una presència.</h2>
              </div>
              <span className="pill">Actrius · Expertes · Lectors</span>
            </motion.div>
            <div className="people-grid">
              {people.map(([name, description, role], index) => (
                <motion.article key={name} className="person" {...getRevealProps(reduceMotion, index * 0.05, 20)}>
                  <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                  <span className="meta">{role}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" data-od-id="prensa">
          <div className="container">
            <motion.div className="row-between section-margin-md" {...sectionReveal}>
              <h2>Material de premsa</h2>
              <a className="btn btn-ghost btn-arrow" href={dossierPdf} target="_blank" rel="noreferrer">
                Obrir dossier PDF
              </a>
            </motion.div>
            <div className="press-list">
              {pressItems.map(([type, title, description, format], index) => (
                <motion.article key={title} className="log-row" {...getRevealProps(reduceMotion, index * 0.08, 20)}>
                  <span className="meta">{type}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <span className="pull meta">{format}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contacto" data-od-id="contacto">
          <div className="container contact-card">
            <motion.div {...sectionReveal}>
              <p className="eyebrow">Contacte</p>
              <h2>Benecé Produccions SL</h2>
              <p className="lead contact-lead">Una productora amb trajectòria en documental, ficció, televisió, publicitat i comunicació audiovisual des de 1986.</p>
            </motion.div>
            <motion.div className="card stack" {...delayedSectionReveal}>
              <p>
                <strong>Passatge Tona, 10</strong>
                <br />
                08023 Barcelona
              </p>
              <p>
                <a href="https://www.benece.es">www.benece.es</a>
                <br />
                <a href="mailto:benece@benece.es">benece@benece.es</a>
              </p>
              <div>
                <span className="tag">Documental</span>
                <span className="tag">Digital 4K</span>
                <span className="tag">Català VO</span>
                <span className="tag">90 min</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.footer className="pagefoot" data-od-id="footer" {...sectionReveal}>
        <div className="container row-between">
          <span>© RODOREDA · Benecé Produccions SL</span>
          <span className="meta">Un documental de Sílvia Munt</span>
        </div>
      </motion.footer>

      <AnimatePresence>
        {isTrailerOpen ? (
          <motion.div
            className="modal is-open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trailer-title"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsTrailerOpen(false);
              }
            }}
          >
            <motion.div
              className="modal-card"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="modal-head">
                <div>
                  <p className="eyebrow modal-eyebrow" id="trailer-title">
                    Avançament
                  </p>
                  <p className="meta modal-meta">Espai reservat per al tràiler oficial</p>
                </div>
                <button className="close" type="button" aria-label="Tanca el tràiler" onClick={() => setIsTrailerOpen(false)}>
                  ×
                </button>
              </div>
              <div className="trailer-frame">
                <motion.span
                  className="play-mark"
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.04, 1],
                          opacity: [0.92, 1, 0.92],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  ▶
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

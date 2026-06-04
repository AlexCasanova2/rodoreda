import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import heroImage from "../assets/mpzkpz61-Rodoreda_ICEC.pdf.png";
import dossierPdf from "../mpzkpz61-Rodoreda_ICEC.pdf";

const navItems = [
  ["#sinopsis", "Sinopsis"],
  ["#mirada", "Mirada"],
  ["#personajes", "Personajes"],
  ["#produccion", "Producción"],
  ["#contacto", "Contacto"],
];

const facts = [
  ["Título", "RODOREDA"],
  ["Formato", "Largometraje"],
  ["Género", "Documental"],
  ["Público", "General"],
  ["Duración", "90 min"],
  ["Idioma VO", "Catalán"],
  ["Imagen", "Digital 4K"],
  ["Sonido", "Dolby Digital 5.1"],
  ["Productora", "Benecé Produccions SL"],
];

const features = [
  {
    title: "Archivo personal",
    text: "Cartas, dietarios, fotografías, radio y videografía como mapa de una vida intensa.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 7h16M4 12h10M4 17h16" />
      </svg>
    ),
  },
  {
    title: "Conversaciones íntimas",
    text: "Biógrafas, estudiosas, lectoras y testigos explican los hechos históricos y literarios de su trayectoria.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "La palabra de Mercè",
    text: "Laura Conejero y Lluís Homar dan voz a pensamientos, emociones y cartas de Rodoreda y Armand Obiols.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
];

const people = [
  ["Sílvia Munt", "Conductora, directora y coguionista del documental. Fue escogida por Rodoreda para interpretar a Colometa.", "Mirada guía"],
  ["Laura Conejero y Lluís Homar", "Transmisores de los pensamientos y sentimientos de Mercè Rodoreda y Armand Obiols.", "Voces interpretadas"],
  ["Carme Arnau", "Historiadora de la literatura catalana y autora de estudios fundamentales sobre Rodoreda.", "Biografía"],
  ["Marta Pessarrodona", "Poeta, narradora y crítica literaria; amiga de Mercè Rodoreda.", "Memoria literaria"],
  ["Mercè Ibarz", "Escritora, periodista cultural e investigadora; autora de Mercè Rodoreda. Un retrat.", "Investigación"],
  ["Anna Mª Saludes", "Traductora y docente, especialista en Rodoreda en Florencia y Pisa.", "Exilio y traducción"],
  ["Marta Nadal", "Filóloga, crítica literaria y autora de trabajos sobre memoria, archivo y obra rodorediana.", "Archivo"],
  ["Quim Torra", "Autor de una biografía documentada de Armand Obiols, figura clave en la vida de Rodoreda.", "Obiols"],
];

const phases = [
  {
    title: "Preproducción",
    items: [
      ["Sep-Dic 2024", "Documentación y elaboración de guion."],
      ["Ene-Mar 2025", "Reuniones de producción, dirección, arte y DOP."],
      ["Abril 2025", "Localizaciones, lecturas y ensayos."],
    ],
  },
  {
    title: "Producción",
    items: [
      ["Mayo-Junio 2025", "Rodaje de cinco semanas."],
      ["Septiembre-Octubre 2025", "Rodaje en Viena e IEC."],
    ],
  },
  {
    title: "Postproducción",
    items: [
      ["Finales de junio a octubre 2025", "Montaje y banda sonora original."],
      ["Noviembre 2025", "Postproducción de imagen y sonido."],
    ],
  },
  {
    title: "Entrega",
    items: [["Diciembre 2025", "Entrega del largometraje documental."]],
  },
];

const pressItems = [
  ["Dossier", "RODOREDA · Proyecto documental", "Storyline, sinopsis, tratamiento visual, equipo, producción e historial de Benecé.", "PDF"],
  ["Referencia", "Web documental de una sola página", "Estructura inspirada en navegación de sinopsis, trailer, participantes, prensa y contacto.", "Web"],
  ["Tipografía", "ASVCodar LT Bold + Montserrat", "Títulos en mayúsculas con presencia de cartel; lectura limpia y sobria para textos largos.", "Local"],
];

function createBeam(width, height) {
  return {
    x: Math.random() * width * 1.4 - width * 0.2,
    y: Math.random() * height * 1.4 - height * 0.2,
    width: 40 + Math.random() * 80,
    length: height * 1.9,
    angle: -34 + Math.random() * 8,
    speed: 0.35 + Math.random() * 0.55,
    opacity: 0.08 + Math.random() * 0.1,
    hue: 38 + Math.random() * 12,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.015 + Math.random() * 0.02,
  };
}

function HeroBeamsBackground() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const beamsRef = useRef([]);
  const boundsRef = useRef({ width: 0, height: 0 });
  const visibleRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!parent || !ctx) {
      return undefined;
    }

    const beamCount = window.innerWidth < 768 ? 8 : 12;
    const targetFrameDuration = 1000 / 30;

    const updateCanvasSize = () => {
      const bounds = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      boundsRef.current = { width: bounds.width, height: bounds.height };

      canvas.width = bounds.width * dpr;
      canvas.height = bounds.height * dpr;
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      beamsRef.current = Array.from({ length: beamCount }, () => createBeam(bounds.width, bounds.height));
    };

    const resetBeam = (beam, width, height, index) => {
      const lane = index % 3;
      const spacing = width / 3;

      beam.y = height + 120;
      beam.x = lane * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.55;
      beam.width = 64 + Math.random() * 54;
      beam.length = height * 1.9;
      beam.speed = 0.22 + Math.random() * 0.24;
      beam.opacity = 0.08 + Math.random() * 0.06;
      beam.hue = 36 + Math.random() * 10;
      beam.pulse = Math.random() * Math.PI * 2;
    };

    const drawBeam = (beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = beam.opacity * (0.84 + Math.sin(beam.pulse) * 0.16);
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      gradient.addColorStop(0, `hsla(${beam.hue}, 56%, 72%, 0)`);
      gradient.addColorStop(0.15, `hsla(${beam.hue}, 56%, 72%, ${pulsingOpacity * 0.42})`);
      gradient.addColorStop(0.5, `hsla(${beam.hue}, 56%, 72%, ${pulsingOpacity})`);
      gradient.addColorStop(0.85, `hsla(${beam.hue}, 56%, 72%, ${pulsingOpacity * 0.45})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 56%, 72%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = (time) => {
      if (!visibleRef.current) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      if (time - lastFrameTimeRef.current < targetFrameDuration) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      lastFrameTimeRef.current = time;

      const bounds = boundsRef.current;

      ctx.clearRect(0, 0, bounds.width, bounds.height);
      ctx.filter = "blur(22px)";

      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -140) {
          resetBeam(beam, bounds.width, bounds.height, index);
        }

        drawBeam(beam);
      });

      ctx.filter = "none";

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );

    updateCanvasSize();
    visibilityObserver.observe(parent);

    if (!reduceMotion) {
      frameRef.current = window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [reduceMotion]);

  return (
    <>
      <canvas ref={canvasRef} className="hero-beams" aria-hidden="true" />
      <motion.div
        className="hero-beams-glow"
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.24, 0.34, 0.24],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 9,
                ease: "easeInOut",
                repeat: Infinity,
              }
        }
      />
    </>
  );
}

function getRevealProps(reduceMotion, delay = 0, y = 28) {
  if (reduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  };
}

export default function App() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#sinopsis");
  const reduceMotion = useReducedMotion();

  const heroReveal = getRevealProps(reduceMotion, 0.1, 36);
  const sectionReveal = getRevealProps(reduceMotion);
  const delayedSectionReveal = getRevealProps(reduceMotion, 0.12);
  const cardReveal = getRevealProps(reduceMotion, 0, 20);

  useEffect(() => {
    document.body.style.overflow = isTrailerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isTrailerOpen]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setIsTrailerOpen(false);
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
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container topnav-inner">
          <a className="logo" href="#inicio" aria-label="RODOREDA inicio">
            RODOREDA
          </a>
          <nav aria-label="Navegación principal">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} className={activeSection === href ? "is-active" : ""}>
                {label}
              </a>
            ))}
          </nav>
          <button className="btn btn-primary" type="button" onClick={() => setIsTrailerOpen(true)}>
            Ver avance
          </button>
        </div>
      </motion.header>

      <main id="content">
        <section className="section hero" id="inicio" data-od-id="hero">
          <img className="hero-image" src={heroImage} alt="Imagen de dossier del documental RODOREDA" />
          <HeroBeamsBackground />
          <div className="hero-film" aria-hidden="true" />
          <div className="container hero-content">
            <motion.div className="hero-copy" {...heroReveal}>
              <h1 className="hero-title">RODOREDA</h1>
              <div className="hero-note">
                <p className="lead hero-lead">
                Un viaje íntimo y revelador para descubrir a Mercè Rodoreda, la escritora más universal en lengua catalana, a través de archivo personal, testimonios y memoria viva.
                </p>
                <div className="hero-cta">
                  <button className="btn btn-primary" type="button" onClick={() => setIsTrailerOpen(true)}>
                    Ver avance
                  </button>
                  <a className="btn btn-secondary btn-arrow" href="#sinopsis">
                    Entrar en el dossier
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section" id="sinopsis" data-od-id="sinopsis">
          <div className="container grid-2-1">
            <motion.div className="stack" {...sectionReveal}>
              <p className="eyebrow">Storyline · Sinopsis</p>
              <h2>Buscar la mujer detrás de la máscara.</h2>
              <div className="intro-copy">
                <p>Sílvia Munt, marcada por su complicidad con Rodoreda desde el rodaje de <em>La plaça del Diamant</em>, guía este documental para entrar en la vida, los pensamientos, la mirada, las contradicciones, los amores y la palabra de una escritora única.</p>
                <p>Con la colaboración de la Fundació Mercè Rodoreda, el film accede a fotografías, manuscritos, cartas y dietarios para dibujar el mapa de una vida atravesada por la guerra, el exilio, la maternidad, el feminismo, la supervivencia y la incomprensión.</p>
                <p>Rodoreda empezó a escribir por pura desesperación. A través del archivo personal y de testimonios de biógrafas y lectoras, la película recorre también la historia de Cataluña y Europa durante el siglo XX.</p>
              </div>
            </motion.div>
            <motion.aside className="card facts" aria-label="Ficha del proyecto" {...delayedSectionReveal}>
              {facts.map(([label, value]) => (
                <div key={label} className="fact">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </motion.aside>
          </div>
        </section>

        <section className="section" id="mirada" data-od-id="mirada">
          <div className="container grid-1-2">
            <motion.div className="stack direction-copy" {...sectionReveal}>
              <p className="eyebrow">Nota de dirección</p>
              <h2 className="direction-title">“Siempre he tenido la necesidad de entender y explicar a esta mujer única.”</h2>
              <p className="copy-muted">Sílvia Munt plantea la película como el cierre de un círculo: pasar de interpretar a Colometa a reencontrarse con Rodoreda más de cuarenta años después, ya no como personaje, sino como presencia, archivo y pregunta.</p>
              <p className="meta">Sílvia Munt · Directora y coguionista</p>
            </motion.div>
            <motion.div className="image-panel" aria-label="Tratamiento visual de archivo" {...delayedSectionReveal}>
              <img src={heroImage} alt="Composición visual del dossier RODOREDA" />
              <p className="caption meta">Archivo, cartas, fotografías y objetos filmados como materia emocional: macro, textura, sombra y silencio.</p>
            </motion.div>
          </div>
        </section>

        <section className="section visual-bg" data-od-id="tratamiento-visual">
          <img src={heroImage} alt="Fondo oscurecido del dossier visual de RODOREDA" />
          <div className="container visual-content">
            <motion.div className="visual-intro" {...sectionReveal}>
              <p className="eyebrow">Tratamiento visual</p>
              <h2>La importancia del objeto como puerta a un mundo íntimo.</h2>
              <p className="lead visual-lead">El material de archivo se dispone sobre la mesa y se filma con planos detalle: fotografías, cartas, grafología, objetos personales. El objetivo no es ilustrar una biografía, sino atrapar la emoción que desprenden sus huellas.</p>
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
              <blockquote className="quote">La vida privada de Mercè Rodoreda es uno de los misterios mejor guardados de la muy misteriosa ciudad de Barcelona.</blockquote>
              <p className="quote-author">Gabriel García Márquez · <em>El País</em></p>
            </motion.div>
            <motion.div className="stack quote-copy" {...delayedSectionReveal}>
              <p>El documental asume ese misterio sin clausurarlo. Busca claves: el desarraigo, el doble exilio, la relación con Armand Obiols, la ferocidad de la escritura y la forma en que una obra literaria puede sobrevivir a todo.</p>
              <hr className="rule-strong" />
              <p className="meta">La plaça del Diamant fue traducida a más de 40 idiomas.</p>
            </motion.div>
          </div>
        </section>

        <section className="section" id="personajes" data-od-id="personajes">
          <div className="container stack section-gap-lg">
            <motion.div className="row-between" {...sectionReveal}>
              <div className="max-copy">
                <p className="eyebrow">Personajes</p>
                <h2>Voces para reconstruir una presencia.</h2>
              </div>
              <span className="pill">Actrices · Expertas · Lectores</span>
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

        <section className="section" id="produccion" data-od-id="produccion">
          <div className="container stack section-gap-lg">
            <motion.div className="max-copy-wide" {...sectionReveal}>
              <p className="eyebrow">Plan de producción</p>
              <h2>Un calendario de archivo, rodaje y montaje.</h2>
            </motion.div>
            <div className="timeline">
              {phases.map((phase, index) => (
                <motion.article key={phase.title} className="phase" {...getRevealProps(reduceMotion, index * 0.08, 22)}>
                  <h3>{phase.title}</h3>
                  {phase.items.map(([date, text]) => (
                    <p key={`${phase.title}-${date}`}>
                      <strong>{date}</strong>
                      <br />
                      {text}
                    </p>
                  ))}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" data-od-id="prensa">
          <div className="container">
            <motion.div className="row-between section-margin-md" {...sectionReveal}>
              <h2>Material de prensa</h2>
              <a className="btn btn-ghost btn-arrow" href={dossierPdf} target="_blank" rel="noreferrer">
                Abrir dossier PDF
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
              <p className="eyebrow">Contacto</p>
              <h2>Benecé Produccions SL</h2>
              <p className="lead contact-lead">Una productora con trayectoria en documental, ficción, televisión, publicidad y comunicación audiovisual desde 1986.</p>
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
                <span className="tag">Catalán VO</span>
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
                    Avance
                  </p>
                  <p className="meta modal-meta">Espacio reservado para trailer oficial</p>
                </div>
                <button className="close" type="button" aria-label="Cerrar trailer" onClick={() => setIsTrailerOpen(false)}>
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

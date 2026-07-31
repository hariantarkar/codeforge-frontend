import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/common/ThemeToggle";
import "./HomePage.css";

// --- Inline icon components ---

const IconBracket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 4 4 12l5 8" />
    <path d="M15 4l5 8-5 8" />
  </svg>
);

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M6 4.5v15l13-7.5-13-7.5Z" />
  </svg>
);

const IconGraduate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z" />
    <path d="M6 11.5v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" />
  </svg>
);

const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7.5" width="18" height="12" rx="2" />
    <path d="M8 7.5V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12.5h18" />
  </svg>
);

const IconTerminal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4" width="19" height="16" rx="2" />
    <path d="M6.5 9.5 10 12.5 6.5 15.5" />
    <path d="M12.5 15.5h5" />
  </svg>
);

const IconShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
    <path d="M9 12.2l2 2 4-4.4" />
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 2 8.5 12 14l10-5.5L12 3Z" />
    <path d="M2 15.5 12 21l10-5.5" />
    <path d="M2 11.5 12 17l10-5.5" />
  </svg>
);

const IconTimer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2" />
    <path d="M9.5 2h5" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="13 5 20 12 13 19" />
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

// The demo code shown in the hero — deliberately short and readable at a glance
const demoCode = [
  { n: 1, text: "public class Main {" },
  { n: 2, text: "    public static void main(String[] args) {" },
  { n: 3, text: '        System.out.println("Hello, CodeForge");' },
  { n: 4, text: "    }" },
  { n: 5, text: "}" },
];

const outputLines = ["Compiling Main.java...", "Compiled successfully.", "", "Hello, CodeForge", "", "Process finished in 214ms"];

const audiences = [
  {
    icon: <IconGraduate />,
    tag: "Students",
    title: "Practice without setup friction",
    desc: "No JDK install, no IDE configuration — open a tab and start writing Java in minutes, from any machine.",
    bullets: ["Zero local setup", "Works on any device with a browser", "Save work across sessions"],
  },
  {
    icon: <IconBriefcase />,
    tag: "Job seekers",
    title: "Rehearse for the technical round",
    desc: "Write and run real Java under the same kind of console-output constraints you'll face live in an interview.",
    bullets: ["Fast compile-run loop", "Multiple scratch projects", "Console output, exactly as javac gives it"],
  },
  {
    icon: <IconTerminal />,
    tag: "Hobbyist devs",
    title: "A place for the small stuff",
    desc: "Not every idea needs a full local project. Spin up a file, test a snippet, throw it away or keep it.",
    bullets: ["Lightweight project structure", "Instant execution", "Nothing to configure or maintain"],
  },
];

const steps = [
  { n: "01", title: "Create a project", desc: "Start a new project and add a Java file — organized the same way you'd structure it locally." },
  { n: "02", title: "Write & save", desc: "A familiar code editor with syntax highlighting. Saves your file content to your account, not just your browser tab." },
  { n: "03", title: "Compile & run", desc: "Hit Run. Your code compiles and executes on the server, with console output streamed back in real time." },
];

const features = [
  {
    icon: <IconLayers />,
    title: "Project & file management",
    desc: "Multiple projects, multiple files per project — organize your work the way you actually think about it.",
  },
  {
    icon: <IconTimer />,
    title: "Execution safeguards",
    desc: "Every run is time-limited and memory-capped, so a runaway loop in your code can't hang the session.",
  },
  {
    icon: <IconShieldCheck />,
    title: "Isolated per run",
    desc: "Each execution gets its own isolated workspace on the server — your run never collides with anyone else's.",
  },
  {
    icon: <IconTerminal />,
    title: "Real console output",
    desc: "See actual compiler errors and runtime exceptions, not a sanitized approximation — the same output javac gives you locally.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoStatus, setDemoStatus] = useState("idle"); // idle | compiling | running | done
  const [visibleLines, setVisibleLines] = useState(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const runDemo = () => {
    if (demoStatus !== "idle" && demoStatus !== "done") return;

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleLines(0);
    setDemoStatus("compiling");

    const t1 = setTimeout(() => setDemoStatus("running"), 500);
    timeoutsRef.current.push(t1);

    outputLines.forEach((_, i) => {
      const t = setTimeout(() => setVisibleLines(i + 1), 500 + (i + 1) * 220);
      timeoutsRef.current.push(t);
    });

    const tDone = setTimeout(() => setDemoStatus("done"), 500 + outputLines.length * 220 + 200);
    timeoutsRef.current.push(tDone);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="hp-page">
      {/* Navbar */}
      <header className={`hp-nav ${scrolled ? "hp-nav--scrolled" : ""}`}>
        <div className="hp-nav-inner">
          <button className="hp-brand" onClick={() => scrollTo("hp-top")} aria-label="CodeForge home">
            <span className="hp-brand-mark">
              <IconBracket />
            </span>
            <span className="hp-brand-text">
              Code<span className="hp-brand-accent">Forge</span>
            </span>
          </button>

          <nav className="hp-nav-links">
            <button onClick={() => scrollTo("hp-audiences")}>Who it's for</button>
            <button onClick={() => scrollTo("hp-how")}>How it works</button>
            <button onClick={() => scrollTo("hp-features")}>Features</button>
          </nav>

         
            <div className="hp-nav-right">
  <span className="hp-status-pill">
    <span className="hp-status-dot" />
    Compiler online
  </span>
  <ThemeToggle />
  <button className="hp-btn hp-btn--ghost" onClick={() => navigate("/login")}>
    Sign in
  </button>
  <button className="hp-btn hp-btn--primary hp-btn--sm" onClick={() => navigate("/signup")}>
    Get started
  </button>
</div>
          <button className="hp-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {menuOpen && (
          <div className="hp-mobile-menu">
            <button onClick={() => scrollTo("hp-audiences")}>Who it's for</button>
            <button onClick={() => scrollTo("hp-how")}>How it works</button>
            <button onClick={() => scrollTo("hp-features")}>Features</button>
            <div className="hp-mobile-actions">
                <ThemeToggle />
              <button className="hp-btn hp-btn--ghost" onClick={() => navigate("/login")}>
                Sign in
              </button>
              <button className="hp-btn hp-btn--primary" onClick={() => navigate("/signup")}>
                Get started
              </button>
            </div>
          </div>
        )}
      </header>
      <main id="hp-top">
        {/* Hero */}
        <section className="hp-hero">
          <div className="hp-hero-grid" aria-hidden="true" />
          <div className="hp-hero-inner">
            <div className="hp-hero-copy">
              <span className="hp-eyebrow">Browser-based Java IDE</span>
              <h1 className="hp-h1">
                Write, compile, and run
                <br />
                Java — without leaving
                <br />
                your browser.
              </h1>
              <p className="hp-sub">
                CodeForge is a cloud IDE built for Java: real compilation, real console
                output, and project storage that persists across sessions — no local
                JDK, no setup, no excuses.
              </p>
              <div className="hp-hero-cta">
                <button className="hp-btn hp-btn--primary hp-btn--lg" onClick={() => navigate("/signup")}>
                  Get started
                  <IconArrowRight />
                </button>
                <button className="hp-btn hp-btn--outline hp-btn--lg" onClick={() => navigate("/login")}>
                  Sign in
                </button>
              </div>
              <p className="hp-hero-note">Free to use — built as an open portfolio project.</p>
            </div>

            <div className="hp-demo-panel">
              <div className="hp-demo-titlebar">
                <div className="hp-demo-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="hp-demo-filename">Main.java</span>
              </div>

              <div className="hp-demo-code">
                {demoCode.map((line) => (
                  <div className="hp-demo-code-line" key={line.n}>
                    <span className="hp-demo-line-no">{line.n}</span>
                    <span className="hp-demo-line-text">{line.text}</span>
                  </div>
                ))}
              </div>

              <div className="hp-demo-actionbar">
                <button
                  className={`hp-demo-run ${demoStatus === "compiling" || demoStatus === "running" ? "hp-demo-run--busy" : ""}`}
                  onClick={runDemo}
                  disabled={demoStatus === "compiling" || demoStatus === "running"}
                >
                  <IconPlay />
                  {demoStatus === "idle" && "Run"}
                  {demoStatus === "compiling" && "Compiling…"}
                  {demoStatus === "running" && "Running…"}
                  {demoStatus === "done" && "Run again"}
                </button>
              </div>

              <div className="hp-demo-console">
                <div className="hp-demo-console-label">Console</div>
                {demoStatus === "idle" ? (
                  <div className="hp-demo-console-placeholder">Output will appear here.</div>
                ) : (
                  outputLines.slice(0, visibleLines).map((line, i) => (
                    <div className="hp-demo-console-line" key={i}>
                      {line || "\u00A0"}
                    </div>
                  ))
                )}
                {(demoStatus === "compiling" || demoStatus === "running") && (
                  <span className="hp-demo-cursor" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section id="hp-audiences" className="hp-section">
          <div className="hp-section-head">
            <span className="hp-eyebrow">Who it's for</span>
            <h2 className="hp-h2">Built for anyone who just wants to write Java</h2>
            <p className="hp-section-sub">
              No project scaffolding, no environment setup — just a place to write, save, and run code.
            </p>
          </div>

          <div className="hp-audiences-grid">
            {audiences.map((a) => (
              <article className="hp-audience-card" key={a.tag}>
                <div className="hp-audience-icon">{a.icon}</div>
                <span className="hp-audience-tag">{a.tag}</span>
                <h3 className="hp-audience-title">{a.title}</h3>
                <p className="hp-audience-desc">{a.desc}</p>
                <ul className="hp-audience-bullets">
                  {a.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="hp-how" className="hp-section hp-section--tint">
          <div className="hp-section-head">
            <span className="hp-eyebrow">The flow</span>
            <h2 className="hp-h2">From blank file to console output in three steps</h2>
          </div>

          <div className="hp-steps">
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="hp-step">
                  <span className="hp-step-n">{s.n}</span>
                  <h3 className="hp-step-title">{s.title}</h3>
                  <p className="hp-step-desc">{s.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="hp-step-connector" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="hp-features" className="hp-section">
          <div className="hp-section-head">
            <span className="hp-eyebrow">Under the hood</span>
            <h2 className="hp-h2">What keeps execution fast and safe</h2>
          </div>

          <div className="hp-features-grid">
            {features.map((f) => (
              <div className="hp-feature-card" key={f.title}>
                <div className="hp-feature-icon">{f.icon}</div>
                <h3 className="hp-feature-title">{f.title}</h3>
                <p className="hp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="hp-cta-band">
          <div className="hp-cta-inner">
            <h2 className="hp-cta-title">Open your first file.</h2>
            <p className="hp-cta-sub">Create an account and start writing Java in your browser.</p>
            <div className="hp-cta-actions">
              <button className="hp-btn hp-btn--primary hp-btn--lg" onClick={() => navigate("/signup")}>
                Create account
                <IconArrowRight />
              </button>
              <button className="hp-btn hp-btn--outline-light hp-btn--lg" onClick={() => navigate("/login")}>
                I already have an account
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <div className="hp-footer-brand">
            <span className="hp-brand-mark hp-brand-mark--sm">
              <IconBracket />
            </span>
            <span className="hp-brand-text">
              Code<span className="hp-brand-accent">Forge</span>
            </span>
            <p className="hp-footer-tagline">A cloud-based Java IDE — write, save, and run code from any browser.</p>
          </div>

          <div className="hp-footer-col">
            <h4>Product</h4>
            <button onClick={() => scrollTo("hp-audiences")}>Who it's for</button>
            <button onClick={() => scrollTo("hp-how")}>How it works</button>
            <button onClick={() => scrollTo("hp-features")}>Features</button>
          </div>

          <div className="hp-footer-col">
            <h4>Account</h4>
            <button onClick={() => navigate("/login")}>Sign in</button>
            <button onClick={() => navigate("/signup")}>Create account</button>
          </div>
        </div>

        <div className="hp-footer-bottom">
          <span>© {new Date().getFullYear()} CodeForge. Built with Spring Boot &amp; React.</span>
        </div>
      </footer>
    </div>
  );
}




















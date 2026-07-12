"use client";

import { FormEvent, useEffect, useState } from "react";

const services = [
  ["Taxation services", "Income tax filing for individuals, HUFs and companies; tax planning; TDS compliance; assessments and appeals."],
  ["Audit & assurance", "Statutory, tax, internal, stock and inventory audits that strengthen controls and support accurate reporting."],
  ["Accounting & bookkeeping", "Monthly bookkeeping, financial statements, reconciliations and MIS reporting for sharper decisions."],
  ["Business setup & compliance", "Company incorporation, PAN, TAN and GST registration, ROC filings, annual compliance and startup advisory."],
  ["GST services", "Registration, returns filing, annual returns, GST audit and input tax credit optimization."],
  ["Financial advisory & Virtual CFO", "Budgeting, forecasting, cash-flow management, funding, valuation, due diligence, risk and board reporting."],
];

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

function DitherFlow({ side }: { side: "left" | "right" }) {
  const rows = [
    "0  1  ₹  0  1  0  ₹  1",
    "1  ₹  0  1  0  ₹  1  0",
    "₹  0  1  0  ₹  1  0  1",
    "0  1  0  ₹  1  0  1  ₹",
    "1  0  ₹  1  0  1  ₹  0",
    "0  ₹  1  0  1  ₹  0  1",
    "₹  1  0  1  ₹  0  1  0",
  ];
  return <div className={`dither-flow dither-${side}`} aria-hidden="true">
    {rows.map((row, index) => <span key={index}>{row}</span>)}
  </div>;
}

const outcomeWords = ["clarity", "freedom", "control", "confidence"];
const scrambleGlyphs = ["0", "1", "₹"];

function RotatingOutcome() {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState(outcomeWords[0]);
  const [scrambling, setScrambling] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cycle = window.setInterval(() => {
      const nextIndex = (wordIndex + 1) % outcomeWords.length;
      if (reducedMotion) {
        setWordIndex(nextIndex);
        setDisplay(outcomeWords[nextIndex]);
        return;
      }

      setScrambling(true);
      let frame = 0;
      const scramble = window.setInterval(() => {
        setDisplay(Array.from({ length: 10 }, () => scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)]).join(""));
        frame += 1;
        if (frame >= 9) {
          window.clearInterval(scramble);
          setWordIndex(nextIndex);
          setDisplay(outcomeWords[nextIndex]);
          setScrambling(false);
        }
      }, 48);
    }, 2600);
    return () => window.clearInterval(cycle);
  }, [wordIndex]);

  return <span className={`rotating-outcome ${scrambling ? "is-scrambling" : ""}`} aria-hidden="true">{display}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(0);
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("Please add your name and a valid email address.");
      form.reportValidity();
      return;
    }
    setStatus("Thank you — your enquiry is ready to be sent.");
    form.reset();
  }

  return <>
    <header className="site-header">
      <a className="brand" href="#top"><Mark /><span>Jai K & Associates</span></a>
      <button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        {["About", "Services", "Values", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
      <a className="button button-small header-cta" href="#contact">Get expert help <span>↗</span></a>
    </header>

    <main id="top">
      <section className="hero">
        <DitherFlow side="left" />
        <DitherFlow side="right" />
        <p className="eyebrow">Chartered accountants · Tirupur</p>
        <h1 aria-label="Financial clarity, freedom, control and confidence for every ambitious business.">Financial <RotatingOutcome /> for<br /><span>every ambitious business.</span></h1>
        <p className="hero-copy">Dependable audit, tax and advisory services, delivered with integrity and professional excellence.</p>
        <div className="hero-actions"><a className="button" href="#contact">Talk to an expert <span>↗</span></a><a className="button button-ghost" href="#services">Explore services</a></div>
        <div className="trust-line"><span>One trusted partner for</span><div><b>Tax</b><i /><b>Audit</b><i /><b>Compliance</b><i /><b>Advisory</b></div></div>
      </section>

      <section className="statement" id="about">
        <div className="section-label"><span>01</span> Why choose us</div>
        <h2>Premier financial expertise.<br /><span>Practical business thinking.</span></h2>
        <div className="split-copy"><p>Jai K & Associates is a premier Chartered Accountancy firm committed to dependable Audit, Tax and Advisory services.</p><p>We combine disciplined financial management with clear, responsive guidance—so every decision feels informed.</p></div>
        <div className="purpose-grid">
          <article className="purpose-card dark"><span>Our vision</span><h3>To be the most trusted and preferred CA firm.</h3><p>Recognized for excellence, integrity and client-centric service across business sectors.</p><div className="orbital" aria-hidden="true"><i /><i /><i /></div></article>
          <article className="purpose-card orange"><span>Our mission</span><h3>Empower every client to build lasting success.</h3><p>Through comprehensive financial solutions that drive growth, ensure compliance and reduce complexity.</p><div className="rising-lines" aria-hidden="true"><i /><i /><i /><i /></div></article>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-label light"><span>02</span> What we do</div>
        <div className="services-head"><h2>Expertise where<br />it matters most.</h2><p>From everyday compliance to pivotal business decisions, our services are designed around your complete financial journey.</p></div>
        <div className="service-list">{services.map(([title, description], index) => <article className={`service-item ${openService === index ? "open" : ""}`} key={title}>
          <button type="button" aria-expanded={openService === index} onClick={() => setOpenService(openService === index ? -1 : index)}><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span className="service-title">{title}</span><span className="service-icon">{openService === index ? "−" : "+"}</span></button>
          <div className="service-body"><p>{description}</p><a href="#contact">Discuss with us ↗</a></div>
        </article>)}</div>
      </section>

      <section className="values" id="values">
        <div className="section-label"><span>03</span> How we work</div><h2>Good numbers begin<br /><span>with strong principles.</span></h2>
        <div className="value-grid">
          <article><span className="value-index">01</span><div className="value-symbol integrity" /><h3>Integrity</h3><p>Unwavering commitment to ethical practices and transparency in every engagement.</p></article>
          <article><span className="value-index">02</span><div className="value-symbol excellence" /><h3>Excellence</h3><p>Superior quality and considered advice that consistently exceeds expectations.</p></article>
          <article><span className="value-index">03</span><div className="value-symbol partnership" /><h3>Partnership</h3><p>Long-term relationships built on trust, reliability and mutual success.</p></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro"><div className="section-label light"><span>04</span> Contact us</div><h2>Let&apos;s make your<br />finances feel simple.</h2><p>Tell us what you need. Our team will get back to you with a practical next step.</p><div className="contact-details"><a href="tel:+917550122671">+91 75501 22671</a><a href="mailto:jaikandassociates@gmail.com">jaikandassociates@gmail.com</a><span>Tirupur, Tamil Nadu, India</span></div></div>
        <form className="contact-form" noValidate onSubmit={submit}>
          <label><span>Your name</span><input name="name" autoComplete="name" placeholder="How should we address you?" required /></label>
          <label><span>Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
          <label><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></label>
          <label><span>How can we help?</span><select name="service">{services.map(([title]) => <option key={title}>{title}</option>)}</select></label>
          <label><span>A few details</span><textarea name="message" rows={3} placeholder="Tell us briefly about your requirement" /></label>
          <button className="button form-submit" type="submit">Send enquiry <span>↗</span></button><p className="form-status" role="status">{status}</p>
        </form>
      </section>
    </main>
    <footer><a className="brand footer-brand" href="#top"><Mark /><span>Jai K & Associates</span></a><p>Audit. Tax. Advisory.<br />Clarity at every step.</p><div><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} Jai K & Associates</small></footer>
  </>;
}

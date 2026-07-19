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

const presenceItems = [
  {
    number: "01 / 03",
    title: "See the full picture.",
    description: "Clear books and meaningful reporting turn the everyday numbers into a view you can act on.",
    label: "Accounting & reporting",
    image: "/showcase/reporting.jpg",
    alt: "Chartered accountant reviewing documents beside a laptop in a bright office",
  },
  {
    number: "02 / 03",
    title: "Stay ahead of every due date.",
    description: "Tax, GST and compliance are handled with the structure and care your business deserves.",
    label: "Tax & compliance",
    image: "/showcase/compliance.jpg",
    alt: "Financial ledger, calculator and orange folder on a desk",
  },
  {
    number: "03 / 03",
    title: "Move with confidence.",
    description: "From audit to Virtual CFO advice, we help you make the next business decision with context.",
    label: "Audit & advisory",
    image: "/showcase/advisory.jpg",
    alt: "Two professionals discussing documents in a modern office",
  },
];

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

function DitherFlow({ side }: { side: "left" | "right" }) {
  const rows = [
    "0  1  ₹  0  1",
    "1  ₹  0  1  0",
    "₹  0  1  0  ₹",
    "0  1  0  ₹  1",
  ];
  return <div className={`dither-flow dither-${side}`} aria-hidden="true">
    {rows.map((row, index) => <span key={index}>{row}</span>)}
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(0);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [navElevated, setNavElevated] = useState(false);
  const [activePresence, setActivePresence] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY;
        setNavElevated(currentY > 24);
        if (currentY < 24) setNavHidden(false);
        else if (delta > 8 && currentY > 96) setNavHidden(true);
        else if (delta < -4) setNavHidden(false);
        lastY = currentY;
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) setNavHidden(false);
  }, [menuOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>("[data-presence-step]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActivePresence(Number(entry.target.dataset.presenceStep));
      });
    }, { threshold: 0, rootMargin: "-40% 0px -45%" });
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("Please add your name and a valid email address.");
      form.reportValidity();
      return;
    }
    setIsSubmitting(true);
    setStatus("Sending your enquiry…");
    const formData = new FormData(form);
    formData.append("_subject", "New website enquiry — Jai K & Associates");
    formData.append("_template", "table");

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@jaikassociates.in", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Unable to send enquiry");
      setStatus("Thank you — your enquiry has been sent.");
      form.reset();
    } catch {
      setStatus("We could not send your enquiry. Please email or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <>
    <header className={`site-header ${navHidden ? "is-hidden" : ""} ${navElevated ? "is-elevated" : ""}`}>
      <a className="brand" href="#top"><Mark /><span>Jai K & Associates</span></a>
      <button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        {["About", "Services", "Showcase", "Values", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
      <a className="button button-small header-cta" href="#contact">Get expert help <span>↗</span></a>
    </header>

    <main id="top">
      <section className="hero">
        <DitherFlow side="left" />
        <DitherFlow side="right" />
        <p className="eyebrow">Chartered accountants · Chennai</p>
        <h1>Financial <em className="hero-clarity">clarity</em> for<br /><span>every ambitious business.</span></h1>
        <p className="hero-copy">Dependable audit, tax and advisory services, delivered with integrity and professional excellence.</p>
        <div className="hero-actions"><a className="button" href="#contact">Talk to an expert <span>↗</span></a><a className="button button-ghost" href="#services">Explore services</a></div>
        <div className="trust-line"><span>One trusted partner for</span><div><b>Tax</b><i /><b>Audit</b><i /><b>Compliance</b><i /><b>Advisory</b></div></div>
      </section>

      <section className="statement" id="about">
        <div className="section-label reveal" data-reveal><span>01</span> Why choose us</div>
        <h2 className="reveal reveal-delay-1" data-reveal>Premier financial expertise.<br /><span>Practical business thinking.</span></h2>
        <div className="split-copy reveal reveal-delay-2" data-reveal><p>Jai K & Associates is a premier Chartered Accountancy firm committed to dependable Audit, Tax and Advisory services.</p><p>We combine disciplined financial management with clear, responsive guidance—so every decision feels informed.</p></div>
        <div className="purpose-grid">
          <article className="purpose-card dark reveal reveal-delay-1" data-reveal><span>Our vision</span><h3>To be the most trusted and preferred CA firm.</h3><p>Recognized for excellence, integrity and client-centric service across business sectors.</p><div className="orbital" aria-hidden="true"><i /><i /><i /></div></article>
          <article className="purpose-card orange reveal reveal-delay-2" data-reveal><span>Our mission</span><h3>Empower every client to build lasting success.</h3><p>Through comprehensive financial solutions that drive growth, ensure compliance and reduce complexity.</p><div className="rising-lines" aria-hidden="true"><i /><i /><i /><i /></div></article>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-label light reveal" data-reveal><span>02</span> What we do</div>
        <div className="services-head reveal reveal-delay-1" data-reveal><h2>Expertise where<br />it matters most.</h2><p>From everyday compliance to pivotal business decisions, our services are designed around your complete financial journey.</p></div>
        <div className="service-list reveal reveal-delay-2" data-reveal>{services.map(([title, description], index) => <article className={`service-item ${openService === index ? "open" : ""}`} key={title}>
          <button type="button" aria-expanded={openService === index} onClick={() => setOpenService(openService === index ? -1 : index)}><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span className="service-title">{title}</span><span className="service-icon">{openService === index ? "−" : "+"}</span></button>
          <div className="service-body"><p>{description}</p><a href="#contact">Discuss with us ↗</a></div>
        </article>)}</div>
      </section>

      <section className="presence" id="showcase">
        <div className="presence-intro reveal" data-reveal><p className="presence-kicker"><span>03</span> A clearer picture</p><h2>One financial partner.<br /><span>Every business moment.</span></h2><p>Our work stays close to the decisions that shape your business—at every stage, not only at year end.</p></div>
        <div className="presence-story">
          <div className="presence-steps">
            {presenceItems.map((item, index) => <article className={`presence-step ${activePresence === index ? "is-active" : ""}`} data-presence-step={index} key={item.title}>
              <span className="presence-number">{item.number}</span><p>{item.label}</p><h3>{item.title}</h3><span className="presence-line" aria-hidden="true" /><div>{item.description}</div>
            </article>)}
          </div>
          <div className="presence-stage" aria-live="polite">
            {presenceItems.map((item, index) => <img key={item.image} className={activePresence === index ? "is-active" : ""} src={item.image} alt={item.alt} loading={index === 0 ? "eager" : "lazy"} />)}
            <div className="presence-overlay"><span>{presenceItems[activePresence].number}</span><p>{presenceItems[activePresence].label}</p></div>
            <div className="presence-controls"><button type="button" aria-label="Show previous story" onClick={() => setActivePresence((activePresence + presenceItems.length - 1) % presenceItems.length)}>←</button><button type="button" aria-label="Show next story" onClick={() => setActivePresence((activePresence + 1) % presenceItems.length)}>→</button></div>
          </div>
        </div>
      </section>

      <section className="values" id="values">
        <div className="section-label reveal" data-reveal><span>04</span> How we work</div><h2 className="reveal reveal-delay-1" data-reveal>Good numbers begin<br /><span>with strong principles.</span></h2>
        <div className="value-grid">
          <article className="reveal" data-reveal><span className="value-index">01</span><div className="value-symbol integrity" /><h3>Integrity</h3><p>Unwavering commitment to ethical practices and transparency in every engagement.</p></article>
          <article className="reveal reveal-delay-1" data-reveal><span className="value-index">02</span><div className="value-symbol excellence" /><h3>Excellence</h3><p>Superior quality and considered advice that consistently exceeds expectations.</p></article>
          <article className="reveal reveal-delay-2" data-reveal><span className="value-index">03</span><div className="value-symbol partnership" /><h3>Partnership</h3><p>Long-term relationships built on trust, reliability and mutual success.</p></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro reveal" data-reveal><div className="section-label light"><span>05</span> Contact us</div><h2>Let&apos;s make your<br />finances feel simple.</h2><p>Tell us what you need. Our team will get back to you with a practical next step.</p><div className="contact-details"><a href="tel:+919500622671">+91 95006 22671</a><a href="mailto:info@jaikassociates.in">info@jaikassociates.in</a><span>No. 26/30, Om Sakthi Nilayam,<br />South Gangai Amman Koil 1st Street,<br />Choolaimedu, Chennai - 600094</span></div></div>
        <form className="contact-form reveal reveal-delay-1" data-reveal noValidate onSubmit={submit}>
          <label><span>Your name</span><input name="name" autoComplete="name" placeholder="How should we address you?" required /></label>
          <label><span>Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
          <label><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></label>
          <label><span>How can we help?</span><select name="service">{services.map(([title]) => <option key={title}>{title}</option>)}</select></label>
          <label><span>A few details</span><textarea name="message" rows={3} placeholder="Tell us briefly about your requirement" /></label>
          <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="button form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending enquiry…" : "Send enquiry"} <span>↗</span></button><p className="form-status" role="status">{status}</p>
        </form>
      </section>
      <section className="location-map" aria-labelledby="location-heading">
        <div className="location-copy reveal" data-reveal><p className="location-eyebrow"><span aria-hidden="true">●</span> Chennai office</p><h2 id="location-heading">Visit us when<br />the numbers need<br /><em>attention.</em></h2><address>Jai K &amp; Associates<br />No. 26/30, Om Sakthi Nilayam,<br />South Gangai Amman Koil 1st Street,<br />Choolaimedu, Chennai - 600094</address><a className="location-link" href="https://www.google.com/maps/search/?api=1&query=No.%2026%2F30%2C%20Om%20Sakthi%20Nilayam%2C%20South%20Gangai%20Amman%20Koil%201st%20Street%2C%20Choolaimedu%2C%20Chennai%20-%20600094" target="_blank" rel="noreferrer">Get directions <span>↗</span></a></div>
        <div className="map-frame reveal reveal-delay-1" data-reveal><iframe title="Jai K & Associates, Choolaimedu" src="https://www.google.com/maps?q=No.%2026%2F30%2C%20Om%20Sakthi%20Nilayam%2C%20South%20Gangai%20Amman%20Koil%201st%20Street%2C%20Choolaimedu%2C%20Chennai%20-%20600094&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>
    </main>
    <footer><a className="brand footer-brand" href="#top"><Mark /><span>Jai K & Associates</span></a><p>Audit. Tax. Advisory.<br />Clarity at every step.</p><div><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} Jai K & Associates</small></footer>
  </>;
}

import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/752b8c8f-c118-4f57-a70d-466f38af88db/files/ab690271-5b83-492f-9373-ce27bcc7873e.jpg";

const SERVICES = [
  { icon: "Home", title: "Квартиры и дома", desc: "Комплексная уборка жилых помещений — от студии до загородного дома.", price: "от 3 000 ₽" },
  { icon: "Building2", title: "Офисы", desc: "Ежедневная и генеральная уборка офисных пространств любого масштаба.", price: "от 5 000 ₽" },
  { icon: "Sparkles", title: "После ремонта", desc: "Уборка строительного мусора и пыли. Блеск на финише вашего ремонта.", price: "от 8 000 ₽" },
  { icon: "Star", title: "Генеральная", desc: "Глубокая чистка всех поверхностей, мойка окон, чистка мягкой мебели.", price: "от 6 000 ₽" },
  { icon: "Wind", title: "Химчистка мебели", desc: "Профессиональная химчистка диванов, кресел, матрасов и ковров.", price: "от 2 000 ₽" },
  { icon: "Droplets", title: "Мойка окон", desc: "Мойка окон изнутри и снаружи с использованием безопасных средств.", price: "от 1 500 ₽" },
];

const PORTFOLIO = [
  { img: "https://cdn.poehali.dev/projects/752b8c8f-c118-4f57-a70d-466f38af88db/files/34d63fcd-83e2-4008-b167-74ee8384f1e6.jpg", title: "Квартира на Тверской", area: "85 м²", time: "4 часа" },
  { img: "https://cdn.poehali.dev/projects/752b8c8f-c118-4f57-a70d-466f38af88db/files/f550da53-dafc-4f56-9fa0-b96ff33a1dc8.jpg", title: "Офис IT-компании", area: "320 м²", time: "8 часов" },
  { img: "https://cdn.poehali.dev/projects/752b8c8f-c118-4f57-a70d-466f38af88db/files/a48ff800-ff01-4413-951d-1568c1693cbe.jpg", title: "Коттедж после ремонта", area: "240 м²", time: "12 часов" },
];

const REVIEWS = [
  { name: "Анна Сергеева", role: "Владелица квартиры", text: "Заказывала генеральную уборку перед приездом гостей. Результат превзошёл ожидания — всё блестит! Команда профессионалов.", rating: 5, date: "Март 2024" },
  { name: "Дмитрий Козлов", role: "Руководитель офиса", text: "Работаем с VibeClean уже полгода. Стабильно высокое качество, пунктуальность и никаких лишних вопросов. Рекомендую.", rating: 5, date: "Февраль 2024" },
  { name: "Елена Морозова", role: "Дизайнер интерьеров", text: "Советую всем своим клиентам после ремонта. Берут на себя всё — от крупного мусора до мельчайшей пыли в щелях.", rating: 5, date: "Январь 2024" },
];

const FAQ_ITEMS = [
  { q: "Как быстро вы приедете?", a: "Стандартный срок — от 2 часов после заявки. При срочном запросе организуем выезд в течение часа при наличии свободной бригады." },
  { q: "Какие средства вы используете?", a: "Только сертифицированная профессиональная химия, безопасная для детей и домашних животных. Все средства гипоаллергенны." },
  { q: "Нужно ли мне быть дома во время уборки?", a: "Нет. Многие клиенты оставляют ключи. Мы строго соблюдаем конфиденциальность и несём материальную ответственность." },
  { q: "Что входит в генеральную уборку?", a: "Мытьё всех поверхностей, окон изнутри, плиты и духовки, сантехники, протирка мебели, пылесос и влажная уборка полов." },
  { q: "Как рассчитывается стоимость?", a: "Цена зависит от площади, типа уборки и дополнительных услуг. Воспользуйтесь нашим калькулятором или позвоните — рассчитаем точно." },
  { q: "Есть ли гарантия качества?", a: "Да. Если вас что-то не устраивает, мы вернёмся и исправим бесплатно в течение 24 часов после уборки." },
];

const MINT = "hsl(345, 55%, 35%)";
const MINT_LIGHT = "hsl(340, 30%, 93%)";
const STONE_LIGHT = "hsl(35, 18%, 96%)";

function useFadeOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add("visible");
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeOnScroll();
  return <div ref={ref} className={`section-fade ${className}`}>{children}</div>;
}

function NavBar({ onNav }: { onNav: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "about", label: "О нас" },
    { id: "services", label: "Услуги" },
    { id: "portfolio", label: "Портфолио" },
    { id: "reviews", label: "Отзывы" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Контакты" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNav("hero")} className="font-display tracking-wide text-foreground flex flex-col items-start leading-tight">
          <span className="text-xs font-normal opacity-60">Чистый Вайб</span>
          <span className="text-xl font-medium">Vibe<span style={{ color: MINT }}>Clean</span></span>
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.id} onClick={() => onNav(l.id)} className="nav-link">{l.label}</button>
          ))}
        </nav>
        <button onClick={() => onNav("contact")} className="hidden md:block px-5 py-2 rounded-full text-sm font-medium text-white" style={{ background: MINT }}>
          Оставить заявку
        </button>
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button key={l.id} onClick={() => { onNav(l.id); setMobileOpen(false); }} className="nav-link text-left py-1">{l.label}</button>
          ))}
          <button onClick={() => { onNav("contact"); setMobileOpen(false); }} className="px-5 py-2.5 rounded-full text-sm font-medium mt-2 text-white" style={{ background: MINT }}>
            Оставить заявку
          </button>
        </div>
      )}
    </header>
  );
}

function Calculator() {
  const [area, setArea] = useState(60);
  const [type, setType] = useState<"standard" | "general" | "repair">("standard");
  const [extras, setExtras] = useState<string[]>([]);

  const basePrices = { standard: 40, general: 70, repair: 85 };
  const extraPrices: Record<string, number> = { windows: 1500, furniture: 2000, balcony: 1200 };
  const total = Math.round(basePrices[type] * area) + extras.reduce((s, e) => s + extraPrices[e], 0);

  const toggleExtra = (e: string) => setExtras((p) => p.includes(e) ? p.filter((x) => x !== e) : [...p, e]);

  return (
    <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
      <h3 className="font-display text-2xl font-medium mb-6 text-foreground">Рассчитать стоимость</h3>
      <div className="mb-6">
        <label className="text-sm text-muted-foreground mb-2 block">Площадь: <span className="text-foreground font-medium">{area} м²</span></label>
        <input type="range" min={20} max={500} value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full" style={{ accentColor: MINT }} />
        <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>20 м²</span><span>500 м²</span></div>
      </div>
      <div className="mb-6">
        <label className="text-sm text-muted-foreground mb-3 block">Тип уборки</label>
        <div className="grid grid-cols-3 gap-2">
          {[{ key: "standard", label: "Поддерживающая" }, { key: "general", label: "Генеральная" }, { key: "repair", label: "После ремонта" }].map(({ key, label }) => (
            <button key={key} onClick={() => setType(key as typeof type)} className="py-2 px-3 rounded-xl text-xs font-medium border transition-all"
              style={type === key ? { background: MINT, color: "white", borderColor: MINT } : { background: "transparent", color: "hsl(160,8%,12%)", borderColor: "hsl(155,10%,88%)" }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <label className="text-sm text-muted-foreground mb-3 block">Дополнительно</label>
        <div className="flex flex-col gap-2">
          {[{ key: "windows", label: "Мойка окон", price: "+1 500 ₽" }, { key: "furniture", label: "Химчистка мебели", price: "+2 000 ₽" }, { key: "balcony", label: "Балкон/лоджия", price: "+1 200 ₽" }].map(({ key, label, price }) => (
            <button key={key} onClick={() => toggleExtra(key)} className="flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-all"
              style={extras.includes(key) ? { background: MINT_LIGHT, borderColor: MINT } : { background: "transparent", borderColor: "hsl(155,10%,88%)" }}>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border flex items-center justify-center text-xs" style={extras.includes(key) ? { background: MINT, borderColor: MINT, color: "white" } : { borderColor: "hsl(155,10%,88%)" }}>
                  {extras.includes(key) && "✓"}
                </span>
                {label}
              </span>
              <span className="text-muted-foreground">{price}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-6 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Итого от</p>
          <p className="font-display text-4xl font-medium" style={{ color: MINT }}>{total.toLocaleString("ru-RU")} ₽</p>
        </div>
        <button className="px-6 py-3 rounded-full font-medium text-sm text-white hover:opacity-90 transition-opacity" style={{ background: MINT }}
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Заказать уборку
        </button>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-border p-10 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: MINT_LIGHT }}>
          <Icon name="Check" size={28} style={{ color: MINT }} />
        </div>
        <h3 className="font-display text-2xl font-medium mb-2">Заявка принята!</h3>
        <p className="text-muted-foreground text-sm">Мы свяжемся с вами в течение 30 минут.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-white rounded-2xl border border-border p-8 shadow-sm flex flex-col gap-4">
      <h3 className="font-display text-2xl font-medium text-foreground mb-2">Оставить заявку</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Анна"
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
            onFocus={(e) => { e.target.style.borderColor = MINT; }} onBlur={(e) => { e.target.style.borderColor = ""; }} required />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Телефон</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__"
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
            onFocus={(e) => { e.target.style.borderColor = MINT; }} onBlur={(e) => { e.target.style.borderColor = ""; }} required />
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">Адрес</label>
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Улица, дом, квартира"
          className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
          onFocus={(e) => { e.target.style.borderColor = MINT; }} onBlur={(e) => { e.target.style.borderColor = ""; }} />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">Комментарий</label>
        <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Расскажите о задаче..." rows={3}
          className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
          onFocus={(e) => { e.target.style.borderColor = MINT; }} onBlur={(e) => { e.target.style.borderColor = ""; }} />
      </div>
      <button type="submit" className="w-full py-3.5 rounded-full font-medium text-sm text-white hover:opacity-90 transition-opacity mt-2" style={{ background: MINT }}>
        Отправить заявку
      </button>
      <p className="text-center text-xs text-muted-foreground">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
    </form>
  );
}

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onNav={scrollTo} />

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="Чистый интерьер" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.97) 30%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.1))" }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest mb-6 font-body fade-up fade-up-delay-1" style={{ color: MINT }}>Профессиональный клининг</p>
            <h1 className="font-display text-6xl md:text-7xl font-light leading-tight mb-6 text-foreground fade-up fade-up-delay-2">
              Пространство,<br /><em style={{ color: MINT }}>которое дышит</em>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-body fade-up fade-up-delay-3 max-w-md">
              Возвращаем чистоту и свежесть вашему дому или офису. Профессиональная команда, безопасная химия, результат — с первого раза.
            </p>
            <div className="flex flex-wrap gap-4 fade-up fade-up-delay-4">
              <button onClick={() => scrollTo("contact")} className="px-8 py-4 rounded-full font-medium text-sm text-white hover:opacity-90 transition-opacity" style={{ background: MINT }}>
                Заказать уборку
              </button>
              <button onClick={() => scrollTo("services")} className="px-8 py-4 rounded-full font-medium text-sm border transition-opacity hover:opacity-70" style={{ borderColor: MINT, color: MINT }}>
                Наши услуги
              </button>
            </div>
            <div className="flex gap-10 mt-16 fade-up fade-up-delay-5">
              {[{ num: "500+", label: "Клиентов" }, { num: "5 лет", label: "На рынке" }, { num: "100%", label: "Гарантия" }].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl font-medium text-foreground">{num}</p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28" style={{ background: STONE_LIGHT }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest mb-4 font-body" style={{ color: MINT }}>О нас</p>
                <h2 className="font-display text-5xl font-light leading-tight mb-6 text-foreground">Мы — команда,<br />которой доверяют</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 font-body">VibeClean — это не просто клининг. Это тщательно выстроенная система, где каждый сотрудник прошёл обучение и проверку. Мы верим, что чистота — это не событие, а стандарт жизни.</p>
                <p className="text-muted-foreground leading-relaxed font-body">За 5 лет работы мы обслужили более 500 клиентов в Москве и области. Наш принцип прост: делать так, чтобы вы захотели вернуться.</p>
                <div className="grid grid-cols-2 gap-4 mt-10">
                  {[{ icon: "Shield", label: "Застрахованная бригада" }, { icon: "Clock", label: "Приедем вовремя" }, { icon: "Leaf", label: "Эко-средства" }, { icon: "Award", label: "Сертифицированы" }].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: MINT_LIGHT }}>
                        <Icon name={icon} size={16} style={{ color: MINT }} />
                      </div>
                      <span className="text-sm text-foreground font-body">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                  <img src={HERO_IMAGE} alt="Команда VibeClean" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5 border border-border">
                  <p className="font-display text-3xl font-medium" style={{ color: MINT }}>4.9 / 5</p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">средняя оценка клиентов</p>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <FadeSection>
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-xs uppercase tracking-widest mb-4 font-body" style={{ color: MINT }}>Услуги</p>
              <h2 className="font-display text-5xl font-light text-foreground mb-4">Что мы делаем</h2>
              <p className="text-muted-foreground font-body">От поддерживающей уборки до сложных постремонтных работ — у нас есть решение для каждой задачи.</p>
            </div>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <FadeSection key={s.title}>
                <div className="service-card bg-white border border-border rounded-2xl p-7 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: MINT_LIGHT }}>
                    <Icon name={s.icon} size={20} style={{ color: MINT }} />
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <p className="font-medium text-sm font-body" style={{ color: MINT }}>{s.price}</p>
                </div>
              </FadeSection>
            ))}
          </div>
          <FadeSection>
            <div className="mt-16 rounded-2xl p-10" style={{ background: MINT_LIGHT }}>
              <div className="max-w-2xl mx-auto">
                <h3 className="font-display text-3xl font-light text-center text-foreground mb-8">Рассчитайте стоимость уборки</h3>
                <Calculator />
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28" style={{ background: STONE_LIGHT }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeSection>
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-xs uppercase tracking-widest mb-4 font-body" style={{ color: MINT }}>Портфолио</p>
              <h2 className="font-display text-5xl font-light text-foreground mb-4">Наши работы</h2>
              <p className="text-muted-foreground font-body">Результаты говорят сами за себя.</p>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p) => (
              <FadeSection key={p.title}>
                <div className="bg-white rounded-2xl overflow-hidden border border-border">
                  <div className="gallery-item aspect-[4/3]">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-lg font-medium text-foreground mb-2">{p.title}</h4>
                    <div className="flex gap-4 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><Icon name="Maximize2" size={12} />{p.area}</span>
                      <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{p.time}</span>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <FadeSection>
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-xs uppercase tracking-widest mb-4 font-body" style={{ color: MINT }}>Отзывы</p>
              <h2 className="font-display text-5xl font-light text-foreground mb-4">Что говорят клиенты</h2>
              <p className="text-muted-foreground font-body">Более 500 довольных клиентов — наша главная награда.</p>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <FadeSection key={r.name}>
                <div className="bg-white border border-border rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body mt-4 flex-1">"{r.text}"</p>
                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-foreground font-body">{r.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{r.role}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-body">{r.date}</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28" style={{ background: STONE_LIGHT }}>
        <div className="max-w-3xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-widest mb-4 font-body" style={{ color: MINT }}>FAQ</p>
              <h2 className="font-display text-5xl font-light text-foreground mb-4">Частые вопросы</h2>
            </div>
          </FadeSection>
          <FadeSection>
            <div className="flex flex-col gap-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-7 py-5 text-left">
                    <span className="font-body font-medium text-sm text-foreground pr-4">{item.q}</span>
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} style={{ color: MINT, flexShrink: 0 }} />
                  </button>
                  {openFaq === i && (
                    <div className="px-7 pb-5">
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeSection>
              <p className="text-xs uppercase tracking-widest mb-4 font-body" style={{ color: MINT }}>Контакты</p>
              <h2 className="font-display text-5xl font-light text-foreground mb-6 leading-tight">Готовы навести<br />порядок?</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-10">
                Оставьте заявку — мы перезвоним в течение 30 минут, уточним детали и запишем вас на удобное время.
              </p>
              <div className="flex flex-col gap-5">
                {[{ icon: "Phone", label: "+7 (495) 123-45-67", sub: "Пн–Вс, с 8:00 до 22:00" }, { icon: "Mail", label: "hello@vibeclean.ru", sub: "Ответим в течение часа" }, { icon: "MapPin", label: "Москва и область", sub: "Выезд в любой район" }].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: MINT_LIGHT }}>
                      <Icon name={icon} size={16} style={{ color: MINT }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground font-body">{label}</p>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-10 flex-wrap">
                {[{ icon: "MessageCircle", label: "WhatsApp" }, { icon: "Send", label: "Telegram" }, { icon: "Instagram", label: "Instagram" }].map(({ icon, label }) => (
                  <button key={label} className="flex items-center gap-2 border border-border rounded-full px-4 py-2 text-xs text-foreground font-body hover:opacity-70 transition-opacity">
                    <Icon name={icon} size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </FadeSection>
            <FadeSection>
              <ContactForm />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10" style={{ background: STONE_LIGHT }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg font-medium text-foreground">Vibe<span style={{ color: MINT }}>Clean</span></p>
          <p className="text-xs text-muted-foreground font-body text-center">© 2024 VibeClean. Профессиональный клининг в Москве и области.</p>
          <div className="flex gap-6">
            {["Политика", "Оферта"].map((t) => (
              <button key={t} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">{t}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── Images ─── */
const IMG_HERO   = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/4269e1d9-3317-4287-80ba-e94b0c001c29.jpg";
const IMG_LIFT   = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/cb9fabdb-a6fb-471a-a17d-74b05f0f43d9.jpg";
const IMG_TACTIL = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/c42e80da-7140-4f42-ae10-96d3b3e7dfdb.jpg";
const IMG_AI     = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/36d2111c-2732-415b-8e9e-9fcc7e69f9de.jpg";
const IMG_CASE1  = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/571e9d06-c7e2-4e01-ae99-5fc499752eea.jpg";
const IMG_CASE2  = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/149908fd-9164-4a0d-8b05-cf51b357aa8f.jpg";

/* ─── Data ─── */
const NAV = [
  { label: "Услуги",    href: "#services" },
  { label: "Кейсы",    href: "#cases"    },
  { label: "AI",        href: "#ai"       },
  { label: "Процесс",  href: "#process"  },
  { label: "Контакты", href: "#contact"  },
];

const STATS = [
  { val: "12+",   label: "лет на рынке"          },
  { val: "340+",  label: "объектов сдано"         },
  { val: "100%",  label: "прохождение проверок"   },
  { val: "44-ФЗ", label: "работаем по госзаказу"  },
];

const PROBLEMS = [
  { icon: "ShieldX",     title: "Объект не проходит проверку",       desc: "Контролирующий орган выносит предписание — сдача откладывается" },
  { icon: "FileWarning", title: "Риск отказа ввода в эксплуатацию",  desc: "Нарушения требований доступности блокируют финальное согласование" },
  { icon: "Landmark",    title: "Штрафы и переделки",                desc: "Исправление ошибок после сдачи в разы дороже, чем сделать сразу" },
  { icon: "Timer",       title: "Сжатые сроки",                      desc: "Проверка уже назначена, а подрядчик не найден — паника" },
];

const SERVICES = [
  { icon: "ScanSearch",      title: "Аудит объекта",          desc: "Выезд специалиста, фото-фиксация, протокол несоответствий по ГОСТ и СП" },
  { icon: "PencilRuler",     title: "Проектирование",          desc: "Разрабатываем проектную документацию, согласуем с заказчиком и надзором" },
  { icon: "Truck",           title: "Поставка оборудования",   desc: "Сертифицированное оборудование со склада. Полный пакет документов" },
  { icon: "HardHat",         title: "Монтаж",                  desc: "Аттестованные монтажники. Гарантия 3 года на все виды работ" },
  { icon: "ClipboardCheck",  title: "Сопровождение проверок",  desc: "Выезжаем на комиссию вместе с заказчиком, оформляем документацию" },
];

const EQUIPMENT = [
  { img: IMG_LIFT,   tag: "Вертикальный",  title: "Подъёмные платформы",    spec: "ГОСТ Р 51630" },
  { img: IMG_HERO,   tag: "Стационарный",  title: "Пандусы и поручни",      spec: "ГОСТ Р 51261" },
  { img: IMG_TACTIL, tag: "Напольные",     title: "Тактильные указатели",   spec: "ГОСТ Р 52875" },
  { img: IMG_CASE2,  tag: "Звуковые",      title: "Информационные системы", spec: "СП 59.13330"  },
];

const AI_FEATURES = [
  { icon: "Bot",       title: "Чат-бот посетителей",  desc: "Отвечает на вопросы 24/7, помогает добраться до нужного места без персонала" },
  { icon: "Radio",     title: "Голосовая навигация",   desc: "Аудио-маршруты и подсказки для людей с нарушениями зрения" },
  { icon: "Wifi",      title: "Цифровой помощник",     desc: "Вызов персонала, построение маршрута, информация об услугах — одним нажатием" },
  { icon: "BarChart3", title: "Аналитика обращений",   desc: "Статистика по проблемным зонам и жалобам — улучшайте объект на основе данных" },
];

const CASES = [
  { img: IMG_CASE1, tag: "Образование",               title: "Школа №147, Москва",    task: "Привести объект в соответствие перед плановой проверкой",          solution: "Пандус + платформа + тактильные полосы + информационные таблички", result: "Проверка пройдена с первого раза. 18 рабочих дней" },
  { img: IMG_LIFT,  tag: "Здравоохранение",            title: "Городская больница №5", task: "Комплексное оснащение 4 корпусов доступной средой под ключ",       solution: "Проектирование + поставка + монтаж + AI-навигация для пациентов",  result: "45 дней. Положительная оценка Роспотребнадзора" },
  { img: IMG_CASE2, tag: "Коммерческая недвижимость",  title: "ТРЦ «Галерея», СПб",   task: "Адаптация торгового комплекса при реконструкции под требования ГОСТ", solution: "Проект доступной среды, оборудование, монтаж, сдача документации",  result: "6 входных групп, 12 этажей. Объект сдан в срок" },
];

const STEPS = [
  { num: "01", icon: "ScanSearch",   title: "Обследование",   desc: "Выезд специалиста, фото-протокол, анализ документации" },
  { num: "02", icon: "FileText",     title: "Техзадание",     desc: "Перечень работ, спецификация оборудования, смета" },
  { num: "03", icon: "PencilRuler",  title: "Проектирование", desc: "Разработка документации и согласование с заказчиком" },
  { num: "04", icon: "Wrench",       title: "Реализация",     desc: "Поставка оборудования и монтаж по согласованному графику" },
  { num: "05", icon: "BadgeCheck",   title: "Сдача объекта",  desc: "Итоговая приёмка, документация, сопровождение проверки" },
];

const FAQS = [
  { q: "Сколько стоит оснащение объекта?",  a: "Стоимость зависит от площади, перечня оборудования и объёма монтажных работ. Минимальный бюджет — от 150 000 ₽. Для точного расчёта нужен выезд или техдокументация." },
  { q: "Каковы сроки реализации?",          a: "Типовой объект (до 3 входных групп) — от 10 до 25 рабочих дней. Крупные — 30–60 дней. При срочных задачах работаем в ускоренном режиме." },
  { q: "Работаете по 44-ФЗ и 223-ФЗ?",     a: "Да. Готовим полный пакет документации для участия в торгах и работаем с государственными заказчиками." },
  { q: "Можно ли сделать всё под ключ?",    a: "Да — один договор на весь цикл: аудит → проектирование → поставка → монтаж → сопровождение проверок." },
];

/* ─── Intersection hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── ContactForm ─── */
function ContactForm({ title, subtitle, dark }: { title: string; subtitle?: string; dark?: boolean }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", org: "" });

  if (sent) return (
    <div className={`rounded-3xl p-8 text-center ${dark ? "bg-white/10 border border-white/20" : "bg-white shadow-2xl"}`}>
      <div className="w-16 h-16 bg-[#e8f7ee] rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="CheckCircle" size={32} className="text-[#2d9e5a]" />
      </div>
      <h3 className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-[#1a2e1f]"}`}>Заявка отправлена</h3>
      <p className={`text-sm ${dark ? "text-white/70" : "text-[#6b7a6e]"}`}>Специалист свяжется в течение 30 минут в рабочее время</p>
    </div>
  );

  return (
    <div className={`rounded-3xl p-8 ${dark ? "bg-white/10 border border-white/20 backdrop-blur-xl" : "bg-white shadow-2xl"}`}>
      <h3 className={`text-xl font-bold mb-1 ${dark ? "text-white" : "text-[#1a2e1f]"}`}>{title}</h3>
      {subtitle && <p className={`text-sm mb-6 ${dark ? "text-white/60" : "text-[#8a9e8e]"}`}>{subtitle}</p>}
      <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-3 mt-4">
        {[
          { key: "name",  placeholder: "Ваше имя",                    type: "text" },
          { key: "phone", placeholder: "Телефон",                     type: "tel"  },
          { key: "org",   placeholder: "Организация (необязательно)", type: "text" },
        ].map(f => (
          <input
            key={f.key}
            required={f.key !== "org"}
            type={f.type}
            placeholder={f.placeholder}
            value={form[f.key as keyof typeof form]}
            onChange={e => setForm({ ...form, [f.key]: e.target.value })}
            className={`w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all ${
              dark
                ? "bg-white/15 border border-white/25 text-white placeholder-white/50 focus:border-[#4ade80] focus:bg-white/20"
                : "bg-[#f4faf6] border border-transparent text-[#1a2e1f] placeholder-[#a0b4a5] focus:border-[#2d9e5a] focus:bg-white"
            }`}
          />
        ))}
        <button
          type="submit"
          className="w-full bg-[#2d9e5a] text-white font-bold py-4 rounded-xl hover:bg-[#27894e] transition-all hover:scale-[1.02] active:scale-100 shadow-lg shadow-[#2d9e5a]/30 mt-2"
        >
          Получить консультацию бесплатно
        </button>
        <p className={`text-xs text-center ${dark ? "text-white/40" : "text-[#b0c0b5]"}`}>
          Нажимая кнопку, вы принимаете политику конфиденциальности
        </p>
      </form>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-[#d8ead2] rounded-2xl overflow-hidden hover:border-[#2d9e5a] transition-colors"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-semibold text-[#1a2e1f] pr-4">{q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${open ? "bg-[#2d9e5a] text-white" : "bg-[#e8f7ee] text-[#2d9e5a]"}`}>
          <Icon name={open ? "Minus" : "Plus"} size={16} />
        </div>
      </div>
      {open && (
        <div className="px-6 pb-5 text-[#4a6a50] text-sm leading-relaxed border-t border-[#e8f0e5] pt-4">
          {a}
        </div>
      )}
    </button>
  );
}

/* ══════════════ MAIN PAGE ══════════════ */
export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="font-golos bg-white text-[#1a2e1f] overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-white/96 backdrop-blur-xl shadow-sm border-b border-[#e4f0e7]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#2d9e5a] rounded-xl flex items-center justify-center shadow-lg shadow-[#2d9e5a]/30 group-hover:scale-110 transition-transform">
              <Icon name="Accessibility" size={20} className="text-white" />
            </div>
            <div>
              <div className={`font-black text-sm leading-none tracking-wide transition-colors ${scrolled ? "text-[#1a2e1f]" : "text-white"}`}>ИНВАТЕХ</div>
              <div className={`text-[10px] leading-none transition-colors ${scrolled ? "text-[#8aab90]" : "text-white/60"}`}>Доступная среда</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map(l => (
              <a key={l.href} href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#2d9e5a] ${scrolled ? "text-[#4a6a50]" : "text-white/80"}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className={`hidden sm:flex items-center gap-2 text-sm font-semibold transition-colors ${scrolled ? "text-[#2d9e5a]" : "text-white"}`}>
              <Icon name="Phone" size={15} />
              8 800 123-45-67
            </a>
            <button onClick={() => setModal(true)}
              className="bg-[#2d9e5a] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#27894e] transition-all hover:scale-105 shadow-lg shadow-[#2d9e5a]/25">
              Заявка
            </button>
            <button className="lg:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} className={scrolled ? "text-[#1a2e1f]" : "text-white"} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-[#e4f0e7] px-5 py-4 space-y-1">
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm font-medium text-[#4a6a50] hover:text-[#2d9e5a]">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Доступная среда" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0e]/97 via-[#0d2016]/85 to-[#0d2016]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0e]/70 via-transparent to-transparent" />
        </div>

        {/* Animated blobs */}
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-[#2d9e5a]/15 rounded-full blur-3xl pointer-events-none"
          style={{ animation: "float 6s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#4ade80]/8 rounded-full blur-2xl pointer-events-none"
          style={{ animation: "float 8s ease-in-out infinite", animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-5 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 bg-[#2d9e5a]/20 border border-[#2d9e5a]/40 rounded-full px-4 py-2 mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="w-2 h-2 bg-[#4ade80] rounded-full" style={{ animation: "pulse-green 2s infinite" }} />
              <span className="text-[#4ade80] text-xs font-bold tracking-wider uppercase">ГОСТ · СП 59.13330 · 181-ФЗ</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.06] mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Доступная среда<br />на объекте{" "}
              <span style={{ background: "linear-gradient(135deg, #2d9e5a 0%, #4ade80 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                под ключ
              </span>
            </h1>

            <p className={`text-white/70 text-lg mb-10 max-w-lg leading-relaxed transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Проектирование, поставка и монтаж оборудования для МГН. Аудит, сопровождение проверок и внедрение AI-навигации.
            </p>

            <div className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <button onClick={() => setModal(true)}
                className="bg-[#2d9e5a] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#27894e] transition-all hover:scale-105 shadow-2xl shadow-[#2d9e5a]/40 flex items-center gap-2">
                Получить консультацию
                <Icon name="ArrowRight" size={18} />
              </button>
              <button onClick={() => setModal(true)}
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all">
                Рассчитать стоимость
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {STATS.map(s => (
                <div key={s.val}>
                  <div className="text-2xl sm:text-3xl font-black text-[#4ade80]">{s.val}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className={`hidden lg:block transition-all duration-700 delay-400 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <ContactForm title="Бесплатная консультация" subtitle="Ответим в течение 30 минут в рабочее время" dark />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-white text-xs tracking-widest uppercase">Листайте</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── PROBLEM BAND ── */}
      <section className="bg-[#f4faf6] py-20">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-start gap-6 mb-12">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[#2d9e5a] text-sm font-bold uppercase tracking-widest mb-3">
                  <div className="w-2 h-2 bg-[#2d9e5a] rounded-full" />
                  Типичные проблемы
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1a2e1f] leading-tight">
                  Объект не готов<br />к проверке?
                </h2>
              </div>
              <div className="lg:max-w-sm">
                <p className="text-[#4a6a50] text-base leading-relaxed">
                  Ошибки в обеспечении доступной среды могут привести к отказу ввода объекта в эксплуатацию и штрафам. Мы решаем это за один договор.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="bg-white rounded-3xl p-7 border border-[#e4f0e7] group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-[#fee8e8] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon name={p.icon} size={22} className="text-[#e05252]" fallback="AlertTriangle" />
                  </div>
                  <h3 className="font-bold text-[#1a2e1f] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#6b8a6e] leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-8 bg-[#1a2e1f] rounded-3xl px-8 py-6 flex flex-col sm:flex-row items-center gap-5 justify-between">
              <p className="text-white font-semibold text-lg max-w-xl">
                Мы берём на себя всё — один договор от аудита до сдачи объекта
              </p>
              <button onClick={() => setModal(true)}
                className="flex-shrink-0 bg-[#2d9e5a] text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-[#27894e] transition-all hover:scale-105 shadow-lg shadow-[#2d9e5a]/30 whitespace-nowrap">
                Оставить заявку
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center gap-2 text-[#2d9e5a] text-sm font-bold uppercase tracking-widest mb-3">
              <div className="w-2 h-2 bg-[#2d9e5a] rounded-full" />
              Наши услуги
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a2e1f] max-w-lg leading-tight">
                Полный цикл работ<br />по доступной среде
              </h2>
              <p className="text-[#4a6a50] max-w-xs">Один подрядчик — весь процесс под контролем без лишних согласований</p>
            </div>
          </Reveal>

          {/* Featured card */}
          <Reveal>
            <div className="bg-[#1a2e1f] rounded-3xl p-10 mb-6 flex flex-col lg:flex-row gap-8 items-center overflow-hidden relative">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#2d9e5a]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="flex-1 relative z-10">
                <div className="w-14 h-14 bg-[#2d9e5a]/25 rounded-2xl flex items-center justify-center mb-5">
                  <Icon name="ScanSearch" size={28} className="text-[#4ade80]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Аудит объекта — бесплатно</h3>
                <p className="text-white/60 mb-6 max-w-md">Выезжаем на объект, делаем фото-протокол всех несоответствий ГОСТ и СП. Готовим заключение с планом устранения.</p>
                <button onClick={() => setModal(true)}
                  className="inline-flex items-center gap-2 bg-[#2d9e5a] text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-[#27894e] transition-all hover:scale-105">
                  Записаться на аудит
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="hidden lg:block w-72 h-48 rounded-2xl overflow-hidden flex-shrink-0 relative z-10">
                <img src={IMG_HERO} alt="Аудит объекта" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.slice(1).map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="rounded-3xl p-7 border border-[#e4f0e7] bg-white group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-[#e8f7ee] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#2d9e5a] transition-colors">
                    <Icon name={s.icon} size={22} className="text-[#2d9e5a] group-hover:text-white transition-colors" fallback="CheckSquare" />
                  </div>
                  <h3 className="font-bold text-[#1a2e1f] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#6b8a6e] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT ── */}
      <section id="equipment" className="py-20 bg-[#f4faf6]">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center gap-2 text-[#2d9e5a] text-sm font-bold uppercase tracking-widest mb-3">
              <div className="w-2 h-2 bg-[#2d9e5a] rounded-full" />
              Оборудование
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a2e1f] mb-12">
              Сертифицированное оборудование для МГН
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EQUIPMENT.map((e, i) => (
              <Reveal key={e.title} delay={i * 80}>
                <div className="bg-white rounded-3xl overflow-hidden border border-[#e4f0e7] group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-52 overflow-hidden relative">
                    <img src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-[#2d9e5a] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {e.tag}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#1a2e1f] mb-1">{e.title}</h3>
                    <p className="text-xs text-[#8aab90] mt-auto pt-2 font-mono tracking-wide">{e.spec}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-8 text-center">
              <button onClick={() => setModal(true)}
                className="inline-flex items-center gap-2 border-2 border-[#2d9e5a] text-[#2d9e5a] font-bold px-8 py-4 rounded-2xl hover:bg-[#2d9e5a] hover:text-white transition-all hover:scale-105">
                <Icon name="FileText" size={18} />
                Запросить полный каталог
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AI ── */}
      <section id="ai" className="py-20 bg-[#0d1f11] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#2d9e5a]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4ade80]/8 rounded-full blur-3xl pointer-events-none" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-[#2d9e5a]/20 border border-[#2d9e5a]/30 rounded-full px-4 py-2 mb-6">
                  <Icon name="Sparkles" size={14} className="text-[#4ade80]" />
                  <span className="text-[#4ade80] text-xs font-bold uppercase tracking-wider">Уникальное преимущество</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                  AI-решения для<br />доступной среды
                </h2>
                <p className="text-white/60 text-lg mb-10 leading-relaxed">
                  К физическому оборудованию — цифровой слой. Делаем объект удобным для всех и снижаем нагрузку на персонал.
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {AI_FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={i * 80}>
                    <div className="bg-white/6 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-[#2d9e5a]/40 transition-all group">
                      <div className="w-10 h-10 bg-[#2d9e5a]/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#2d9e5a]/40 transition-colors">
                        <Icon name={f.icon} size={20} className="text-[#4ade80]" fallback="Cpu" />
                      </div>
                      <h3 className="font-bold text-white mb-1 text-sm">{f.title}</h3>
                      <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={300}>
                <button onClick={() => setModal(true)}
                  className="mt-8 inline-flex items-center gap-2 bg-[#2d9e5a] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#27894e] transition-all hover:scale-105 shadow-2xl shadow-[#2d9e5a]/30">
                  Узнать об AI-решениях
                  <Icon name="ArrowRight" size={18} />
                </button>
              </Reveal>
            </div>

            {/* Right: image with floating badge */}
            <Reveal delay={150}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/8">
                  <img src={IMG_AI} alt="AI-навигация для МГН" className="w-full h-[480px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f11]/70 via-transparent to-transparent" />
                </div>
                {/* Floating live-badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2d9e5a] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1a2e1f] text-sm">AI-помощник активен</div>
                      <div className="text-xs text-[#4a6a50]">1 240 запросов обработано сегодня</div>
                    </div>
                    <div className="ml-auto w-3 h-3 bg-[#2d9e5a] rounded-full flex-shrink-0"
                      style={{ animation: "pulse-green 2s infinite" }} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CASES ── */}
      <section id="cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center gap-2 text-[#2d9e5a] text-sm font-bold uppercase tracking-widest mb-3">
              <div className="w-2 h-2 bg-[#2d9e5a] rounded-full" />
              Кейсы
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a2e1f] mb-12">Реализованные проекты</h2>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-7">
            {CASES.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="rounded-3xl overflow-hidden border border-[#e4f0e7] bg-white group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#2d9e5a] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {c.tag}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-black text-[#1a2e1f] mb-4">{c.title}</h3>
                    <div className="space-y-3 flex-1">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 text-[#e05252]">Задача</div>
                        <p className="text-sm text-[#4a6a50]">{c.task}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 text-[#2d9e5a]">Решение</div>
                        <p className="text-sm text-[#4a6a50]">{c.solution}</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-[#e8f7ee] rounded-2xl px-4 py-3">
                      <div className="text-xs text-[#2d9e5a] font-bold uppercase tracking-wider mb-1">Результат</div>
                      <p className="text-sm text-[#1a2e1f] font-semibold">{c.result}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-20 bg-[#f4faf6]">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center gap-2 text-[#2d9e5a] text-sm font-bold uppercase tracking-widest mb-3">
              <div className="w-2 h-2 bg-[#2d9e5a] rounded-full" />
              Как мы работаем
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a2e1f] mb-14">От заявки до сдачи объекта</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#e4f0e7] via-[#2d9e5a]/50 to-[#e4f0e7]" />
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 90}>
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 bg-white rounded-3xl border-2 border-[#e4f0e7] flex flex-col items-center justify-center mb-4 shadow-md hover:-translate-y-1 hover:border-[#2d9e5a] hover:shadow-xl transition-all duration-300 group">
                    <span className="text-xs font-black text-[#2d9e5a] mb-0.5">{s.num}</span>
                    <Icon name={s.icon} size={22} className="text-[#1a2e1f] group-hover:text-[#2d9e5a] transition-colors" fallback="Circle" />
                  </div>
                  <h3 className="font-black text-[#1a2e1f] mb-2 text-sm">{s.title}</h3>
                  <p className="text-xs text-[#6b8a6e] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-16 bg-white border-y border-[#e4f0e7]">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "BadgeCheck", title: "Работа под ключ",    desc: "Один договор на весь цикл"           },
                { icon: "Scale",      title: "ГОСТ · СП · 181-ФЗ", desc: "Полное соответствие нормативам"      },
                { icon: "Building2",  title: "44-ФЗ и 223-ФЗ",     desc: "Опыт с государственными заказчиками"  },
                { icon: "Shield",     title: "Гарантия 3 года",    desc: "На все виды монтажных работ"          },
              ].map((a, i) => (
                <div key={a.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#e8f7ee] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon name={a.icon} size={20} className="text-[#2d9e5a]" fallback="Check" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a2e1f] text-sm">{a.title}</div>
                    <div className="text-xs text-[#8aab90] mt-0.5">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#f4faf6]">
        <div className="max-w-3xl mx-auto px-5">
          <Reveal>
            <div className="flex items-center justify-center gap-2 text-[#2d9e5a] text-sm font-bold uppercase tracking-widest mb-3">
              <div className="w-2 h-2 bg-[#2d9e5a] rounded-full" />
              Частые вопросы
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a2e1f] mb-10 text-center">FAQ</h2>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="contact" className="py-20 bg-[#0d1f11] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#2d9e5a]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Получите бесплатный аудит<br />и расчёт стоимости
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Специалист выедет на объект, проверит соответствие нормативам и подготовит коммерческое предложение.
            </p>
            <div className="space-y-3 mb-10">
              {[
                "Обследование объекта — бесплатно",
                "Расчёт в течение 1 рабочего дня",
                "Работаем по 44-ФЗ и 223-ФЗ",
                "Договор, гарантия, полный пакет документов",
              ].map(t => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#2d9e5a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                  <span className="text-white/70 text-sm">{t}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+78001234567"
                className="flex items-center gap-3 bg-white/8 border border-white/12 rounded-2xl px-6 py-4 hover:bg-white/12 transition-colors">
                <Icon name="Phone" size={20} className="text-[#4ade80]" />
                <div>
                  <div className="text-white font-bold">8 800 123-45-67</div>
                  <div className="text-white/40 text-xs">Звонок бесплатный</div>
                </div>
              </a>
              <a href="mailto:info@invateh-group.ru"
                className="flex items-center gap-3 bg-white/8 border border-white/12 rounded-2xl px-6 py-4 hover:bg-white/12 transition-colors">
                <Icon name="Mail" size={20} className="text-[#4ade80]" />
                <div>
                  <div className="text-white font-bold">info@invateh-group.ru</div>
                  <div className="text-white/40 text-xs">Ответим быстро</div>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <ContactForm title="Заказать аудит объекта" subtitle="Бесплатно. Выезд специалиста в течение 24 часов" dark />
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060e08] py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2d9e5a] rounded-xl flex items-center justify-center">
              <Icon name="Accessibility" size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">ИНВАТЕХ — Доступная среда</span>
          </div>
          <p className="text-[#3a5a40] text-xs text-center">© 2024 ИНВАТЕХ. Оснащение объектов доступной средой для МГН</p>
          <p className="text-[#2d5a38] text-xs font-mono tracking-wide">ГОСТ Р 51261 · СП 59.13330 · 181-ФЗ</p>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={e => { if (e.target === e.currentTarget) setModal(false); }}
        >
          <div className="relative animate-fade-up">
            <button onClick={() => setModal(false)}
              className="absolute -top-3 -right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#f4faf6] z-10 transition-colors">
              <Icon name="X" size={16} className="text-[#1a2e1f]" />
            </button>
            <ContactForm title="Получить консультацию" subtitle="Специалист свяжется в течение 30 минут" />
          </div>
        </div>
      )}
    </div>
  );
}

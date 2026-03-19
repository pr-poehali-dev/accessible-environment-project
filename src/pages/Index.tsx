import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/571e9d06-c7e2-4e01-ae99-5fc499752eea.jpg";
const AI_IMG = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/8ce138f2-4a3d-4416-a62e-74687cbe8443.jpg";
const CASES_IMG = "https://cdn.poehali.dev/projects/8c8138d6-51cc-4928-b421-cfc385f0d4c0/files/149908fd-9164-4a0d-8b05-cf51b357aa8f.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Оборудование", href: "#equipment" },
  { label: "Кейсы", href: "#cases" },
  { label: "AI-решения", href: "#ai" },
  { label: "Контакты", href: "#contact" },
];

const SERVICES = [
  { icon: "ClipboardCheck", title: "Аудит объекта", desc: "Выявим все несоответствия ГОСТ и СП. Подготовим отчёт с перечнем нарушений и планом устранения." },
  { icon: "Ruler", title: "Проектирование", desc: "Разработаем проектную документацию с учётом требований доступности и специфики объекта." },
  { icon: "Package", title: "Поставка оборудования", desc: "Сертифицированное оборудование от ведущих производителей. Все позиции соответствуют нормативам." },
  { icon: "Wrench", title: "Монтаж", desc: "Профессиональная установка силами аттестованных специалистов. Гарантия на все работы." },
  { icon: "ShieldCheck", title: "Сопровождение проверок", desc: "Поддержим при инспекциях и комиссиях. Поможем с оформлением разрешительной документации." },
];

const EQUIPMENT = [
  { icon: "ArrowUpDown", title: "Подъёмные платформы", desc: "Вертикальные и наклонные подъёмники для МГН. Установка в жилых и общественных зданиях." },
  { icon: "Minus", title: "Пандусы", desc: "Стационарные и откидные пандусы из нержавеющей стали. Соответствие ГОСТ Р 51261." },
  { icon: "Footprints", title: "Тактильные указатели", desc: "Напольные и настенные тактильные элементы. Визуальные контрастные полосы, таблички по Брайлю." },
  { icon: "Monitor", title: "Информационные системы", desc: "Звуковые маяки, индукционные петли, системы оповещения для людей с нарушениями слуха." },
];

const CASES = [
  {
    img: HERO_IMG,
    tag: "Образование",
    title: "Школа №147, Москва",
    task: "Привести объект в соответствие с требованиями перед плановой проверкой",
    solution: "Монтаж пандуса, подъёмной платформы, тактильных полос и информационных табличек",
    result: "Объект прошёл проверку с первого раза. Срок реализации — 18 рабочих дней",
  },
  {
    img: CASES_IMG,
    tag: "Здравоохранение",
    title: "Городская больница №5",
    task: "Комплексное оснащение четырёх корпусов доступной средой под ключ",
    solution: "Проектирование, поставка и монтаж всего спектра оборудования + AI-навигация для пациентов",
    result: "Реализовано за 45 дней. Получена положительная оценка Роспотребнадзора",
  },
  {
    img: CASES_IMG,
    tag: "Коммерческая недвижимость",
    title: "ТРЦ «Галерея», Санкт-Петербург",
    task: "Адаптация торгового комплекса под требования ГОСТ при реконструкции",
    solution: "Разработка проекта доступной среды, поставка оборудования, монтаж, сдача документации",
    result: "Оснащено 6 входных групп, 12 этажей. Объект сдан в срок",
  },
];

const PROBLEMS = [
  { icon: "AlertTriangle", text: "Объект не проходит проверку контролирующих органов" },
  { icon: "FileX", text: "Нарушения требований доступности при вводе в эксплуатацию" },
  { icon: "Banknote", text: "Штрафы и предписания с требованием устранить нарушения" },
  { icon: "Clock", text: "Сжатые сроки — проверка уже назначена" },
];

const STEPS = [
  { num: "01", title: "Обследование объекта", desc: "Выезд специалиста, фото-фиксация, анализ документации" },
  { num: "02", title: "Подготовка ТЗ", desc: "Перечень работ, спецификация оборудования, смета" },
  { num: "03", title: "Проектирование", desc: "Разработка проектной документации, согласование" },
  { num: "04", title: "Реализация", desc: "Поставка оборудования и монтаж в согласованные сроки" },
  { num: "05", title: "Сдача объекта", desc: "Итоговая приёмка, документация, сопровождение проверки" },
];

const AI_FEATURES = [
  { icon: "Bot", title: "Чат-бот для посетителей", desc: "Круглосуточные консультации по навигации, услугам и расписанию работы объекта" },
  { icon: "Navigation", title: "Голосовая навигация", desc: "Аудио-подсказки и маршруты для людей с нарушениями зрения" },
  { icon: "Headphones", title: "Цифровой помощник", desc: "AI-ассистент для людей с ОВЗ — поможет вызвать персонал, построить маршрут" },
  { icon: "BarChart3", title: "Автоматизация обращений", desc: "Приём и маршрутизация заявок от посетителей без участия персонала" },
];

const FAQS = [
  { q: "Сколько стоит оснащение объекта?", a: "Стоимость зависит от площади объекта, перечня оборудования и объёма работ. Минимальный бюджет — от 150 000 ₽. Для точного расчёта нужен выезд специалиста или техническая документация по объекту." },
  { q: "Каковы сроки реализации?", a: "Типовой объект (до 3 входных групп) — от 10 до 25 рабочих дней. Крупные объекты — от 30 до 60 дней. Работаем в ускоренном режиме при сжатых сроках перед проверкой." },
  { q: "Работаете ли по 44-ФЗ и 223-ФЗ?", a: "Да. Мы работаем с государственными заказчиками по 44-ФЗ и 223-ФЗ. Готовим полный пакет документации для участия в торгах." },
  { q: "Можно ли заказать под ключ?", a: "Да. Мы берём на себя весь цикл: аудит → проектирование → поставка → монтаж → сопровождение проверок. Один договор, один подрядчик." },
];

const ADVANTAGES = [
  { icon: "BadgeCheck", title: "Работа под ключ", desc: "Один договор на весь цикл работ" },
  { icon: "Scale", title: "Соответствие законодательству", desc: "ГОСТ Р 51261, СП 59.13330, 181-ФЗ" },
  { icon: "Building2", title: "Опыт с госзаказчиками", desc: "44-ФЗ, 223-ФЗ — полный пакет документов" },
  { icon: "Timer", title: "Соблюдение сроков", desc: "Работаем при сжатых дедлайнах" },
  { icon: "Shield", title: "Гарантия на работы", desc: "3 года на все виды монтажа" },
  { icon: "Cpu", title: "Современные технологии", desc: "AI-решения как дополнение к оборудованию" },
];

function ContactForm({ title, subtitle }: { title: string; subtitle?: string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", org: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full">
      {sent ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#E8F0FE] rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-[#1A3A6B]" />
          </div>
          <h3 className="text-xl font-bold text-[#0D1F3C] mb-2">Заявка отправлена</h3>
          <p className="text-[#4A5568]">Наш специалист свяжется с вами в течение 30 минут в рабочее время.</p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold text-[#0D1F3C] mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-[#6B7A99] mb-6">{subtitle}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              required
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[#D1D9E6] rounded-lg px-4 py-3 text-[#0D1F3C] placeholder-[#9AA5B4] focus:outline-none focus:border-[#1A3A6B] transition-colors"
            />
            <input
              required
              type="tel"
              placeholder="Телефон"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-[#D1D9E6] rounded-lg px-4 py-3 text-[#0D1F3C] placeholder-[#9AA5B4] focus:outline-none focus:border-[#1A3A6B] transition-colors"
            />
            <input
              type="text"
              placeholder="Организация (необязательно)"
              value={form.org}
              onChange={e => setForm({ ...form, org: e.target.value })}
              className="w-full border border-[#D1D9E6] rounded-lg px-4 py-3 text-[#0D1F3C] placeholder-[#9AA5B4] focus:outline-none focus:border-[#1A3A6B] transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-[#E8531D] text-white font-semibold py-3.5 rounded-lg hover:bg-[#D0481A] transition-colors"
            >
              Отправить заявку
            </button>
            <p className="text-xs text-[#9AA5B4] text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </>
      )}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-[#D1D9E6] rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-semibold text-[#0D1F3C]">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={20} className="text-[#1A3A6B] flex-shrink-0 ml-4" />
      </div>
      {open && (
        <div className="px-6 pb-5 text-[#4A5568] text-sm leading-relaxed border-t border-[#D1D9E6] pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="font-golos bg-white text-[#0D1F3C]">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-[#E8EDF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1A3A6B] rounded-lg flex items-center justify-center">
              <Icon name="Accessibility" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-[#0D1F3C] leading-tight text-sm">ИНВАТЕХ</div>
              <div className="text-[10px] text-[#6B7A99] leading-tight">Доступная среда</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-[#4A5568] hover:text-[#1A3A6B] transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#1A3A6B]">
              <Icon name="Phone" size={16} />
              8 800 123-45-67
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#E8531D] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#D0481A] transition-colors"
            >
              Получить консультацию
            </button>
            <button
              className="lg:hidden p-2 text-[#1A3A6B]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E8EDF5] px-4 py-4 space-y-3">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="block text-sm font-medium text-[#4A5568] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1F3C] pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F3C] via-[#0D1F3C]/90 to-transparent" />

        {/* grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#E8531D] animate-pulse" />
              <span className="text-white/80 text-xs font-medium">Соответствие ГОСТ · СП 59.13330 · 181-ФЗ</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Обеспечим доступную среду на объекте <span className="text-[#E8531D]">под ключ</span>
            </h1>
            <p className="text-[#A8B8D8] text-lg mb-10 max-w-xl leading-relaxed">
              Проектирование, поставка и монтаж оборудования для маломобильных граждан. Внедрение AI-решений для навигации и обслуживания посетителей.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#E8531D] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#D0481A] transition-all hover:scale-105 shadow-lg shadow-[#E8531D]/30"
              >
                Получить консультацию
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
              >
                Рассчитать стоимость
              </button>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { val: "12+", label: "лет опыта" },
                { val: "340+", label: "объектов сдано" },
                { val: "44-ФЗ", label: "работаем по госзаказу" },
              ].map(s => (
                <div key={s.val}>
                  <div className="text-3xl font-bold text-white">{s.val}</div>
                  <div className="text-[#6B87B8] text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <ContactForm
              title="Бесплатная консультация"
              subtitle="Ответим в течение 30 минут в рабочее время"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 bg-[#F4F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="text-[#E8531D] text-sm font-semibold uppercase tracking-widest mb-4">Типичные проблемы</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1F3C] mb-4">
              Объект не готов к проверке?
            </h2>
            <p className="text-[#4A5568] text-lg mb-10">
              Ошибки в обеспечении доступной среды могут привести к отказу ввода объекта в эксплуатацию, штрафам и предписаниям.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.text} className="bg-white rounded-2xl p-6 border border-[#E8EDF5] hover:border-[#1A3A6B]/30 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-[#FEF0EB] rounded-xl flex items-center justify-center mb-4">
                  <Icon name={p.icon} size={22} className="text-[#E8531D]" fallback="AlertTriangle" />
                </div>
                <p className="text-[#0D1F3C] font-medium leading-snug">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-[#0D1F3C] rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <p className="text-white font-medium max-w-xl">
              Мы решаем все эти задачи в рамках одного договора — от аудита до сдачи объекта. Без лишних подрядчиков и бюрократии.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="flex-shrink-0 bg-[#E8531D] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#D0481A] transition-colors"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-[#E8531D] text-sm font-semibold uppercase tracking-widest mb-4">Наши услуги</div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1F3C] max-w-lg">
              Полный цикл работ по доступной среде
            </h2>
            <p className="text-[#4A5568] max-w-sm">
              Берём на себя весь процесс — от первичного обследования до сопровождения при проверке.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`rounded-2xl p-8 border transition-all hover:shadow-lg group ${i === 0 ? "bg-[#0D1F3C] border-[#0D1F3C]" : "bg-white border-[#E8EDF5] hover:border-[#1A3A6B]/30"}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${i === 0 ? "bg-white/15" : "bg-[#E8F0FE]"}`}>
                  <Icon name={s.icon} size={22} className={i === 0 ? "text-[#E8531D]" : "text-[#1A3A6B]"} fallback="CheckSquare" />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${i === 0 ? "text-white" : "text-[#0D1F3C]"}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? "text-[#A8B8D8]" : "text-[#4A5568]"}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="py-20 bg-[#F4F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-[#E8531D] text-sm font-semibold uppercase tracking-widest mb-4">Оборудование</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1F3C] mb-12">
            Сертифицированное оборудование для МГН
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EQUIPMENT.map((e) => (
              <div key={e.title} className="bg-white rounded-2xl p-6 border border-[#E8EDF5] hover:shadow-md hover:border-[#1A3A6B]/30 transition-all">
                <div className="w-14 h-14 bg-[#0D1F3C] rounded-2xl flex items-center justify-center mb-5">
                  <Icon name={e.icon} size={26} className="text-white" fallback="Package" />
                </div>
                <h3 className="font-bold text-[#0D1F3C] mb-2">{e.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 border-2 border-[#1A3A6B] text-[#1A3A6B] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#1A3A6B] hover:text-white transition-all"
            >
              <Icon name="FileText" size={18} />
              Запросить каталог оборудования
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-[#E8531D] text-sm font-semibold uppercase tracking-widest mb-4">Как мы работаем</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1F3C] mb-12">
            От заявки до сдачи объекта
          </h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-[#E8EDF5] z-0" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {STEPS.map((s) => (
                <div key={s.num}>
                  <div className="w-16 h-16 bg-[#0D1F3C] rounded-2xl flex items-center justify-center mb-5 text-white font-bold text-lg border-4 border-white shadow-md">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-[#0D1F3C] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#6B7A99] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="py-20 bg-[#0D1F3C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #1A3A6B 0%, transparent 60%)" }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 hidden lg:block"
          style={{ backgroundImage: `url(${AI_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E8531D]/20 border border-[#E8531D]/30 rounded-full px-4 py-2 mb-6">
              <Icon name="Sparkles" size={14} className="text-[#E8531D]" />
              <span className="text-[#E8531D] text-xs font-semibold uppercase tracking-wider">Уникальное решение</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              AI-решения для доступной среды
            </h2>
            <p className="text-[#A8B8D8] text-lg mb-10">
              В дополнение к физическому оборудованию — цифровые инструменты, которые делают объект по-настоящему удобным для всех категорий посетителей.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {AI_FEATURES.map((f) => (
                <div key={f.title} className="bg-white/10 border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <div className="w-10 h-10 bg-[#E8531D]/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={f.icon} size={20} className="text-[#E8531D]" fallback="Cpu" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-[#A8B8D8] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-8 inline-flex items-center gap-2 bg-[#E8531D] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#D0481A] transition-colors"
            >
              Узнать об AI-решениях
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-[#E8531D] text-sm font-semibold uppercase tracking-widest mb-4">Кейсы</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1F3C] mb-12">
            Реализованные проекты
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {CASES.map((c) => (
              <div key={c.title} className="rounded-2xl overflow-hidden border border-[#E8EDF5] hover:shadow-xl transition-all group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#1A3A6B] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {c.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0D1F3C] mb-4">{c.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-[#E8531D] font-semibold uppercase tracking-wider mb-1">Задача</div>
                      <p className="text-sm text-[#4A5568]">{c.task}</p>
                    </div>
                    <div>
                      <div className="text-xs text-[#1A3A6B] font-semibold uppercase tracking-wider mb-1">Решение</div>
                      <p className="text-sm text-[#4A5568]">{c.solution}</p>
                    </div>
                    <div className="bg-[#F4F7FB] rounded-xl p-3">
                      <div className="text-xs text-[#6B7A99] font-semibold uppercase tracking-wider mb-1">Результат</div>
                      <p className="text-sm text-[#0D1F3C] font-medium">{c.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 bg-[#F4F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-[#E8531D] text-sm font-semibold uppercase tracking-widest mb-4">Почему выбирают нас</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1F3C] mb-12">
            Наши преимущества
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-6 border border-[#E8EDF5] flex gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-[#E8F0FE] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={a.icon} size={22} className="text-[#1A3A6B]" fallback="Check" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0D1F3C] mb-1">{a.title}</h3>
                  <p className="text-sm text-[#6B7A99]">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-[#E8531D] text-sm font-semibold uppercase tracking-widest mb-4 text-center">FAQ</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1F3C] mb-12 text-center">
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-20 bg-[#0D1F3C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Получите бесплатный аудит и расчёт стоимости
              </h2>
              <p className="text-[#A8B8D8] text-lg mb-8">
                Наш специалист выедет на объект, проверит соответствие нормативам и подготовит коммерческое предложение.
              </p>
              <div className="space-y-4">
                {[
                  "Обследование объекта — бесплатно",
                  "Расчёт в течение 1 рабочего дня",
                  "Работаем по 44-ФЗ и 223-ФЗ",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#E8531D]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-[#E8531D]" />
                    </div>
                    <span className="text-[#A8B8D8]">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+78001234567"
                  className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-colors"
                >
                  <Icon name="Phone" size={20} className="text-[#E8531D]" />
                  <div>
                    <div className="text-white font-bold">8 800 123-45-67</div>
                    <div className="text-[#6B87B8] text-xs">Звонок бесплатный</div>
                  </div>
                </a>
                <a
                  href="mailto:info@invateh-group.ru"
                  className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-6 py-4 hover:bg-white/15 transition-colors"
                >
                  <Icon name="Mail" size={20} className="text-[#E8531D]" />
                  <div>
                    <div className="text-white font-bold">info@invateh-group.ru</div>
                    <div className="text-[#6B87B8] text-xs">Напишите нам</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <ContactForm
                title="Заказать аудит объекта"
                subtitle="Бесплатно. Выезд специалиста в течение 24 часов"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060F1E] text-[#6B7A99] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A3A6B] rounded-lg flex items-center justify-center">
              <Icon name="Accessibility" size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white">ИНВАТЕХ — Доступная среда</span>
          </div>
          <div className="text-xs text-center">
            © 2024 ИНВАТЕХ. Оснащение объектов доступной средой для маломобильных граждан
          </div>
          <div className="text-xs">
            ГОСТ Р 51261 · СП 59.13330 · 181-ФЗ
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-4 -right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#F4F7FB] transition-colors z-10"
            >
              <Icon name="X" size={18} className="text-[#0D1F3C]" />
            </button>
            <ContactForm
              title="Получить консультацию"
              subtitle="Наш специалист свяжется с вами в ближайшее время"
            />
          </div>
        </div>
      )}
    </div>
  );
}

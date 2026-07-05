import React, { useState, useEffect } from "react"
import { 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  Menu, 
  X, 
  ArrowLeft, 
  Calendar, 
  ChevronDown, 
  ShieldCheck
} from "lucide-react"

// Simple Instagram SVG icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

// JSON-LD SEO Schema markup
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "الدكتور مصطفى أحمد لطب وتجميل الأسنان — عيادة ستافرو",
  "image": "https://stavroclinic.com/images/hero-clinic.jpg",
  "@id": "https://stavroclinic.com/#dentist",
  "url": "https://stavroclinic.com",
  "telephone": "+9647700644349",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "شارع السعدي، مجاور مطعم حلم",
    "addressLocality": "البصرة",
    "addressCountry": "IQ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.5081",
    "longitude": "47.8173"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "14:00",
      "closes": "20:00"
    }
  ],
  "inLanguage": "ar"
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen font-sans bg-brand-river-glaze text-brand-deep-blue selection:bg-brand-clay-sand/40 selection:text-brand-deep-blue antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header scrolled={scrolled} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <VisitExperience />
        <Reviews />
        <Location />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  )
}

// ----------------------------------------------------
// HEADER
// ----------------------------------------------------
interface HeaderProps {
  scrolled: boolean
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

function Header({ scrolled, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "عن الطبيب", href: "#about" },
    { label: "الخدمات", href: "#services" },
    { label: "زيارتك", href: "#experience" },
    { label: "الموقع", href: "#location" }
  ]

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-brand-river-glaze/90 backdrop-blur-md border-b border-brand-clay-sand/20 shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleScrollTo(e, "#hero")} className="flex items-center gap-2.5" aria-label="عيادة ستافرو">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-full overflow-hidden border border-brand-clay-sand/35">
            <img src="/logo.jpg" alt="شعار عيادة ستافرو" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">عيادة ستافرو</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-base font-medium text-brand-deep-blue/70 hover:text-brand-deep-blue transition-colors relative after:absolute after:bottom-[-4px] after:inset-x-0 after:h-[2px] after:bg-brand-amber-blossom after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, "#booking")}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-sm bg-brand-deep-blue text-brand-river-glaze hover:bg-brand-midnight-blue transition-colors font-medium"
          >
            احجز موعدك
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-brand-deep-blue"
          aria-expanded={isMobileMenuOpen}
          aria-label="القائمة"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-brand-river-glaze border-b border-brand-clay-sand/30 shadow-lg py-6 px-6">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="text-lg font-medium text-brand-deep-blue/90 hover:text-brand-deep-blue py-1">
                {link.label}
              </a>
            ))}
            <a href="#booking" onClick={(e) => handleScrollTo(e, "#booking")} className="mt-2 w-full text-center px-6 py-3 rounded-sm bg-brand-deep-blue text-brand-river-glaze font-semibold block">
              احجز موعدك
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

// ----------------------------------------------------
// HERO
// ----------------------------------------------------
function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
      {/* Signature background */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <svg viewBox="0 0 1440 800" className="absolute right-0 top-0 w-[120%] h-full opacity-35 text-brand-clay-sand/40 fill-none stroke-current">
          <path d="M 0,250 C 300,100 600,450 900,300 C 1200,150 1350,350 1500,200" strokeWidth="3" className="animate-river-flow" />
          <path d="M 100,550 C 400,380 700,600 1000,450 C 1300,300 1400,450 1600,350" strokeWidth="1.5" strokeDasharray="12,12" className="stroke-brand-sky-blue animate-slow-pulse" />
          <path d="M -50,150 C 350,300 650,120 950,280 C 1250,440 1350,200 1650,250" strokeWidth="1" className="opacity-50" />
          <line x1="200" y1="0" x2="200" y2="800" strokeWidth="0.5" strokeDasharray="5,5" className="opacity-30" />
          <line x1="800" y1="0" x2="800" y2="800" strokeWidth="0.5" strokeDasharray="5,5" className="opacity-30" />
        </svg>
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-brand-clay-sand/20 filter blur-3xl opacity-60"></div>
        <div className="absolute left-10 top-20 w-80 h-80 rounded-full bg-brand-sky-blue/10 filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-start text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-sky-blue/10 text-brand-sky-blue text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-brand-amber-blossom" />
            <span>طب وتجميل الأسنان في البصرة</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] mb-6">
            ابتسامة تليق بك.
            <br />
            <span className="text-brand-sky-blue">رعاية تستحقها.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-brand-deep-blue/75 leading-relaxed mb-8 max-w-xl">
            عيادة الدكتور مصطفى أحمد في البصرة. نعالج، نرمّم، ونبني ابتسامات تدوم — بيد خبيرة ومعاملة تحترم وقتك.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }) }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-sm bg-brand-deep-blue text-brand-river-glaze hover:bg-brand-midnight-blue transition-all font-semibold shadow-md hover:shadow-lg text-center"
            >
              احجز موعدك الآن
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }) }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-sm bg-transparent text-brand-deep-blue border border-brand-clay-sand hover:bg-brand-clay-sand/10 transition-all font-medium text-center"
            >
              تعرّف على العيادة
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-5 flex justify-center items-center relative select-none">
          <div className="relative w-full max-w-md">
            {/* Decorative offset border */}
            <div className="absolute inset-0 border border-brand-sky-blue/30 transform -translate-x-4 translate-y-4 rounded-sm pointer-events-none"></div>
            
            {/* Image container */}
            <div className="relative overflow-hidden rounded-sm shadow-xl">
              <img 
                src="/hero-smile.jpg" 
                alt="ابتسامة طبيعية بعد علاج تجميلي — عيادة ستافرو، البصرة" 
                className="w-full h-auto object-cover aspect-[4/5]"
                loading="eager"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-deep-blue/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Caption badge */}
            <div className="absolute bottom-4 right-4 bg-brand-river-glaze/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-md z-10">
              <span className="font-display text-sm font-bold text-brand-deep-blue">د. مصطفى أحمد</span>
              <span className="block text-xs text-brand-sky-blue font-medium">طب وتجميل الأسنان — البصرة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// TRUST BAR
// ----------------------------------------------------
function TrustBar() {
  const pillars = [
    {
      title: "تشخيص دقيق",
      description: "فحص شامل بأحدث الأجهزة، ونتائج تُعرض لك مباشرة على الشاشة قبل أي قرار علاجي."
    },
    {
      title: "وقتك محترم",
      description: "مواعيد منظمة، لا انتظار طويل. جلستك تبدأ بالوقت المتفق عليه وتأخذ حقها كاملاً."
    },
    {
      title: "تعقيم بمعايير عالمية",
      description: "كل أداة مُعقّمة وفق بروتوكولات صارمة. سلامتك ليست شعاراً — هي إجراء يومي ثابت."
    }
  ]

  return (
    <section className="bg-brand-deep-blue text-brand-river-glaze py-12 border-t border-b border-brand-midnight-blue z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="sr-only">لماذا عيادة ستافرو</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-brand-sky-blue/20">
          {pillars.map((pillar, idx) => (
            <div key={idx} className={`flex flex-col items-start text-start ${idx !== 0 ? "pt-8 md:pt-0 md:pe-8" : "md:pe-4"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-brand-amber-blossom" />
                <h3 className="font-display text-lg font-bold tracking-wide">{pillar.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-brand-river-glaze/80 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// ABOUT
// ----------------------------------------------------
function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-brand-clay-sand/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Photo placeholder */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-0 border border-brand-sky-blue/30 transform translate-x-4 translate-y-4 rounded-sm pointer-events-none"></div>
            <div className="relative overflow-hidden rounded-sm shadow-xl">
              <img 
                src="/doctor.jpg" 
                alt="الدكتور مصطفى أحمد لطب وتجميل الأسنان في البصرة" 
                className="w-full h-auto object-cover aspect-[3/4]"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-deep-blue/40 to-transparent pointer-events-none"></div>
              
              {/* Overlay card for credentials */}
              <div className="absolute bottom-4 right-4 left-4 bg-brand-river-glaze/95 backdrop-blur-sm px-4 py-2.5 rounded-sm shadow-md flex justify-between items-center">
                <div>
                  <span className="font-display text-sm font-bold text-brand-deep-blue block">د. مصطفى أحمد</span>
                  <span className="text-[10px] text-brand-sky-blue font-medium">طب وتجميل الأسنان</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-amber-blossom"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-start">
          <div className="text-sm font-semibold tracking-wider text-brand-sky-blue mb-3 uppercase">عن الطبيب</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            الدكتور مصطفى أحمد
          </h2>
          
          <div className="space-y-5 text-brand-deep-blue/80 leading-relaxed text-base sm:text-lg">
            <p>
              طبيب أسنان متخصص بالترميم والتجميل في البصرة. أسست عيادة ستافرو لتقديم مستوى مختلف من الرعاية — حيث الكفاءة الطبية تأتي أولاً، والمعاملة المحترمة ليست استثناءً بل قاعدة.
            </p>
            <p>
              أركّز في عملي على إعادة بناء الأسنان وترميمها وتغليفها بتركيبات الزركون الصحية. أؤمن أن العلاج الجيد يبدأ بتشخيص صحيح وشرح واضح — فالمريض الذي يفهم حالته يتخذ قرارات أفضل.
            </p>
            <p>
              كل مراجع يحصل على وقته الكامل. لا أعمل بنظام "الأسرع ينتهي أولاً"، بل بنظام يضمن نتيجة تستحق الثقة.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-brand-clay-sand/40 w-full flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
            <div>
              <span className="block text-2xl font-bold font-display">البصرة، العراق</span>
              <span className="text-sm text-brand-sky-blue font-medium">عيادة ستافرو — شارع السعدي</span>
            </div>
            <a href="#booking" className="inline-flex items-center gap-2 font-bold hover:text-brand-sky-blue transition-colors group">
              <span>احجز لقاءك الأول</span>
              <ArrowLeft className="w-5 h-5 text-brand-amber-blossom transition-transform group-hover:-translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// SERVICES
// ----------------------------------------------------
function Services() {
  const [activeService, setActiveService] = useState<number | null>(null)

  const serviceList = [
    {
      category: "إعادة بناء الأسنان",
      title: "إعادة بناء الأسنان المتضررة",
      description: "أسنان مكسورة أو متآكلة؟ نعيد بناءها من الأساس بشكل يستعيد وظيفتها ومظهرها الطبيعي.",
      details: "نقيّم بنية السن المتبقية ونختار الأسلوب الأنسب — حشوة تجميلية مركّبة، أو إعادة بناء كاملة مع تلبيسة — بما يضمن نتيجة متينة وطبيعية."
    },
    {
      category: "ترميم الأسنان",
      title: "ترميم وحشوات تجميلية",
      description: "معالجة التسوس وترميم الشكل الطبيعي للسن بمواد تتطابق مع لون أسنانك بدقة.",
      details: "نستخدم حشوات ضوئية مركّبة عالية الجودة. نزيل فقط الجزء المتضرر ونحافظ على أكبر قدر ممكن من بنية السن الطبيعية."
    },
    {
      category: "تركيبات الزركون",
      title: "تغليف الأسنان بتركيبات الزركون الصحية",
      description: "تيجان وجسور زركونيا خالية من المعادن — صلبة، صحية، وبمظهر لا يختلف عن أسنانك الطبيعية.",
      details: "نصمم كل تركيبة بشكل فردي لتطابق لون وشكل أسنانك المجاورة وإطباق فكك الطبيعي. النتيجة: أسنان قوية تأكل عليها بثقة."
    },
    {
      category: "علاج العصب",
      title: "علاج العصب وإنهاء الألم",
      description: "ألم حاد في السن؟ نعالج العصب الملتهب وننقذ السن بدل خلعه.",
      details: "نستخدم أجهزة حديثة لتنظيف القنوات بدقة وحشوها بشكل محكم. التخدير فعّال، والجلسة أقصر مما تتوقع."
    },
    {
      category: "تنظيف وعناية",
      title: "تنظيف الأسنان وإزالة الجير",
      description: "إزالة الجير المتراكم وتلميع الأسنان — الخطوة الأولى لأي ابتسامة صحية.",
      details: "جلسة تنظيف احترافية بأجهزة موجات فوق صوتية لطيفة. ننهيها بتلميع يعيد لأسنانك ملمسها الناعم وبريقها."
    },
    {
      category: "تبييض الأسنان",
      title: "تبييض احترافي وآمن",
      description: "درجات تفتيح طبيعية ومتناسقة بمواد آمنة على المينا — بدون مبالغة أو نتائج مصطنعة.",
      details: "نختار تركيز التبييض المناسب لحالة أسنانك وحساسيتها. الهدف ابتسامة مشرقة تبدو طبيعية وتليق بك."
    }
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-brand-river-glaze relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl text-start mb-16 md:mb-20">
          <div className="text-sm font-semibold tracking-wider text-brand-sky-blue mb-3 uppercase">خدماتنا</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5">
            ماذا نقدم في عيادة ستافرو
          </h2>
          <p className="text-lg text-brand-deep-blue/70 leading-relaxed">
            نتخصص في إعادة بناء الأسنان وترميمها وتغليفها بتركيبات الزركون. اضغط على أي خدمة لمعرفة التفاصيل.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {serviceList.map((service, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveService(activeService === idx ? null : idx)}
              className={`border border-brand-clay-sand/40 bg-brand-river-glaze/50 p-6 sm:p-8 rounded-sm hover:border-brand-sky-blue/60 transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${
                activeService === idx ? "shadow-md bg-brand-clay-sand/5 border-brand-sky-blue" : ""
              }`}
              role="button"
              aria-expanded={activeService === idx}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveService(activeService === idx ? null : idx) } }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold text-brand-sky-blue bg-brand-sky-blue/10 px-2.5 py-1 rounded-sm">{service.category}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-clay-sand transition-transform duration-300 ${activeService === idx ? "rotate-180 text-brand-amber-blossom" : ""}`} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-brand-deep-blue/70 text-sm sm:text-base leading-relaxed">{service.description}</p>
              </div>
              <div className={`overflow-hidden transition-all duration-350 ease-in-out ${activeService === idx ? "max-h-40 opacity-100 mt-4 pt-4 border-t border-brand-clay-sand/30" : "max-h-0 opacity-0"}`}>
                <p className="text-xs sm:text-sm text-brand-sky-blue leading-relaxed bg-brand-river-glaze p-3 border-r-2 border-brand-amber-blossom">{service.details}</p>
              </div>
              <div className="absolute right-0 top-0 w-2 h-0.5 bg-brand-amber-blossom opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute right-0 top-0 h-2 w-0.5 bg-brand-amber-blossom opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-start text-xs sm:text-sm text-brand-deep-blue/60 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-sky-blue flex-shrink-0" />
          <span>جميع الإجراءات تتم وفق بروتوكولات تعقيم صارمة ومعايير مكافحة العدوى المعتمدة.</span>
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// VISIT EXPERIENCE
// ----------------------------------------------------
function VisitExperience() {
  const steps = [
    {
      number: "01",
      title: "الاستقبال",
      description: "نستقبلك بمواعيد منظمة. لا ازدحام ولا انتظار طويل — تدخل في الوقت المحدد وتبدأ جلستك مباشرة."
    },
    {
      number: "02",
      title: "الفحص والتشخيص",
      description: "فحص شامل باستخدام كاميرا فموية وأشعة رقمية. نعرض لك حالة أسنانك على الشاشة ونشرح لك الخيارات بوضوح."
    },
    {
      number: "03",
      title: "العلاج",
      description: "نعمل بدقة، بتخدير فعّال، وبالسرعة المناسبة. إذا احتجت استراحة خلال الجلسة — فقط أشر وسنتوقف."
    },
    {
      number: "04",
      title: "المتابعة",
      description: "بعد العلاج نزوّدك بتعليمات واضحة للعناية المنزلية، ونتواصل معك للاطمئنان على النتيجة."
    }
  ]

  return (
    <section id="experience" className="py-20 md:py-32 bg-brand-deep-blue text-brand-river-glaze relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 600" className="w-full h-full stroke-brand-clay-sand fill-none stroke-[2]">
          <path d="M-100,300 C300,100 500,500 900,200 C1300,-100 1200,400 1600,100" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl text-start mb-16">
          <div className="text-sm font-semibold tracking-wider text-brand-clay-sand mb-3 uppercase">زيارتك</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5">كيف تسير زيارتك</h2>
          <p className="text-lg text-brand-river-glaze/80 leading-relaxed">
            أربع خطوات واضحة من لحظة دخولك حتى عودتك لبيتك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-[2.5rem] inset-x-8 h-[1px] bg-brand-sky-blue/20 -z-10"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start text-start relative group">
              <div className="w-12 h-12 rounded-full border border-brand-clay-sand/30 bg-brand-deep-blue text-brand-amber-blossom font-display text-xl font-bold flex items-center justify-center mb-6 group-hover:border-brand-amber-blossom transition-colors">
                {step.number}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-brand-river-glaze/75 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// REVIEWS
// ----------------------------------------------------
function Reviews() {
  /* PLACEHOLDER: REPLACE WITH REAL PATIENT REVIEWS BEFORE LAUNCH */
  const reviews = [
    {
      quote: "دكتور مصطفى شرحلي حالتي بالكامل قبل ما يبدأ أي شي. أول مرة أزور طبيب أسنان وأطلع فاهم بالضبط شنو صار بأسناني. ترميم ممتاز والنتيجة طبيعية جداً.",
      author: "أبو محمد",
      location: "البصرة"
    },
    {
      quote: "سويت تركيبات زركون عنده. الشغل نظيف ودقيق، والأسنان طلعت بالضبط بلون أسناني الطبيعية. المواعيد منظمة ولا انتظرت ولا مرة.",
      author: "سارة م.",
      location: "البصرة"
    },
    {
      quote: "عيادة محترمة ونظيفة. الدكتور يأخذ وقته مع كل مريض ولا يستعجل. عالجت عصب وما حسيت بشي — التخدير كان ممتاز.",
      author: "أحمد ع.",
      location: "البصرة"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-brand-clay-sand/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl text-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-deep-blue/10 text-brand-deep-blue text-xs font-semibold rounded-sm mb-4">
            <span>نماذج استرشادية — تُستبدل بآراء حقيقية عند الإطلاق</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5">ماذا يقول المراجعون</h2>
          <p className="text-lg text-brand-deep-blue/70 leading-relaxed">
            تجارب من مرضى عيادة ستافرو في البصرة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-brand-river-glaze border border-brand-clay-sand/40 p-8 rounded-sm shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between">
              <div className="text-6xl text-brand-clay-sand/30 font-display absolute top-4 left-6 select-none" aria-hidden="true">"</div>
              <p className="text-base text-brand-deep-blue/80 leading-relaxed mb-8 relative z-10">{rev.quote}</p>
              <div className="border-t border-brand-clay-sand/30 pt-4 mt-auto flex justify-between items-center text-sm">
                <div>
                  <span className="block font-bold">{rev.author}</span>
                  <span className="text-brand-sky-blue text-xs">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-brand-deep-blue/50 italic">
          * نماذج صياغة تُستبدل بآراء المراجعين الفعلية قبل إطلاق الموقع.
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// LOCATION
// ----------------------------------------------------
function Location() {
  return (
    <section id="location" className="py-20 md:py-32 bg-brand-river-glaze relative z-10 border-t border-brand-clay-sand/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
        <div className="lg:col-span-6 flex flex-col items-start text-start">
          <div className="text-sm font-semibold tracking-wider text-brand-sky-blue mb-3 uppercase">الموقع والتواصل</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">زوروا عيادتنا</h2>
          
          <div className="space-y-7 w-full">
            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-sm bg-brand-clay-sand/20 text-brand-sky-blue flex-shrink-0"><MapPin className="w-5 h-5" /></div>
              <div>
                <h3 className="font-display text-base font-bold mb-1">العنوان</h3>
                <p className="text-brand-deep-blue/75 leading-relaxed">
                  البصرة — شارع السعدي، مجاور مطعم حلم
                  <br /><span className="text-sm text-brand-sky-blue font-medium">(عيادة ستافرو)</span>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-sm bg-brand-clay-sand/20 text-brand-sky-blue flex-shrink-0"><Phone className="w-5 h-5" /></div>
              <div>
                <h3 className="font-display text-base font-bold mb-1">للحجز والاستفسار</h3>
                <a href="tel:+9647700644349" className="text-brand-deep-blue/80 hover:text-brand-sky-blue transition-colors font-medium" dir="ltr">+964 770 064 4349</a>
              </div>
            </div>

            {/* Hours */}
            {/* PLACEHOLDER: CONFIRM ACTUAL HOURS WITH THE CLINIC BEFORE LAUNCH */}
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-sm bg-brand-clay-sand/20 text-brand-sky-blue flex-shrink-0"><Clock className="w-5 h-5" /></div>
              <div className="w-full">
                <h3 className="font-display text-base font-bold mb-1">ساعات العمل</h3>
                <div className="space-y-1 text-brand-deep-blue/75">
                  <div className="flex justify-between max-w-xs border-b border-brand-clay-sand/20 pb-1">
                    <span>السبت — الخميس</span>
                    <span className="font-medium">2:00 — 8:00 مساءً</span>
                  </div>
                  <div className="flex justify-between max-w-xs text-brand-sky-blue pt-1">
                    <span>الجمعة</span>
                    <span>مغلق</span>
                  </div>
                </div>
                <p className="text-xs text-brand-deep-blue/50 mt-2">يُفضّل الحجز المسبق لضمان توفر الموعد.</p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-sm bg-brand-clay-sand/20 text-brand-sky-blue flex-shrink-0"><InstagramIcon className="w-5 h-5" /></div>
              <div>
                <h3 className="font-display text-base font-bold mb-1">انستغرام</h3>
                <a href="https://www.instagram.com/stafro.clinic/" target="_blank" rel="noopener noreferrer" className="text-brand-sky-blue hover:text-brand-amber-blossom font-semibold transition-colors" dir="ltr">
                  @stafro.clinic
                </a>
              </div>
            </div>

            {/* Emergency */}
            <div className="p-5 border-r-2 border-brand-amber-blossom bg-brand-clay-sand/10 rounded-sm">
              <h4 className="font-display text-base font-bold mb-1">حالة طارئة؟</h4>
              <p className="text-sm text-brand-deep-blue/70 leading-relaxed">
                نحرص على استقبال حالات الألم الحاد بأسرع وقت ممكن. اتصل بنا مباشرة.
              </p>
            </div>
          </div>
        </div>

        {/* Location Map Image */}
        <div className="lg:col-span-6 w-full h-full">
          <div className="relative group h-full flex flex-col">
            <div className="absolute inset-0 border border-brand-sky-blue/30 transform -translate-x-4 translate-y-4 rounded-sm pointer-events-none transition-transform group-hover:-translate-x-2 group-hover:translate-y-2 duration-300"></div>
            <div className="relative flex-1 overflow-hidden rounded-sm border border-brand-clay-sand/40 shadow-md min-h-[400px] lg:min-h-full flex flex-col">
              <img 
                src="/location.jpg" 
                alt="خريطة موقع عيادة ستافرو في البصرة" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-blue/80 via-transparent to-brand-deep-blue/20 opacity-90 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start text-xs uppercase tracking-widest text-brand-river-glaze/95 font-semibold z-10">
                  <span className="bg-brand-deep-blue/60 backdrop-blur-xs px-2.5 py-1 rounded-xs">خريطة الموقع</span>
                  <span className="bg-brand-deep-blue/60 backdrop-blur-xs px-2.5 py-1 rounded-xs">البصرة — شارع السعدي</span>
                </div>
                <div className="flex justify-between items-center mt-auto z-10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-amber-blossom animate-pulse" />
                    <span className="text-sm font-semibold text-white drop-shadow-sm">مجاور مطعم حلم</span>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=30.5081,47.8173" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-5 py-2 bg-brand-deep-blue text-brand-river-glaze text-xs font-bold hover:bg-brand-sky-blue hover:text-brand-deep-blue transition-colors rounded-sm shadow-sm"
                  >
                    فتح في خرائط جوجل
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// BOOKING CTA
// ----------------------------------------------------
function BookingCTA() {
  const whatsappUrl = "https://wa.me/9647700644349?text=" + encodeURIComponent("مرحباً دكتور مصطفى، أود حجز موعد في عيادة ستافرو.")

  return (
    <section id="booking" className="py-20 md:py-28 bg-brand-deep-blue text-brand-river-glaze relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 400" className="w-[120%] h-full stroke-brand-amber-blossom fill-none stroke-[3] animate-river-flow">
          <path d="M-50,250 C300,100 700,350 1100,150 C1300,50 1500,200 1600,100" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sky-blue/20 text-brand-clay-sand text-sm font-semibold rounded-full mb-6">
          <Calendar className="w-4 h-4 text-brand-amber-blossom" />
          <span>احجز موعدك</span>
        </div>
        
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
          ابتسامتك تستاهل الأفضل.
        </h2>
        
        <p className="text-base sm:text-lg text-brand-river-glaze/80 leading-relaxed mb-10 max-w-xl mx-auto">
          تواصل معنا عبر واتساب لحجز موعدك، أو اتصل بنا مباشرة. نرد بأسرع وقت.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm font-bold shadow-md hover:shadow-lg transition-all text-lg"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.12 1.95 12.014 1.95c-5.439 0-9.863 4.372-9.867 9.802-.001 1.767.478 3.491 1.388 5.031L2.528 21.43l4.757-1.246-.638-.38zm11.238-7.39c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.677.15-.2.3-.777.975-.951 1.174-.174.2-.35.225-.65.075-1.018-.51-1.776-.843-2.476-2.043-.186-.322.186-.299.53-.99.08-.163.04-.306-.02-.456-.06-.15-.476-1.147-.652-1.571-.172-.413-.347-.356-.476-.363-.122-.006-.263-.007-.403-.007s-.37.052-.564.263c-.194.21-.74.724-.74 1.766s.757 2.048.86 2.19c.104.14 1.49 2.276 3.61 3.19.504.217.898.347 1.205.445.508.162.97.139 1.336.084.408-.06 1.772-.724 2.022-1.39.25-.664.25-1.234.175-1.39-.077-.15-.278-.25-.578-.4z" />
            </svg>
            <span>احجز عبر واتساب</span>
          </a>

          <a
            href="tel:+9647700644349"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-brand-river-glaze border border-brand-clay-sand/40 hover:bg-brand-clay-sand/10 rounded-sm font-semibold transition-all text-base"
          >
            <Phone className="w-5 h-5 text-brand-amber-blossom" />
            <span dir="ltr">+964 770 064 4349</span>
          </a>
        </div>

        <div className="mt-8 text-xs text-brand-clay-sand/80">
          متاح من السبت إلى الخميس • نردّ خلال ساعات العمل
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// FOOTER
// ----------------------------------------------------
function Footer() {
  return (
    <footer className="bg-brand-midnight-blue text-brand-river-glaze py-12 border-t border-brand-deep-blue/80 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-start">
          <div className="flex items-center gap-3 mb-2 flex-wrap justify-center md:justify-start">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-clay-sand/30 flex-shrink-0">
              <img src="/logo.jpg" alt="عيادة ستافرو" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-xl font-bold">عيادة ستافرو</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-amber-blossom"></div>
            <span className="text-xs text-brand-clay-sand font-medium">د. مصطفى أحمد — طب وتجميل الأسنان</span>
          </div>
          <a href="https://www.instagram.com/stafro.clinic/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-brand-sky-blue hover:text-brand-amber-blossom mt-2 transition-colors">
            <InstagramIcon className="w-4 h-4" />
            <span dir="ltr">@stafro.clinic</span>
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-end text-xs sm:text-sm text-brand-river-glaze/50 gap-1.5">
          <span>البصرة — شارع السعدي، مجاور مطعم حلم</span>
          <span>© {new Date().getFullYear()} عيادة ستافرو</span>
        </div>
      </div>
    </footer>
  )
}

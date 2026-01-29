import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import {
  Zap,
  BarChart3,
  Users,
  Clock,
  Shield,
  ChevronRight,
  Check,
  Menu,
  X,
  ArrowRight,
  Play,
  CreditCard,
  TrendingUp,
  Wifi,
  Bot,
  MessageSquare,
  Brain,
  Sparkles,
  Gauge,
  Activity,
  GitBranch,
  Timer,
  ShoppingCart,
  Package,
  Receipt,
  Settings,
  Bell,
  Search,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  Star,
  Coffee,
  Wine,
  Beer,
  Martini,
  Layers,
  PieChart,
  Calendar,
  DollarSign,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import clsx from 'clsx';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Animated Section Wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView || (isInView && !hasAnimated.current)) {
      hasAnimated.current = true;
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isInView, startOnView]);

  return { count, ref };
}

// Navigation
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Software', href: '#software' },
    { name: 'IA', href: '#ai-agents' },
    { name: 'Queue Engine', href: '#queue-engine' },
    { name: 'Precios', href: '#pricing' },
  ];

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-white/80 backdrop-blur-lg'
    )}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Clubiio" className="w-10 h-10 rounded-xl object-cover" />
            <span className="font-bold text-xl text-gray-900">Clubiio</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="/login" className="btn btn-ghost">Iniciar Sesión</a>
            <a href="#contact" className="btn btn-primary">
              Comenzar Gratis
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {links.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <a href="/login" className="btn btn-secondary">Iniciar Sesión</a>
                <a href="#contact" className="btn btn-primary">Comenzar Gratis</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section with Interactive Dashboard
function Hero() {
  const [activeMetric, setActiveMetric] = useState(0);
  const metrics = [
    { label: 'Ventas Hoy', value: '$4.250.000', change: '+12.5%', positive: true },
    { label: 'Órdenes', value: '435', change: '+8.2%', positive: true },
    { label: 'Ticket Promedio', value: '$9,770', change: '+3.8%', positive: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Nuevo: Agentes de IA para tu negocio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              El POS más rápido para{' '}
              <span className="gradient-text">bares y festivales</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl"
            >
              Optimiza tus ventas con nuestra plataforma intuitiva potenciada por IA.
              Interfaz diseñada para velocidad máxima en eventos de alto volumen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a href="#contact" className="btn btn-primary text-lg px-8 group">
                Prueba Gratis 14 Días
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#software" className="btn btn-secondary text-lg px-8">
                <Play className="w-5 h-5 mr-2" />
                Ver Software
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                      className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                      ['bg-primary-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'][i]
                    }`}>
                      {['J', 'M', 'A', 'C'][i]}
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">+500 negocios activos</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + i * 0.05, type: 'spring' }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
                <span className="text-sm text-gray-600 ml-1">4.9/5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-3xl rounded-full"
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Window Controls */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2">
                  <img src="/logo.jpg" alt="Clubiio" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white text-sm font-medium">Clubiio Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-4">
                {/* Top Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {metrics.map((metric, i) => (
                    <div
                      key={i}
                      className={clsx(
                        'rounded-xl p-3 transition-all duration-300 cursor-pointer',
                        activeMetric === i
                          ? 'bg-primary-600 scale-105'
                          : 'bg-gray-800 hover:bg-gray-700'
                      )}
                      onClick={() => setActiveMetric(i)}
                    >
                      <p className={clsx('text-xs', activeMetric === i ? 'text-white/70' : 'text-gray-400')}>
                        {metric.label}
                      </p>
                      <p className={clsx('font-bold text-lg', activeMetric === i ? 'text-white' : 'text-white')}>
                        {metric.value}
                      </p>
                      <p className={clsx('text-xs', metric.positive ? 'text-green-400' : 'text-red-400')}>
                        {metric.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Ventas por hora</span>
                    <span className="text-xs text-primary-400">Hoy vs Ayer</span>
                  </div>
                  <div className="flex items-end gap-1 h-24">
                    {[30, 45, 35, 60, 50, 75, 65, 85, 95, 80, 70, 55].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1">
                        <div
                          className="bg-primary-500 rounded-t transition-all duration-500"
                          style={{
                            height: `${h}%`,
                            opacity: i <= 8 ? 1 : 0.3,
                            animation: `grow 0.5s ease-out ${i * 0.05}s both`
                          }}
                        />
                        <div
                          className="bg-gray-600 rounded-t"
                          style={{ height: `${h * 0.7}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>00:00</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: ShoppingCart, label: 'POS', color: 'bg-blue-500' },
                    { icon: Package, label: 'Stock', color: 'bg-green-500' },
                    { icon: Users, label: 'Staff', color: 'bg-purple-500' },
                    { icon: BarChart3, label: 'Reportes', color: 'bg-orange-500' },
                  ].map((action, i) => (
                    <button key={i} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors group">
                      <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-400">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-xl p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 1, duration: 0.5 },
                x: { delay: 1, duration: 0.5 },
                y: { delay: 1.5, duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ventas +</p>
                  <p className="font-bold text-sm text-gray-900">32%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 top-1/3 bg-white rounded-xl shadow-xl p-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 1.3, duration: 0.5 },
                x: { delay: 1.3, duration: 0.5 },
                y: { delay: 1.8, duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">IA Activa</p>
                  <p className="font-bold text-sm text-gray-900">24/7</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 left-1/4 bg-white rounded-xl shadow-xl p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 1.6, duration: 0.5 },
                y: { delay: 2.1, duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Espera</p>
                  <p className="font-bold text-sm text-gray-900">-45%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Software Showcase Section with Tabs
function SoftwareShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [cartItems, setCartItems] = useState([
    { name: 'Cerveza Artesanal IPA', price: 5500, qty: 2 },
    { name: 'Pisco Sour', price: 6500, qty: 1 },
  ]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const tabs = [
    { id: 'pos', label: 'Punto de Venta', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'inventory', label: 'Inventario', icon: Package },
    { id: 'staff', label: 'Staff', icon: Users },
  ];

  const products = [
    { name: 'Cerveza Artesanal IPA', price: 5500, icon: Beer, category: 'Cervezas' },
    { name: 'Pisco Sour', price: 6500, icon: Martini, category: 'Cócteles' },
    { name: 'Vodka Tonic', price: 5000, icon: Wine, category: 'Cócteles' },
    { name: 'Espresso Martini', price: 7500, icon: Coffee, category: 'Cócteles' },
    { name: 'Corona', price: 4500, icon: Beer, category: 'Cervezas' },
    { name: 'Aperol Spritz', price: 7000, icon: Wine, category: 'Cócteles' },
  ];

  const addToCart = (product: typeof products[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { name: product.name, price: product.price, qty: 1 }];
    });
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <section id="software" className="section bg-gray-50" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Layers className="w-4 h-4" />
            <span>Plataforma Completa</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Software diseñado para{' '}
            <span className="gradient-text">máxima velocidad</span>
          </h2>
          <p className="text-lg text-gray-600">
            Cada pantalla optimizada para reducir clics y acelerar el servicio.
            Interfaz intuitiva que tu equipo dominará en minutos.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                  activeTab === i
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Software Mockups */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* POS Terminal */}
          {activeTab === 0 && (
            <div className="grid lg:grid-cols-3 min-h-[500px]">
              {/* Products Grid */}
              <div className="lg:col-span-2 p-6 border-r border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">Productos</h3>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                      {products.length} items
                    </span>
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {['Todos', 'Cervezas', 'Cócteles', 'Shots', 'Sin Alcohol'].map((cat, i) => (
                    <button
                      key={cat}
                      className={clsx(
                        'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                        i === 0 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {products.map((product, i) => (
                    <button
                      key={i}
                      onClick={() => addToCart(product)}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-primary-50 hover:border-primary-200 border-2 border-transparent transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <product.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 text-center">{product.name}</span>
                      <span className="text-sm text-primary-600 font-bold">${product.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart */}
              <div className="bg-gray-50 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Orden Actual</h3>
                  <span className="text-xs text-gray-500">Mesa 5</span>
                </div>

                <div className="flex-1 space-y-3 mb-4">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price.toLocaleString()} x {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                        <button className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">${total.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-3 rounded-xl bg-gray-200 font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Tarjeta
                    </button>
                    <button className="py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Efectivo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Dashboard */}
          {activeTab === 1 && (
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Ventas Hoy', value: '$4.2M', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
                  { label: 'Órdenes', value: '435', change: '+8.2%', icon: Receipt, color: 'bg-blue-500' },
                  { label: 'Clientes', value: '287', change: '+15.3%', icon: Users, color: 'bg-purple-500' },
                  { label: 'Ticket Promedio', value: '$9,770', change: '+3.8%', icon: TrendingUp, color: 'bg-orange-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900">Ventas por Hora</h4>
                    <select className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1">
                      <option>Hoy</option>
                      <option>Esta Semana</option>
                      <option>Este Mes</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-2 h-48">
                    {[20, 35, 45, 30, 55, 70, 85, 95, 80, 65, 45, 30].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-700"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-xs text-gray-500">{12 + i}h</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-4">Top Productos</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Cerveza IPA', sales: 127, revenue: '$698,500' },
                      { name: 'Pisco Sour', sales: 98, revenue: '$637,000' },
                      { name: 'Vodka Tonic', sales: 85, revenue: '$425,000' },
                      { name: 'Aperol Spritz', sales: 72, revenue: '$504,000' },
                    ].map((product, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} vendidos</p>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{product.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory */}
          {activeTab === 2 && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="font-bold text-gray-900">Inventario</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      234 En Stock
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                      12 Stock Bajo
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      3 Agotados
                    </span>
                  </div>
                </div>
                <button className="btn btn-primary text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar Producto
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Producto</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Categoría</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Estado</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Cerveza Artesanal IPA', category: 'Cervezas', stock: 48, status: 'ok', price: 5500 },
                      { name: 'Pisco Mistral', category: 'Licores', stock: 5, status: 'low', price: 12000 },
                      { name: 'Vodka Absolut', category: 'Licores', stock: 0, status: 'out', price: 8500 },
                      { name: 'Ron Havana', category: 'Licores', stock: 23, status: 'ok', price: 9000 },
                      { name: 'Limones', category: 'Insumos', stock: 8, status: 'low', price: 500 },
                    ].map((item, i) => (
                      <tr key={i} className="border-t border-gray-200 hover:bg-white">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                              <Package className="w-5 h-5 text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-900">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                        <td className="py-3 px-4 text-sm font-medium">{item.stock} uds</td>
                        <td className="py-3 px-4">
                          <span className={clsx(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            item.status === 'ok' && 'bg-green-100 text-green-700',
                            item.status === 'low' && 'bg-yellow-100 text-yellow-700',
                            item.status === 'out' && 'bg-red-100 text-red-700'
                          )}>
                            {item.status === 'ok' ? 'En Stock' : item.status === 'low' ? 'Stock Bajo' : 'Agotado'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">${item.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Staff Management */}
          {activeTab === 3 && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Gestión de Personal</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Turno Actual: <strong>Noche</strong></span>
                  <button className="btn btn-primary text-sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar Staff
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'María García', role: 'Bartender', status: 'active', sales: '$1.2M', orders: 87, avatar: 'M' },
                  { name: 'Juan Pérez', role: 'Bartender', status: 'active', sales: '$980K', orders: 72, avatar: 'J' },
                  { name: 'Ana López', role: 'Mesera', status: 'break', sales: '$650K', orders: 45, avatar: 'A' },
                  { name: 'Carlos Ruiz', role: 'Cajero', status: 'active', sales: '$2.1M', orders: 156, avatar: 'C' },
                ].map((staff, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {staff.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-500">{staff.role}</p>
                        </div>
                      </div>
                      <span className={clsx(
                        'w-3 h-3 rounded-full',
                        staff.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      )} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-gray-900">{staff.sales}</p>
                        <p className="text-xs text-gray-500">Ventas</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-gray-900">{staff.orders}</p>
                        <p className="text-xs text-gray-500">Órdenes</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Zap,
      title: 'Ultra Rápido',
      description: 'Procesa órdenes en segundos. Interfaz optimizada para máxima velocidad.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: BarChart3,
      title: 'Analytics en Tiempo Real',
      description: 'Dashboard con métricas en vivo. Visualiza ventas y rendimiento.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Users,
      title: 'Gestión de Staff',
      description: 'Control total de tu equipo. Turnos, permisos y comisiones.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: CreditCard,
      title: 'Multi-Pago',
      description: 'Acepta efectivo, tarjetas y transferencias. Integración total.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Wifi,
      title: 'Modo Offline',
      description: 'Sigue vendiendo sin internet. Sincronización automática.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Encriptación de datos y backups automáticos.',
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <section id="features" className="section" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para{' '}
            <span className="gradient-text">vender más</span>
          </h2>
          <p className="text-lg text-gray-600">
            Herramientas poderosas diseñadas para bares, clubs y festivales.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 group"
            >
              <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform', feature.color)}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// AI Agents Section
function AIAgents() {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      icon: MessageSquare,
      name: 'Asistente de Ventas',
      description: 'Responde consultas de clientes automáticamente. Recomienda productos basándose en preferencias.',
      capabilities: ['Atención 24/7', 'Recomendaciones personalizadas', 'Reservas automáticas'],
      color: 'from-blue-500 to-cyan-500',
      demo: {
        messages: [
          { from: 'user', text: 'Quiero pedir un Espresso Martini para la mesa 7' },
          { from: 'ai', text: '¡Perfecto! He registrado 1 Espresso Martini para la mesa 7. El total es $7.500. ¿Deseas agregar algo más a tu orden?' },
          { from: 'user', text: 'Sí, agrega 2 cervezas IPA' },
          { from: 'ai', text: 'Listo. Tu orden actualizada: 1 Espresso Martini + 2 Cervezas IPA. Total: $18.500. Tiempo estimado: 4 minutos. ✓' },
        ]
      }
    },
    {
      icon: Brain,
      name: 'Analista de Negocio',
      description: 'Analiza patrones de venta y genera insights accionables. Predice demanda automáticamente.',
      capabilities: ['Predicción de demanda', 'Análisis de tendencias', 'Alertas proactivas'],
      color: 'from-purple-500 to-pink-500',
      demo: {
        insight: 'Se detectó un incremento del 40% en ventas de cerveza los viernes después de las 22:00. Recomiendo aumentar stock.'
      }
    },
    {
      icon: Bot,
      name: 'Operador de Barras',
      description: 'Gestiona y balancea la carga entre barras en tiempo real. Optimiza el flujo de órdenes.',
      capabilities: ['Balanceo automático', 'Priorización inteligente', 'Gestión de colas'],
      color: 'from-orange-500 to-red-500',
      demo: {
        action: 'Redirigiendo 5 órdenes de Barra Principal a Barra VIP por sobrecarga detectada.'
      }
    },
  ];

  return (
    <section id="ai-agents" className="section bg-gray-900 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Inteligencia Artificial</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Agentes de IA que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">trabajan por ti</span>
          </h2>
          <p className="text-lg text-gray-400">
            Automatiza tareas y potencia tu negocio con agentes inteligentes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Agent Cards */}
          <div className="space-y-4">
            {agents.map((agent, i) => (
              <button
                key={i}
                onClick={() => setActiveAgent(i)}
                className={clsx(
                  'w-full text-left p-6 rounded-2xl transition-all',
                  activeAgent === i
                    ? 'bg-gradient-to-r ' + agent.color + ' shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700'
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={clsx(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    activeAgent === i ? 'bg-white/20' : `bg-gradient-to-br ${agent.color}`
                  )}>
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{agent.name}</h3>
                    <p className={clsx('text-sm', activeAgent === i ? 'text-white/80' : 'text-gray-400')}>
                      {agent.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {agent.capabilities.map((cap, j) => (
                        <span key={j} className={clsx(
                          'px-2 py-1 rounded-full text-xs',
                          activeAgent === i ? 'bg-white/20' : 'bg-gray-700'
                        )}>
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Demo */}
          <div className="bg-gray-800 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${agents[activeAgent].color} flex items-center justify-center`}>
                {activeAgent === 0 && <MessageSquare className="w-5 h-5 text-white" />}
                {activeAgent === 1 && <Brain className="w-5 h-5 text-white" />}
                {activeAgent === 2 && <Bot className="w-5 h-5 text-white" />}
              </div>
              <div>
                <p className="font-medium">{agents[activeAgent].name}</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Activo
                </p>
              </div>
            </div>

            {/* Demo Content */}
            {activeAgent === 0 && (
              <div className="space-y-4">
                {agents[0].demo.messages.map((msg, i) => (
                  <div key={i} className={clsx('flex', msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={clsx(
                      'max-w-[80%] rounded-2xl px-4 py-2',
                      msg.from === 'user' ? 'bg-primary-600 rounded-tr-none' : 'bg-gray-700 rounded-tl-none'
                    )}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeAgent === 1 && (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-purple-400 mb-1">Insight Detectado</p>
                    <p className="text-sm text-gray-300">{agents[1].demo.insight}</p>
                  </div>
                </div>
              </div>
            )}

            {activeAgent === 2 && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <p className="font-medium text-orange-400 mb-1">Acción Automática</p>
                    <p className="text-sm text-gray-300">{agents[2].demo.action}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-gray-400">Consultas auto</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">3x</p>
                <p className="text-xs text-gray-400">Más rápido</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs text-gray-400">Disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Queue Engine Section
function QueueEngine() {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  const bars = [
    { name: 'Barra Principal', load: 85, orders: 23, wait: 4.2, status: 'high' },
    { name: 'Barra VIP', load: 45, orders: 8, wait: 1.8, status: 'normal' },
    { name: 'Barra Terraza', load: 72, orders: 15, wait: 3.1, status: 'medium' },
    { name: 'Barra Pista', load: 92, orders: 28, wait: 5.7, status: 'critical' },
    { name: 'Barra Entrada', load: 35, orders: 6, wait: 1.2, status: 'low' },
  ];

  return (
    <section id="queue-engine" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-6">
            <Gauge className="w-4 h-4" />
            <span>Queue Engine</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Motor de Optimización de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Carga en Barras</span>
          </h2>
          <p className="text-lg text-gray-600">
            Balancea automáticamente la carga entre todas tus barras,
            reduciendo tiempos de espera hasta un 60%.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Live Monitor */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <h3 className="font-bold">Monitor en Vivo</h3>
              </div>
              <span className="text-xs text-gray-500">Actualizado hace 2s</span>
            </div>

            <div className="space-y-3">
              {bars.map((bar, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBar(selectedBar === i ? null : i)}
                  className={clsx(
                    'w-full rounded-xl p-4 transition-all text-left',
                    selectedBar === i ? 'bg-gray-100 ring-2 ring-primary-500' : 'bg-gray-50 hover:bg-gray-100'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        'w-3 h-3 rounded-full',
                        bar.status === 'critical' && 'bg-red-500 animate-pulse',
                        bar.status === 'high' && 'bg-orange-500',
                        bar.status === 'medium' && 'bg-yellow-500',
                        bar.status === 'normal' && 'bg-green-500',
                        bar.status === 'low' && 'bg-blue-500'
                      )} />
                      <span className="font-medium text-gray-900">{bar.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{bar.orders} órdenes</span>
                      <span className={clsx(
                        'font-medium',
                        bar.status === 'critical' || bar.status === 'high' ? 'text-red-600' : 'text-green-600'
                      )}>{bar.wait}min</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={clsx(
                        'h-2 rounded-full transition-all duration-500',
                        bar.status === 'critical' && 'bg-red-500',
                        bar.status === 'high' && 'bg-orange-500',
                        bar.status === 'medium' && 'bg-yellow-500',
                        bar.status === 'normal' && 'bg-green-500',
                        bar.status === 'low' && 'bg-blue-500'
                      )}
                      style={{ width: `${bar.load}%` }}
                    />
                  </div>
                  {selectedBar === i && (
                    <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{bar.load}%</p>
                        <p className="text-xs text-gray-500">Carga</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{bar.orders}</p>
                        <p className="text-xs text-gray-500">En Cola</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{bar.wait}m</p>
                        <p className="text-xs text-gray-500">Espera</p>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Auto-balance Alert */}
            <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-orange-700">Auto-balanceo activado</p>
                <p className="text-sm text-orange-600">Redirigiendo órdenes de Barra Pista → Barra Entrada</p>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">¿Cómo funciona?</h3>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Monitoreo', desc: 'Sensores rastrean la carga de cada barra en tiempo real' },
                  { step: '02', title: 'Análisis', desc: 'IA evalúa capacidad, tiempos y eficiencia de cada punto' },
                  { step: '03', title: 'Decisión', desc: 'Algoritmo determina la mejor distribución de órdenes' },
                  { step: '04', title: 'Acción', desc: 'Redirección automática para optimizar tiempos de espera' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '-60%', label: 'Tiempo de espera' },
                { value: '3x', label: 'Mayor throughput' },
                { value: '<100ms', label: 'Tiempo de decisión' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Counter Component
function AnimatedStat({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasDecimal = value.includes('.');
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(eased * numericValue);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {hasDecimal ? displayValue.toFixed(1) : Math.round(displayValue)}{suffix}
    </span>
  );
}

// Benefits Section
function Benefits() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Optimiza tus Costos',
      description: 'Reduce gastos operativos hasta un 35% con automatización inteligente.',
      stats: '35',
      statsSuffix: '%',
      statsLabel: 'Reducción',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Shield,
      title: 'Elimina Pérdidas de Stock',
      description: 'Control de inventario en tiempo real. Detecta mermas y previene robos.',
      stats: '90',
      statsSuffix: '%',
      statsLabel: 'Menos pérdidas',
      color: 'from-red-500 to-orange-600',
    },
    {
      icon: Users,
      title: 'Experiencia Completa',
      description: 'Desde el pedido hasta el pago, ofrece una experiencia fluida.',
      stats: '4.8',
      statsSuffix: '★',
      statsLabel: 'Satisfacción',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: CreditCard,
      title: 'Fideliza Clientes',
      description: 'Programa de lealtad integrado y promociones personalizadas.',
      stats: '2.5',
      statsSuffix: 'x',
      statsLabel: 'Retención',
      color: 'from-blue-500 to-cyan-600',
    },
  ];

  return (
    <section className="section" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Resultados que{' '}
            <span className="gradient-text">transforman tu negocio</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mx-auto mb-4`}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <benefit.icon className="w-7 h-7 text-white" />
              </motion.div>
              <p className={`text-3xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent mb-1`}>
                <AnimatedStat value={benefit.stats} suffix={benefit.statsSuffix} />
              </p>
              <p className="text-sm text-gray-500 mb-3">{benefit.statsLabel}</p>
              <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Pricing Section
function Pricing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const plans = [
    {
      name: 'Starter',
      price: '49.990',
      description: 'Perfecto para bares pequeños',
      features: ['1 punto de venta', 'Hasta 3 usuarios', 'Reportes básicos', 'Soporte por email'],
      popular: false,
      customPrice: false,
    },
    {
      name: 'Pro',
      price: '99.990',
      description: 'Para negocios en crecimiento',
      features: ['Hasta 5 puntos de venta', 'Usuarios ilimitados', 'Agentes de IA', 'Analytics avanzados', 'Soporte 24/7'],
      popular: true,
      customPrice: false,
    },
    {
      name: 'Festival',
      price: 'Consultar',
      description: 'Eventos masivos',
      features: ['Puntos ilimitados', 'Queue Engine', 'IA personalizada', 'Soporte on-site', 'SLA 99.99%'],
      popular: false,
      customPrice: true,
    },
  ];

  return (
    <section id="pricing" className="section bg-gray-50" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Planes simples,{' '}
            <span className="gradient-text">precios transparentes</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: plan.popular ? -10 : -5, transition: { duration: 0.2 } }}
              className={clsx(
                'rounded-2xl p-6 relative',
                plan.popular
                  ? 'bg-primary-600 text-white shadow-xl scale-105'
                  : 'bg-white border border-gray-200'
              )}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  Más Popular
                </motion.div>
              )}

              <h3 className={clsx('text-xl font-bold mb-1', !plan.popular && 'text-gray-900')}>
                {plan.name}
              </h3>
              <p className={clsx('text-sm mb-4', plan.popular ? 'text-white/80' : 'text-gray-500')}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={clsx('text-3xl font-bold', !plan.popular && 'text-gray-900')}>
                  {plan.customPrice ? plan.price : `$${plan.price}`}
                </span>
                {!plan.customPrice && (
                  <span className={clsx('text-sm', plan.popular ? 'text-white/80' : 'text-gray-500')}>
                    /mes
                  </span>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Check className={clsx('w-4 h-4', plan.popular ? 'text-green-300' : 'text-green-500')} />
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <a
                href="#contact"
                className={clsx(
                  'btn w-full text-sm',
                  plan.popular ? 'bg-white text-primary-600 hover:bg-gray-100' : 'btn-primary'
                )}
              >
                Comenzar
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-16 text-center overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            ¿Listo para transformar tu negocio?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Únete a más de 500 bares y festivales que ya usan Clubiio.
          </motion.p>

          <motion.form
            className="max-w-md mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                type="submit"
                className="btn btn-primary whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comenzar Gratis
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </div>
          </motion.form>

          <motion.p
            className="text-gray-400 text-sm mt-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            14 días gratis. Sin tarjeta requerida.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.jpg" alt="Clubiio" className="w-10 h-10 rounded-xl object-cover" />
              <span className="font-bold text-xl text-white">Clubiio</span>
            </div>
            <p className="text-gray-400 text-sm">
              El POS más rápido para bares y festivales, potenciado por IA.
            </p>
          </div>

          {[
            { title: 'Producto', links: ['Software', 'IA', 'Queue Engine', 'Precios'] },
            { title: 'Empresa', links: ['Nosotros', 'Blog', 'Contacto'] },
            { title: 'Legal', links: ['Privacidad', 'Términos'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Clubiio. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <SoftwareShowcase />
        <Features />
        <AIAgents />
        <QueueEngine />
        <Benefits />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

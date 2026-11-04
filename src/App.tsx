import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight, ArrowDown, Menu, X, MessageCircle, Camera, Clock3, Check, CalendarDays, MapPin, Navigation, Droplets, Sparkles, Truck, Armchair, ShoppingBag, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

const IG = 'https://www.instagram.com/nortejato/'
const BOOKING = 'https://www.filaclick.com.br/agendar/nortejatodetalhamentoeestticaautomotiva'
const ADDRESS = 'Av. Norte Miguel Arraes de Alencar, 3476, Rosarinho, Recife - PE'
const MAP = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Norte Jato ' + ADDRESS)
const DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Norte Jato ' + ADDRESS)
const wa = (service?: string) => 'https://wa.me/5581997744272?text=' + encodeURIComponent(service ? `Olá, Norte Jato! Vi o site e gostaria de um orçamento para ${service.toLowerCase()}. Podemos conversar?` : 'Olá, Norte Jato! Vi o site e gostaria de cuidar do meu carro. Podemos conversar?')
const services = [
  { name: 'Lavagem automotiva', short: 'Lavagem', icon: Droplets, text: 'O cuidado que faz parte da rotina. Consulte a equipe sobre as opções de lavagem para o seu veículo.', note: 'Cuidado no dia a dia', source: IG },
  { name: 'Polimento', short: 'Polimento', icon: Sparkles, text: 'Mais brilho e atenção à pintura. Solicite uma avaliação para entender o tratamento indicado para o seu carro.', note: 'Atenção à pintura', source: IG + 'p/DdTi3MrsiNz/' },
  { name: 'Higienização interna', short: 'Higienização', icon: Armchair, text: 'Lavagem de bancos e higienização do interior. Um cuidado dedicado ao ambiente que acompanha você.', note: 'Bancos e interior', source: IG + 'p/DdY1sqbsCmy/' },
  { name: 'Lavagem para frotas', short: 'Frotas', icon: Truck, text: 'Sua empresa também pode contar com a Norte Jato. Converse sobre a lavagem dos veículos da sua frota.', note: 'Para a sua empresa', source: IG + 'p/Dd8weq8s7EI/' },
]
const gallery = [
  { image: 'estudio.jpg', title: 'No estúdio Norte Jato', tag: 'ESTÚDIO', alt: 'Volkswagen Saveiro no estúdio da Norte Jato, com iluminação no teto e piso quadriculado', url: IG + 'p/DehMjQ4HJI6/' },
  { image: 'polimento.jpg', title: 'Polimento na prática', tag: 'POLIMENTO', alt: 'Publicação da Norte Jato mostrando um profissional polindo um Fiat preto', url: IG + 'p/DdTi3MrsiNz/' },
  { image: 'bancos.jpg', title: 'Bancos e higienização', tag: 'HIGIENIZAÇÃO', alt: 'Publicação da Norte Jato com bancos removidos para lavagem e higienização', url: IG + 'p/DdY1sqbsCmy/' },
  { image: 'frotas.jpg', title: 'Cuidado com a sua frota', tag: 'FROTAS', alt: 'Publicação da Norte Jato mostrando a lavagem de um caminhão Mercedes-Benz', url: IG + 'p/Dd8weq8s7EI/' },
  { image: 'interior-real.jpg', title: 'Atenção ao interior', tag: 'DETALHES', alt: 'Capa de reel da Norte Jato mostrando a limpeza do painel de um veículo', url: IG + 'reel/DdmpuOSyBk1/' },
  { image: 'fachada.jpg', title: 'A nossa casa, na Av. Norte', tag: 'NORTE JATO', alt: 'Fachada amarela com a identificação Norte Jato Produtos e Estética Automotiva', url: IG + 'reel/DdCmjgDhUPO/' },
]
const faqs = [
  ['Onde fica a Norte Jato?', 'Estamos na Av. Norte Miguel Arraes de Alencar, 3476, no Rosarinho, Recife – PE. Use o botão “Traçar rota” para abrir a navegação até a loja.'],
  ['Como agendar meu atendimento?', 'Você pode consultar a agenda pelo FilaClick ou conversar com a equipe no WhatsApp (81) 99774-4272. O agendamento é concluído no canal escolhido.'],
  ['Quais serviços encontro por aqui?', 'Lavagem automotiva, polimento, lavagem de bancos e higienização interna, além de lavagem para frotas. Consulte a equipe sobre a necessidade do seu veículo.'],
  ['Quanto custa e quanto tempo leva?', 'Os valores e a duração variam conforme o serviço e o veículo. Peça seu orçamento pelo WhatsApp antes de agendar.'],
  ['Qual o horário de funcionamento?', 'De segunda a sábado, das 8h às 18h. Consulte a disponibilidade antes de ir; aos domingos, não há atendimento regular divulgado.'],
]
function Brand() { return <a href="#inicio" className="brand" aria-label="Norte Jato, início"><img src="./images/logo.jpg" alt="Marca oficial Norte Jato" width="60" height="60" /><span>NORTE <b>JATO</b><small>DETALHAMENTO & ESTÉTICA AUTOMOTIVA</small></span></a> }
function App() {
  const [menu, setMenu] = useState(false)
  const [service, setService] = useState('Lavagem automotiva')
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const photoTrigger = useRef<HTMLButtonElement | null>(null)
  const closePhoto = useRef<HTMLButtonElement>(null)
  const topbar = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const closeGallery = () => { setActivePhoto(null); photoTrigger.current?.focus() }
  useEffect(() => {
    const onScroll = () => {
      topbar.current?.classList.toggle('scrolled', scrollY > 25)
      const length = document.documentElement.scrollHeight - innerHeight
      progress.current?.style.setProperty('transform', `scaleX(${length > 0 ? scrollY / length : 0})`)
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = !reduced && 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer?.unobserve(entry.target) }
    }), { threshold: 0.1 }) : null
    document.querySelectorAll('[data-reveal]').forEach(element => { if (observer) { element.classList.add('reveal-ready'); observer.observe(element) } })
    return () => { window.removeEventListener('scroll', onScroll); observer?.disconnect() }
  }, [])
  useEffect(() => {
    if (!menu) return
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); document.getElementById('menu-button')?.focus() } }
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key)
  }, [menu])
  useEffect(() => {
    if (activePhoto === null) return
    closePhoto.current?.focus()
    const original = document.body.style.overflow; document.body.style.overflow = 'hidden'
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setActivePhoto(null); photoTrigger.current?.focus() }
      if (event.key === 'ArrowRight') setActivePhoto(index => index === null ? null : (index + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setActivePhoto(index => index === null ? null : (index - 1 + gallery.length) % gallery.length)
      if (event.key === 'Tab') {
        const items = document.querySelectorAll<HTMLElement>('.lightbox button, .lightbox a')
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = original; window.removeEventListener('keydown', key) }
  }, [activePhoto])
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a><div className="progress" ref={progress} aria-hidden="true" />
    <div className="location-bar"><span><MapPin size={12} /> Rosarinho, Recife — Av. Norte, 3476</span><span><Clock3 size={12} /> Seg a sáb · 8h às 18h</span></div>
    <header ref={topbar}><div className="header-inner"><Brand /><nav id="navigation" aria-label="Navegação principal" className={menu ? 'open' : ''}>{[['Serviços', '#servicos'], ['Nosso trabalho', '#trabalhos'], ['A Norte Jato', '#sobre'], ['Localização', '#localizacao']].map(([text, link]) => <a href={link} key={link} onClick={() => setMenu(false)}>{text}</a>)}<a className="button button-small" href={BOOKING} target="_blank" rel="noreferrer">Agendar horário <ArrowUpRight size={17} /></a></nav><button id="menu-button" className="menu-button" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div></header>
    {menu && <button className="menu-backdrop" tabIndex={-1} aria-label="Fechar navegação" onClick={() => setMenu(false)} />}
    <main id="conteudo">
      <section className="hero" id="inicio"><div className="hero-lines" aria-hidden="true" /><div className="hero-inner">
        <div className="hero-copy"><p className="eyebrow"><span className="dot" /> ESTÉTICA AUTOMOTIVA NO ROSARINHO</p><h1>Seu carro<br /><span>novo de novo.</span><em>Hoje mesmo.</em></h1><p className="hero-description">Da lavagem ao polimento. Do banco ao último detalhe.<br className="desktop-only" /> O cuidado da Norte Jato, aqui na Zona Norte do Recife.</p><div className="hero-actions"><a className="button" href={BOOKING} target="_blank" rel="noreferrer">Agendar meu cuidado <ArrowUpRight size={20} /></a><a className="secondary-link" href={wa()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Pedir orçamento</a></div><a className="hero-social" href={IG} target="_blank" rel="noreferrer"><img src="./images/logo.jpg" width="38" height="38" alt="" /><span><strong>@nortejato</strong><small>10,6 mil seguidores no Instagram</small></span><ArrowUpRight size={17} /></a></div>
        <div className="hero-visual"><div className="image-corner" aria-hidden="true" /><img className="hero-photo" src="./images/estudio.jpg" width="640" height="640" alt="Saveiro no estúdio real da Norte Jato, no piso quadriculado e sob as luzes do teto" fetchPriority="high" /><span className="photo-tag"><span className="dot" /> DIRETO DO NOSSO ESTÚDIO</span><a className="hero-photo-credit" href={gallery[0].url} target="_blank" rel="noreferrer">Foto publicada em @nortejato <ArrowUpRight size={14} /></a><div className="hero-place"><MapPin size={21} /><div><strong>É aqui. Na Av. Norte.</strong><span>3476 · Rosarinho · Recife/PE</span></div><a href="#localizacao" aria-label="Ver localização"><ArrowUpRight size={23} /></a></div></div>
      </div><a className="hero-bottom" href="#trabalhos"><span>NOSSO TRABALHO FALA POR NÓS</span><ArrowDown size={16} /></a></section>
      <div className="marquee" aria-hidden="true"><div>{[0, 1, 2, 3].map(index => <span key={index}>LAVAGEM <b>✳</b> POLIMENTO <b>✳</b> HIGIENIZAÇÃO <b>✳</b> NORTE JATO <b>✳</b> </span>)}</div></div>
      <section className="section work" id="trabalhos"><div className="heading" data-reveal><div><p className="eyebrow">01 / NOSSO TRABALHO, DE PERTO</p><h2>O cuidado é real.<br /><span>Os registros também.</span></h2></div><div className="heading-aside"><p>O estúdio, a equipe e os serviços que você<br className="desktop-only" /> encontra no nosso Instagram.</p><a className="text-link" href={IG} target="_blank" rel="noreferrer">Acompanhe @nortejato <Camera size={17} /><ArrowUpRight size={15} /></a></div></div>
        <div className="work-grid">{gallery.map((item, index) => <article className="work-item" key={item.image} data-reveal style={{ '--delay': `${index % 3 * 75}ms` } as CSSProperties}><button className="work-photo" onClick={event => { photoTrigger.current = event.currentTarget; setActivePhoto(index) }} aria-label={`Ampliar: ${item.title}`}><img src={`./images/${item.image}`} alt={item.alt} loading="lazy" width={index === 0 ? 640 : 512} height="640" /><span className="work-enlarge"><ArrowUpRight size={21} /></span></button><div className="work-caption"><span>{item.tag}</span><h3>{item.title}</h3><a href={item.url} target="_blank" rel="noreferrer" aria-label={`Ver ${item.title} no Instagram`}><Camera size={16} /></a></div></article>)}</div>
      </section>
      <section className="services-section" id="servicos"><div className="section"><div className="heading" data-reveal><div><p className="eyebrow">02 / DO QUE SEU CARRO PRECISA?</p><h2>Cuidado por fora.<br /><span>Bem-estar por dentro.</span></h2></div><p>Os serviços da Norte Jato para seu veículo<br className="desktop-only" /> ou para a frota da sua empresa.</p></div><div className="services-grid">{services.map((item, index) => <article data-reveal key={item.name} style={{ '--delay': `${index * 70}ms` } as CSSProperties}><div className="service-top"><item.icon size={29} strokeWidth={1.5} /><span>0{index + 1}</span></div><span className="service-note">{item.note}</span><h3>{item.name}</h3><p>{item.text}</p><a href={wa(item.name)} target="_blank" rel="noreferrer">Pedir orçamento <ArrowUpRight size={18} /></a></article>)}</div><div className="products-strip" data-reveal><ShoppingBag size={24} /><div><strong>O cuidado continua na nossa loja.</strong><p>A Norte Jato também divulga produtos automotivos. Consulte a equipe sobre os itens disponíveis.</p></div><a href={IG + 'reel/DdCmjgDhUPO/'} target="_blank" rel="noreferrer">Conhecer a loja <ArrowUpRight size={18} /></a></div></div></section>
      <section className="section about" id="sobre"><div className="about-photos" data-reveal><img className="about-facade" src="./images/fachada.jpg" alt="Fachada amarela da Norte Jato com a marca Produtos e Estética Automotiva" loading="lazy" width="360" height="640" /><img className="about-team" src="./images/equipe.jpg" alt="Capa de reel da Norte Jato mostrando a equipe no cuidado do interior e da pintura" loading="lazy" width="361" height="640" /><div className="about-label"><MapPin size={18} /><span>NOSSA CASA É NO ROSARINHO.</span></div></div><div data-reveal><p className="eyebrow">03 / PRAZER, SOMOS A NORTE JATO</p><h2>Gente que cuida.<br /><span>Detalhes que aparecem.</span></h2><p className="body-copy">Você já conhece o nome. Agora, conheça de perto o lugar e o trabalho por trás da Norte Jato: estúdio, equipe e loja de produtos automotivos na Avenida Norte.</p><p className="body-copy">Lavagem, polimento e higienização fazem parte do nosso dia a dia. Para descobrir o melhor cuidado para o seu carro, a conversa começa direto com a equipe.</p><ul className="check-list">{['Atendimento no Rosarinho, Zona Norte do Recife', 'Segunda a sábado, das 8h às 18h', 'Agendamento pelo FilaClick e contato pelo WhatsApp'].map(text => <li key={text}><Check size={17} />{text}</li>)}</ul><a className="text-link" href={IG} target="_blank" rel="noreferrer">Veja os bastidores e as publicações <Play size={15} /><ArrowUpRight size={17} /></a></div></section>
      <section className="booking-section" id="agendamento"><div className="section booking-inner"><div data-reveal><p className="eyebrow">SEU PRÓXIMO CUIDADO COMEÇA AQUI</p><h2>Conta pra gente.<br /><span>Como está seu carro?</span></h2><p>Escolha o que você procura e fale direto com a equipe.<br className="desktop-only" /> Valores e disponibilidade, sem complicação.</p><fieldset><legend>Qual serviço você procura?</legend><div className="service-pills flex flex-wrap gap-2">{services.map(item => <label className={service === item.name ? 'selected' : ''} key={item.name}><input type="radio" name="service" value={item.name} checked={service === item.name} onChange={() => setService(item.name)} /><item.icon size={15} />{item.short}</label>)}</div></fieldset><a className="button" href={wa(service)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Pedir orçamento de {services.find(item => item.name === service)?.short.toLowerCase()} <ArrowUpRight size={19} /></a><span className="booking-note">Ou reserve direto: <a href={BOOKING} target="_blank" rel="noreferrer">abrir agenda no FilaClick <ArrowUpRight size={13} /></a></span></div><div className="booking-card" data-reveal><CalendarDays size={34} strokeWidth={1.4} /><p className="eyebrow">UM HORÁRIO PARA O SEU CARRO</p><h3>Mais fácil de agendar.<br />Melhor de dirigir.</h3><div><Clock3 size={20} /><span>Segunda a sábado<strong>8h às 18h</strong></span></div><div><MapPin size={20} /><span>Av. Norte, 3476<strong>Rosarinho · Recife</strong></span></div><a className="button button-white" href={BOOKING} target="_blank" rel="noreferrer">Consultar horários <ArrowUpRight size={19} /></a></div></div></section>
      <section className="section location" id="localizacao"><div className="location-copy" data-reveal><p className="eyebrow">04 / NO SEU CAMINHO, NA ZONA NORTE</p><h2>Pertinho de você.<br /><span>Na Avenida Norte.</span></h2><address><strong>Av. Norte Miguel Arraes de Alencar, 3476</strong><span>Rosarinho, Recife – PE · CEP 52041-005</span></address><div className="location-hours"><Clock3 size={20} /><span>Segunda a sábado<strong>Das 8h às 18h</strong></span></div><div className="location-actions flex flex-wrap gap-3"><a className="button" href={DIRECTIONS} target="_blank" rel="noreferrer"><Navigation size={17} /> Traçar rota <ArrowUpRight size={18} /></a><a className="button button-outline" href={wa()} target="_blank" rel="noreferrer">(81) 99774-4272 <MessageCircle size={17} /></a></div><a className="text-link" href="https://www.waze.com/live-map/directions/br/pe/norte-jato-detalhamento-e-estetica-automotiva?to=place.ChIJ3XvN3lAYqwcRoGtGVK9JyXM" target="_blank" rel="noreferrer">Prefere o Waze? Abrir navegação <ArrowUpRight size={15} /></a></div><div className="map-panel" data-reveal><iframe title="Localização Norte Jato no Rosarinho, Recife" src={'https://maps.google.com/maps?q=' + encodeURIComponent('Norte Jato Av Norte Miguel Arraes de Alencar 3476 Recife') + '&z=16&output=embed'} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a href={MAP} target="_blank" rel="noreferrer"><MapPin size={17} /> Abrir Norte Jato no Google Maps <ArrowUpRight size={17} /></a></div></section>
      <section className="faq-section"><div className="section faq"><div data-reveal><p className="eyebrow">ANTES DE CHEGAR</p><h2>Alguma dúvida?<br /><span>Vamos conversar.</span></h2><a className="text-link" href={wa()} target="_blank" rel="noreferrer">Chamar a equipe no WhatsApp <ArrowUpRight size={18} /></a></div><div data-reveal>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="final-cta"><p className="eyebrow">NORTE JATO · ROSARINHO · RECIFE</p><h2>Seu carro merece<br /><span>um novo começo.</span></h2><a className="button" href={BOOKING} target="_blank" rel="noreferrer">Agendar meu cuidado <ArrowUpRight size={20} /></a></section>
    </main>
    <footer><div className="footer-main section"><Brand /><div><strong>Venha conhecer</strong><a href={MAP} target="_blank" rel="noreferrer">Av. Norte, 3476 · Rosarinho<br />Recife – PE</a></div><div><strong>Fale com a equipe</strong><a href={wa()} target="_blank" rel="noreferrer">(81) 99774-4272</a><a href={IG} target="_blank" rel="noreferrer">@nortejato <ArrowUpRight size={13} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Norte Jato. Detalhamento & Estética Automotiva.</span><span>Fotos e publicações: <a href={IG} target="_blank" rel="noreferrer">@nortejato</a></span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
    <a className="floating-wa" href={wa()} target="_blank" rel="noreferrer" aria-label="Falar com a Norte Jato no WhatsApp"><MessageCircle size={24} /><span>Vamos conversar?</span></a>
    {activePhoto !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[activePhoto].title} onClick={event => { if (event.target === event.currentTarget) closeGallery() }}><button className="lightbox-close" ref={closePhoto} onClick={closeGallery} aria-label="Fechar foto"><X /></button><button className="lightbox-prev" onClick={() => setActivePhoto((activePhoto - 1 + gallery.length) % gallery.length)} aria-label="Foto anterior"><ChevronLeft /></button><figure><img src={`./images/${gallery[activePhoto].image}`} alt={gallery[activePhoto].alt} /><figcaption><span>{gallery[activePhoto].title}</span><a href={gallery[activePhoto].url} target="_blank" rel="noreferrer">Ver publicação original <ArrowUpRight size={15} /></a></figcaption></figure><button className="lightbox-next" onClick={() => setActivePhoto((activePhoto + 1) % gallery.length)} aria-label="Próxima foto"><ChevronRight /></button></div>}
  </>
}
export default App


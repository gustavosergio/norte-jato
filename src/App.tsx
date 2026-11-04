import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown, Menu, X, MessageCircle, Camera, Clock3, Check, CalendarDays, Sparkles } from 'lucide-react'
import './App.css'

const BOOKING = 'https://www.filaclick.com.br/agendar/nortejatodetalhamentoeestticaautomotiva'
const INSTAGRAM = 'https://www.instagram.com/nortejato/'
const whatsapp = (service?: string) => 'https://wa.me/5581997744272?text=' + encodeURIComponent(service
  ? `Olá, Norte Jato! Vim pelo site e gostaria de saber mais sobre ${service.toLowerCase()} para meu carro. Podemos conversar sobre valores e disponibilidade?`
  : 'Olá, Norte Jato! Vim pelo site e gostaria de conhecer os serviços para meu carro.')
const services = [
  { name: 'Lavagem', tagline: 'O cuidado começa nos detalhes.', text: 'Renove o visual e a sensação de dirigir seu carro. Um cuidado por dentro e por fora para acompanhar a sua rotina.', image: 'wash', alt: 'Lavagem de um carro, referência ilustrativa', detail: 'Para renovar o cuidado do dia a dia', number: '01' },
  { name: 'Polimento', tagline: 'Deixe o brilho falar por você.', text: 'Redescubra o brilho da pintura. Converse com a equipe para avaliar o acabamento e o tratamento ideal para o seu veículo.', image: 'hero', alt: 'Pintura de um Porsche, referência ilustrativa', detail: 'Para dar atenção ao brilho da pintura', number: '02' },
  { name: 'Higienização', tagline: 'Bem-estar em cada trajeto.', text: 'Seu interior também merece atenção. Aquele cuidado especial no ambiente que acompanha você em todos os caminhos.', image: 'interior', alt: 'Interior de um veículo, referência ilustrativa', detail: 'Para cuidar do interior do seu carro', number: '03' },
]
const questions = [
  ['Como faço para agendar?', 'Escolha “Agendar meu horário” para consultar a agenda da Norte Jato no FilaClick. Você também pode conversar com a equipe pelo WhatsApp antes de reservar.'],
  ['Qual serviço é ideal para meu carro?', 'Depende do estado do veículo e do resultado que você procura. Conte à equipe o que seu carro precisa pelo WhatsApp para receber uma orientação.'],
  ['Quais são os horários de atendimento?', 'O atendimento é de segunda a sábado, das 8h às 18h. Consulte os horários disponíveis na agenda antes de ir.'],
  ['Onde consulto valores e tempo de serviço?', 'Consulte a equipe pelo WhatsApp ou as informações disponíveis no FilaClick. Os valores e a duração dependem do serviço e da avaliação do veículo.'],
]
function Brand() {
  return <a className="brand" href="#inicio" aria-label="Norte Jato, início"><b aria-hidden="true">N<span>J</span></b><span>NORTE JATO<small>ESTÉTICA AUTOMOTIVA</small></span></a>
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState('Lavagem')
  const header = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      header.current?.classList.toggle('scrolled', window.scrollY > 30)
      const available = document.documentElement.scrollHeight - window.innerHeight
      progress.current?.style.setProperty('transform', `scaleX(${available > 0 ? window.scrollY / available : 0})`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer: IntersectionObserver | undefined
    if (!reduced && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer?.unobserve(entry.target)
        }
      }), { threshold: 0.12 })
      document.querySelectorAll('[data-reveal]').forEach(element => {
        element.classList.add('will-reveal')
        observer?.observe(element)
      })
    }
    return () => { window.removeEventListener('scroll', onScroll); observer?.disconnect() }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); document.getElementById('menu-toggle')?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <div className="reading-progress" ref={progress} aria-hidden="true" />
    <header ref={header}>
      <Brand />
      <nav id="main-navigation" className={menuOpen ? 'open' : ''} aria-label="Navegação principal">
        {[['Serviços', '#servicos'], ['Nosso cuidado', '#cuidado'], ['Como agendar', '#agendamento']].map(([text, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{text}</a>)}
        <a className="nav-cta" href={BOOKING} target="_blank" rel="noreferrer">Agende seu horário <ArrowUpRight size={17} /></a>
      </nav>
      <button id="menu-toggle" className="menu" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && <button className="menu-backdrop" aria-label="Fechar navegação" tabIndex={-1} onClick={() => setMenuOpen(false)} />}
    <main id="conteudo">
      <section className="hero" id="inicio">
        <img className="hero-image" src="./images/hero.jpg" alt="Carro esportivo com pintura brilhante, imagem ilustrativa" fetchPriority="high" width="2200" height="1467" />
        <div className="shade" /><div className="hero-grain" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow hero-enter"><span className="status-dot" /> DETALHAMENTO & ESTÉTICA AUTOMOTIVA</p>
          <h1><span>Seu carro.</span><span>Novo de novo.</span><span><em>Hoje mesmo.</em></span></h1>
          <p className="intro hero-enter">Mais que deixar limpo. É devolver o brilho, o cuidado e aquela vontade de dirigir sem destino.</p>
          <div className="actions hero-enter flex items-center"><a className="button" href={BOOKING} target="_blank" rel="noreferrer">Agendar meu cuidado <ArrowUpRight size={20} /></a><a className="text-link" href="#servicos">Conheça os serviços <ArrowDown size={16} /></a></div>
          <p className="hours hero-enter"><Clock3 size={14} /> SEG A SÁB <span>08h — 18h</span></p>
        </div>
        <div className="caption"><span className="crosshair" aria-hidden="true">+</span> O BRILHO ESTÁ NOS DETALHES.<small>NORTE JATO / AUTO CARE</small></div>
        <a className="scroll" href="#servicos">EXPLORE O CUIDADO <ArrowDown size={14} /></a>
        <div className="hero-index" aria-hidden="true">01 — 03</div>
      </section>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0, 1, 2, 3].map(n => <div className="ticker-group" key={n}><span>CUIDADO QUE SE VÊ</span><b>✳</b><span>BRILHO QUE SE SENTE</span><b>✳</b><span>NORTE JATO</span><b>✳</b></div>)}</div></div>
      <section className="section" id="servicos">
        <div className="heading" data-reveal><div><p className="eyebrow">01 / NOSSOS SERVIÇOS</p><h2>Para cada detalhe,<br /><span>um cuidado.</span></h2></div><p>Do primeiro olhar ao último acabamento.<br />Escolha o próximo cuidado do seu carro.</p></div>
        <div className="services">{services.map((service, index) => <article key={service.name} data-reveal style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties}>
          <a className="service-image" href={whatsapp(service.name)} target="_blank" rel="noreferrer" aria-label={`Consultar ${service.name.toLowerCase()} pelo WhatsApp`}><img src={`./images/${service.image}.jpg`} alt={service.alt} loading="lazy" width="1100" height="733" /><span>{service.number} /</span><span className="image-action"><ArrowUpRight size={23} /></span></a>
          <h3>{service.name}</h3><strong>{service.tagline}</strong><p>{service.text}</p><a className="service-link" href={whatsapp(service.name)} target="_blank" rel="noreferrer">Quero saber mais <ArrowUpRight size={18} /></a>
        </article>)}</div>
      </section>
      <section className="section care" id="cuidado">
        <div className="care-photo" data-reveal><img src="./images/wash.jpg" alt="Cuidado na lavagem de um veículo, imagem ilustrativa" loading="lazy" width="1100" height="733" /><div><Sparkles size={25} /><span>Não é só um carro.<br /><strong>É o seu carro.</strong></span></div><span className="photo-note">CUIDADO EM CADA CENTÍMETRO.</span></div>
        <div data-reveal><p className="eyebrow">02 / O JEITO NORTE JATO</p><h2>Você sente a diferença.<br /><span>Seu carro também.</span></h2><p className="body-copy">Tem o carro que leva você ao trabalho, às viagens e aos bons encontros. Aqui, ele ganha uma pausa para receber o cuidado que merece.</p>
          <ul>{[['Cuidado de dentro para fora', 'Lavagem, polimento e higienização em um só lugar.'], ['Seu horário, sem complicação', 'Agende online e organize o cuidado na sua rotina.'], ['Conversa direta com a equipe', 'Tire suas dúvidas e escolha o serviço pelo WhatsApp.']].map(([title, text]) => <li key={title}><Check size={18} /><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul>
          <a className="text-link accent" href={INSTAGRAM} target="_blank" rel="noreferrer"><Camera size={18} /> Conheça a Norte Jato no Instagram <ArrowUpRight size={18} /></a>
        </div>
      </section>
      <section className="section appointment" id="agendamento">
        <div className="heading" data-reveal><div><p className="eyebrow">03 / SEM COMPLICAÇÃO</p><h2>O próximo cuidado<br /><span>começa aqui.</span></h2></div><p>Escolha o serviço. Converse com a equipe.<br />Deixe o restante com a Norte Jato.</p></div>
        <div className="appointment-grid" data-reveal><fieldset><legend>O que seu carro precisa hoje?</legend><div className="service-options grid gap-3">{services.map(service => <label key={service.name} className={selected === service.name ? 'service-option selected' : 'service-option'}><input type="radio" name="service" value={service.name} checked={selected === service.name} onChange={() => setSelected(service.name)} /><span className="radio-mark" aria-hidden="true" /><span><strong>{service.name}</strong><small>{service.detail}</small></span><ArrowUpRight size={20} /></label>)}</div></fieldset><div className="appointment-summary"><span className="eyebrow">VAMOS CONVERSAR?</span><MessageCircle className="summary-icon" size={38} strokeWidth={1} /><h3>Seu carro merece<br />essa atenção.</h3><p>Consulte valores e disponibilidade de <strong>{selected.toLowerCase()}</strong> diretamente com a equipe.</p><a className="button" href={whatsapp(selected)} target="_blank" rel="noreferrer">Consultar pelo WhatsApp <ArrowUpRight size={19} /></a><span className="summary-note block text-center">Prefere reservar agora? <a href={BOOKING} target="_blank" rel="noreferrer">Acesse a agenda <ArrowUpRight size={12} /></a></span></div></div>
        <div className="steps grid grid-cols-1 md:grid-cols-3" data-reveal>{[['01', 'Escolha o cuidado', 'Encontre o serviço que combina com o momento do seu carro.'], ['02', 'Reserve seu horário', 'Consulte a agenda online ou fale com a equipe.'], ['03', 'Sinta a diferença', 'Traga seu carro e dê espaço para um novo brilho.']].map(([number, title, text]) => <div key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
      </section>
      <section className="section booking"><div className="booking-orbit" aria-hidden="true" /><div data-reveal><p className="eyebrow">SEU PRÓXIMO BOM MOMENTO AO VOLANTE</p><h2>O próximo brilho<br />tem <em>hora marcada.</em></h2><p className="booking-description">Reserve um tempo para quem acompanha você todos os dias.</p><a className="button" href={BOOKING} target="_blank" rel="noreferrer"><CalendarDays size={18} /> Agendar meu horário <ArrowUpRight size={20} /></a><p className="hours"><Clock3 size={14} /> Segunda a sábado, das 8h às 18h</p></div></section>
      <section className="section faq" id="duvidas"><div data-reveal><p className="eyebrow">BOM SABER / ANTES DE CHEGAR</p><h2>Vamos tirar<br /><span>suas dúvidas.</span></h2><a className="text-link accent" href={whatsapp()} target="_blank" rel="noreferrer">Fale com a Norte Jato <ArrowUpRight size={18} /></a></div><div data-reveal>{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className="section"><div className="footer-top flex items-center justify-between"><Brand /><p>Seu carro novo de novo, hoje mesmo.</p><div><a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram da Norte Jato"><Camera /></a><a href={whatsapp()} target="_blank" rel="noreferrer" aria-label="WhatsApp da Norte Jato"><MessageCircle /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Norte Jato.</span><span>Conceito demonstrativo · Imagens ilustrativas</span><a href="tel:+5581997744272">(81) 99774-4272</a></div></footer>
    <a className="whatsapp" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Conversar com a Norte Jato no WhatsApp"><span className="whatsapp-tooltip">Vamos cuidar do seu carro?</span><MessageCircle size={25} /></a>
  </>
}
export default App


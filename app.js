/* ============================================================
   DMK MARKETING ESTRATÉGICO
   ------------------------------------------------------------
   >>> CONFIGURE O DESTINO DO FORMULÁRIO AQUI <<<

   1) Jeito mais rápido (sem cadastro, 2 minutos):
        FORM_ENDPOINT = 'https://formsubmit.co/ajax/SEU-EMAIL@dominio.com'
      No primeiro envio o FormSubmit manda um e-mail pedindo confirmação.
      Depois disso, cada formulário preenchido chega direto na caixa de entrada.

   2) Alternativas equivalentes: Formspree, Web3Forms, Basin ou um endpoint
      próprio. Serve qualquer URL que aceite POST com FormData.

   3) Enquanto FORM_ENDPOINT ficar vazio, o site usa o modo de reserva:
      abre o programa de e-mail do visitante já preenchido, endereçado a
      CONTACT_EMAIL. Funciona, mas o ideal é o item 1.
   ============================================================ */
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'contato@dmkmarketing.com.br';   /* troque pelo e-mail real */

const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ============================================================
   HEADER E MENU
   ============================================================ */
const hdr = document.getElementById('hdr');
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

addEventListener('scroll', () => hdr.classList.toggle('is-stuck', scrollY > 16), { passive: true });

function fecharMenu() {
  hdr.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
burger.addEventListener('click', () => {
  const aberto = hdr.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(aberto));
  burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  document.body.style.overflow = aberto ? 'hidden' : '';
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharMenu));
addEventListener('keydown', e => { if (e.key === 'Escape') fecharMenu(); });

document.getElementById('ano').textContent = new Date().getFullYear();

/* ============================================================
   REVEAL, CONTADORES E ENTRADA DO TÍTULO
   ============================================================ */
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12, rootMargin: '0px 0px -60px' });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

requestAnimationFrame(() => document.querySelector('.hero').classList.add('on'));

const cio = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, fim = +el.dataset.count, sfx = el.dataset.suffix || '';
    if (reduce) { el.textContent = fim + sfx; cio.unobserve(el); return; }
    const t0 = performance.now();
    const passo = t => {
      const p = Math.min(1, (t - t0) / 1200);
      el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3))) + sfx;
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
    cio.unobserve(el);
  });
}, { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

/* ============================================================
   FORMULÁRIO
   ============================================================ */
const form = document.getElementById('form');
const note = document.getElementById('formNote');
const send = document.getElementById('send');
const done = document.getElementById('done');

const CAMPOS = [
  ['nome', 'Nome'], ['cargo', 'Cargo'], ['email', 'E-mail'], ['fone', 'Telefone'],
  ['empresa', 'Empresa'], ['segmento', 'Segmento'], ['cidade', 'Cidade'],
  ['instagram', 'Instagram ou site'], ['hoje', 'Quem cuida hoje'],
  ['dificuldade', 'Maior dificuldade'], ['verba', 'Investimento previsto'],
  ['prazo', 'Quando começar'], ['msg', 'Momento']
];

function resumo(d) {
  const linhas = CAMPOS.map(([k, r]) => `${r}: ${d.get(k) || '-'}`);
  const interesses = d.getAll('interesse');
  linhas.splice(9, 0, `Interesse: ${interesses.length ? interesses.join(', ') : '-'}`);
  return linhas.join('\n');
}

function sucesso(texto) {
  if (texto) done.querySelector('p').textContent = texto;
  form.classList.add('done');
  done.setAttribute('tabindex', '-1');
  done.focus({ preventScroll: true });
}

form.addEventListener('submit', async ev => {
  ev.preventDefault();
  if (form.website.value) return;                       /* honeypot */
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const d = new FormData(form);
  d.delete('website');
  d.set('interesse', d.getAll('interesse').join(', ') || '-');
  d.set('_subject', `Novo diagnóstico pelo site: ${d.get('empresa') || d.get('nome')}`);

  send.disabled = true;
  send.querySelector('span').textContent = 'Enviando...';

  if (FORM_ENDPOINT) {
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', body: d, headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error(r.status);
      sucesso();
      form.reset();
    } catch (e) {
      send.disabled = false;
      send.querySelector('span').textContent = 'Enviar formulário';
      note.textContent = 'Não conseguimos enviar agora. Tente de novo em instantes.';
      note.style.color = 'var(--inv-gold)';
    }
    return;
  }

  /* reserva: abre o e-mail do visitante já preenchido */
  const assunto = encodeURIComponent(`Diagnóstico pelo site: ${d.get('empresa') || d.get('nome')}`);
  const corpo = encodeURIComponent(resumo(new FormData(form)));
  location.href = `mailto:${CONTACT_EMAIL}?subject=${assunto}&body=${corpo}`;
  sucesso('Abrimos o seu programa de e-mail com os dados preenchidos. É só enviar que a DMK responde no mesmo dia.');
  send.disabled = false;
  send.querySelector('span').textContent = 'Enviar formulário';
});

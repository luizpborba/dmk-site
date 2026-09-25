# DMK Marketing Estratégico | site

Site institucional de uma página em **HTML + CSS + JavaScript puros**. Sem framework,
sem build, sem dependência externa de JavaScript (só as fontes do Google).

```
dmk-site/
├── index.html                    # conteúdo e o logo embutido como <symbol> SVG
├── styles.css                    # design system
├── app.js                        # menu, reveal e o envio do formulário
├── assets/
│   ├── dmk-logo.svg              # logo original
│   ├── micheli-hero.webp         # foto 1 recortada (fundo transparente)
│   ├── micheli-sobre.webp        # foto 2 recortada (fundo transparente)
│   └── ig/                       # imagens usadas nas seções de serviço
│       ├── post-3.jpg            # peça sobre presença digital
│       ├── post-referencia.jpg   # "Seja uma referência ou desapareça" (sem o "//2024")
│       ├── post-posicionamento.jpg # "Posicione sua marca" (sem o "MARKETING DIGITAL")
│       ├── post-2.jpg            # peça de divulgação
│       └── mockup-devices.jpg    # painel em notebook e celular (sem a marca de origem)
└── README.md
```

## Como rodar
```bash
cd dmk-site && python3 -m http.server 5273
```
Depois abra http://127.0.0.1:5273

## ⚠️ 1. Ligar o formulário (única coisa obrigatória)

O site não tem WhatsApp: todo contato passa pelo formulário. Falta dizer para onde ele
envia. Abra `app.js` e preencha as duas primeiras constantes:

```js
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/SEU-EMAIL@dominio.com';
const CONTACT_EMAIL = 'contato@dmkmarketing.com.br';
```

- **FormSubmit** não exige cadastro: no primeiro envio ele manda um e-mail pedindo
  confirmação; depois disso cada formulário cai direto na caixa de entrada.
  Formspree, Web3Forms, Basin ou um endpoint próprio funcionam igual.
- Enquanto `FORM_ENDPOINT` ficar vazio, o site usa o modo de reserva: abre o programa de
  e-mail do visitante já preenchido, endereçado a `CONTACT_EMAIL`.

Em qualquer caso o visitante vê o painel de confirmação sem sair da página.

### O que o formulário coleta
Três blocos numerados: **Sobre você** (nome, cargo, e-mail, telefone), **Sobre a empresa**
(empresa, segmento, cidade, Instagram ou site, quem cuida do marketing hoje) e
**O que você precisa** (serviços em chips de múltipla escolha, maior dificuldade,
investimento previsto, prazo e mensagem livre). Fecha com autorização de contato (LGPD),
campo-armadilha contra robô e validação nativa do navegador.

## 2. Outros ajustes recomendados

| O quê | Onde | Observação |
|---|---|---|
| Prazo de retorno | `#porque` e `#contato` | o site promete diagnóstico em 24 horas. Confirme que a operação sustenta isso. |
| Cidade no rodapé, no balão do topo e no FAQ | `index.html` | "Nova Santa Rosa · PR", tirado do formulário oficial da imersão. |
| Fotos do Instagram | `assets/ig/` | ver abaixo |
| Imagem de compartilhamento | `<head>` → `og:image` | hoje aponta para a foto do hero; o ideal é uma arte 1200×630. |

### Sobre as imagens das seções
Vieram do **perfil público da própria DMK**, com três tratamentos:

- **"Seja uma referência ou desapareça"** (1000×1000): o **"//2024"** do canto superior
  esquerdo foi removido, reconstruindo o fundo linha a linha.
- **"Posicione sua marca da maneira certa"** (1000×1000): o **"MARKETING DIGITAL"** do
  topo foi removido copiando a textura do próprio fundo, com ajuste de tom e bordas
  suaves para não deixar costura.
- **Mockup do painel** (notebook e celular): recortado só nos aparelhos, sem o título e
  o logotipo de outra marca que vinham na arte original, inclusive as duas marcas
  pequenas dentro das telas.

As demais são de 640px (máximo servido sem login) e valem como provisórias; para peças
grandes, substitua pelos originais em alta.

> Encontrado no material público da DMK, caso queira usar depois: o telefone
> **(44) 99715-3380** aparece na peça da Expo Rondon. Não está no site porque o contato
> foi definido como exclusivamente por formulário.

## Identidade visual

Branco, preto e cinza, com **dourado** como único acento. Sem vermelho e sem tema escuro:
o site é claro, ponto.

| Token | Valor | Uso |
|---|---|---|
| Fundo | `#FFFFFF` | página |
| Superfícies | `#F7F7F8` · `#EFEFF1` · `#E7E7EA` | faixas, hover, disco atrás das fotos |
| Tinta | `#0A0A0B` | texto e botões escuros |
| Cinza | `#6B6B70` · `#9A9AA0` | apoio e rótulos |
| Dourado | `#B5892F` | botões, arcos, linhas, destaques grandes |
| Dourado escuro | `#8A6A1F` | dourado em texto pequeno (contraste acima de 4.5:1) |
| Dourado claro | `#D9B45C` | dourado dentro dos blocos pretos |

Os dois blocos pretos de página inteira ("O problema" e "Comece aqui") são parte da
composição, não um tema: eles quebram o ritmo branco e dão peso ao formulário.

**Tipografia**, seguindo as peças da própria marca:
- **Montserrat** (600/700) em todos os títulos, números e no menu grande. É a família que
  conversa com o logo.
- **Inter** no corpo, nos rótulos e nos campos.
- **Instrument Serif itálico em dourado** só na palavra-chave de cada título
  ("vira *venda*", "*decisão*", "*referência*"), exatamente como nas artes do Instagram.

**Composição**: linha de 1px como separador principal, raio quase zero (só botões e
balões são pílulas), muito respiro vertical e nenhuma numeração de seção: a hierarquia
vem do rótulo, do tamanho do título e do traço dourado.

O logo entra como `<symbol>` SVG com `fill="currentColor"`.

## Movimento
Sem 3D, sem WebGL, sem fundo animado. Ficou só o que ajuda a leitura:
os balões flutuando no topo, o título entrando linha a linha, reveal suave no scroll,
contadores nos números, sublinhado que corre nos links, preenchimento dos botões e a
faixa de serviços em rolagem contínua (pausa no hover). Tudo desliga com
`prefers-reduced-motion`.

## Responsividade
- Acima de 1080px: layout completo em duas colunas, serviços em linha única.
- Até 1080px: método em duas colunas, blocos de valor empilhados, linha de serviço com a
  seta ao lado do título.
- Até 900px: barra branca sólida com logo e botão de menu de 44px; o menu abre em tela
  cheia com itens grandes, botão dourado e contato no rodapé.
- Até 620px: tudo em coluna única, formulário empilhado, balões menores no hero.
- Verificado a 360, 390, 768 e ~1070px: sem rolagem horizontal, sem elemento cortado e
  sem sobreposição. As imagens usam `height:auto` com `aspect-ratio`, então nenhuma
  aparece esticada ou cortada fora de hora.

## Publicação
É estático: sobe em Netlify (arrastando a pasta), Vercel, Cloudflare Pages, GitHub Pages
ou FTP comum. Depois de publicar, confirme o envio do formulário uma vez.

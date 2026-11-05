# Norte Jato — landing page

React, TypeScript, Tailwind CSS e Vite. Site baseado na marca, nos materiais públicos e no endereço da Norte Jato, no Rosarinho, Recife.

## Executar e compilar

```sh
npm ci
npm run dev
npm run build
```

O build fica em `dist/`. Caminhos relativos permitem hospedagem no GitHub Pages em `/norte-jato/`.

## Conteúdo

Dados, contatos, links, serviços e galeria em `src/App.tsx`. Fotos e marca em `public/images/`. A galeria amplia imagens, aceita navegação pelo teclado e oferece links para as publicações de origem. Há mapa, rota no Google Maps, navegação no Waze e mensagem de WhatsApp conforme o serviço escolhido.

As fotos e artes desta versão vieram do perfil público da própria empresa. Consulte `docs/fontes.md` para a origem individual e os dados verificados. As antigas fotos de banco de imagens foram removidas. Fontes tipográficas: Google Fonts, com alternativas locais.

O site não confirma reservas, envia mensagens ou coleta dados. Os botões abrem os canais externos da empresa. Não há preços nem avaliações inventadas.

## Animações e acessibilidade

Animações de entrada, faixa contínua, interações e progresso de leitura respeitam `prefers-reduced-motion`. Menu móvel aceita Escape; galeria inclui foco contido, Escape e setas; controles de seleção usam rádios nativos; página inclui atalho para o conteúdo.

## Publicação

Código na branch `main`; build na branch `gh-pages`. Para atualizar a publicação, gere o build e envie `dist/` para `gh-pages`. O exemplo `docs/deploy-pages.example.yml` permite automatização quando a conexão GitHub tiver a permissão `workflow`.

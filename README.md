# Norte Jato — landing page

Landing page responsiva em React, TypeScript, Tailwind CSS e Vite.

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Produção

```sh
npm run build
npm run preview
```

O build estático fica em `dist/`. O site está publicado no GitHub Pages pela branch `gh-pages`. O código fica na branch `main`. Para atualizar a publicação, gere um novo build e envie o conteúdo de `dist/` para `gh-pages`. O Vite usa caminhos relativos para funcionar em subdiretórios. Um workflow opcional está em `docs/deploy-pages.example.yml`; sua ativação exige permissão de escrita de workflows no GitHub.

## Experiência

- Apresentação, serviços, diferenciais, seleção de serviço, agendamento e perguntas frequentes.
- Seleção com controles de rádio e mensagem contextual no WhatsApp; nenhuma mensagem é enviada automaticamente.
- Agenda externa no FilaClick; não há confirmação de reserva dentro da landing page.
- Animações de entrada, faixa contínua, estados de interação e progresso de leitura.
- Respeita `prefers-reduced-motion`, permite navegação por teclado e inclui atalho para o conteúdo.

## Editar os dados

Links de agendamento, Instagram e WhatsApp e a lista de serviços ficam em `src/App.tsx`.

O telefone e o horário seguem o briefing fornecido. Fotos locais em `public/images/` são referências ilustrativas do Unsplash, não registros de serviços da Norte Jato. Substitua por fotos autorizadas da empresa antes da versão comercial definitiva. As fontes Barlow Condensed e Manrope são carregadas via Google Fonts, com fontes alternativas disponíveis.

Fontes das fotos: https://images.unsplash.com/photo-1503376780353-7e6692767b70, https://images.unsplash.com/photo-1607860108855-64acf2078ed9 e https://images.unsplash.com/photo-1507136566006-cfc505b114fc.

## Verificação

Build de produção validado. Navegação móvel, expansão das perguntas, seleção de serviço, imagens e largura da página conferidas no navegador em celular e computador.


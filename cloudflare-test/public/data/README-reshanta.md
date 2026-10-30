# Reshanta Inferior — cobertura parcial

Verificação realizada em 2026-10-30. Não é um catálogo completo nem uma
confirmação de todas as posições no cliente Global.

## Dados utilizados

- Autor: Yihao Liu (tc-imba), Aion 2 Interactive Map.
- Marcadores: https://data-aion2.tc-imba.com/markers/Abyss_Reshanta_A.json
- Dimensões: https://data-aion2.tc-imba.com/maps.json
- Nome Odyle: https://data-aion2.tc-imba.com/locales/en-US/types.json
- Licença dos dados: CC BY-NC 4.0, uso não comercial com atribuição.
- Declaração: https://github.com/aion2-interactive-map/aion2-interactive-map/blob/89ce3984d569ff1a03ee6311d064231211212981/LICENSE
- Licença completa: https://creativecommons.org/licenses/by-nc/4.0/

O JSON da fonte contém 240 marcadores `gathering/gatheringOdyle` e 2
`location/teleport`. Nenhum outro subtipo de coleta aparece nessa camada.
Incluímos todos esses marcadores, sem acrescentar materiais ou coordenadas.
Os identificadores, coordenadas originais e altitude estão preservados em
`sourceMarkers` no arquivo derivado. O SHA-256 identifica a resposta original
consultada; os outros tipos de marcador da resposta não foram importados.

A camada tem 4 × 4 tiles de 1024 pixels: **4096 × 4096**, não 8192.
As coordenadas da API de dados, medidas a partir do canto superior esquerdo,
foram convertidas por `percentual = pixel / 4096 * 100`, com três casas decimais.
O formato dessa API difere dos antigos YAML do repositório, cujo eixo vertical
era medido a partir da base. Não misturamos essas duas fontes de coordenadas.
O importador de coleta do projeto intermediário documenta o formato da API:
https://github.com/problem-xyz/aion2-map-overlay/blob/main/scripts/import_gathering.py

## Validação Global pendente

A fonte usada não identifica o build do cliente. A base MetaBot declara 216 nós
de Odyle no Global build 0.0.4387.0, quantidade diferente dos 240 da fonte:
https://metabot.gg/en/aion-2/map/chaotic-lower-reshanta/gathering

Não copiamos dados dessa base sem licença, nem removemos 24 pontos arbitrários.
A correspondência individual com o Global, outros materiais e a cobertura
completa continuam pendentes. As posições publicadas são verificáveis na fonte
comunitária, não verificadas dentro do jogo. Os teleportes também são marcadores
comunitários, sem confirmação de disponibilidade ou ligação por viagem rápida.

## Imagem de fundo bloqueada por licença não confirmada

O repositório original contém 16 tiles de Reshanta em `public/UI/Map/WorldMap/`.
A licença explícita abrange `public/data`, não `public/UI`. A atribuição do
overlay intermediário cobre imagens de Verteron/Altgard, mas não Reshanta.
Portanto, não redistribuímos nem vinculamos diretamente essa arte como se
estivesse licenciada. Os direitos de arte e marcas permanecem com a NCSOFT.

O manifesto em `/assets/maps/reshanta-inferior/manifest.json` registra a dimensão
correta e URLs de imagem nulas. A interface exibe uma **grade de coordenadas**,
explicitamente sem terreno, até existir autorização para uma imagem real.
Após confirmar direitos e alinhamento, preencher `overview` e `detail` com URLs
locais das imagens licenciadas; o renderizador suporta carregamento HD ao
aproximar, recorte na resolução original e a mesma transformação dos pontos.
Não ampliar uma imagem para anunciar resolução inexistente.

## Funcionalidades e limites

Os filtros mostram somente categorias com pontos documentados. Visitas ficam
no navegador, separadas por região. Circuitos usam proximidade geométrica;
não consideram altura, ilhas, obstáculos ou rotas voáveis. A grade e os pontos
podem ser ampliados até 24× e movidos com mouse ou toque. A integração mantém
as APIs, hospedagem, estilos e mapas anteriores do Hub.

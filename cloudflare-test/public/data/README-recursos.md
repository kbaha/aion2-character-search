# Coordenadas do mapa de coleta — Aion 2 Hub

## Fonte e atribuição obrigatória

Os arquivos `recursos-verteron.json` e `recursos-altgard.json` são uma adaptação apenas dos pontos de **coleta** de:

- **tc-imba / Aion 2 Interactive Map**, dados de marcadores, projeto original: https://github.com/aion2-interactive-map/aion2-interactive-map
- **problem-xyz / Aion 2 Map Overlay**, arquivos derivados `assets/object-sets/verteron.json` e `assets/object-sets/altgard.json`: https://github.com/problem-xyz/aion2-map-overlay

Os pontos de coleta do projeto intermediário foram obtidos da fonte original em **2026-10-02**, segundo `NOTICE` do repositório `problem-xyz/aion2-map-overlay`.

**Licença dos dados e mapas: CC BY-NC 4.0** — https://creativecommons.org/licenses/by-nc/4.0/

A atribuição **não** autoriza uso comercial. Se o Hub vier a exibir publicidade, vender assinaturas ou monetizar esses materiais, será necessário avaliar essa restrição e obter autorização apropriada. A arte e as marcas Aion 2 pertencem à NCSOFT.

## Transformações realizadas para o Hub

- Removidos os pontos de monstros, colecionáveis e teleporte; preservados apenas nós com categoria `gathering-*`.
- Transformados os objetos completos em tuplas compactas `[indice_da_categoria, x_percentual, y_percentual]`.
- Mantidas as coordenadas percentuais e nomes dos recursos da fonte derivada, sem inventar pontos.
- Categorias traduzidas e agrupadas apenas na interface; cada tipo real permanece disponível no seletor.
- Cálculo de concentração em **células de 10% x 10% do mapa** para apresentar as áreas mais densas.
- Sequências calculadas por proximidade entre pontos registrados em uma célula densa; linhas retas **não** representam caminhos percorríveis confirmados.

## Cobertura

- Verteron, Elyos: **2.733** pontos, 13 tipos de recurso.
- Altgard, Asmodianos: **2.692** pontos, 13 tipos de recurso.
- Total: **5.425** pontos.

Os arquivos não cobrem todos os mapas do Global nem todas as famílias de recursos. Existem outras bases de dados com quantidades e classificações diferentes; o Hub **não** mistura coordenadas não verificadas.

## Limitações

O mapa representa possíveis posições de coleta na versão de origem, **não** disponibilidade em tempo real. Recursos podem estar ausentes devido a respawn, outros jogadores, mudanças de patch ou diferença de altitude. Projeção do mapa é uma imagem do jogo; o cálculo de proximidade não incorpora terrenos, obstáculos nem rotas navegáveis.

Os arquivos de imagem da interface são carregados de `assets/maps/<região>/reference.webp` do projeto problem-xyz e permanecem hospedados externamente. Se não estiverem disponíveis, a camada de pontos ainda pode carregar, mas o mapa de fundo ficará ausente.

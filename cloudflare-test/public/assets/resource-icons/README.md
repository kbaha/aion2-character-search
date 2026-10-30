# Ícones de coleta do Aion 2 Hub

Esta pasta contém **ícones originais de categoria de coleta do minimapa do jogo**, no formato WebP, usados sobre os nós de recursos em `/farm-recursos.html`.

**Origem dos arquivos:** repositório comunitário [oscarxdev/aion2-icons](https://github.com/oscarxdev/aion2-icons), pasta `Icon/`. As imagens foram incorporadas ao Hub **sem modificação**, preservando os arquivos originais.

**Titular dos direitos da arte original:** NCSOFT (Aion 2). A presença dos arquivos em repositório público não implica licença para redistribuição ou uso comercial. Confira as políticas de uso de fãs e obtenha permissão quando necessário.

## Arquivos e correspondência com o jogo

| Arquivo do Hub | Nome do ícone original no repositório de origem | Exemplo de aplicação |
|---|---|---|
| `odyle.webp` | `UT_Marker_Gather_Od.webp` | Odyle |
| `metal.webp` | `UT_Marker_Gatherl_Metal.webp` | Orichalcum |
| `gem.webp` | `UT_Marker_Gatherl_Jewelry.webp` | Sapphire, Diamond, Ruby |
| `wood.webp` | `UT_Marker_Gather_Tree.webp` | Yggdrasil, Asvata |
| `herb.webp` | `UT_Marker_Gather_Herb.webp` | Aria, Azpha, Targena, Calendula |
| `flower.webp` | `UT_Marker_Gather_Flower.webp` | Disponível para mapeamentos futuros |
| `berry.webp` | `UT_Marker_Gather_Berry.webp` | Marcadores alimentares/frutos |
| `vegetable.webp` | `UT_Marker_Gather_Vegetable.webp` | Marcadores alimentares/vegetais |
| `shellfish.webp` | `UT_Marker_Gather_shellfish.webp` | Marcadores alimentares/aquáticos |
| `generic.webp` | `UT_Marker_Gather.webp` | Recurso sem correspondência confirmada |
| `rare-metal.webp` | `UT_Marker_Gatherl_RareMetal.webp` | Disponível para mapeamentos futuros |

As famílias de coleta aparecem agrupadas no minimapa do jogo: **não há necessariamente um ícone exclusivo de mapa para cada recurso individual**. Esta atualização usa a família mais próxima da categoria de coleta, sem inventar ícones. Para diferenciar um recurso específico, mantenha o nome na janela de detalhes e o filtro pelo nome.

## Como substituir os ícones no futuro

1. Abra o repositório `kbaha/aion2-character-search` no GitHub e entre em `cloudflare-test/public/assets/resource-icons/`.
2. Escolha um arquivo `.webp`. Se for atualizá-lo, mantenha exatamente o mesmo nome (por exemplo, `odyle.webp`). Use **Upload files** no GitHub para enviar seu novo arquivo e confirme o commit na branch `main`. Para substituir arquivos existentes via interface web, talvez seja necessário excluir o antigo antes e reenviar.
3. Se quiser mudar **qual categoria usa qual imagem**, edite o objeto `resourceIconTypes` no arquivo `cloudflare-test/public/farm-recursos.html`.
4. Aguarde o deploy automático da Cloudflare do Worker `aion2-api-test` ou use **Deployments > Redeploy**.
5. Verifique `https://aion2.skgaming.bid/farm-recursos.html` e atualize com `Ctrl+F5` se necessário.

O mapa tem uma caixa **Ícones originais do mapa do jogo** para alternar entre ícones e pontos coloridos, e um *fallback* visual caso algum arquivo não carregue.

## Informações técnicas

- Ícones lidos via rotas locais `/assets/resource-icons/<tipo>.webp`.
- O preload assíncrono mantém a interface responsiva.
- O renderizador preserva os dados geográficos, as rotas, o zoom, os pontos visitados e os marcadores de teleporte.
- `resourceIconTypes` atualmente mapeia 21 tipos de recursos para 7 ícones de categorias.

## 30/10/2026 — Ícones coloridos dos recursos

A pasta `resource-icons/` também contém 11 arquivos **`color-*.webp`** extraídos do cliente do jogo, oriundos de `oscarxdev/aion2-icons/Item/ETC/`. Eles são exibidos por padrão no mapa. Os arquivos `*.webp` anteriores de marcadores brancos continuam disponíveis para referência; a opção de desligar os ícones muda a visualização para **pontos coloridos**.

| Arquivo colorido | Arquivo original de referência | Representação |
|---|---|---|
| `color-odyle.webp` | `Icon_Gather_Od_L_lv1_01a.webp` | Odyle verde |
| `color-metal.webp` | `Icon_Gather_Ore_L_lv1_01a.webp` | Minério |
| `color-wood.webp` | `Icon_Gather_Wood_L_lv1_01a.webp` | Madeira |
| `color-herb.webp` | `Icon_Gather_Herb_L_lv1_01a.webp` | Erva |
| `color-flower.webp` | `Icon_Item_Gather_Herb_L_c_002.webp` | Flor |
| `color-berry.webp` | `Icon_Item_Gather_Food_L_c_003.webp` | Fruta |
| `color-vegetable.webp` | `Icon_Item_Gather_Food_L_c_001.webp` | Vegetal |
| `color-shellfish.webp` | `Icon_Gather_Food_L_lv1_01c.webp` | Recurso aquático |
| `color-sapphire.webp` | `Icon_Item_Gather_Gemstone_A_c_002.webp` | Cristal azul |
| `color-ruby.webp` | `Icon_Item_Gather_Gemstone_A_c_004.webp` | Cristal vermelho |
| `color-diamond.webp` | `Icon_Item_Gather_Gemstone_A_l_001.webp` | Cristal branco |

**Importante:** são imagens originais *dos itens/famílias*, mas a associação com um nó específico pode ser apenas ilustrativa. Não são ícones de coleta distintos e identificados individualmente para todos os nomes de materiais. A identidade do nó vem de sua categoria na base geográfica. Não atribua raridades, taxas de drop ou variantes específicas somente pela aparência da imagem.

## Zoom e precisão

- Zoom máximo ampliado de **6× para 24×**, via botões, roda do mouse, barra deslizante ou pinça em telas sensíveis ao toque.
- Ao aproximar a partir de 1,7×, a ferramenta solicita a imagem `detail.webp` de **8.192 × 8.192** pixels da fonte comunitária; se falhar, mantém a imagem de **4.096 × 4.096** pixels.
- Os marcadores são desenhados em um Canvas independente, em resolução de tela, para não ficarem borrados ao aplicar transformações no fundo.
- Mais zoom **não** aumenta a precisão das coordenadas originais: a origem dos pontos permanece a base comunitária e pode apresentar limites de localização/altitude.
- O carregamento de imagens HD é sob demanda e pode consumir memória e dados, especialmente em celulares.

Para conferir: `https://aion2.skgaming.bid/farm-recursos.html`. Se ainda vir a versão antiga, confira o deploy da Cloudflare e atualize o cache do navegador.

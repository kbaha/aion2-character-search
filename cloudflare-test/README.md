# Teste de conectividade NCSOFT via Cloudflare Workers

Teste isolado, sem alterar o Netlify. Consulta apenas o personagem SatoKuro em Siel/LATAM.

## Publicação
Cloudflare Dashboard → Workers & Pages → Create application → GitHub → repositório kbaha/aion2-character-search.

Configurar **Root directory** como `cloudflare-test` e **Deploy command** como `npx wrangler deploy`. O nome do Worker é `aion2-api-test`.

Após publicar, abrir `https://aion2-api-test.<seu-subdominio>.workers.dev/test`.

O teste retorna somente códigos HTTP, tipo de conteúdo e erro estruturado (quando houver); não publica o JSON completo do personagem. Não usa cookies ou tokens.

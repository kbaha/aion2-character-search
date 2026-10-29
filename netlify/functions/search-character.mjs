export default async (request) => {
  const u = new URL(request.url);
  const keyword = (u.searchParams.get('keyword') || '').trim();
  const region = u.searchParams.get('region') || 'la';
  if (!keyword || keyword.length > 60 || !['la','nae','naw','eu','as'].includes(region)) return Response.json({error:'Parâmetros inválidos'}, {status:400});
  const target = new URL('https://api-search.plaync.com/aion2global/search/v2/character');
  target.search = new URLSearchParams({keyword,region,localeInfo:'pt-BR',page:'1',size:'20'}).toString();
  try {
    const response = await fetch(target, {headers:{Accept:'application/json','User-Agent':'Aion2CommunityCompanion/1.0'}});
    if (!response.ok) return Response.json({error:`NCSOFT retornou HTTP ${response.status}. A API pode exigir autorização ou estar indisponível.`,status:response.status},{status:502});
    const data = await response.json();
    return Response.json(data,{headers:{'Cache-Control':'public, max-age=30'}});
  } catch {return Response.json({error:'Não foi possível conectar à NCSOFT.'},{status:502});}
};
export const config = {path:'/api/characters'};
const allowed = new Set(['la','nae','naw','eu','as']);
export default async (request) => {
  const url = new URL(request.url);
  const region = url.searchParams.get('region') || 'la';
  const characterId = url.searchParams.get('characterId') || '';
  const serverId = url.searchParams.get('serverId') || '';
  if (!allowed.has(region) || !characterId || characterId.length > 200 || !/^\d+$/.test(serverId))
    return Response.json({error:'Identificação do personagem inválida.'},{status:400});
  const params = new URLSearchParams({region,lang:'en-US',characterId,serverId});
  try {
    const endpoints = ['info','equipment'];
    const results = await Promise.all(endpoints.map(async name => {
      const response = await fetch('https://aion2.plaync.com/api/character/'+name+'?'+params.toString(), {headers:{Accept:'application/json'}});
      if (!response.ok) throw Error(name+': NCSOFT HTTP '+response.status);
      const type = response.headers.get('content-type') || '';
      if (!type.includes('json')) throw Error(name+': NCSOFT retornou conteúdo não JSON.');
      return response.json();
    }));
    return Response.json({info:results[0],equipment:results[1]},{headers:{'Cache-Control':'public, max-age=30'}});
  } catch (e) {
    return Response.json({error:'Falha ao consultar os detalhes: '+String(e.message||e)},{status:502});
  }
};
export const config = {path:'/api/character-details'};

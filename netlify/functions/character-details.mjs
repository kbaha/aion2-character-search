const allowed = new Set(['la','nae','naw','eu','as']);
export default async (request) => {
  const url = new URL(request.url);
  const region = url.searchParams.get('region') || 'la';
  const characterId = url.searchParams.get('characterId') || '';
  const serverId = url.searchParams.get('serverId') || '';
  if (!allowed.has(region) || !characterId || characterId.length > 200 || !/^\d+$/.test(serverId))
    return Response.json({error:'Identificação do personagem inválida.'},{status:400});
  const params = new URLSearchParams({region,lang:'en-US',characterId,serverId});
  async function retrieve(name) {
    try {
      const endpoint = 'https://aion2.plaync.com/api/character/'+name+'?'+params.toString();
      const response = await fetch(endpoint,{headers:{Accept:'application/json'}});
      if (!response.ok) return {data:null,error:name+': NCSOFT HTTP '+response.status};
      const type = response.headers.get('content-type')||'';
      if (!type.includes('json')) return {data:null,error:name+': resposta não JSON ('+type+')'};
      return {data:await response.json(),error:null};
    } catch(e) {return {data:null,error:name+': '+String(e.message||e)}}
  }
  const [info,equipment] = await Promise.all([retrieve('info'),retrieve('equipment')]);
  if (!info.data && !equipment.data) return Response.json({error:'Não foi possível obter os dados oficiais.',warnings:[info.error,equipment.error]},{status:502});
  return Response.json({info:info.data||{},equipment:equipment.data||{},warnings:[info.error,equipment.error].filter(Boolean)},{headers:{'Cache-Control':'public, max-age=30'}});
};
export const config = {path:'/api/character-details'};

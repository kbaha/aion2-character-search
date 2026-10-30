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
      const response = await fetch(endpoint,{headers:{'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Accept-Language':'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7','User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:159.0) Gecko/20100101 Firefox/159.0','Cookie':'country=BR; prelogin_country_code=BR; locale=pt-BR; gw_locale=pt-BR; aion2global_gw_locale=pt-BR'}});
      if (!response.ok) {const type=response.headers.get('content-type')||'desconhecido';let problem='';if(type.includes('json')){try{const body=await response.json();problem=[body.title,body.detail,body.code,body.message].filter(x=>typeof x==='string'||typeof x==='number').map(String).join(' | ').slice(0,240)}catch{}}console.log('NCSOFT diagnostic',JSON.stringify({endpoint:name,status:response.status,type,problem}));return {data:null,error:name+': NCSOFT HTTP '+response.status+' ('+type+')'+(problem?' — '+problem:'')};}
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

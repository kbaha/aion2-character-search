const allowed = new Set(['la','nae','naw','eu','as']);
const makeJson = (body,status=200) => new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff','access-control-allow-origin':'https://aion2-api-test.zero-linkinpark.workers.dev'}});
async function retrieve(name,params){
  try {
    const response=await fetch('https://aion2.plaync.com/api/character/'+name+'?'+params,{headers:{Accept:'application/json'}});
    const type=response.headers.get('content-type')||'';
    if(!response.ok){let detail='';if(type.includes('json')){try{const body=await response.json();detail=[body.title,body.detail,body.code].filter(Boolean).join(' | ').slice(0,180)}catch{}}return {data:null,error:name+': HTTP '+response.status+(detail?' — '+detail:'')};}
    if(!type.includes('json'))return {data:null,error:name+': conteúdo não JSON'};
    return {data:await response.json(),error:null};
  } catch(e){return {data:null,error:name+': '+String(e.message||e)}}
}
export default {
 async fetch(request){
  const url=new URL(request.url);
  if(url.pathname==='/test'){
    const params=new URLSearchParams({region:'la',lang:'en-US',characterId:'9p064LqT7tlY1gPpQykuPRLuto1CgkPfGttAfdkK1vY=',serverId:'1401'});
    const results=await Promise.all(['info','equipment'].map(async name=>{const r=await retrieve(name,params);return {endpoint:name,success:!!r.data,error:r.error||null,characterName:r.data?.profile?.characterName||null}}));
    return makeJson({test:'Cloudflare Worker -> NCSOFT',results});
  }
  if(url.pathname!=='/api/character-details')return makeJson({message:'Use /test ou /api/character-details'});
  const region=url.searchParams.get('region')||'la',characterId=url.searchParams.get('characterId')||'',serverId=url.searchParams.get('serverId')||'';
  if(!allowed.has(region)||!characterId||characterId.length>200||!/^\d{1,12}$/.test(serverId))return makeJson({error:'Identificação inválida'},400);
  let normalizedId=characterId;for(let i=0;i<2&&/%[0-9a-f]{2}/i.test(normalizedId);i++){try{const next=decodeURIComponent(normalizedId);if(next===normalizedId)break;normalizedId=next}catch{break}}const params=new URLSearchParams({region,lang:'en-US',characterId:normalizedId,serverId});
  const [info,equipment]=await Promise.all([retrieve('info',params),retrieve('equipment',params)]);
  if(!info.data&&!equipment.data)return makeJson({error:'Não foi possível obter os dados oficiais.',warnings:[info.error,equipment.error]},502);
  return makeJson({info:info.data||{},equipment:equipment.data||{},warnings:[info.error,equipment.error].filter(Boolean)});
 }
};

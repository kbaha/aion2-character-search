const allowed = new Set(['la','nae','naw','eu','as']);
export default async (request) => {
 const url=new URL(request.url);
 const region=url.searchParams.get('region')||'la',characterId=url.searchParams.get('characterId')||'',serverId=url.searchParams.get('serverId')||'';
 if(!allowed.has(region)||!characterId||characterId.length>200||!/^\d{1,12}$/.test(serverId))return Response.json({error:'Identificação do personagem inválida.'},{status:400});
 let normalizedId=characterId;for(let i=0;i<2&&/%[0-9a-f]{2}/i.test(normalizedId);i++){try{const next=decodeURIComponent(normalizedId);if(next===normalizedId)break;normalizedId=next}catch{break}}const params=new URLSearchParams({region,characterId:normalizedId,serverId});
 try{
  const upstream=await fetch('https://aion2-api-test.zero-linkinpark.workers.dev/api/character-details?'+params,{headers:{Accept:'application/json'},signal:AbortSignal.timeout(12000)});
  const type=upstream.headers.get('content-type')||'';
  if(!type.includes('json'))return Response.json({error:'O serviço de perfis retornou um formato inesperado.'},{status:502});
  const data=await upstream.json();
  return Response.json(data,{status:upstream.status,headers:{'Cache-Control':upstream.ok?'public, max-age=30':'no-store'}});
 }catch(e){return Response.json({error:'Não foi possível acessar o serviço de perfis.',details:String(e.message||e)},{status:502})}
};
export const config={path:'/api/character-details'};

const CHARACTER_ID = '9p064LqT7tlY1gPpQykuPRLuto1CgkPfGttAfdkK1vY=';
const SERVER_ID = '1401';
const REGION = 'la';
const makeJson = (body,status=200) => new Response(JSON.stringify(body,null,2),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== '/test') return makeJson({message:'Teste de conectividade NCSOFT. Acesse /test para executar.'});
    const params = new URLSearchParams({region:REGION,lang:'en-US',characterId:CHARACTER_ID,serverId:SERVER_ID});
    const result = await Promise.all(['info','equipment'].map(async (name)=>{
      try {
        const target='https://aion2.plaync.com/api/character/'+name+'?'+params;
        const response=await fetch(target,{headers:{'Accept':'application/json'}});
        const contentType=response.headers.get('content-type')||'';
        let parsed=null;
        if(contentType.includes('json')) { try {parsed=await response.json()} catch {} }
        return {endpoint:name,httpStatus:response.status,contentType,success:response.ok,characterName:response.ok?parsed?.profile?.characterName||null:null,problem:!response.ok?{title:parsed?.title||null,detail:parsed?.detail||null,code:parsed?.code||null}:null};
      } catch(e) {return {endpoint:name,success:false,networkError:String(e.message||e)}}
    }));
    return makeJson({test:'Cloudflare Worker -> NCSOFT',results:result});
  }
};

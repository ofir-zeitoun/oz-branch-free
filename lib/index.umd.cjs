(function(e,r){typeof exports=="object"&&typeof module<"u"?r(exports):typeof define=="function"&&define.amd?define(["exports"],r):(e=typeof globalThis<"u"?globalThis:e||self,r(e["oz-redux-dispatcher"]={}))})(this,function(e){"use strict";const r=(a,t)=>new Proxy(a,{get(i,n){return n in i?i[n]:t}}),c={breakOnFirst:!0};function d(a){const t=new Set,i=Object.assign({},c,a);return{subscribe(n,o){const s=[n,o];return t.add(s),()=>{t.delete(s)}},async handle(n){let o;for(const[s,u]of Array.from(t))if(await s(n)&&(o=await u(n),i.breakOnFirst))break;return o},clearAll(){t.clear()}}}e.createMessageHandler=d,e.objectMapper=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});

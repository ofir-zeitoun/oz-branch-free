(function(e,r){typeof exports=="object"&&typeof module<"u"?r(exports):typeof define=="function"&&define.amd?define(["exports"],r):(e=typeof globalThis<"u"?globalThis:e||self,r(e["oz-redux-dispatcher"]={}))})(this,function(e){"use strict";const r=(i,n)=>new Proxy(i,{get(s,t){return t in s?s[t]:n}}),u={breakOnFirst:!0};function a(i){const n=new Set,s=Object.assign({},u,i);return{subscribe(t){return n.add(t),()=>{n.delete(t)}},async publish(t){let o;for(const d of Array.from(n)){const c=await d(t);if(c!==void 0&&(o=c,s.breakOnFirst))break}return o},clearAll(){n.clear()}}}e.createMessageHandler=a,e.objectMapper=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});

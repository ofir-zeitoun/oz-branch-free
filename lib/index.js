const i = (n, r) => new Proxy(n, {
  get(t, e) {
    return e in t ? t[e] : r;
  }
}), c = {
  breakOnFirst: !0
  // or continue all
};
function d(n) {
  const r = /* @__PURE__ */ new Set(), t = Object.assign({}, c, n);
  return {
    subscribe(e, s) {
      const o = [e, s];
      return r.add(o), () => {
        r.delete(o);
      };
    },
    async handle(e) {
      let s;
      for (const [o, a] of Array.from(r))
        if (await o(e) && (s = await a(e), t.breakOnFirst))
          break;
      return s;
    },
    clearAll() {
      r.clear();
    }
  };
}
const u = () => !0, l = () => {
  const n = /* @__PURE__ */ new Set();
  let r;
  const t = {
    when: (e) => (r = e, t),
    then: (e) => (n.add([r, e]), t),
    default: (e) => (n.add([u, e]), t),
    execute: (e) => {
      for (const [s, o] of Array.from(n))
        if (s(e))
          return o(e);
    }
  };
  return t;
};
export {
  l as buildSwitch,
  d as createMessageHandler,
  i as objectMapper
};

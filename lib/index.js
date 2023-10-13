const i = (a, r) => new Proxy(a, {
  get(n, e) {
    return e in n ? n[e] : r;
  }
}), o = {
  breakOnFirst: !0
  // or continue all
};
function u(a) {
  const r = /* @__PURE__ */ new Set(), n = Object.assign({}, o, a);
  return {
    subscribe(e, t) {
      const s = [e, t];
      return r.add(s), () => {
        r.delete(s);
      };
    },
    async handle(e) {
      let t;
      for (const [s, c] of Array.from(r))
        if (await s(e) && (t = await c(e), n.breakOnFirst))
          break;
      return t;
    },
    clearAll() {
      r.clear();
    }
  };
}
export {
  u as createMessageHandler,
  i as objectMapper
};

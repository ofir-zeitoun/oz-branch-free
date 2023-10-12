const i = (n, r) => new Proxy(n, {
  get(t, e) {
    return e in t ? t[e] : r;
  }
}), c = {
  breakOnFirst: !0
  // or continue all
};
function u(n) {
  const r = /* @__PURE__ */ new Set(), t = Object.assign({}, c, n);
  return {
    subscribe(e) {
      return r.add(e), () => {
        r.delete(e);
      };
    },
    async publish(e) {
      let s;
      for (const a of Array.from(r)) {
        const o = await a(e);
        if (o !== void 0 && (s = o, t.breakOnFirst))
          break;
      }
      return s;
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

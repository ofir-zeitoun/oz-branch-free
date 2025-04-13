const o = (r, t) => new Proxy(r, {
  get(e, n) {
    return n in e ? e[n] : t;
  }
});
export {
  o as objectMapper
};

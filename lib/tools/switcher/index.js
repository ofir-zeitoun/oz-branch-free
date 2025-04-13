function c(n) {
  return typeof n == "function";
}
const d = () => !0, s = () => {
  const n = /* @__PURE__ */ new Set();
  let o;
  const r = {
    when: (t) => (o = t, r),
    then: (t) => (n.add([o, t]), r),
    default: (t) => (n.add([d, t]), r),
    execute: (t) => {
      for (const [e, u] of Array.from(n))
        if (e === t || c(e) && e(t))
          return c(u) ? u(t) : u;
    }
  };
  return r;
};
export {
  s as buildSwitch
};

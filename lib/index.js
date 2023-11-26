const f = (t, n) => new Proxy(t, {
  get(r, e) {
    return e in r ? r[e] : n;
  }
}), a = (t) => t ? () => {
  let n = !1;
  return {
    stop() {
      n = !0;
    },
    get isStopped() {
      return n;
    }
  };
} : () => {
  let n = !1;
  return {
    next() {
      n = !0;
    },
    get isContinued() {
      return n;
    }
  };
};
function d(t) {
  return "next" in t;
}
function b(t) {
  const n = (t == null ? void 0 : t.breakOnFirst) === !1, r = /* @__PURE__ */ new Set();
  return {
    subscribe(e, u) {
      const c = [e, u];
      return r.add(c), () => {
        r.delete(c);
      };
    },
    clearAll() {
      r.clear();
    },
    async handle(e) {
      let u;
      for (const [c, s] of Array.from(r)) {
        if (!await c(e))
          continue;
        const i = a(n)();
        if (u = await s(e, i), d(i)) {
          if (i.isContinued)
            continue;
          break;
        } else if (i.isStopped)
          break;
      }
      return u;
    }
  };
}
function o(t) {
  return typeof t == "function";
}
const l = () => !0, h = () => {
  const t = /* @__PURE__ */ new Set();
  let n;
  const r = {
    when: (e) => (n = e, r),
    then: (e) => (t.add([n, e]), r),
    default: (e) => (t.add([l, e]), r),
    execute: (e) => {
      for (const [u, c] of Array.from(t))
        if (u === e || o(u) && u(e))
          return o(c) ? c(e) : c;
    }
  };
  return r;
};
export {
  h as buildSwitch,
  b as createMessageHandler,
  f as objectMapper
};

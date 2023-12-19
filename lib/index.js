const h = (e, n) => new Proxy(e, {
  get(r, t) {
    return t in r ? r[t] : n;
  }
}), a = (e) => e ? () => {
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
function l(e) {
  return "next" in e;
}
function w(e) {
  const n = (e == null ? void 0 : e.breakOnFirst) === !1, r = /* @__PURE__ */ new Set();
  return {
    subscribe(t, u) {
      const c = [t, u];
      return r.add(c), () => {
        r.delete(c);
      };
    },
    clearAll() {
      r.clear();
    },
    async handle(t) {
      let u;
      for (const [c, s] of Array.from(r)) {
        if (!await c(t))
          continue;
        const i = a(n)();
        if (u = await s(t, i), l(i)) {
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
const d = (e) => e ? () => {
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
function f(e) {
  return "next" in e;
}
function A(e) {
  const n = (e == null ? void 0 : e.breakOnFirst) === !1, r = /* @__PURE__ */ new Set();
  return {
    subscribe(t, u) {
      const c = [t, u];
      return r.add(c), () => {
        r.delete(c);
      };
    },
    clearAll() {
      r.clear();
    },
    handle(t) {
      let u;
      for (const [c, s] of Array.from(r)) {
        if (!c(t))
          continue;
        const i = d(n)();
        if (u = s(t, i), f(i)) {
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
function o(e) {
  return typeof e == "function";
}
const b = () => !0, y = () => {
  const e = /* @__PURE__ */ new Set();
  let n;
  const r = {
    when: (t) => (n = t, r),
    then: (t) => (e.add([n, t]), r),
    default: (t) => (e.add([b, t]), r),
    execute: (t) => {
      for (const [u, c] of Array.from(e))
        if (u === t || o(u) && u(t))
          return o(c) ? c(t) : c;
    }
  };
  return r;
};
export {
  y as buildSwitch,
  w as createMessageHandler,
  A as createMessageHandlerSync,
  h as objectMapper
};

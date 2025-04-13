const o = (e) => e ? () => {
  let t = !1;
  return {
    stop() {
      t = !0;
    },
    get isStopped() {
      return t;
    }
  };
} : () => {
  let t = !1;
  return {
    next() {
      t = !0;
    },
    get isContinued() {
      return t;
    }
  };
};
function l(e) {
  return "next" in e;
}
function a(e) {
  const t = (e == null ? void 0 : e.breakOnFirst) === !1, n = /* @__PURE__ */ new Set();
  return {
    subscribe(r, i) {
      const c = [r, i];
      return n.add(c), () => {
        n.delete(c);
      };
    },
    clearAll() {
      n.clear();
    },
    handle(r) {
      let i;
      for (const [c, u] of Array.from(n)) {
        if (!c(r))
          continue;
        const s = o(t)();
        if (i = u(r, s), l(s)) {
          if (s.isContinued)
            continue;
          break;
        } else if (s.isStopped)
          break;
      }
      return i;
    }
  };
}
export {
  a as createMessageHandlerSync
};

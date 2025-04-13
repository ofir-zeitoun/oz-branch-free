const u = (e) => e ? () => {
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
function o(e) {
  return "next" in e;
}
function l(e) {
  const t = (e == null ? void 0 : e.breakOnFirst) === !1, n = /* @__PURE__ */ new Set();
  return {
    subscribe(r, i) {
      const s = [r, i];
      return n.add(s), () => {
        n.delete(s);
      };
    },
    clearAll() {
      n.clear();
    },
    async handle(r) {
      let i;
      for (const [s, c] of Array.from(n)) {
        if (!await s(r))
          continue;
        const a = u(t)();
        if (i = await c(r, a), o(a)) {
          if (a.isContinued)
            continue;
          break;
        } else if (a.isStopped)
          break;
      }
      return i;
    }
  };
}
export {
  l as createMessageHandler
};

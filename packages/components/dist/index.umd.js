(function (i, o) {
  typeof exports == "object" && typeof module < "u"
    ? o(exports, require("vue"), require("element-plus"))
    : typeof define == "function" && define.amd
      ? define(["exports", "vue", "element-plus"], o)
      : ((i = typeof globalThis < "u" ? globalThis : i || self),
        o((i["zk-ui"] = {}), i.Vue, i.ElementPlus));
})(this, function (i, o, u) {
  "use strict";
  const d = {
      __name: "button",
      emits: ["click"],
      setup(t, { emit: e }) {
        const r = t,
          n = e,
          s = (a) => {
            n("click", a);
          };
        return (a, l) => (
          o.openBlock(),
          o.createBlock(
            o.unref(u.ElButton),
            o.mergeProps(
              { type: r.type, size: r.size, disabled: r.disabled, onClick: s },
              a.$attrs,
            ),
            { default: o.withCtx(() => [o.renderSlot(a.$slots, "default")]), _: 3 },
            16,
            ["type", "size", "disabled"],
          )
        );
      },
    },
    p = {
      __name: "tag",
      emits: ["close", "click"],
      setup(t, { emit: e }) {
        const r = t,
          n = e,
          s = (l) => {
            n("close", l);
          },
          a = (l) => {
            n("click", l);
          };
        return (l, A) => (
          o.openBlock(),
          o.createBlock(
            o.unref(u.ElTag),
            o.mergeProps(
              {
                type: r.type,
                size: r.size,
                closable: r.closable,
                "disable-transitions": r.disableTransitions,
                hit: r.hit,
                color: r.color,
                effect: r.effect,
                onClose: s,
                onClick: a,
              },
              l.$attrs,
            ),
            { default: o.withCtx(() => [o.renderSlot(l.$slots, "default")]), _: 3 },
            16,
            ["type", "size", "closable", "disable-transitions", "hit", "color", "effect"],
          )
        );
      },
    },
    y = "zk-ui-theme",
    f = "zk-ui-primary";
  function E(t, e, r) {
    return Math.min(r, Math.max(e, t));
  }
  function k(t) {
    const e = t.replace("#", ""),
      r = parseInt(
        e.length === 3
          ? e
              .split("")
              .map((n) => n + n)
              .join("")
          : e,
        16,
      );
    return [(r >> 16) & 255, (r >> 8) & 255, r & 255];
  }
  function _(t, e, r) {
    const n = (s) => E(Math.round(s), 0, 255).toString(16).padStart(2, "0");
    return `#${n(t)}${n(e)}${n(r)}`;
  }
  function P(t, e, r) {
    return [t[0] + (e[0] - t[0]) * r, t[1] + (e[1] - t[1]) * r, t[2] + (e[2] - t[2]) * r];
  }
  function c(t, e) {
    const r = k(t);
    return _(...P(r, [255, 255, 255], e));
  }
  function L(t, e) {
    const r = k(t);
    return _(...P(r, [0, 0, 0], e));
  }
  function w(t) {
    return {
      primary: t,
      primaryLight3: c(t, 0.12),
      primaryLight5: c(t, 0.22),
      primaryLight7: c(t, 0.34),
      primaryLight8: c(t, 0.45),
      primaryLight9: c(t, 0.9),
      primaryDark2: L(t, 0.12),
    };
  }
  function z(t) {
    const e = document.documentElement;
    (e.style.setProperty("--el-color-primary", t.primary),
      e.style.setProperty("--el-color-primary-light-3", t.primaryLight3),
      e.style.setProperty("--el-color-primary-light-5", t.primaryLight5),
      e.style.setProperty("--el-color-primary-light-7", t.primaryLight7),
      e.style.setProperty("--el-color-primary-light-8", t.primaryLight8),
      e.style.setProperty("--el-color-primary-light-9", t.primaryLight9),
      e.style.setProperty("--el-color-primary-dark-2", t.primaryDark2));
  }
  function g(t) {
    if (!t) return;
    const e = t.startsWith("#") ? t : `#${t}`,
      r = w(e);
    z(r);
    try {
      localStorage.setItem(f, e);
    } catch {}
  }
  function m(t) {
    const e = document.documentElement;
    t === "dark" ? e.setAttribute("data-theme", "dark") : e.removeAttribute("data-theme");
    try {
      localStorage.setItem(y, t);
    } catch {}
  }
  function T() {
    const e =
      (localStorage.getItem(y) ||
        (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light")) ===
      "dark"
        ? "light"
        : "dark";
    return (m(e), e);
  }
  function h() {
    try {
      const t = localStorage.getItem(y),
        e = localStorage.getItem(f);
      (t && m(t), e && g(e));
    } catch {}
  }
  function S() {
    return (
      localStorage.getItem(f) ||
      getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim() ||
      "#409EFF"
    );
  }
  typeof window < "u" &&
    window.addEventListener("DOMContentLoaded", () => {
      h();
    });
  const I = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: {
            setTheme: m,
            toggleTheme: T,
            setPrimaryColor: g,
            initTheme: h,
            getPrimaryColor: S,
          },
          getPrimaryColor: S,
          initTheme: h,
          setPrimaryColor: g,
          setTheme: m,
          toggleTheme: T,
        },
        Symbol.toStringTag,
        { value: "Module" },
      ),
    ),
    $ = [d, p],
    b = function (t) {
      (t.use(u),
        $.forEach((e) => {
          t.component(e.name, e);
        }));
    };
  typeof window < "u" && window.Vue && b(window.Vue);
  const M = { install: b, ZkButton: d, ZkTag: p },
    C = (t) => (
      (t.install = (e) => {
        e.component(t.name || t.__name, t);
      }),
      t
    ),
    B = C(d),
    Z = C(p);
  ((i.ZkButton = B),
    (i.ZkTag = Z),
    (i.default = M),
    (i.themeUtils = I),
    Object.defineProperties(i, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: "Module" },
    }));
});

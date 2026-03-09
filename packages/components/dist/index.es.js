import {
  createBlock as f,
  openBlock as g,
  unref as h,
  mergeProps as k,
  withCtx as _,
  renderSlot as P,
} from "vue";
import z, { ElButton as I, ElTag as $ } from "element-plus";
const s = {
    __name: "button",
    emits: ["click"],
    setup(t, { emit: e }) {
      const r = t,
        o = e,
        a = (i) => {
          o("click", i);
        };
      return (i, n) => (
        g(),
        f(
          h(I),
          k(
            {
              type: r.type,
              size: r.size,
              disabled: r.disabled,
              onClick: a,
            },
            i.$attrs,
          ),
          {
            default: _(() => [P(i.$slots, "default")]),
            _: 3,
          },
          16,
          ["type", "size", "disabled"],
        )
      );
    },
  },
  m = {
    __name: "tag",
    emits: ["close", "click"],
    setup(t, { emit: e }) {
      const r = t,
        o = e,
        a = (n) => {
          o("close", n);
        },
        i = (n) => {
          o("click", n);
        };
      return (n, j) => (
        g(),
        f(
          h($),
          k(
            {
              type: r.type,
              size: r.size,
              closable: r.closable,
              "disable-transitions": r.disableTransitions,
              hit: r.hit,
              color: r.color,
              effect: r.effect,
              onClose: a,
              onClick: i,
            },
            n.$attrs,
          ),
          {
            default: _(() => [P(n.$slots, "default")]),
            _: 3,
          },
          16,
          ["type", "size", "closable", "disable-transitions", "hit", "color", "effect"],
        )
      );
    },
  },
  u = "zk-ui-theme",
  y = "zk-ui-primary";
function M(t, e, r) {
  return Math.min(r, Math.max(e, t));
}
function b(t) {
  const e = t.replace("#", ""),
    r = parseInt(
      e.length === 3
        ? e
            .split("")
            .map((o) => o + o)
            .join("")
        : e,
      // 如果已经是6位格式，直接使用
      16,
      // 指定为16进制解析
    );
  return [(r >> 16) & 255, (r >> 8) & 255, r & 255];
}
function E(t, e, r) {
  const o = (a) => M(Math.round(a), 0, 255).toString(16).padStart(2, "0");
  return `#${o(t)}${o(e)}${o(r)}`;
}
function S(t, e, r) {
  return [t[0] + (e[0] - t[0]) * r, t[1] + (e[1] - t[1]) * r, t[2] + (e[2] - t[2]) * r];
}
function l(t, e) {
  const r = b(t);
  return E(...S(r, [255, 255, 255], e));
}
function v(t, e) {
  const r = b(t);
  return E(...S(r, [0, 0, 0], e));
}
function B(t) {
  return {
    primary: t,
    primaryLight3: l(t, 0.12),
    primaryLight5: l(t, 0.22),
    primaryLight7: l(t, 0.34),
    primaryLight8: l(t, 0.45),
    primaryLight9: l(t, 0.9),
    primaryDark2: v(t, 0.12),
  };
}
function Z(t) {
  const e = document.documentElement;
  (e.style.setProperty("--el-color-primary", t.primary),
    e.style.setProperty("--el-color-primary-light-3", t.primaryLight3),
    e.style.setProperty("--el-color-primary-light-5", t.primaryLight5),
    e.style.setProperty("--el-color-primary-light-7", t.primaryLight7),
    e.style.setProperty("--el-color-primary-light-8", t.primaryLight8),
    e.style.setProperty("--el-color-primary-light-9", t.primaryLight9),
    e.style.setProperty("--el-color-primary-dark-2", t.primaryDark2));
}
function p(t) {
  if (!t) return;
  const e = t.startsWith("#") ? t : `#${t}`,
    r = B(e);
  Z(r);
  try {
    localStorage.setItem(y, e);
  } catch {}
}
function c(t) {
  const e = document.documentElement;
  t === "dark" ? e.setAttribute("data-theme", "dark") : e.removeAttribute("data-theme");
  try {
    localStorage.setItem(u, t);
  } catch {}
}
function T() {
  const e =
    (localStorage.getItem(u) ||
      (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light")) ===
    "dark"
      ? "light"
      : "dark";
  return (c(e), e);
}
function d() {
  try {
    const t = localStorage.getItem(u),
      e = localStorage.getItem(y);
    (t && c(t), e && p(e));
  } catch {}
}
function L() {
  return (
    localStorage.getItem(y) ||
    getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim() ||
    "#409EFF"
  );
}
typeof window < "u" &&
  window.addEventListener("DOMContentLoaded", () => {
    d();
  });
const A = {
    setTheme: c,
    toggleTheme: T,
    setPrimaryColor: p,
    initTheme: d,
    getPrimaryColor: L,
  },
  O = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        default: A,
        getPrimaryColor: L,
        initTheme: d,
        setPrimaryColor: p,
        setTheme: c,
        toggleTheme: T,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  R = [s, m],
  C = function (t) {
    (t.use(z),
      R.forEach((e) => {
        t.component(e.name, e);
      }));
  };
typeof window < "u" && window.Vue && C(window.Vue);
const V = {
    install: C,
    ZkButton: s,
    ZkTag: m,
  },
  w = (t) => (
    (t.install = (e) => {
      e.component(t.name || t.__name, t);
    }),
    t
  ),
  Y = w(s),
  F = w(m);
export { Y as ZkButton, F as ZkTag, V as default, O as themeUtils };

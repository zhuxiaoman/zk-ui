import { createBlock as y, openBlock as d, unref as f, mergeProps as g, withCtx as h, renderSlot as k } from "vue";
import { ElButton as w, ElTag as z } from "element-plus";
const _ = (t) => (t.install = (e) => {
  e.component(t.name || t.__name, t);
}, t), P = {
  __name: "button",
  emits: ["click"],
  setup(t, { emit: e }) {
    const r = t, o = e, a = (i) => {
      o("click", i);
    };
    return (i, n) => (d(), y(f(w), g({
      type: r.type,
      size: r.size,
      disabled: r.disabled,
      onClick: a
    }, i.$attrs), {
      default: h(() => [
        k(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "size", "disabled"]));
  }
}, O = _(P), b = {
  __name: "tag",
  emits: ["close", "click"],
  setup(t, { emit: e }) {
    const r = t, o = e, a = (n) => {
      o("close", n);
    }, i = (n) => {
      o("click", n);
    };
    return (n, j) => (d(), y(f(z), g({
      type: r.type,
      size: r.size,
      closable: r.closable,
      "disable-transitions": r.disableTransitions,
      hit: r.hit,
      color: r.color,
      effect: r.effect,
      onClose: a,
      onClick: i
    }, n.$attrs), {
      default: h(() => [
        k(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "size", "closable", "disable-transitions", "hit", "color", "effect"]));
  }
}, V = _(b), s = "zk-ui-theme", m = "zk-ui-primary";
function $(t, e, r) {
  return Math.min(r, Math.max(e, t));
}
function E(t) {
  const e = t.replace("#", ""), r = parseInt(e.length === 3 ? e.split("").map((o) => o + o).join("") : e, 16);
  return [r >> 16 & 255, r >> 8 & 255, r & 255];
}
function S(t, e, r) {
  const o = (a) => $(Math.round(a), 0, 255).toString(16).padStart(2, "0");
  return `#${o(t)}${o(e)}${o(r)}`;
}
function L(t, e, r) {
  return [
    t[0] + (e[0] - t[0]) * r,
    t[1] + (e[1] - t[1]) * r,
    t[2] + (e[2] - t[2]) * r
  ];
}
function l(t, e) {
  const r = E(t);
  return S(...L(r, [255, 255, 255], e));
}
function I(t, e) {
  const r = E(t);
  return S(...L(r, [0, 0, 0], e));
}
function M(t) {
  return {
    primary: t,
    primaryLight3: l(t, 0.12),
    primaryLight5: l(t, 0.22),
    primaryLight7: l(t, 0.34),
    primaryLight8: l(t, 0.45),
    primaryLight9: l(t, 0.9),
    primaryDark2: I(t, 0.12)
  };
}
function v(t) {
  const e = document.documentElement;
  e.style.setProperty("--el-color-primary", t.primary), e.style.setProperty("--el-color-primary-light-3", t.primaryLight3), e.style.setProperty("--el-color-primary-light-5", t.primaryLight5), e.style.setProperty("--el-color-primary-light-7", t.primaryLight7), e.style.setProperty("--el-color-primary-light-8", t.primaryLight8), e.style.setProperty("--el-color-primary-light-9", t.primaryLight9), e.style.setProperty("--el-color-primary-dark-2", t.primaryDark2);
}
function u(t) {
  if (!t) return;
  const e = t.startsWith("#") ? t : `#${t}`, r = M(e);
  v(r);
  try {
    localStorage.setItem(m, e);
  } catch {
  }
}
function c(t) {
  const e = document.documentElement;
  t === "dark" ? e.setAttribute("data-theme", "dark") : e.removeAttribute("data-theme");
  try {
    localStorage.setItem(s, t);
  } catch {
  }
}
function T() {
  const e = (localStorage.getItem(s) || (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light")) === "dark" ? "light" : "dark";
  return c(e), e;
}
function p() {
  try {
    const t = localStorage.getItem(s), e = localStorage.getItem(m);
    t && c(t), e && u(e);
  } catch {
  }
}
function C() {
  return localStorage.getItem(m) || getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim() || "#409EFF";
}
typeof window < "u" && window.addEventListener("DOMContentLoaded", () => {
  p();
});
const A = {
  setTheme: c,
  toggleTheme: T,
  setPrimaryColor: u,
  initTheme: p,
  getPrimaryColor: C
}, Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: A,
  getPrimaryColor: C,
  initTheme: p,
  setPrimaryColor: u,
  setTheme: c,
  toggleTheme: T
}, Symbol.toStringTag, { value: "Module" })), B = [
  P,
  b
], R = function(t) {
  B.forEach((e) => {
    t.component(e.name, e);
  });
};
typeof window < "u" && window.Vue && R(window.Vue);
export {
  O as ZkButton,
  V as ZkTag,
  Y as themeUtils
};

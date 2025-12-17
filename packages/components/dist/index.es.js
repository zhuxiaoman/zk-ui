import { createBlock as n, openBlock as a, unref as r, mergeProps as d, withCtx as f, renderSlot as u } from "vue";
import { ElButton as p, ElTag as k } from "element-plus";
const m = (e) => (e.install = (i) => {
  i.component(e.name || e.__name, e);
}, e), _ = {
  __name: "button",
  emits: ["click"],
  setup(e, { emit: i }) {
    const t = e, o = i, c = (l) => {
      o("click", l);
    };
    return (l, s) => (a(), n(r(p), d({
      type: t.type,
      size: t.size,
      disabled: t.disabled,
      onClick: c
    }, l.$attrs), {
      default: f(() => [
        u(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "size", "disabled"]));
  }
}, z = m(_), b = {
  __name: "tag",
  emits: ["close", "click"],
  setup(e, { emit: i }) {
    const t = e, o = i, c = (s) => {
      o("close", s);
    }, l = (s) => {
      o("click", s);
    };
    return (s, h) => (a(), n(r(k), d({
      type: t.type,
      size: t.size,
      closable: t.closable,
      "disable-transitions": t.disableTransitions,
      hit: t.hit,
      color: t.color,
      effect: t.effect,
      onClose: c,
      onClick: l
    }, s.$attrs), {
      default: f(() => [
        u(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "size", "closable", "disable-transitions", "hit", "color", "effect"]));
  }
}, $ = m(b);
export {
  z as ZkButton,
  $ as ZkTag
};

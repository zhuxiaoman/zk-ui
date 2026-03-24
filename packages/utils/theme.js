// Theme utilities: toggle light/dark and set custom primary color
const THEME_KEY = "zk-ui-theme";
const PRIMARY_KEY = "zk-ui-primary";

/**
 * 将数值限制在指定范围内
 * @param {number} v - 要限制的数值
 * @param {number} a - 范围最小值
 * @param {number} b - 范围最大值
 * @returns {number} 限制后的数值，如果 v 小于 a 则返回 a，如果 v 大于 b 则返回 b，否则返回 v
 */
function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}

/**
 * 将十六进制颜色值转换为RGB数组
 * @param {string} hex - 十六进制颜色值，可以是3位或6位格式，如#fff或#ffffff
 * @returns {number[]} 返回包含RGB三个数值的数组，每个数值范围0-255
 */
function hexToRgb(hex) {
  // 去掉十六进制值中的#号
  const h = hex.replace("#", "");
  // 将3位十六进制值转换为6位格式，然后解析为整数
  const bigint = parseInt(
    h.length === 3
      ? h // 如果是3位格式
          .split("") // 将字符串拆分为字符数组
          .map((c) => c + c) // 每个字符重复一次，变成6位
          .join("") // 重新组合成字符串
      : h, // 如果已经是6位格式，直接使用
    16, // 指定为16进制解析
  );
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b) {
  const toHex = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mix(rgb1, rgb2, weight) {
  return [
    rgb1[0] + (rgb2[0] - rgb1[0]) * weight,
    rgb1[1] + (rgb2[1] - rgb1[1]) * weight,
    rgb1[2] + (rgb2[2] - rgb1[2]) * weight,
  ];
}

function lighten(hex, percent) {
  const rgb = hexToRgb(hex);
  return rgbToHex(...mix(rgb, [255, 255, 255], percent));
}

function darken(hex, percent) {
  const rgb = hexToRgb(hex);
  return rgbToHex(...mix(rgb, [0, 0, 0], percent));
}

/**
 * 根据基础颜色生成不同深浅的色调变体
 * @param {string} hex - 基础十六进制颜色值
 * @returns {Object} 包含不同深浅色调的对象
 */
function generatePrimaryShades(hex) {
  return {
    primary: hex,
    primaryLight3: lighten(hex, 0.12),
    primaryLight5: lighten(hex, 0.22),
    primaryLight7: lighten(hex, 0.34),
    primaryLight8: lighten(hex, 0.45),
    primaryLight9: lighten(hex, 0.9),
    primaryDark2: darken(hex, 0.12),
  };
}

function applyPrimaryToRoot(shades) {
  const root = document.documentElement;
  root.style.setProperty("--el-color-primary", shades.primary);
  root.style.setProperty("--el-color-primary-light-3", shades.primaryLight3);
  root.style.setProperty("--el-color-primary-light-5", shades.primaryLight5);
  root.style.setProperty("--el-color-primary-light-7", shades.primaryLight7);
  root.style.setProperty("--el-color-primary-light-8", shades.primaryLight8);
  root.style.setProperty("--el-color-primary-light-9", shades.primaryLight9);
  root.style.setProperty("--el-color-primary-dark-2", shades.primaryDark2);
}

/**
 * 设置主题主色
 * @param {string} hex - 十六进制颜色值，可以带#号也可以不带
 */
export function setPrimaryColor(hex) {
  // 如果没有提供颜色值，则直接返回
  if (!hex) return;
  // 确保颜色值以#号开头，如果不是则添加
  const normalized = hex.startsWith("#") ? hex : `#${hex}`;
  // 生成主色的不同深浅色阶
  const shades = generatePrimaryShades(normalized);
  // 将生成的色阶应用到根元素
  applyPrimaryToRoot(shades);
  try {
    localStorage.setItem(PRIMARY_KEY, normalized);
  } catch (e) {}
}

export function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

export function toggleTheme() {
  const cur =
    localStorage.getItem(THEME_KEY) ||
    (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  const next = cur === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const savedPrimary = localStorage.getItem(PRIMARY_KEY);
    if (savedTheme) setTheme(savedTheme);
    if (savedPrimary) setPrimaryColor(savedPrimary);
  } catch (e) {}
}

export function getPrimaryColor() {
  return (
    localStorage.getItem(PRIMARY_KEY) ||
    getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim() ||
    "#409EFF"
  );
}

// auto-init in browser environments
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
  });
}

export default {
  setTheme,
  toggleTheme,
  setPrimaryColor,
  initTheme,
  getPrimaryColor,
};

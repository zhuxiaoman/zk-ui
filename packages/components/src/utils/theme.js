// Theme utilities: toggle light/dark and set custom primary color
const THEME_KEY = "zk-ui-theme";
const PRIMARY_KEY = "zk-ui-primary";

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b) {
  const toHex = (n) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
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

export function setPrimaryColor(hex) {
  if (!hex) return;
  const normalized = hex.startsWith("#") ? hex : `#${hex}`;
  const shades = generatePrimaryShades(normalized);
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
    (document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light");
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
    getComputedStyle(document.documentElement)
      .getPropertyValue("--el-color-primary")
      .trim() ||
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

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function generateComponent(name, options) {
  const componentFileName = name;
  const componentName = toPascalCase(name);
  const componentDir = path.join(process.cwd(), "..", "..", "packages", "components", name);

  // Check if component already exists
  if (await fs.pathExists(componentDir)) {
    throw new Error(`Component ${name} already exists`);
  }

  // Create component directory
  await fs.ensureDir(componentDir);

  const styleDir = path.join(componentDir, "style");
  await fs.ensureDir(styleDir);

  const srcDir = path.join(componentDir, "src");
  await fs.ensureDir(srcDir);

  // Generate component files
  const templates = {
    "index.js": getIndexTemplate(componentName, name),
    // "style.scss": getStyleTemplate(componentFileName),
  };

  for (const [fileName, content] of Object.entries(templates)) {
    await fs.writeFile(path.join(componentDir, fileName), content);
  }

  const componentContent = getVueTemplate(componentName, componentFileName);
  await fs.writeFile(path.join(srcDir, `${componentFileName}.vue`), componentContent);

  const styleContent = getStyleTemplate(componentFileName);
  await fs.writeFile(path.join(styleDir, `${componentFileName}.scss`), styleContent);

  // Update main index.js
  await updateMainIndex(name, componentName);
}

function toPascalCase(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function getVueTemplate(componentName, componentFileName) {
  return `<template>
  <div class="zk-${componentFileName.toLowerCase()}">
    <slot></slot>
  </div>
</template>

<script setup name="Zk${componentName}">
const props = defineProps({
});

const emit = defineEmits([
]);
</script>

<style lang="scss" scoped>
@import '../style/${componentFileName}.scss';
</style>`;
}

function getIndexTemplate(componentName, name) {
  return `import { withInstall } from '../../utils';
import ${componentName} from './src/${name}.vue';

export const Zk${componentName} = withInstall(${componentName});
export default Zk${componentName};

export * from './src/${name}.vue';`;
}

function getStyleTemplate(componentName) {
  return `.zk-${componentName.toLowerCase()} {
}`;
}

async function updateMainIndex(name, componentName) {
  const mainIndexPath = path.join(process.cwd(), "..", "..", "packages", "components", "index.js");
  let content = await fs.readFile(mainIndexPath, "utf-8");

  // Add import
  const importStatement = `export * from "./${name}";`;
  if (!content.includes(importStatement)) {
    content = content.replace(/(export \* from "\.\/tag";)/, `$1\n${importStatement}`);
  }

  // Add to components array in src/index.js
  const srcIndexPath = path.join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "components",
    "src",
    "index.js",
  );
  let srcContent = await fs.readFile(srcIndexPath, "utf-8");

  const componentImport = `import Zk${componentName} from "../${name}/index.js";`;
  if (!srcContent.includes(componentImport)) {
    srcContent = srcContent.replace(
      /(import ZkTag from "\.\.\/tag\/index\.js";)/,
      `$1\n${componentImport}`,
    );
  }

  const componentAdd = `Zk${componentName},`;
  if (!srcContent.includes(componentAdd)) {
    srcContent = srcContent.replace(/(ZkTag,)/, `$1\n  ${componentAdd}`);
  }

  await fs.writeFile(srcIndexPath, srcContent);
  await fs.writeFile(mainIndexPath, content);
}

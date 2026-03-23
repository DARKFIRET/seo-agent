import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, "../", p);

// The exact paths we want to pre-render
const routesToPrerender = [
  "/",
  "/services/seo",
  "/services/yandex-direct",
  "/cases",
  "/about",
  "/contacts"
];

async function buildSSG() {
  try {
    // Read the built template
    const templatePath = toAbsolute("dist/spa/index.html");
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found at ${templatePath}. Did you run build:client?`);
    }
    const template = fs.readFileSync(templatePath, "utf-8");

    // Dynamically import the SSR bundle
    const renderModulePath = "file://" + toAbsolute("dist/server/ssr/entry-server.js");
    let render;
    try {
      const mod = await import(renderModulePath);
      render = mod.render;
    } catch (e) {
      console.log("Trying to import .mjs extension...");
      const mod = await import(renderModulePath.replace(".js", ".mjs"));
      render = mod.render;
    }

    if (!render) {
      throw new Error("Failed to load SSR render function.");
    }

    // Iterate over all routes and pre-render
    for (const route of routesToPrerender) {
      const { html } = render(route);
      
      const appHtml = template.replace(`<!--app-html-->`, html);

      const filePath = route === "/" 
        ? toAbsolute("dist/spa/index.html") 
        : toAbsolute(`dist/spa${route}/index.html`);

      // Ensure directory exists
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, appHtml);
      console.log(`[SSG] pre-rendered ${route} -> ${filePath}`);
    }

    console.log("[SSG] Prerendering complete!");
  } catch (error) {
    console.error("[SSG] Error during prerendering:", error);
    process.exit(1);
  }
}

buildSSG();

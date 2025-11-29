import fs from "fs";
import path from "path";
import { generateSitemap } from "../src/lib/sitemap.js";

async function run() {
  try {
    const sitemap = await generateSitemap();
    const outPath = path.join(process.cwd(), "public", "sitemap.xml");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, sitemap, "utf8");
    console.log(`✅ sitemap.xml written to ${outPath}`);
  } catch (err) {
    console.error("Failed to generate sitemap:", err);
    process.exitCode = 1;
  }
}

run();

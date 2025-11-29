import { client } from "../../prismicio.js"; // use the same Prismic client (explicit .js for Node ESM)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://genrobotics.com";

// Log the SITE_URL used during build to help debugging when running the generator
console.log("Using SITE_URL for sitemap generation:", SITE_URL);

/**
 * Fetch all Prismic UIDs and last publication dates for a given custom type
 * @param {string} type - Prismic custom type (e.g., 'blogs', 'case_studies', 'articles')
 * @returns {Promise<{ uid: string, lastmod: string }[]>}
 */
async function fetchDocsByType(type) {
  const documents = await client.getAllByType(type, {
    fetch: ["uid", "last_publication_date"],
  });

  return documents.map((doc) => ({
    uid: doc.uid,
    lastmod: doc.last_publication_date
      ? new Date(doc.last_publication_date).toISOString()
      : new Date().toISOString(),
  }));
}

/**
 * Generate sitemap XML content
 * @returns {Promise<string>}
 */
export async function generateSitemap() {
  // 1️⃣ Fetch all slugs from Prismic
  const [blogDocs, caseStudyDocs] = await Promise.all([
    fetchDocsByType("blogs"),
    fetchDocsByType("case_studies"),
  ]);

  // 2️⃣ Define static pages
  const staticPages = [
    { slug: "", lastmod: new Date().toISOString() },
    { slug: "about", lastmod: new Date().toISOString() },
    { slug: "contact", lastmod: new Date().toISOString() },
    { slug: "careers", lastmod: new Date().toISOString() },
    { slug: "news", lastmod: new Date().toISOString() },
  ];

  // 3️⃣ Build full URLs without double slashes, assign priority 1 for homepage
  const urls = [
    ...staticPages.map((p) => ({
      loc: `${SITE_URL}${p.slug ? `/${p.slug}` : ""}`,
      lastmod: p.lastmod,
      priority: p.slug === "" ? 1.0 : 0.8, // 👈 homepage gets priority 1
    })),
    // ...blogDocs.map((doc) => ({
    //   loc: `${SITE_URL}/blogs/${doc.uid}`,
    //   lastmod: doc.lastmod,
    //   priority: 0.8,
    // })),
    // ...caseStudyDocs.map((doc) => ({
    //   loc: `${SITE_URL}/case-study/${doc.uid}`,
    //   lastmod: doc.lastmod,
    //   priority: 0.8,
    // })),
  ];

  // 4️⃣ Generate clean XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls
  .map(
    (u) => `<url>
  <loc>${u.loc}</loc>
  <lastmod>${u.lastmod}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>${u.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

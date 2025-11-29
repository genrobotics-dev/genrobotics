// Sitemap route disabled for static export.
// A static sitemap is generated during build at `public/sitemap.xml` by
// `scripts/generate-sitemap.mjs` (run automatically via the `postbuild` script).

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  return new Response(null, { status: 410 }); // Gone
}

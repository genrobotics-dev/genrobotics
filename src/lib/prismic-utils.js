import { client } from "../../prismicio";

export async function fetchSlugsByType(type) {
  try {
    const docs = await client.getAllByType(type, {
      orderings: { field: "document.first_publication_date", direction: "desc" },
    });
    return docs.map((doc) => doc.uid).filter(Boolean);
  } catch (error) {
    console.error(`Error fetching slugs for type "${type}":`, error);
    return [];
  }
}
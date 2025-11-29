import BlogsList from "./BlogsList";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";

// Default items per page
const ITEMS_PER_PAGE = 6;

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\u00A0/g, ' ');
};

export default async function BlogsPage() {
  const currentPage = 1;

  // Fetch blogs with pagination from Prismic
  const response = await client.get({
    predicates: [prismic.predicate.at("document.type", "blogs")],
    orderings: [{ field: "document.last_publication_date", direction: "desc" }],
    pageSize: ITEMS_PER_PAGE,
    page: currentPage,
  });

  const blogs = response.results.map((b) => ({
    id: b.id,
    uid: b.uid,
    title: cleanText(b.data.title[0]?.text || "Untitled"),
    summary: cleanText(b.data.summary || ""),
    image: b.data.image?.url,
    last_publication_date: b.last_publication_date,
  }));

  console.log("blogs", blogs);

  const totalPages = response.total_pages;

  return <BlogsList initialBlogs={blogs} initialTotalPages={totalPages} />;
}

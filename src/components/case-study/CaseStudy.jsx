import CaseStudyList from "./CaseStudyList";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";

const ITEMS_PER_PAGE = 6;

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\u00A0/g, ' ');
};

export default async function CaseStudiesPage() {
  const currentPage = 1;

  // Fetch case studies from Prismic with pagination
  const response = await client.get({
    predicates: [prismic.predicate.at("document.type", "case_studies")],
    orderings: [{ field: "document.last_publication_date", direction: "desc" }],
    pageSize: ITEMS_PER_PAGE,
    page: currentPage,
  });

  const caseStudies = response.results.map((c) => ({
    id: c.id,
    uid: c.uid,
    title: cleanText(c.data.title[0]?.text || "Untitled"),
    summary: cleanText(c.data.summary || ""),
    image: c.data.image?.url,
  }));

  const totalPages = response.total_pages;

  return <CaseStudyList initialCaseStudies={caseStudies} initialTotalPages={totalPages} />;
}

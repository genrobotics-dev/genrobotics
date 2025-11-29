'use server'
import { client } from "../../prismicio";
import * as prismic from "@prismicio/client";

const cleanText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\u00A0/g, ' ');
};

export async function getMoreBlogs(page = 1, pageSize = 6) {
    try {
        const response = await client.get({
            predicates: [prismic.predicate.at("document.type", "blogs")],
            orderings: [{ field: "document.last_publication_date", direction: "desc" }],
            pageSize: pageSize,
            page: page,
        });

        const blogs = response.results.map((b) => ({
            id: b.id,
            uid: b.uid,
            title: cleanText(b.data.title[0]?.text || "Untitled"),
            summary: cleanText(b.data.summary || ""),
            image: b.data.image?.url,
            last_publication_date: b.last_publication_date,
        }));

        return {
            blogs,
            totalPages: response.total_pages,
            page: response.page
        };
    } catch (error) {
        console.error("Error fetching more blogs:", error);
        return { blogs: [], totalPages: 0, page: 0 };
    }
}

export async function getMoreCaseStudies(page = 1, pageSize = 6) {
    try {
        const response = await client.get({
            predicates: [prismic.predicate.at("document.type", "case_studies")],
            orderings: [{ field: "document.last_publication_date", direction: "desc" }],
            pageSize: pageSize,
            page: page,
        });

        const caseStudies = response.results.map((c) => ({
            id: c.id,
            uid: c.uid,
            title: cleanText(c.data.title[0]?.text || "Untitled"),
            summary: cleanText(c.data.summary || ""),
            image: c.data.image?.url,
        }));

        return {
            caseStudies,
            totalPages: response.total_pages,
            page: response.page
        };
    } catch (error) {
        console.error("Error fetching more case studies:", error);
        return { caseStudies: [], totalPages: 0, page: 0 };
    }
}

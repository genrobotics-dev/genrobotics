"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\u00A0/g, ' ');
};

export default function BlogsList({ initialBlogs, initialTotalPages }) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        if (loading || page >= totalPages) return;
        setLoading(true);
        const nextPage = page + 1;

        try {
            const response = await client.get({
                predicates: [prismic.predicate.at("document.type", "blogs")],
                orderings: [{ field: "document.last_publication_date", direction: "desc" }],
                pageSize: 6,
                page: nextPage,
            });

            const newBlogs = response.results.map((b) => ({
                id: b.id,
                uid: b.uid,
                title: cleanText(b.data.title[0]?.text || "Untitled"),
                summary: cleanText(b.data.summary || ""),
                image: b.data.image?.url,
                last_publication_date: b.last_publication_date,
            }));

            if (newBlogs.length > 0) {
                setBlogs((prev) => [...prev, ...newBlogs]);
                setPage(nextPage);
                setTotalPages(response.total_pages);
            }
        } catch (error) {
            console.error("Error fetching more blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            {blogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <h2 className="text-white text-xl mt-6">No posts yet,</h2>
                    <p className="text-gray-400 mt-2">
                        but exciting articles are on the way. Keep an eye out!
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.map((blog, i) => (
                            <div
                                key={`${blog.id}-${i}`}
                                className="flex flex-col justify-between rounded-xl p-6 bg-gradient-to-br from-[#1A1A1A] to-[#000000] border border-[#FCD901]/30 transition duration-300 hover:shadow-lg hover:shadow-[#FCD901]/40 h-full"
                            >
                                <div className="flex flex-col gap-1">
                                    {blog.image && (
                                        <Link
                                            href={`/blogs/${blog.uid}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Go to blog: ${blog.title}`}
                                        >
                                            <Image
                                                src={blog.image}
                                                alt={blog.title}
                                                width={600}
                                                height={400}
                                                className="w-full h-56 object-cover rounded-2xl cursor-pointer"
                                            />
                                        </Link>
                                    )}
                                    <h4 className="font-semibold text-lg sm:text-xl text-white leading-tight mt-4 break-words">
                                        <Link
                                            href={`/blogs/${blog.uid}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-left"
                                            aria-label={`Go to blog: ${blog.title}`}
                                        >
                                            {blog.title}
                                        </Link>
                                    </h4>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 break-words">
                                        {blog.summary.slice(0, 120)}...
                                    </p>
                                </div>

                                <div className="mt-auto w-fit">
                                    <Link
                                        href={`/blogs/${blog.uid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full text-center text-sm font-medium text-black bg-[#FCD901] px-3 py-2 rounded-md hover:bg-[#FFE63D] transition"
                                        aria-label={`Read more about ${blog.title}`}
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {page < totalPages && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="px-6 py-3 bg-[#FCD901] text-black font-semibold rounded-full hover:bg-[#FFE63D] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

import { client } from "../../../../prismicio";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import serializers from "@/components/richtext/PrismicSerializers";

// Simple utility to convert plain URLs in text into clickable anchor elements.
function linkify(text) {
  if (!text) return null;
  // Split on URLs, keep the URLs in the result
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) => {
    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline hover:text-blue-100"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export const dynamic = "force-static";
export const revalidate = 60; // Regenerate data every 1 minute
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  try {
    const blog = await client.getByUID("blogs", resolvedParams.slug);

    if (!blog) {
      return {
        title: "Blog Post Not Found | Genrobotics",
        description: "The requested blog post could not be found.",
        alternates: {
          canonical: `https://genrobotics.com/blogs/${resolvedParams.slug}`,
        },
      };
    }

    const { seo_title, meta_description, primary_keywords, secondary_keywords, voice_search_keywords } = blog.data || {};
    const blogTitle = blog.data?.title?.[0]?.text || 'Untitled';
    const blogSummary = blog.data?.summary || '';

    // Helper to extract keywords from Prismic rich text or string
    const getKeywords = (field) => {
      if (Array.isArray(field)) {
        // Prismic rich text - join all .text blocks
        return field.map(k => typeof k.text === "string" ? k.text : "").join(" ");
      } else if (typeof field === "string") {
        return field;
      }
      return "";
    };

    const primary = getKeywords(primary_keywords);
    const secondary = getKeywords(secondary_keywords);
    const voiceSearch = getKeywords(voice_search_keywords);

    const keywords = [primary, secondary, voiceSearch]
      .filter(Boolean)
      .join(", ");

    return {
      title: seo_title || `${blogTitle} | Genrobotics Blog`,
      description: meta_description || blogSummary || `Read about ${blogTitle} on the Genrobotics blog. Discover insights into robotics innovation and technology.`,
      keywords,
      alternates: {
        canonical: `https://genrobotics.com/blogs/${resolvedParams.slug}`,
      },
      openGraph: {
        title: seo_title || `${blogTitle} | Genrobotics Blog`,
        description: meta_description || blogSummary || `Read about ${blogTitle} on the Genrobotics blog.`,
        images: blog.data?.image?.url ? [
          {
            url: blog.data.image.url,
            width: blog.data.image.dimensions?.width || 1200,
            height: blog.data.image.dimensions?.height || 600,
            alt: blog.data.image.alt || blogTitle,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo_title || `${blogTitle} | Genrobotics Blog`,
        description: meta_description || blogSummary || `Read about ${blogTitle} on the Genrobotics blog.`,
        images: blog.data?.image?.url ? [blog.data.image.url] : [],
      },
    };
  } catch (error) {
    console.warn("Metadata fetch failed for blog:", error);
    return {
      title: "Blog Post | Genrobotics",
      description: "Read robotics insights and articles on the Genrobotics blog.",
      keywords: "robotics blog, robotics articles, robotics insights, robotics technology, AI robotics, robotic engineering, robotics innovation, Genrobotics blog",
      alternates: {
        canonical: `https://genrobotics.com/blogs/${resolvedParams.slug}`,
      },
    };
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await client.getAllByType("blogs");

    if (!blogs || blogs.length === 0) {
      console.log("No blogs found, returning empty array");
      return [];
    }

    return blogs.map((blog) => ({
      slug: blog.uid, // 👈 matches folder name
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return [];
  }
}

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\u00A0/g, ' ');
};

// Utility to recursively clean Prismic Rich Text fields
const cleanRichText = (richText) => {
  if (!Array.isArray(richText)) return richText;
  return richText.map(node => ({
    ...node,
    text: node.text ? cleanText(node.text) : node.text,
    spans: node.spans ? node.spans.map(span => ({
      ...span,
      data: span.data && span.data.url ? { ...span.data, url: span.data.url.trim() } : span.data
    })) : node.spans
  }));
};

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params; // ✅ required in Next 15+
  const blog = await client
    .getByUID("blogs", resolvedParams.slug)
    .catch(() => null);


  if (!blog) {
    return <p className="text-center py-10">Blog not found.</p>;
  }

  // Clean the summary and content
  const cleanSummary = cleanText(blog.data?.summary || '');
  const cleanContent = cleanRichText(blog?.data?.section?.content || blog?.data?.content || blog?.data?.body);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 my-16 md:my-24">
      {/* Banner image above the title */}
      {blog?.data?.image?.url && (
        <figure className="mb-8">
          <Image
            src={blog.data.image.url}
            alt={blog.data.image.alt || 'Blog banner'}
            width={blog.data.image.dimensions?.width || 1200}
            height={blog.data.image.dimensions?.height || 600}
            className="rounded-xl mb-6 w-full object-cover"
          />
        </figure>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        {cleanText(blog.data?.title?.[0]?.text) || 'Untitled'}
      </h1>

      {/* Summary as content block */}
      {cleanSummary && (
        <section>
          <h4 className="text-xl font-semibold mt-8 text-[#FCD901]">Summary</h4>
          <p className="mb-8 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed text-justify">
            {/* If summary includes HTML tags (unlikely), render as HTML; otherwise linkify plain URLs */}
            {/<[a-z][\s\S]*>/i.test(cleanSummary)
              ? (
                <span dangerouslySetInnerHTML={{ __html: cleanSummary }} />
              )
              : (
                linkify(cleanSummary)
              )}
          </p>
        </section>
      )}
      <PrismicRichText
        field={cleanContent}
        components={serializers}
      />
    </article>
  );
}

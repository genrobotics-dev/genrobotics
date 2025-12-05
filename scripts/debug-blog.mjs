import * as prismic from '@prismicio/client';

const repositoryName = 'genrobotics';
const client = prismic.createClient(repositoryName);

async function main() {
    const slug = 'indias-robotics-revolution';
    try {
        console.log(`Fetching blog: ${slug}...`);
        const blog = await client.getByUID("blogs", slug);
        console.log("Blog found:", blog.uid);

        const content = blog.data?.section?.content || blog.data?.content || blog.data?.body;
        console.log("Content type:", Array.isArray(content) ? "Array" : typeof content);

        if (content === undefined) {
            console.log("Content is UNDEFINED");
        } else if (content === null) {
            console.log("Content is NULL");
        }

        if (Array.isArray(content)) {
            console.log("Content length:", content.length);
            content.forEach((item, index) => {
                if (!item.type) console.log(`WARNING: Item ${index} has no type`);
                if (item.spans === undefined) {
                    console.log(`WARNING: Item ${index} has undefined spans`);
                    console.log(JSON.stringify(item, null, 2));
                }
                if (item.text === undefined && item.type !== 'image' && item.type !== 'embed') console.log(`WARNING: Item ${index} has undefined text (type: ${item.type})`);
                // console.log(`Item ${index}:`, item);
            });
        } else {
            console.log("Content value:", content);
        }

        // Simulate cleanRichText
        const cleanText = (text) => {
            if (typeof text !== 'string') return text;
            return text.replace(/\u00A0/g, ' ');
        };

        const cleanRichText = (richText) => {
            if (!Array.isArray(richText)) return null;
            return richText.map(node => ({
                ...node,
                text: node.text ? cleanText(node.text) : node.text,
                spans: node.spans ? node.spans.map(span => ({
                    ...span,
                    data: span.data && span.data.url ? { ...span.data, url: span.data.url.trim() } : span.data
                })) : node.spans
            }));
        };

        console.log("Attempting to clean content...");
        try {
            const cleaned = cleanRichText(content);
            console.log("Cleaned content successfully.");
            // console.log(JSON.stringify(cleaned, null, 2));
        } catch (e) {
            console.error("Error cleaning content:", e);
        }

    } catch (error) {
        console.error("Error fetching blog:", error);
    }
}

main();

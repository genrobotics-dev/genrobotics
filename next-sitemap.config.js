// import { fetchBlogSlugs } from "./src/lib/cms.js";

// /** @type {import('next-sitemap').IConfig} */
// const config = {
//   siteUrl: "https://genrobotics.com",
//   generateRobotsTxt: true,
//   changefreq: "weekly",
//   priority: 0.7,
//   additionalPaths: async () => {
//     const slugs = await fetchBlogSlugs();
//     return slugs.map((slug) => ({
//       loc: `/blog/${slug}`,
//       changefreq: "weekly",
//       priority: 0.7,
//     }));
//   },
// };

// export default config

import { fetchBlogSlugs, fetchNewsSlugs, fetchCareerSlugs } from "./src/lib/cms.js";

const config = {
  siteUrl: "https://genrobotics.com",
  generateRobotsTxt: true,
  changefreq: "monthly", // default
  priority: 0.7,         // default

  additionalPaths: async () => {
    const blogSlugs = await fetchBlogSlugs();
    const newsSlugs = await fetchNewsSlugs();
    const careerSlugs = await fetchCareerSlugs();

    const home = [{ loc: "/", changefreq: "monthly", priority: 1.0 }];

    const blogs = blogSlugs.map((slug) => ({
      loc: `/blog/${slug}`,
      changefreq: "weekly",
      priority: 0.7,           // explicitly set
    }));

    const news = newsSlugs.map((slug) => ({
      loc: `/news/${slug}`,
      changefreq: "weekly",
      priority: 0.7,           // explicitly set
    }));

    const careers = careerSlugs.map((slug) => ({
      loc: `/career/${slug}`,
      changefreq: "weekly",
      priority: 0.7,           // explicitly set
    }));

    return [...home, ...blogs, ...news, ...careers];
  },
};

export default config
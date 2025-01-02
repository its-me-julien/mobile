/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://wmtx.worldmobile.club', // Your website's URL
    generateRobotsTxt: true, // Generate robots.txt
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*', // Applies to all bots
          allow: '/', // Allow all pages
        },
      ],
    },
    sitemapSize: 5000, // Adjust if you have many pages
    changefreq: 'daily', // Optional: default change frequency
    priority: 0.7, // Optional: default priority
  };
  
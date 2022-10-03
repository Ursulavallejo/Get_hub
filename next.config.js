const { i18n } = require("./next-i18next.config");
//const withVideos = require('next-videos');

const nextConfig = {
  i18n: {
    locales: ['sv','en' ],
    defaultLocale: 'sv',
    domains: [
      {
        domain: 'gethub.se',
        defaultLocale: 'sv',
      },
      {
        domain: 'gethub.se/en',
        defaultLocale: 'en',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  swcMinify: false,
  images: {
    imageSizes: [16, 32, 64, 128],
    domains: [
      "gethub-sale-dev.azurewebsites.net",
      "gethub-sale-prod.azurewebsites.net",
      "gethub.se",
      "www.gethub.se",
      "images.ctfassets.net",
    ],
    minimumCacheTTL: 3600,
    formats: ["image/webp"],
  },

};

module.exports = nextConfig;

/*  To use Next-videos : not working

module.exports = withVideos({
  assetPrefix: 'https://videos.ctfassets.net/',

  webpack(config, options) {
    return config
  }
});
*/

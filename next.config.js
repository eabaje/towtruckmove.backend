module.exports = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  },
  // reactStrictMode: true,
  //  experimental: {
  //     esmExternals: false
  //   }
  // webpack: (config) => {
  //   // load worker files as a urls by using Asset Modules
  //   // https://webpack.js.org/guides/asset-modules/
  //   config.module.rules.unshift({
  //     test: /pdf\.worker\.(min\.)?js/,
  //     type: "asset/resource",
  //     generator: {
  //       filename: "static/worker/[hash][ext][query]",
  //     },
  //   });
  //   return config;
  // },
};

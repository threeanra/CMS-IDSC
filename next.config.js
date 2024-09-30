module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/document",
        permanent: true, // Set to true for 301 redirect, or false for 302 redirect
      },
    ];
  },
};

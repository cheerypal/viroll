module.exports = {
  pwa: {
    name: "VIROLL",
    short_name: "VIROLL",
    start_url: "index.html",
    display: "standalone",
    themeColor: "#ffffff",
    msTileColor: "#ffffff",
    iconPaths: {
      favicon32: "icon.png",
      favicon16: "icon.png",
      appleTouchIcon: "icon.png",
      maskIcon: "icon.png",
      msTileImage: "icon.png",
    },
    icons: [
      {
        src: "./icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "./icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "./icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

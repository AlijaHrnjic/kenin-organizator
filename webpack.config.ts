export default {
  // Ostatak konfiguracije...
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // ako je veličina datoteke manja od 8KB, tada će biti ugrađena u kod kao data URI, u suprotnom će biti spremljena kao zasebna datoteka
              mimetype: "application/font-ttf",
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
};

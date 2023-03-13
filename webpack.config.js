const path = require("path");

module.exports = {
  mode: "development",
  entry: "./pages/pdf/pdf.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(pdf|gif|png|jpe?g|svg)$/,
        use: "file-loader?name=[path][name].[ext]",
      },
    ],
  },
};

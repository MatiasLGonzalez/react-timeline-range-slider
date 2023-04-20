export const module = {
  rules: [
    // All files with a '.ts' or '.tsx' extension will be handled by 'babel-loader'.
    {
      test: /\.tsx?$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-typescript", { allowDeclareFields: true }],
          ],
        },
      },
      exclude: /node_modules/,
    },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    { test: /\.js$/, loader: "source-map-loader" },
  ],
};
export const resolve = {
  extensions: [".tsx", ".ts", ".js"],
};

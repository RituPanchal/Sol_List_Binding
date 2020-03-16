var path = require("path");
const webpack = require('webpack');

module.exports = {

  mode: "development", // or production
  entry: [
    "./src/Services/courseListService.js",
    "./src/Controllers/courseListController.js",
    "./src/UiMiddlewares/courseListUiMiddleware.js"
  ],
  output: {
    publicPath: "./dist/",
    path: path.join(__dirname, "./dist/"),
    //filename: "[name].build.js",
    filename: "build.js",
    library: 'appGlobal'
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css?$/, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'Lib/images/[hash]-[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'Lib/fonts/roboto/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"]
  }

};


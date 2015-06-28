var webpack = require('webpack');

//filepath used in `output` and `plugins`
var filepath = 'build/';

module.exports = {

  // Efficiently evaluate modules with source maps
  devtool: "eval",

  entry:  {
    app: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      "./entry.jsx"
    ],
    vendor: [
      "react",
      "react-router",
      "material-ui",
      'reflux',
      'superagent',
      'lodash'
    ]
  },

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    //path: __dirname + "/build/",
    filename: filepath + "bundle-[name].js"
  },

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      { test: /\.cjsx$/, loader: "coffee-jsx-loader" },
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */filepath + 'bundle-vendor.js'),
    new webpack.NoErrorsPlugin() // tells the reloader to not reload if there is a syntax error in your code. The error is simply printed in the console, and the component will reload when you fix the error.
    //new webpack.HotModuleReplacementPlugin()
  ],

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.cjsx']
  }
};
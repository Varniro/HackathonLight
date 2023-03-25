const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
        index:'./src/index.js',
        sub:'./src/sub.js',
        NGOreg:'./src/NGOreg.js',
        browse:'./src/browse.js',
        createPost: './src/createPost.js',
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    static: 'dist',
  },
  watch: true,
};
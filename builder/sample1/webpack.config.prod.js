module.exports = {
  // production モードを使う
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true,
              // CSS 用ソースマップは作らない
              sourceMap: false,
            },
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loader: 'url-loader',
      }
    ]
  },
};
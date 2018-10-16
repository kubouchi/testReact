module.exports = {
  // development モードを使う
  mode: 'development',
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
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // css での url() メソッドを無効に
              url: false,
              // 圧縮
              minimize: false,
              // CSS 用ソースマップを付ける
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }

        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loader: 'url-loader',
      }
    ]
  },
  // ソースマップを付ける
  devtool: 'inline-source-map',
  // 開発用サーバを使う
  devServer: {
    contentBase: 'dist',
    open: true
  }
};
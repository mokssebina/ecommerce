module.exports = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "dummyjson.com", "raw.githubusercontent.com", 
        "bayut-production.s3.eu-central-1.amazonaws.com", "jobberbwapp.appspot.com", "firebasestorage.googleapis.com"],
    },
}
/*
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    
  webpack(config) {

    config.module.rules.push({
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ]
    });
    
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[contenthash].css'
      })
    );

    return config;
  }
};
*/
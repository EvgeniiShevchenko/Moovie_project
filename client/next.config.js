const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withSass = require("@zeit/next-sass");
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')


module.exports = withPlugins([
  [withCSS, 
  //     {
  //     webpack (config) {
  //       config.module.rules.push(
  //           {
  //       test: /\.css$/,
  //       use: [
  //         // style-loader
  //         { loader: 'style-loader' },
  //         // css-loader
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             modules: true
  //           }
  //         },
  //         // sass-loader
  //         { loader: 'sass-loader' }
  //       ]
  //     }
  //       )
  //       return config
  //     }
  //   }
    // {
    //   cssModules: true,
    //   cssLoaderOptions: {
    //     importLoaders: 1,
    //     localIdentName: '[local]_[hash:base64:5]'
    //   }
    // }
    {
      cssLoaderOptions: {
      url: false
      }
    }
  ],
  [withSass, {
    webpack (config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });
  
        return config;
    }
  }],
  [withBundleAnalyzer, {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
  }]
]);

// module.exports = withCSS({
//   cssLoaderOptions: {
//     url: false
//   }
// }
// ,withSass({
//   webpack (config, options) {
//       config.module.rules.push({
//           test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//           use: {
//               loader: 'url-loader',
//               options: {
//                   limit: 100000
//               }
//           }
//       });

//       return config;
//   }
// }),
// withBundleAnalyzer({
//   analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
//   analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
//   bundleAnalyzerConfig: {
//     server: {
//       analyzerMode: 'static',
//       reportFilename: '../bundles/server.html'
//     },
//     browser: {
//       analyzerMode: 'static',
//       reportFilename: '../bundles/client.html'
//     }
//   },
// }))

// module.exports = withCSS(withSass({
//   webpack (config, options) {
//       config.module.rules.push({
//           test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//           use: {
//               loader: 'url-loader',
//               options: {
//                   limit: 100000
//               }
//           }
//       });

//       return config;
//   }
// }));

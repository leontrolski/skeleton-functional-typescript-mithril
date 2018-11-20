const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    // PERFORMANCE - source maps take up lots of space
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    // PERFORMANCE - disable type checker - we will do this as part of the tests
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    },
                }],
                exclude: [/node_modules/],
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/index.html'),
                to: path.resolve(__dirname, 'dist'),
            },
            {
                from: path.resolve(__dirname, 'src/main.css'),
                to: path.resolve(__dirname, 'dist'),
            },
        ])
    ],
    optimization: {
        // PERFORMANCE
        removeAvailableModules: false,
        removeEmptyChunks: false,

        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
    },
    stats: 'verbose',
}

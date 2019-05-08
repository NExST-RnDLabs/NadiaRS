/*
 
  Reworked from:
  http://jamesknelson.com/webpack-made-simple-build-es6-less-with-autorefresh-in-26-lines/
 
  Original Boilerplate taken from Christian Alfoni blog:
 
  http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
  http://www.christianalfoni.com/articles/2014_12_13_Webpack-and-react-is-awesome
  https://christianalfoni.github.io/react-webpack-cookbook/
 
  Git:
  https://github.com/christianalfoni/webpack-express-boilerplate
  https://github.com/jamesknelson/webpack-black-triangle
 
*/
 
var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'src');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
const CleanWebpackPlugin = require('clean-webpack-plugin');
 
 
var config = {
 
    context: __dirname,
 
    // Makes sure errors in console map to the correct file and line number
    devtool: 'eval-source-map',

    mode: 'development',

    entry: {
        'bundle': [
            'webpack-hot-middleware/client?reload=true',
            '@babel/polyfill',
            // path.resolve(appPath, 'shim.js'),
            path.resolve(appPath, 'index.js')
        ]
    },
 
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [path.resolve(__dirname), nodeModulesPath],
        alias: {            
                'semantic-ui-less': path.resolve(__dirname, 'src/Interface/Ui/Styles/semantic-ui-less'),
                'src': path.resolve( __dirname, 'src')
        }
    },
 
    output: {
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: buildPath,
        filename: '[name].js',
 
        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/build/'
    },
    module: {
        rules: [ 
            // babel-loader gives you ES6/7 syntax and JSX transpiling
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [{loader: "html-loader"}]
            },
            {
                test: /config\.json$/,
                loader: 'special-loader',
                type: 'javascript/auto'
                // options: {...}
            },

            // Let us also add the style-loader and css-loader
            {
                test: /\.css$/,
                use: [
                        "style-loader",
                        "css-loader"
                     ]
            },
            // As well as the style-loader and less-loader
            {
                test: /\.scss$/,
                use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                     ]
            }, {
                test: /\.(png|gif|jpg|svg|woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=25000'
            }
        ]
    },
 
    devServer: {
        host: "localhost",
        port: 3000,
        https: false,
        hot: true
    },
 
    // We have to manually add the Hot Replacement plugin when running from Node
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ]
};
 
module.exports = config;
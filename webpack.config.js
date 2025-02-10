const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { cache } = require("react");
   
module.exports = {
    entry: "./app.jsx", // входная точка - исходный файл
    context: path.resolve(__dirname, 'src'),
    output:{
        path: path.resolve(__dirname, "./dist"),     // путь к каталогу выходных файлов
        publicPath: "/",
        filename: "bundle.js"       // название создаваемого файла
    },
    devtool: "eval-source-map",
    devServer: {
        historyApiFallback: true,
        // static: {
        //     directory: path.join(__dirname, "/"),
        //     watch: true
        // },
        port: 8081,
        open: true,
        liveReload: true,
        hot: false
   },
   cache: false,
   module: {
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:[ "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: "NickyParsons Site",
            template: "./template.html"
        })
    ]
}
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ],
        loaders: [
            { test: /.json$/, loader: 'json-loader' },
            {
                test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/,
                query: {
                    presets: ['react', 'env', 'es2015']
                }
            },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=85000' }
        ],
    }
};
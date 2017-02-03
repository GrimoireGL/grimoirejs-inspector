module.exports = [{
    entry: "./src/devtool/devtool.js",
    output: {
        filename: "./lib/devtool.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        },
        extensions: [".vue", ".js"]
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: "vue-loader"
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
}, {
    entry: "./src/contentScript/contentScript.js",
    output: {
        filename: "./lib/contentScript.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".js"]
    },
    module: {
        loaders: [ {
                test: /\.js$/,
                loader: 'babel-loader',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
},
{
    entry: "./src/embed/embed.js",
    output: {
        filename: "./lib/embed.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".js"]
    },
    module: {
        loaders: [ {
                test: /\.js$/,
                loader: 'babel-loader',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
},
{
    entry: "./src/background/background.js",
    output: {
        filename: "./lib/background.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".js"]
    },
    module: {
        loaders: [ {
                test: /\.js$/,
                loader: 'babel-loader',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
}]

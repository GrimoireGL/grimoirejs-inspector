module.exports = [{
    entry: "./src/index.js",
    output: {
        filename: "./lib/bundle.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        },
        extensions: [".vue", ".js", ""]
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: "vue"
            }, {
                test: /\.js$/,
                loader: 'babel',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
}, {
    entry: "./inject/inject.js",
    output: {
        filename: "./lib/inject.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".js", ""]
    },
    module: {
        loaders: [ {
                test: /\.js$/,
                loader: 'babel',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
},
{
    entry: "./embed/embed.js",
    output: {
        filename: "./lib/embed.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".js", ""]
    },
    module: {
        loaders: [ {
                test: /\.js$/,
                loader: 'babel',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
},
{
    entry: "./background/background.js",
    output: {
        filename: "./lib/background.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".js", ""]
    },
    module: {
        loaders: [ {
                test: /\.js$/,
                loader: 'babel',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },

        ]
    }
}]

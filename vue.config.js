module.exports = {
    css: {
        extract: false,
        loaderOptions: {
            sass: {
                data: '@import "@/assets/_variables.scss";',
            },
        },
    },
}

module.exports = {
    css: {
        extract: false,
        loaderOptions: {
            sass: {
                data: '@import "@/variables.scss";',
            },
        },
    },
}

module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.vue"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                landing: "url('/img/landing.jpg')",
            }),
        },
    },
    variants: {},
    plugins: [],
};

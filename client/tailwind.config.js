module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.vue"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                landing: "url('/img/landing.jpg')",
            }),
            boxShadow: (theme) => ({
                outline: "0 0 0 2px rgba(245, 101, 101, 0.75)",
            }),
        },
    },
    variants: {},
    plugins: [],
};

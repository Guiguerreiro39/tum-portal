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
                side:
                    "10px 10px 15px -3px rgba(0, 0, 0, 0.1), 4px 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }),
            height: (theme) => ({
                "90": "89.5%",
            }),
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
};

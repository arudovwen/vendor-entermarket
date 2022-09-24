/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  corePlugins: {
    preflight: false,
  },
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
       
        primary: "#27AA54",
       
      },
      boxShadow: {
        mb: "0px 4px 75px rgba(0, 0, 0, 0.1)",
      },
    },
    plugins: [],
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};

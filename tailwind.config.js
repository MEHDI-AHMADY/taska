/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "700px",
        lg: "1000px",
        xl: "1240px",
      },
    },
    extend: {
      fontFamily : {
        'Roboto' : 'Roboto'
      } ,
      backgroundImage : {
        'registerBg' : "url('/images/2d-graphic-colorful-wallpaper-with-grainy-gradients.jpg') no-repeat center"
      }
    },
  },
  plugins: [],
};

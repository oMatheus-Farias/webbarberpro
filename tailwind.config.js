/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        bg: '#12131B',
        primary: '#1B1C29',
        secondary: '#FBB231',
        details: '#2D3748',
        green: '#00CD52',
        red: '#FF3E3E',
        gray: '#585858',
        btnColor: '#2D3748',
      },
    },
  },
  plugins: [],
}


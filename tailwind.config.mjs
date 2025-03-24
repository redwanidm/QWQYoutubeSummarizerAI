import daisyui from "daisyui";

// Custom theme configurations with theme modifications
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        forest: {
          "--rounded-box": "1rem",
          "--rounded-btn": "0rem", 
          "--rounded-badge": "1.9rem",
          "--rounded-input": "1.9rem",

        },
        cupcake: {
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
        }
      }
    ],
  },
};

export default config;
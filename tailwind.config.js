module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        classic: {
          100: "#FDF6E3",
          900: "#3B2F2F",
        },
        stem: {
          100: "#E0F7FA",
          900: "#01579B",
        },
        playful: {
          100: "#FFFDE7",
          900: "#F57C00",
        },
        academic: {
          100: "#F5F5F5",
          900: "#263238",
        },
        scholarly: {
          100: "#F3E5F5",
          900: "#4A148C",
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.4,0,0.2,1)',
        'bounce-in': 'bounceIn 0.8s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.7)', opacity: 0 },
          '60%': { transform: 'scale(1.05)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

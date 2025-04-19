// tailwind.config.js
 
export const theme = {
  extend: {
    animation: {
      'custom-bounce': 'customBounce 2s infinite', // Custom animation name
    },
    keyframes: {
      customBounce: {
        '0%, 100%': {
          transform: 'translateY(-75%)',
          animationTimingFunction: 'ease-out',
        },
        '50%': {
          transform: 'translateY(2px)',
          animationTimingFunction: 'ease-out',
        },
      },
    },
  },
};
export const plugins = [];
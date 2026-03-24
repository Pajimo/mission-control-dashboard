/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Orbitron', 'monospace'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cortex: {
          primary: {
            DEFAULT: '#00d4ff',
            dark: '#0099cc',
            darker: '#006699',
          },
          secondary: {
            DEFAULT: '#ff6b35',
            dark: '#cc5529',
          },
          accent: {
            DEFAULT: '#00ff88',
            dark: '#00cc6a',
          },
          bg: {
            primary: '#0a0f1c',
            secondary: '#141b2d',
            tertiary: '#1e2a3f',
            elevated: '#253451',
          },
          sidebar: {
            bg: '#0d1421',
            border: '#1a2332',
          },
          nav: {
            hover: '#1e2a3f',
            active: '#253451',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b8c5d6',
            tertiary: '#7a8ca5',
            muted: '#4a5568',
          },
          border: {
            DEFAULT: '#1a2332',
            light: '#253451',
            accent: '#00d4ff33',
          },
          success: '#00ff88',
          warning: '#ffa726',
          danger: '#ff5722',
          info: '#00d4ff',
        }
      },
      boxShadow: {
        'cortex-glow-primary': '0 0 20px rgba(0, 212, 255, 0.5)',
        'cortex-glow-accent': '0 0 20px rgba(0, 255, 136, 0.5)',
        'cortex-command': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'cortex-grid': `
          linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
        `,
        'cortex-primary-gradient': 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
        'cortex-secondary-gradient': 'linear-gradient(135deg, #ff6b35 0%, #cc5529 100%)',
        'cortex-accent-gradient': 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
      },
      animation: {
        'cortex-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cortex-glow': 'glow 3s ease-in-out infinite',
        'cortex-float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
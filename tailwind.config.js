module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)', // #2563EB - blue-600
          hover: 'var(--color-primary-hover)', // #1D4ED8 - blue-700
          light: 'var(--color-primary-light)', // #DBEAFE - blue-100
          50: '#EFF6FF', // blue-50
          100: '#DBEAFE', // blue-100
          200: '#BFDBFE', // blue-200
          300: '#93C5FD', // blue-300
          400: '#60A5FA', // blue-400
          500: '#3B82F6', // blue-500
          600: '#2563EB', // blue-600
          700: '#1D4ED8', // blue-700
          800: '#1E40AF', // blue-800
          900: '#1E3A8A', // blue-900
          950: '#172554', // blue-950
        },
        background: 'var(--color-background)', // #FFFFFF - white
        surface: 'var(--color-surface)', // #F9FAFB - gray-50
        border: 'var(--color-border)', // #E5E7EB - gray-200
        text: {
          primary: 'var(--color-text-primary)', // #111827 - gray-900
          secondary: 'var(--color-text-secondary)', // #4B5563 - gray-600
          tertiary: 'var(--color-text-tertiary)', // #9CA3AF - gray-400
        },
        success: {
          DEFAULT: 'var(--color-success)', // #16A34A - green-600
          light: 'var(--color-success-light)', // #DCFCE7 - green-100
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // #F59E0B - amber-500
          light: 'var(--color-warning-light)', // #FEF3C7 - amber-100
        },
        error: {
          DEFAULT: 'var(--color-error)', // #DC2626 - red-600
          light: 'var(--color-error-light)', // #FEE2E2 - red-100
        },
        info: {
          DEFAULT: 'var(--color-info)', // #4F46E5 - indigo-600
          light: 'var(--color-info-light)', // #E0E7FF - indigo-100
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display': ['36px', {
          lineHeight: '44px',
          fontWeight: '700',
        }],
        'h1': ['30px', {
          lineHeight: '38px',
          fontWeight: '700',
        }],
        'h2': ['24px', {
          lineHeight: '32px',
          fontWeight: '600',
        }],
        'h3': ['20px', {
          lineHeight: '28px',
          fontWeight: '600',
        }],
        'h4': ['18px', {
          lineHeight: '28px',
          fontWeight: '500',
        }],
        'body-lg': ['16px', {
          lineHeight: '24px',
          fontWeight: '400',
        }],
        'body': ['14px', {
          lineHeight: '20px',
          fontWeight: '400',
        }],
        'body-sm': ['12px', {
          lineHeight: '16px',
          fontWeight: '400',
        }],
        'label': ['14px', {
          lineHeight: '20px',
          fontWeight: '500',
        }],
        'button': ['14px', {
          lineHeight: '20px',
          fontWeight: '500',
        }],
        'code': ['14px', {
          lineHeight: '20px',
          fontWeight: '400',
        }],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      textColor: ['active', 'disabled'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderColor: ['active', 'focus'],
      ringColor: ['hover', 'active'],
      ringOpacity: ['hover', 'active'],
      ringWidth: ['hover', 'active'],
      scale: ['active', 'group-hover'],
      transform: ['hover', 'focus', 'active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}
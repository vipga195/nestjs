module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './sections/**/*.{js,vue,ts}', // config them de sections nhan style
    './layouts/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      color: {},
      translate: {
      },
      content: {
        null: '""'
      }
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      full: '100%'
    },
    fontFamily: {
      'hira-w4': ['"ヒラギノ角ゴ Pro W4"', '"Hiragino Kaku Gothic Pro"', 'sans-serif'],
      'hira-w5': ['"ヒラギノ角ゴ Pro W5"', '"Hiragino Kaku Gothic Pro"', 'sans-serif'],
      'hira-w6': ['"ヒラギノ角ゴ Pro W6"', '"Hiragino Kaku Gothic Pro"', 'sans-serif'],
      'hira-w7': ['"ヒラギノ角ゴ Pro W7"', '"Hiragino Kaku Gothic Pro"', 'sans-serif'],
      'hira-w8': ['"ヒラギノ角ゴ Pro W8"', '"Hiragino Kaku Gothic Pro"', 'sans-serif'],
      yugothic: ['游ゴシック体', 'YuGothic', '游ゴシック Medium', 'Yu Gothic', 'sans-serif']
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '769px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
}

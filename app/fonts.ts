import localFont from 'next/font/local'

export const aeonikBold = localFont({
  src: '../public/fonts/Aeonik-Bold.otf',
  variable: '--font-aeonik-bold',
})

export const aeonikBoldItalic = localFont({
  src: '../public/fonts/Aeonik-BoldItalic.otf',
  variable: '--font-aeonik-bold-italic',
})

export const aeonikLight = localFont({
  src: '../public/fonts/Aeonik-Light.otf',
  variable: '--font-aeonik-light',
})

export const aeonikLightItalic = localFont({
  src: '../public/fonts/Aeonik-LightItalic.otf',
  variable: '--font-aeonik-light-italic',
})

export const aeonikRegular = localFont({
  src: '../public/fonts/Aeonik-Regular.otf',
  variable: '--font-aeonik-regular',
})

export const aeonikRegularItalic = localFont({
  src: '../public/fonts/Aeonik-RegularItalic.otf',
  variable: '--font-aeonik-regular-italic',
})

// New font imports
export const aeonikAir = localFont({
  src: '../public/fonts/Aeonik-Air.ttf', // extra-thin
  variable: '--font-aeonik-air',
})

export const aeonikBlack = localFont({
  src: '../public/fonts/Aeonik-Black.ttf', // extra-bold
  variable: '--font-aeonik-black',
})

export const aeonikThin = localFont({
  src: '../public/fonts/Aeonik-Thin.ttf', // thin
  variable: '--font-aeonik-thin',
})

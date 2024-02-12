import { StyleSheet } from 'react-native'

export const fontFamily = 'Avenir'

export const globalTypographyStyles = StyleSheet.create({
  introScreenHeading: {
    fontSize: 32,
    fontFamily,
    fontWeight: 'bold'
  },
  heading: {
    fontSize: 24,
    fontFamily,
    fontWeight: 'bold'
  },
  subheading: {
    fontSize: 20,
    fontFamily
  }
})

import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { Image } from 'react-native'

import SmallLogo from '../../assets/logosmall.png'

export const Logo = () => {
  const styles = useStyleSheet(themedStyles)
  return <Image source={SmallLogo} style={styles.logo} />
}

const themedStyles = StyleService.create({
  logo: {
    width: 150,
    height: 150
  }
})

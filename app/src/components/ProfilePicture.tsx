import { StyleService, useStyleSheet } from '@ui-kitten/components'
import * as React from 'react'
import { Image, View } from 'react-native'

import DefaultAvatar from '../../assets/avatar.png'

export type PictureProps = {
  base64: string | undefined
}

export const ProfilePicture = (props: PictureProps) => {
  const styles = useStyleSheet(themedStyles)

  const uri = `data:image/png;base64,${props.base64}`

  return (
    <View style={styles.imageContainer}>
      <Image source={props.base64 ? { uri } : DefaultAvatar} style={styles.image} />
    </View>
  )
}

const themedStyles = StyleService.create({
  imageContainer: {
    borderRadius: 100,
    borderColor: 'color-primary-500',
    borderWidth: 2,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 100
  }
})

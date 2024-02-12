import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Spinner, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image, Pressable, View } from 'react-native'

import { ToastType, showToast } from '../utils/toasts'

interface ProfilePictureUploadProps {
  base64?: string
  onImageSelect(img: string): void
}

export const ProfilePictureUpload = (props: ProfilePictureUploadProps) => {
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [isFileSizeError, setFileSizeError] = useState(false)

  const pickImage = async () => {
    setIsLoading(true)
    setFileSizeError(false)

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      showToast({ text2: 'Permission Denied.' }, ToastType.ERROR)
    } else {
      setIsLoading(true)

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        base64: true,
        quality: 0
      })

      if (!result.canceled && result.assets.length > 0 && result.assets[0].base64) {
        if (result.assets[0].fileSize && result.assets[0].fileSize > 1500000) {
          setFileSizeError(true)
          showToast({ text1: 'Image too large', text2: 'File size limit is 1.5MB' }, ToastType.ERROR)
        } else {
          props.onImageSelect(result.assets[0].base64)
        }
      }
    }
    setIsLoading(false)
  }

  const uri = `data:image/png;base64,${props.base64}`
  return (
    <>
      {isLoading ? (
        <View style={styles.outerContainer}>
          <Spinner status="primary" size="giant" />
        </View>
      ) : (
        <Pressable style={[styles.outerContainer, isFileSizeError && styles.uploadError]} onPress={pickImage}>
          <View style={styles.innerContainer}>
            {isFileSizeError ? (
              <MaterialIcons name="image-not-supported" size={40} color={theme['color-danger-500']} />
            ) : props.base64 ? (
              <Image source={{ uri }} style={styles.image} />
            ) : (
              <MaterialCommunityIcons name="file-image-plus-outline" size={40} color="black" />
            )}
            <View style={[styles.miniUploadCircle, isFileSizeError && styles.uploadErrorMini]}>
              <MaterialCommunityIcons name="camera-wireless-outline" size={20} color="white" />
            </View>
          </View>
        </Pressable>
      )}
    </>
  )
}

const themedStyles = StyleService.create({
  outerContainer: {
    borderRadius: 100,
    borderColor: 'color-primary-500',
    borderWidth: 2,
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: 'color-basic-400',
    alignItems: 'center',
    justifyContent: 'center'
  },
  miniUploadCircle: {
    backgroundColor: 'color-primary-500',
    height: 37,
    width: 37,
    borderRadius: 100,
    position: 'absolute',
    left: 70,
    top: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadError: {
    borderColor: 'color-danger-500'
  },
  uploadErrorMini: {
    backgroundColor: 'color-danger-500'
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100
  }
})

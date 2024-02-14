import * as Location from 'expo-location'
import { SetStateAction } from 'react'
import { Region } from 'react-native-maps'

export const getInitialLocationState = (
  setIsLoadingLocation: { (value: SetStateAction<boolean>): void; (isLoading: boolean): void },
  setInitialRegion: {
    (value: SetStateAction<Region | undefined>): void
    (region: Region): void
  }
) => {
  return async () => {
    setIsLoadingLocation(true)
    const defaultLocation = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }

    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setIsLoadingLocation(false)
      setInitialRegion(defaultLocation)
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    setIsLoadingLocation(false)
    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
  }
}

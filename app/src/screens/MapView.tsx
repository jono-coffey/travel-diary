import { useFocusEffect } from '@react-navigation/native'
import { Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import * as Location from 'expo-location'
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import MapView, { LongPressEvent, Marker, Region } from 'react-native-maps'

type MapMarker = {
  latitude: number
  longitude: number
  title?: string
  description?: string
}

export const Map = () => {
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const styles = useStyleSheet(themedStyles)

  useFocusEffect(
    useCallback(() => {
      if (!initialRegion) {
        getInitialState()
      }
    }, [])
  )

  const getInitialState = async () => {
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

  const onLongPress = (event: LongPressEvent) => {
    setMarkers([
      ...markers,
      {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude
      }
    ])
  }

  return (
    <>
      {isLoadingLocation && (
        <View style={styles.loaderWrapper}>
          <Spinner status="primary" />
          <Text category="s2" style={styles.loaderText}>
            Fetching location...
          </Text>
        </View>
      )}
      <MapView
        style={{ height: '100%', width: '100%' }}
        region={initialRegion}
        showsUserLocation
        onLongPress={(event) => {
          onLongPress(event)
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            onPress={() => {
              console.log('Pressed')
            }}
          />
        ))}
      </MapView>
    </>
  )
}

const themedStyles = StyleService.create({
  loaderWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    backgroundOpacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderText: {
    color: 'white',
    marginTop: 10
  }
})

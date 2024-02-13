import { MaterialIcons } from '@expo/vector-icons'
import { StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components'
import { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { Callout, LatLng, MapMarker, Marker } from 'react-native-maps'

import { Button, ButtonType } from './Button'
import { MapMarkerType } from '../screens/MapView'

interface NewEntryMarkerProps {
  marker: MapMarkerType
  onDrag(latLng: LatLng): void
  onAddClick(): void
}

export const NewEntryMarker = (props: NewEntryMarkerProps) => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)
  const markerRef = useRef<MapMarker>(null)

  useEffect(() => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      setTimeout(() => {
        markerRef && markerRef.current && markerRef.current.showCallout && markerRef.current.showCallout()
      }, 500)
    }
  }, [markerRef])

  return (
    <Marker
      draggable
      ref={markerRef}
      coordinate={{ latitude: props.marker.latitude, longitude: props.marker.longitude }}
      onDrag={(drag) => props.onDrag(drag.nativeEvent.coordinate)}
    >
      <MaterialIcons name="add-location-alt" size={40} color={theme['color-primary-500']} />
      <Callout>
        <View style={styles.container}>
          <Text style={styles.text}>Add new journal entry?</Text>
          <Button
            title="Add"
            type={ButtonType.PRIMARY}
            onButtonClick={() => {
              props.onAddClick()
            }}
          />
        </View>
      </Callout>
    </Marker>
  )
}

const themedStyles = StyleService.create({
  container: {
    width: 100,
    justifyContent: 'center'
  },
  text: {
    marginBottom: 10,
    textAlign: 'center'
  }
})

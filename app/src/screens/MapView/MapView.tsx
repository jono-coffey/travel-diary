import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/native'
import { Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { LatLng, LongPressEvent, Marker, Region } from 'react-native-maps'

import { getInitialLocationState } from './utils'
import { gql } from '../../__generated__'
import { NewEntryForm } from '../../components/Forms/NewEntryForm/NewEntryForm'
import { NewEntryMarker } from '../../components/Maps/NewEntryMarker'
import { Modal } from '../../components/Modal'
import { ToastType, showToast } from '../../utils/toasts'

export type MapMarkerType = {
  latitude: number
  longitude: number
  title?: string
  description?: string
}

export const Map = () => {
  const [markers, setMarkers] = useState<MapMarkerType[]>([])
  const [newMarker, setNewMarker] = useState<MapMarkerType | undefined>(undefined)
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false)

  const { error, data, refetch } = useQuery(GET_ENTRIES, {
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (data?.entries) {
      console.log(data.entries)
      setMarkers(
        data.entries.map((entry) => {
          return {
            title: entry.destination,
            latitude: entry.latitude,
            longitude: entry.longitude
          }
        })
      )
    }

    if (error) {
      const errorText = 'Something went wrong fetching your trips.'
      showToast({ text2: errorText }, ToastType.ERROR, 2)
    }
  }, [data])

  const styles = useStyleSheet(themedStyles)

  useFocusEffect(
    useCallback(() => {
      setNewMarker(undefined)
      if (!initialRegion) {
        getInitialLocationState(setIsLoadingLocation, setInitialRegion)
      }
    }, [])
  )

  const onLongPress = (event: LongPressEvent) => {
    setNewMarker({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude
    })
  }

  const onNewMarkerDrag = (latLng: LatLng) => {
    setNewMarker(latLng)
  }

  const onAddEntryError = () => {
    const errorText = 'Something went wrong creating a new journal entry'
    showToast({ text2: errorText }, ToastType.ERROR, 2)
  }

  const onAddEntrySuccess = () => {
    showToast({ text2: 'New journal entry has been created' }, ToastType.SUCCESS, 2)
    setIsAddEntryModalOpen(false)
    refetch()
    setNewMarker(undefined)
  }

  return (
    <>
      <Modal
        isModalOpen={isAddEntryModalOpen}
        onBackdropPress={() => {
          setIsAddEntryModalOpen(false)
        }}
      >
        <NewEntryForm
          latitude={newMarker?.latitude}
          longitude={newMarker?.longitude}
          onError={() => onAddEntryError()}
          onSuccess={() => onAddEntrySuccess()}
        />
      </Modal>

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
        {newMarker && (
          <NewEntryMarker
            onAddClick={() => setIsAddEntryModalOpen(true)}
            onDrag={(latLng) => onNewMarkerDrag(latLng)}
            marker={newMarker}
          />
        )}
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
  },
  modalContainer: {
    backgroundColor: 'color-basic-100',
    padding: 20,

    borderRadius: 20,
    width: '95%',
    shadowColor: '#000000',
    borderColor: 'color-basic-100',
    elevation: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.11
  }
})

const GET_ENTRIES = gql(`
  query GetEntries {
    entries {
      id
      longitude
      latitude
      destination
    }
  }
`)

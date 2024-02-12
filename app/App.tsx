import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry, StyleService, useStyleSheet } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { API_BASE_URL } from './src/constants/api'
import { RootStack } from './src/routing/RootStack'
import { persistor, store } from './src/state/store'
import { default as theme } from './src/styles/theme.json'
import { toastConfig } from './src/utils/toasts'

SplashScreen.preventAutoHideAsync()

const client = new ApolloClient({
  uri: API_BASE_URL,
  cache: new InMemoryCache()
})

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const styles = useStyleSheet(themedStyles)

  useEffect(() => {
    ;(async () => {
      try {
        const images = [require('./assets/logosmall.png'), require('./assets/avatar.png')]
        const cacheImages = images.map((image) => Asset.fromModule(image).downloadAsync())
        await Promise.all(cacheImages)
        await Font.loadAsync({ Avenir: require('./assets/fonts/avenir.ttf') })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    })()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <NavigationContainer>
              <SafeAreaView style={styles.safeAreaView} onLayout={onLayoutRootView}>
                <StatusBar backgroundColor="#66BEFF" />
                <RootStack />
              </SafeAreaView>
            </NavigationContainer>
            <Toast config={toastConfig} />
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

const themedStyles = StyleService.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'color-basic-100'
  }
})

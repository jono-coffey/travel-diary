import { StyleService, useStyleSheet } from '@ui-kitten/components'
import Toast, { ErrorToast, BaseToastProps } from 'react-native-toast-message'

export const toastConfig = {
  // TODO: Add success toast when needed
  error: (props: BaseToastProps) => <Error props={props} />
}

const Error = ({ props }: any) => {
  const styles = useStyleSheet(themedStyles)
  return (
    <ErrorToast
      {...props}
      style={styles.errorContainer}
      contentContainerStyle={styles.innerContainer}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
      text2NumberOfLines={props.props.numberOfLines}
    />
  )
}

const themedStyles = StyleService.create({
  errorContainer: {
    borderLeftColor: 'color-danger-500',
    width: '80%'
  },
  innerContainer: {
    paddingHorizontal: 15
  },
  text1Style: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black'
  },
  text2Style: { fontSize: 12, fontWeight: '400', color: 'black' }
})

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error'
}

type Message = {
  text1?: string
  text2: string
}

export const showToast = (message: Message, type: ToastType, numberOfLines: number = 1) => {
  Toast.show({
    type,
    text1: message.text1 ? message.text1 : type === ToastType.SUCCESS ? 'Success' : 'Something went wrong',
    text2: message.text2,
    props: { numberOfLines }
  })
}

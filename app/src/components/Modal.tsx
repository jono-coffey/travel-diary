import { Modal as UIModal, StyleService, useStyleSheet } from '@ui-kitten/components'
import { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  isModalOpen: boolean
  onBackdropPress(): void
}
export const Modal = (props: ModalProps) => {
  const styles = useStyleSheet(themedStyles)
  return (
    <UIModal
      animationType="slide"
      visible={props.isModalOpen}
      onBackdropPress={() => {
        props.onBackdropPress()
      }}
      style={styles.modalContainer}
      hardwareAccelerated
    >
      {props.children}
    </UIModal>
  )
}

const themedStyles = StyleService.create({
  modalContainer: {
    backgroundColor: 'color-basic-100',
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9
  }
})

import { Modal, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'

import { InputField } from './InputField'
import { fontFamily } from '../../styles/typography'
dayjs.extend(utc)

interface DatePickerProps {
  initialUnixValue?: number
  errorMessage?: string
  required?: boolean
  placeholder?: string
  hintText?: string
  style?: ViewStyle
  onChange(unix: number): void
}

export const DatePicker = (props: DatePickerProps) => {
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()

  const [value, setValue] = useState(props.initialUnixValue ? dayjs.utc(props.initialUnixValue) : undefined)
  const [displayValue, setDisplayValue] = useState<string | undefined>(undefined)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (value) {
      props.onChange(dayjs.utc(value).valueOf())
      setDisplayValue(value.format('DD/MM/YYYY'))
    }
  }, [value])

  const valueChange = (date: DateType) => {
    if (date) {
      setValue(dayjs.utc(date))
    }
  }

  const onInputTouch = () => {
    setVisible(true)
  }

  return (
    <>
      <View style={props.style}>
        <InputField
          displayValue={displayValue}
          errorMessage={props.errorMessage}
          required={props.required}
          onTouch={() => onInputTouch()}
          placeholder={props.placeholder}
          hintText={props.hintText}
          editable={false}
          preventKeyboard
        />
      </View>
      <Modal
        animationType="slide"
        visible={visible}
        onBackdropPress={() => {
          setVisible(false)
        }}
        style={styles.modalContainer}
        hardwareAccelerated
      >
        <DateTimePicker
          value={value}
          onValueChange={(date) => valueChange(date)}
          mode="date"
          calendarTextStyle={styles.fontFamily}
          headerTextStyle={styles.fontFamily}
          weekDaysTextStyle={styles.fontFamily}
          selectedItemColor={theme['color-primary-500']}
        />
      </Modal>
    </>
  )
}

const themedStyles = StyleService.create({
  modalContainer: {
    backgroundColor: 'color-basic-100',
    padding: 10,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000000',
    borderColor: 'color-basic-100',
    elevation: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.11
  },
  fontFamily: {
    fontFamily
  }
})

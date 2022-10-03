import { StyleSheet } from 'react-native'
import { STANDARD_VIEW_SPACING } from './Numbers'

const styles = StyleSheet.create({
  welcomeText: {
      fontFamily: 'Rubik-Bold',
      alignSelf: 'center',
      color: 'black',
      fontSize: 20,
  },
  container: {
    flex: 1,
    padding: STANDARD_VIEW_SPACING,
    backgroundColor: 'white'
  }
})

export default styles
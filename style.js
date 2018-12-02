import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51a6e2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  buttonGroup: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  button: {
    fontSize: 17,
    margin: 5
  }
})

const mdStyle = StyleSheet.create({
  text: {
    fontSize: 20
  }
})

export {styles, mdStyle}

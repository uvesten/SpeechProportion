import { any, string } from 'prop-types'

// require the module
var RNFS = require('react-native-fs')

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
//var path = RNFS.DocumentDirectoryPath + '/t

// write the file

function soundWriterListenerFactory(inPath: string) {
  let notWritten = true
  let path = RNFS.DocumentDirectoryPath + '/' + inPath
  return async (data: readableNativeArray) => {
    //com.facebook.react.bridge.

    console.log(data.length)
    console.log(typeof data[0])
    console.log(data[0])
    console.log(data[1])

    //if (notWritten) {
    //  await RNFS.writeFile(path, data, 'base64')
    //  notWritten = false
    //}
    //await RNFS.appendFile(path, data, 'base64')
  }
}

export { soundWriterListenerFactory }

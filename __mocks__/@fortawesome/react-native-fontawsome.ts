jest.mock('react-native-fontawesome', () => {
  return {
    writeFile: jest.fn(),
    appendFile: jest.fn(),
  }
})

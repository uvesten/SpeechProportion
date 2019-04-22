jest.mock('react-native-fs', () => {
  return {
    writeFile: jest.fn(),
    appendFile: jest.fn(),
  }
})

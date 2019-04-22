jest.mock('react-native-microphone-dsp', () => {
  return {
    addListener: jest.fn(),
  }
})

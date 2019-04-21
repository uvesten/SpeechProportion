jest.mock('react-native-microphone-stream', () =>  {
return {
    addListener: jest.fn(),
}
}
)
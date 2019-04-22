const calculateRMS = async (audioData: Array<number>): Promise<number> => {
  if (audioData.length === 0) {
    return 0
  }

  const noSamples = audioData.length

  const sumSquares = audioData
    .map(x => Math.pow(x, 2))
    .reduce((acc, val) => acc + val, 0)

  const rms = Math.sqrt(sumSquares / noSamples)

  return rms
}

export { calculateRMS }

import { calculateRMS } from '../RMSCalculator'

it('should return 0 on empty array', async () => {
  const val = await calculateRMS([])
  expect(val).toBe(0)
})

it('should return 1 on an array of only ones', async () => {
  const val = await calculateRMS([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  expect(val).toBe(1)
})

it('should return 0 on an array of only zeroes', async () => {
  const val = await calculateRMS([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  expect(val).toBe(0)
})

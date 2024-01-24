import { expect, test } from 'vitest'
import { capitalizeFirstLetter } from '../helpers/functions.ts'

test('Capitalize first letter', () => {
  const dataMock = 'Butterfree'

  const pokemon = capitalizeFirstLetter('butterfree')

  expect(pokemon).toStrictEqual(dataMock)
})

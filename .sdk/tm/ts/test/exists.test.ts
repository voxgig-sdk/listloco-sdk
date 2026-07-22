
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ListlocoSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ListlocoSDK.test()
    equal(null !== testsdk, true)
  })

})

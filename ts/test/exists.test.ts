
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ListlocoSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ListlocoSDK.test()
    equal(testsdk instanceof ListlocoSDK, true,
      'ListlocoSDK.test() must return a client synchronously')
  })

})

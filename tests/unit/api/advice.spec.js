import assert from 'assert'
import sinon from 'sinon'
import axios from 'axios'

import advice from '../../../src/api/advice'

describe('api/advice.js', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('ランダムなアドバイスを取得: getRandomAdvice()', () => {
    let axiosGetStub
    beforeEach(() => {
      // Given
      axiosGetStub = sinon.stub(axios, 'get').resolves('dummy response')

      // When
      advice.getRandomAdvice()
    })

    it('api.adviceslip.comへのリクエストが実行される', () => {
      // Then
      const expected = 'https://api.adviceslip.com/advice'
      assert.ok(axiosGetStub.withArgs(expected).calledOnce)
    })
  })
})

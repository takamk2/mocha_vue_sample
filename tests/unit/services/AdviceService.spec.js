import assert from 'assert'
import sinon from 'sinon'

import AdviceService from '../../../src/services/AdviceService'
import advice from '../../../src/api/advice'

describe('services/AdviceService.js', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('ランダムなアドバイスを取得: getRandomAdvice()', () => {
    let result
    beforeEach(async () => {
      // Given
      sinon.stub(advice, 'getRandomAdvice').resolves({
        data: {
          slip: {
            advice: 'dummy advice',
          },
        },
      })

      // When
      result = await AdviceService.getRandomAdvice()
    })

    it('アドバイスが取得できる', async () => {
      // Then
      const expected = 'dummy advice'
      assert.strictEqual(result, expected)
    })
  })
})

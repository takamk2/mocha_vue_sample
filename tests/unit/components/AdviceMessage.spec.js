import assert from 'assert'
import sinon from 'sinon'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AdviceMessage from '../../../src/components/AdviceMessage'
import AdviceService from '../../../src/services/AdviceService'

const localVue = createLocalVue()

describe('components/AdviceMessage.vue', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('アドバイス読み込み成功', () => {
    let wrapper = null
    beforeEach(async () => {
      sinon.stub(AdviceService, 'getRandomAdvice').resolves('dummy advice')

      wrapper = shallowMount(AdviceMessage, {
        localVue,
      })
      // NOTE: mountedで行われている非同期処理の反映を待つ
      await wrapper.vm.$nextTick()
    })

    it('アドバイスが表示される', async () => {
      const expected = 'dummy advice'
      const actual = wrapper.find('p').text()
      assert.strictEqual(actual, expected)
    })
  })

  describe('アドバイス読み込み失敗', () => {
    let wrapper = null
    beforeEach(async () => {
      sinon.stub(AdviceService, 'getRandomAdvice').rejects('reject reason')

      wrapper = shallowMount(AdviceMessage, {
        localVue,
      })
      // NOTE: mountedで行われている非同期処理の反映を待つ
      await wrapper.vm.$nextTick()
    })

    it('読み込み失敗が表示される', async () => {
      const expected = '読み込みエラー'
      const actual = wrapper.find('p').text()
      assert.strictEqual(actual, expected)
    })
  })
})

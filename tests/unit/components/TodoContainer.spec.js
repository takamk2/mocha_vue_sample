import assert from 'assert'
import sinon from 'sinon'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import TodoContainer from '../../../src/components/TodoContainer'

const localVue = createLocalVue()

describe('components/TodoContainer.vue', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('テキストフォームが空', () => {
    let wrapper
    beforeEach(() => {
      // When
      wrapper = shallowMount(TodoContainer, {
        localVue,
        stubs: {
          TodoList: true,
        },
      })
    })

    it('追加ボタンが無効になる', () => {
      // Then
      const expected = 'disabled'
      const actual = wrapper.find('.submit').attributes('disabled')
      assert.strictEqual(actual, expected)
    })
  })

  describe('テキストフォームに文字列を入力', () => {
    let wrapper
    beforeEach(() => {
      // When
      wrapper = shallowMount(TodoContainer, {
        localVue,
        stubs: {
          TodoList: true,
        },
      })
      wrapper.find('.text-input').setValue('dummy')
    })

    beforeEach(() => {
      assert.ok(true)
    })

    it('追加ボタンが有効になる', () => {
      // Then
      const expected = 'disabled'
      const actual = wrapper.find('.submit').attributes('disabled')
      assert.strictEqual(actual, expected)
    })
  })

  describe('テキストフォームに文字列を入力して追加ボタンを押す', () => {
    beforeEach(() => {
      assert.ok(true)
    })

    it('todoモジュールのappendTodoItemが呼び出される', () => {})
  })
})

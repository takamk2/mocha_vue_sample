import assert from 'assert'
import sinon from 'sinon'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import TodoListItem from '../../../src/components/TodoListItem'

const localVue = createLocalVue()

describe('components/TodoListItem.vue', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('ステータスがtodo', () => {
    let wrapper = null
    beforeEach(() => {
      // Given
      const propsData = {
        item: {
          id: 1,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
      }

      // When
      wrapper = shallowMount(TodoListItem, {
        localVue,
        propsData,
      })
    })

    it('Todoの内容が表示される', () => {
      // Then
      const expected = 'dummy content'
      const actual = wrapper.find('.left-item').text()
      assert.strictEqual(actual, expected)
    })

    it('doneクラスが付与されない', () => {
      // Then
      assert.ok(!wrapper.find('li.done').exists())
    })

    it('削除ボタンが表示される', () => {
      // Then
      assert.ok(wrapper.find('.delete-btn').exists())
    })

    it('完了ボタンが表示される', () => {
      // Then
      assert.ok(wrapper.find('.done-btn').exists())
    })
  })

  describe('ステータスがDone', () => {
    let wrapper = null
    beforeEach(() => {
      // Given
      const propsData = {
        item: {
          id: 1,
          content: 'dummy content',
          status: 'done',
          createdAt: '2020/09/19 19:19:19',
        },
      }

      // When
      wrapper = shallowMount(TodoListItem, {
        localVue,
        propsData,
      })
    })

    it('doneクラスが付与される', () => {
      // Then
      assert.ok(wrapper.find('li.done').exists())
    })

    it('完了ボタンが表示されない', () => {
      // Then
      assert.ok(!wrapper.find('.done-btn').exists())
    })
  })

  describe('完了ボタンをクリック', () => {
    let wrapper = null
    beforeEach(() => {
      // Given
      const propsData = {
        item: {
          id: 1,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
      }

      // When
      wrapper = shallowMount(TodoListItem, {
        localVue,
        propsData,
      })
      wrapper.find('.done-btn').trigger('click')
    })

    it('完了ボタンクリックイベントを発火。引数にid=1を含む', () => {
      // Then
      const expected = 1
      const payload = wrapper.emitted('on-click-done-button')[0][0]
      assert.strictEqual(payload, expected)
    })
  })

  describe('削除ボタンをクリック', () => {
    let wrapper = null
    beforeEach(() => {
      // Given
      const propsData = {
        item: {
          id: 1,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
      }

      // When
      wrapper = shallowMount(TodoListItem, {
        localVue,
        propsData,
      })
      wrapper.find('.done-btn').trigger('click')
    })

    it('削除ボタンクリックイベントを発火。引数にid=1を含む', () => {
      // Then
      const expected = 1
      const payload = wrapper.emitted('on-click-done-button')[0][0]
      assert.strictEqual(payload, expected)
    })
  })
})

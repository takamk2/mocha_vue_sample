import assert from 'assert'
import sinon from 'sinon'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import TodoList from '../../../src/components/TodoList'
import TodoListItem from '../../../src/components/TodoListItem'
import todoModule from '../../../src/store/modules/todo'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/TodoList.vue', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('todoが1つもない', () => {
    let wrapper
    beforeEach(() => {
      // Given
      const items = []
      const store = new Vuex.Store({
        modules: {
          todo: Object.assign(todoModule, {
            state: {
              items,
            },
          }),
        },
      })

      // When
      wrapper = shallowMount(TodoList, {
        store,
        localVue,
        stubs: {
          TodoListItem: true,
        },
      })
    })

    it('TodoListItemコンポーネントが1つも表示されていない', () => {
      // Then
      const expected = 0
      const actual = wrapper.findAllComponents(TodoListItem).length
      assert.strictEqual(actual, expected)
    })
  })

  describe('todoが2つ', () => {
    let wrapper
    beforeEach(() => {
      // Given
      const items = [
        {
          id: 1,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
        {
          id: 2,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
      ]
      const store = new Vuex.Store({
        modules: {
          todo: Object.assign(todoModule, {
            state: {
              items,
            },
          }),
        },
      })

      // When
      wrapper = shallowMount(TodoList, {
        store,
        localVue,
        stubs: {
          TodoListItem: true,
        },
      })
    })

    it('TodoListItemコンポーネントが2つ表示される', () => {
      // Then
      const expected = 2
      const actual = wrapper.findAllComponents(TodoListItem).length
      assert.strictEqual(actual, expected)
    })
  })

  describe('ステータスtodoとdoneがそれぞれ1つずつ', () => {
    let wrapper
    beforeEach(() => {
      // Given
      const items = [
        {
          id: 1,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
        {
          id: 2,
          content: 'dummy content',
          status: 'done',
          createdAt: '2020/09/19 19:19:19',
        },
      ]
      const store = new Vuex.Store({
        modules: {
          todo: Object.assign(todoModule, {
            state: {
              items,
            },
          }),
        },
      })

      // When
      wrapper = shallowMount(TodoList, {
        store,
        localVue,
        stubs: {
          TodoListItem: true,
        },
      })
    })

    it('TodoListItemコンポーネントが2つ表示される', () => {
      // Then
      const expected = 2
      const actual = wrapper.findAllComponents(TodoListItem).length
      assert.strictEqual(actual, expected)
    })
  })

  describe('完了ボタンが押された', () => {
    let wrapper
    let updateStatusStub
    beforeEach(() => {
      // Given
      const items = [
        {
          id: 1,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
      ]
      updateStatusStub = sinon.stub()
      const store = new Vuex.Store({
        modules: {
          todo: Object.assign(todoModule, {
            state: {
              items,
            },
            actions: {
              updateStatus: updateStatusStub,
            },
          }),
        },
      })

      // When
      wrapper = shallowMount(TodoList, {
        store,
        localVue,
        stubs: {
          TodoListItem: true,
        },
      })
      wrapper.findComponent(TodoListItem).vm.$emit('on-click-done-button', 1)
    })

    it('todoモジュールのupdateStatusが呼び出される', () => {
      // Then
      assert.ok(updateStatusStub.calledOnce)
      const expected = {
        id: 1,
        status: 'done',
      }
      // NOTE: [0][0]はstoreのため、[0][1]から引数を取得している
      const actual = updateStatusStub.args[0][1]
      assert.deepStrictEqual(actual, expected)
    })
  })

  describe('削除ボタンが押された', () => {
    let wrapper
    let removeItemStub
    beforeEach(() => {
      // Given
      const items = [
        {
          id: 1,
          content: 'dummy content',
          status: 'todo',
          createdAt: '2020/09/19 19:19:19',
        },
      ]
      removeItemStub = sinon.stub()
      const store = new Vuex.Store({
        modules: {
          todo: Object.assign(todoModule, {
            state: {
              items,
            },
            actions: {
              removeItem: removeItemStub,
            },
          }),
        },
      })

      // When
      wrapper = shallowMount(TodoList, {
        store,
        localVue,
        stubs: {
          TodoListItem: true,
        },
      })
      wrapper.findComponent(TodoListItem).vm.$emit('on-click-delete-button', 1)
    })

    it('todoモジュールのremoveItemが呼び出される', () => {
      // Then
      assert.ok(removeItemStub.calledOnce)
      const expected = 1
      // NOTE: [0][0]はstoreのため、[0][1]から引数を取得している
      const actual = removeItemStub.args[0][1]
      assert.deepStrictEqual(actual, expected)
    })
  })
})

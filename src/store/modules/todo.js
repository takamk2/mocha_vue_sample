import moment from 'moment'

const state = () => ({
  items: [],
})

const getters = {
  todoItems: (state) => {
    return state.items
      .filter((it) => it.status === 'todo')
      .slice()
      .sort((a, b) => b.id - a.id)
  },
  doneItems: (state) => {
    return state.items
      .filter((it) => it.status === 'done')
      .slice()
      .sort((a, b) => b.id - a.id)
  },
}

const actions = {
  appendItem({ commit, state }, content) {
    const item = {
      id: Math.max(...state.items.map((it) => it.id), -1) + 1,
      content,
      createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
      status: 'todo',
    }
    commit('append', item)
  },
  removeItem({ commit }, id) {
    commit('remove', id)
  },
  updateStatus({ commit, state }, { id, status }) {
    const items = JSON.parse(JSON.stringify(state.items))
    const item = items.find((it) => it.id === id)
    if (!item) return

    item.status = status
    commit('replaceAll', items)
  },
}

const mutations = {
  append(state, { id, content, createdAt, status }) {
    state.items.push({
      id,
      content,
      createdAt,
      status,
    })
  },

  remove(state, id) {
    state.items = state.items.filter((it) => it.id !== id)
  },

  replaceAll(state, items) {
    state.items = items
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

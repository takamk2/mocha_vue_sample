<template>
  <ul>
    <TodoListItem
      v-for="item in items"
      :item="item"
      :key="item.id"
      @on-click-done-button="onClickDoneButton"
      @on-click-delete-button="onClickDeleteButton"
    />
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TodoListItem from './TodoListItem'

export default {
  name: 'TodoList',
  components: { TodoListItem },
  computed: {
    ...mapGetters('todo', {
      todoItems: 'todoItems',
      doneItems: 'doneItems',
    }),
    items() {
      return this.todoItems.concat(this.doneItems)
    },
  },
  methods: {
    ...mapActions('todo', {
      removeItem: 'removeItem',
      updateStatus: 'updateStatus',
    }),
    onClickDoneButton(id) {
      this.updateStatus({ id, status: 'done' })
    },
    onClickDeleteButton(id) {
      this.removeItem(id)
    },
  },
}
</script>

<style scoped>
ul {
  padding: 0;
  position: relative;
}
</style>

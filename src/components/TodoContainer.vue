<template>
  <div>
    <div>
      <form @submit.prevent="onSubmit">
        <label>
          <input type="text" class="text-input" v-model="content" />
        </label>
        <button
          type="submit"
          class="submit ml5"
          :disabled="!isEnabledAddButton"
        >
          追加
        </button>
      </form>
    </div>
    <TodoList />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import TodoList from './TodoList'

export default {
  name: 'TodoContainer',
  components: { TodoList },
  data() {
    return {
      content: '',
    }
  },
  computed: {
    isEnabledAddButton() {
      return this.content.length > 0
    },
  },
  methods: {
    ...mapActions('todo', {
      appendTodoItem: 'appendItem',
    }),
    onSubmit() {
      if (this.content.length > 0) {
        this.appendTodoItem(this.content)
        this.content = ''
      }
    },
  },
}
</script>

<style scoped>
.ml5 {
  margin-left: 8px;
}
.text-input {
  width: 60%;
  padding: 10px;
}
</style>

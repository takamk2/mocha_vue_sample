<template>
  <div>
    <div>
      <label>
        <input type="text" v-model="content" />
      </label>
      <button
        type="button"
        class="ml5"
        :disabled="!isEnabledAddButton"
        @click="onClickAddButton"
      >
        追加
      </button>
    </div>
    <TodoList />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import TodoList from "./TodoList";

export default {
  name: "TodoContainer",
  components: { TodoList },
  data() {
    return {
      content: "",
    };
  },
  computed: {
    isEnabledAddButton() {
      return this.content.length > 0;
    },
  },
  methods: {
    ...mapActions("todo", {
      appendTodoItem: "appendItem",
    }),
    onClickAddButton() {
      this.appendTodoItem(this.content);
      this.content = '';
    },
  },
};
</script>

<style scoped>
.ml5 {
  margin-left: 8px;
}
</style>

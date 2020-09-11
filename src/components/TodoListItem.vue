<template>
  <li :class="{ done: isDone }">
    <div class="left-item">
      {{ item.content }}
    </div>
    <div class="right-item">
      <button
        v-if="!isDone"
        type="button"
        class="done-btn"
        @click="onClickDoneButton"
      >
        完了</button
      ><button type="button" class="delete-btn" @click="onClickDeleteButton">
        削除
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoListItem',
  props: {
    item: {
      type: Object,
      required: true,
      validator: (item) => {
        return ['id', 'content', 'status', 'createdAt'].every((key) =>
          Object.prototype.hasOwnProperty.call(item, key),
        )
      },
    },
  },
  computed: {
    isDone() {
      return this.item.status === 'done'
    },
  },
  methods: {
    onClickDoneButton() {
      this.$emit('on-click-done-button', this.item.id)
    },
    onClickDeleteButton() {
      this.$emit('on-click-delete-button', this.item.id)
    },
  },
}
</script>

<style scoped>
li {
  position: relative;
  color: #528b58;
  border-left: solid 6px #528b58;
  background: #fffafa;
  margin: 0 8px;
  margin-bottom: 3px;
  padding: 0.5em;
  min-height: 2em;
  list-style-type: none;
}
li.done {
  border-left: solid 6px #a09ba0;
}
li.done .left-item {
  text-decoration: line-through;
  opacity: 0.4;
}
.left-item {
  position: absolute;
  left: 4px;
}
.right-item {
  position: absolute;
  right: 4px;
}
.done-btn,
.delete-btn {
  margin: 0 4px;
}
</style>

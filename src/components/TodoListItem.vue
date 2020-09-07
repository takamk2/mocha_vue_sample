<template>
  <li>
    {{ item.content
    }}<button v-if="!isDone" type="button" @click="onClickDoneButton">
      完了</button
    ><button type="button" @click="onClickDeleteButton">削除</button>
  </li>
</template>

<script>
export default {
  name: "TodoListItem",
  props: {
    item: {
      type: Object,
      required: true,
      validator: (item) => {
        return ["id", "content", "status", "createdAt"].every((key) =>
          Object.prototype.hasOwnProperty.call(item, key)
        );
      },
    },
  },
  computed: {
    isDone() {
      return this.item.status === "done";
    },
  },
  methods: {
    onClickDoneButton() {
      this.$emit("on-click-done-button", this.item.id);
    },
    onClickDeleteButton() {
      this.$emit("on-click-delete-button", this.item.id);
    },
  },
};
</script>

<style scoped></style>

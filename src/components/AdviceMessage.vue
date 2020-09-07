<template>
  <p>{{ message }}</p>
</template>

<script>
import AdviceService from "../services/AdviceService";

export default {
  name: "AdviceMessage",
  data() {
    return {
      message: "読み込み中",
    };
  },
  mounted() {
    this.roadAdvice();
  },
  methods: {
    async roadAdvice() {
      this.message = await AdviceService.getRandomAdvice().catch(
        (reason) => {
          console.warn(reason);
          return '読み込みエラー'
        }
      );
    },
  },
};
</script>

<style scoped></style>

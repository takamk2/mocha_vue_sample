<template>
  <p>{{ message }}</p>
</template>

<script>
import AdviceService from '../services/AdviceService'

export default {
  name: 'AdviceMessage',
  data() {
    return {
      message: '読み込み中',
    }
  },
  mounted() {
    this.roadAdvice()
  },
  methods: {
    async roadAdvice() {
      this.message = await AdviceService.getRandomAdvice().catch(() => {
        return '読み込みエラー'
      })
    },
  },
}
</script>

<style scoped>
p {
  background-color: #528b58;
  color: snow;
  border-radius: 10px;
  padding: 10px;
}
</style>

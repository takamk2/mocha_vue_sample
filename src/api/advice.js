import axios from 'axios'

export default {
  /**
   * ランダムなアドバイスを取得
   *
   * @returns {Promise}
   */
  getRandomAdvice() {
    return axios.get('https://api.adviceslip.com/advice')
  },
}

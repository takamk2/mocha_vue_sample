import advice from '../api/advice'

export default class {
  /**
   * ランダムなアドバイスを取得
   *
   * @returns {Promise}
   */
  static async getRandomAdvice() {
    return advice.getRandomAdvice().then((res) => res['data']['slip']['advice'])
  }
}

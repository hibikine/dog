export default class Counter {
  constructor() {
    this.count = 0;
    this.actionListeners = [];
    this.$countNum = $('#count-num');
  }

  // カウンターを増やす
  add(value = 1) {
    this.count += value;
    this.updateCount();
  }

  reset() {
    this.count = 0;
    this.updateCount();
  }

  // アクションを送信する
  updateCount() {
    this.$countNum.text(this.count);
    this.actionListeners.map(callback => callback(this.count));
  }

  // カウントアップ時のイベントリスナーを登録する
  // コールバックの第一引数にcountが入る
  addEventListener(callback) {
    this.actionListeners.push(callback);
  }
}

export default class Dog {
  constructor() {
    this.dogStatus = Dog.defaultDogStatus;
    this.$dog = $('#dog');
    this.updateDog(0);
    this.drawDog();
  }

  updateDog(count) {
    // 目指す長さ
    const targetDogLength = this.dogStatus.defaultLength + count * this.dogStatus.unit;
    // バネの強さ
    const springForce = targetDogLength - this.dogStatus.length;
    // 加速度を計算
    this.dogStatus.acceleration += springForce / this.dogStatus.weight;
    // 摩擦
    this.dogStatus.acceleration *= this.dogStatus.friction;
    // 長さを図る
    this.dogStatus.length += this.dogStatus.acceleration;
    // デフォルトの長さより短くならないように
    if (this.dogStatus.length < this.dogStatus.defaultLength) {
      this.dogStatus.length = this.dogStatus.defaultLength;
      this.dogStatus.acceleration *= -1;
    }
  }
  drawDog() {
    this.$dog.css('width', `${this.dogStatus.length}px`);
  }
}

Dog.defaultDogStatus = {
  defaultLength: 10, // 元の長さ
  length: 10, // 現在の長さ
  acceleration: 0, // 尻の加速度
  unit: 20, // px/カウント
  weight: 5, // 重さ(単位適当)
  friction: 0.9, // 摩擦係数
};

// TODO: 副作用アリアリなのでクラス化する

let lastNameIndex = 0;
export default function changeName(meter) {
  const names = [
    {
      length: 10,
      name: '🏆へびすっぱいぬ🐍',
    },
    {
      length: 1000,
      name: '🏆どらごんすっぱいぬ🐉',
    },
    {
      length: 10000,
      name: '🏆ゆめのなかのすっぱいぬ☽',
    },
    {
      length: 100000,
      name: '🏆いつかのすっぱいぬ',
    },
    {
      length: 10000000,
      name: '🏆すっぱいぬ…？',
    },
    {
      length: 10000000000000,
      name: '🏆おめでとう！お前がすっぱいぬになるんだよ',
    },
  ];

  if (names[lastNameIndex].length <= meter) {
    $('#place').html(names[lastNameIndex].name);
    lastNameIndex += 1;
  }
}

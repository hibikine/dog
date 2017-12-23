let count = 0;
let lastNameIndex = 0;
const $dog = $('#dog');
const $countNum = $('#count-num');

function generateTwitterHref(n) {
  $('#twitter').attr('href', `https://twitter.com/?status=${encodeURIComponent(`すっぱいぬ🐶を${n}回伸ばしました！ https://hibikine.me/dog/ #のびるすっぱいぬ`)}`);
}

function changeName(meter) {
  const names = [
    {
      length: 10,
      name: '🏆へびすっぱいぬ🐍',
    },
    {
      length: 100,
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

// eslint-disable-next-line no-unused-vars
$('#extend').click(() => {
  count += 1;
  $dog.html(`${$dog.html()}─`);
  $countNum.html(count);
  generateTwitterHref(count);
  const meter = 1 + count / 2;
  $('#meter').html(`${meter}m`);
  changeName(meter);
});

$('#form').submit(() => {
  $('<input>', {
    type: 'hidden',
    name: 'score',
    value: count,
  }).appendTo('#form');
});

// eslint-disable-next-line no-unused-vars
window.showRanking = (ranking, lastScore, rank) => {
  const rankingHeader = $('<h2>すっぱランキング</h2>');
  const rankingList = $('<ol></ol>');
  rankingList.html(ranking.map(i => $(`<li>${i}</li>`)));
  const yourRank = $(`<p>あなたのランク: ${rank + 1}位</p>`);

  const rankingWrapper = $('#ranking');
  rankingWrapper.append(rankingHeader);
  rankingWrapper.append(rankingList);
  rankingWrapper.append(yourRank);
};
generateTwitterHref(0);

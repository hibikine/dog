import changeName from './names'

let count = 0;
let lastNameIndex = 0;
const $dog = $('#dog');
const $countNum = $('#count-num');

function generateTwitterHref(n) {
  $('#twitter').attr('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(`すっぱいぬ🐶を${n}回伸ばしました！ https://hibikine.me/dog/ #のびるすっぱいぬ`)}`);
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
  gtag('event', 'send_rank');
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

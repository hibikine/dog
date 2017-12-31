import changeName from './names';
import Dog from './dog';

let count = 0;
let lastNameIndex = 0;
const $countNum = $('#count-num');

// eslint-disable-next-line no-unused-vars
$('#extend').click(() => {
  updateCount(++count);
});

$('#twitter').click(() => {
  open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`すっぱいぬ🐶を${count}回伸ばしました！ https://hibikine.me/dog/ #のびるすっぱいぬ`)}`, '_blank');
});

$('#form').submit(function() {
  const action = $(this).attr('action');
  const data = {
    score: count
  };
  $.post(action, data, (result) => {
    showRanking(result.ranking, result.lastScore, result.rank);
  }, 'json');
  updateCount(count = 0);
  gtag('event', 'send_rank');
  return false;
});

function updateCount(count) {
  $countNum.html(count);
  const meter = 1 + count / 2;
  $('#meter').html(`${meter}m`);
  $('#reset').prop("disabled", count == 0)
  changeName(meter);
}

// eslint-disable-next-line no-unused-vars
function showRanking(ranking, lastScore, rank) {
  const rankingHeader = $('<h2>すっぱランキング</h2>');
  const rankingList = $('<ol></ol>').append(ranking.map(i => $(`<li>${i}</li>`)));
  const yourRank = $(`<p>あなたのランク: ${rank + 1}位</p>`);

  const rankingWrapper = $('#ranking');
  rankingWrapper.empty();
  rankingWrapper.append(rankingHeader);
  rankingWrapper.append(rankingList);
  rankingWrapper.append(yourRank);
}

const dog = new Dog();
function mainLoop() {
  dog.updateDog(count);
  dog.drawDog();
  window.requestAnimationFrame(() => {
    mainLoop();
  });
}
mainLoop();


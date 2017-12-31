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
    showRanking(result);
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

// ランキングのリストを生成
function generateRankingList(title, ranking, rank){
  const rankingHeader = $(`<h2>${title}</h2>`);
  const rankingList = $('<ol></ol>').append(ranking.map(i => $(`<li>${i}</li>`)));
  const yourRank = $(`<p>あなたのランク: ${rank + 1}位</p>`);
  const wrapper = $('<div></div>');
  
  wrapper.append(rankingHeader);
  wrapper.append(rankingList);
  wrapper.append(yourRank);
  return wrapper;
}

// eslint-disable-next-line no-unused-vars
function showRanking(data) {
  const totalRanking = generateRankingList('すっぱランキング', data.ranking, data.rank);
  const dailyRanking = generateRankingList('デイリーランキング', data.daily.ranking, data.daily.rank);
  const hourlyRanking = generateRankingList('毎時ランキング', data.hourly.ranking, data.hourly.rank);

  const rankingWrapper = $('#ranking');
  rankingWrapper.empty();
  rankingWrapper.append(totalRanking);
  rankingWrapper.append(dailyRanking);
  rankingWrapper.append(hourlyRanking);
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


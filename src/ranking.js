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

export default function showRanking(data) {
  const totalRanking = generateRankingList('すっぱランキング', data.ranking, data.rank);
  const dailyRanking = generateRankingList('デイリーランキング', data.daily.ranking, data.daily.rank);
  const hourlyRanking = generateRankingList('毎時ランキング', data.hourly.ranking, data.hourly.rank);
  
  const $rankingWrapper = $('#ranking');
  $rankingWrapper.empty();
  $rankingWrapper.append(totalRanking);
  $rankingWrapper.append(dailyRanking);
  $rankingWrapper.append(hourlyRanking);
}

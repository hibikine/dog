let count = 0;
let lastPlacesIndex = 0;
const $dog = $('#dog');
const $countNum = $('#count-num');
function generateTwitterHref(count) {
    $('#twitter').attr("href", 'https://twitter.com/?status=' + encodeURIComponent('すっぱいぬ🐶を' + count + '回伸ばしました！ https://hibikine.me/dog/ #のびるすっぱいぬ'));
}
function suppa(){
    $dog.html($dog.html() + '─');
    $countNum.html(++count);
    generateTwitterHref(count)
    const meter = 1 + count / 2;
    $('#meter').html(meter + 'm');
    const places = [
        {
            length: 10,
            name: '🏆へびすっぱいぬ🐍'
        },
        {
            length: 100,
            name: '🏆へびすっぱいぬ🐍'
        },
        {
            length: 1000,
            name: '🏆どらごんすっぱいぬ🐉'
        },
        {
            length:10000,
            name: '🏆ゆめのなかのすっぱいぬ☽'
        },
        {
            length: 100000,
            name: '🏆いつかのすっぱいぬ'
        },
        {
            length:10000000,
            name:'🏆すっぱいぬ…？'
        },
        {
            length:10000000000000,
            name: '🏆おめでとう！お前がすっぱいぬになるんだよ'
        }
    ];
    if (places[lastPlacesIndex].length <= meter) {
        $('#place').html(places[lastPlacesIndex].name);
        lastPlacesIndex++;
    }
}
$("#form").submit(function() {
    $("<input>",{
        type:"hidden",
        name:"score",
        value:count,
    }).appendTo("#form");
})
function showRanking(ranking, lastScore, rank) {
    const rankingList = $('<ol></ol>');
    rankingList.html(ranking.map(i => $(`<li>${i}</li>`)));
    const rankingHeader = $('<h2>すっぱランキング</h2>');
    const rankingWrapper = $('#ranking');
    rankingWrapper.append(rankingHeader);
    rankingWrapper.append(rankingList);
}
generateTwitterHref(0);

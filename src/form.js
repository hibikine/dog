import showRanking from './ranking';

export default function initForm(counter) {
  const $form = $('#form');
  $form.submit(() => {
    const action = $form.attr('action');
    const data = {
      score: counter.count,
    };
    $.post(action, data, (result) => {
      showRanking(result);
    }, 'json');
    counter.reset();
    gtag('event', 'send_rank');
    return false;
  });
}

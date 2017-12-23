<?php
$filename = './score.txt';
$lines = file($filename);
$score = $_POST['score'];
for($i = 0; $i < count($lines); ++$i) {
  if ((int)$lines[$i] < $score) {
    array_splice($lines, $i, 0, $score . "\n");
    break;
  }
}
if(count($lines) === $i) {
  $lines = array_merge($lines, [$score . "\n"]);
}
file_put_contents($filename, $lines);
include('index.html');
?>


<script>
  const ranking = <?=json_encode(array_map(trim, array_slice($lines, 0, 5)))?>;
  const lastScore = <?=$score?>;
  const rank = <?=$i?>;
  window.showRanking(ranking, lastScore, rank);
</script>

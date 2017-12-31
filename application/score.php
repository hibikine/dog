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

$json = [
  "ranking" => array_map(trim, array_slice($lines, 0, 5)),
  "lastScore" => $score,
  "rank" => $i,
];

header("Content-Type: application/json; charset=utf-8");
echo json_encode($json);

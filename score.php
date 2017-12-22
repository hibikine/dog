<?php
$filename = './score.txt';
$lines = file($filename);
$score = $_POST['score'];
for($i = 0; $i < count($lines); ++$i) {
  if ((int)$lines[$i] < $score) {
    array_splice($lines, $i, 0, $score);
    break;
  }
}
if(count($lines) === 0) {
  $lines = [$score];
}
file_put_contents($filename, $lines);

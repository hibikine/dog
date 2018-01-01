<?php

define('RANKING_FILE_NAME', './score.txt');
define('DAILY_RANKING_FILE_NAME', './daily.txt');
define('HOURLY_RANKING_FILE_NAME', './hourly.txt');
define('DAILY_RANKING_UPDATE_FILE', './daily-update.txt');
define('HOURLY_RANKING_UPDATE_FILE', './hourly-update.txt');
define('SCORE_TIMEZONE', 'Asia/Tokyo');

date_default_timezone_set(SCORE_TIMEZONE);

// 現在時刻のDateTimeをTimezone設定状態で返す
function getNow() {
  $now = new DateTime();
  $a = $now->setTimeZone(new DateTimeZone(SCORE_TIMEZONE));
  return $now;
}

// ランキングファイルを消すべきかどうか判断
function isUpdate($file) {
  $raw = file_get_contents($file);
  // ランキングファイルの存在チェック
  if ($raw === FALSE) {
    return true;
  }
  // UnixtimeからDateTimeに変換して比較
  $date = new DateTime('@' . $raw);
  $date->setTimeZone(new DateTimeZone(SCORE_TIMEZONE));
  return $date < getNow();
}

// ランキングファイルを消し、次回アップデートの日時を設定
function update($rankingFile, $nextUpdateFile, $datetime) {
  // ランキングを全て削除
  file_put_contents($rankingFile, '');
  // Unixtimeで書き込み
  file_put_contents($nextUpdateFile, $datetime->format('U'));
}

// 朝5時にリセット
define('DAILY_RESET_HOUR', 5);

// デイリーランキングの次回更新日時を計算
function calcNextDailyUpdateTime() {
  $updateTime = getNow();
  if (DAILY_RESET_HOUR < (int)$updateTime->format('H')) {
    $updateTime->add(new DateInterval('P1D'));
  }
  $updateTime->setTime(DAILY_RESET_HOUR, 0);
  return $updateTime;
}

// 毎時ランキングの次回更新日時を計算
function calcNextHourlyUpdateTime() {
  $updateTime = getNow();
  $updateTime->setTime($updateTime->format('H') + 1, 0);
  return $updateTime;
}

// ランキングを追加
function addRanking($filename, $score) {
  $lines = file($filename);
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
  return [
    "ranking" => array_map(trim, array_slice($lines, 0, 5)),
    "rank" => $i,
  ];
}

function getRanking($filename) {
  $lines = file($filename);
  return [
    "ranking" => array_map(trim, array_slice($lines, 0, 5)),
  ];
}


// ランキングリセットが必要かどうか
if (isUpdate(DAILY_RANKING_UPDATE_FILE)) {
  update(DAILY_RANKING_FILE_NAME, DAILY_RANKING_UPDATE_FILE, calcNextDailyUpdateTime());
}
if (isUpdate(HOURLY_RANKING_UPDATE_FILE)) {
  update(HOURLY_RANKING_FILE_NAME, HOURLY_RANKING_UPDATE_FILE, calcNextHourlyUpdateTime());
}

$json = [];
if (array_key_exists('score', $_POST)) {
  // 入力取ってくる
  $score = trim($_POST['score']);
  // 数値でない場合はエラー
  if (!ctype_digit($score)) {
    throw Exception();
  }
  
  // ランキング計算
  $ranking = addRanking(RANKING_FILE_NAME, $score);
  $dailyRanking = addRanking(DAILY_RANKING_FILE_NAME, $score);
  $hourlyRanking = addRanking(HOURLY_RANKING_FILE_NAME, $score);

  $json += $ranking;
  $json['lastScore'] = $score;
  $json['daily'] = $dailyRanking;
  $json['hourly'] = $hourlyRanking;
} else {
  // ランキング返すだけ
  $json += getRanking(RANKING_FILE_NAME);
  $json['daily'] = getRanking(DAILY_RANKING_FILE_NAME);
  $json['hourly'] = getRanking(HOURLY_RANKING_FILE_NAME);
}
header("Content-Type: application/json; charset=utf-8");
echo json_encode($json);

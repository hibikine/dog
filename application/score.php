<?php
// ランキングファイル
define('RANKING_FILE', 'ranking.db');
// 総合ランキング
define('RANKING_TYPE_ALWAYS', 0);
// デイリーランキング
define('RANKING_TYPE_DAILY', 1);
// 毎時ランキング
define('RANKING_TYPE_HOURLY', 2);
// ランキングのリミット
define('RANKING_LIST_LIMIT', 5);
// リセット時間(UTC)
define('RANKING_RESET_HOUR_UTC', 20);

// データベースを初期化する
function initDB($pdo) {
  // NOTE: created_atはUTC
  $pdo->exec('CREATE TABLE IF NOT EXISTS score_board(score INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
  $pdo->exec('CREATE INDEX IF NOT EXISTS idx_score ON score_board(score)');
  $pdo->exec('CREATE INDEX IF NOT EXISTS idx_created_at ON score_board(created_at)');
}

// ランキングを追加
function addRanking($pdo, $score) {
  $stmt = $pdo->prepare('INSERT INTO score_board(score) VALUES (:score)');
  $stmt->bindValue(':score', $score, PDO::PARAM_INT);
  $stmt->execute();
}

// ランキングを取得
// @param int $score 確認したいスコア、-1(未指定)の場合は順位が省略される
function getRanking($pdo, $rankingType, $score = -1) {
  $resetHour = 24 - RANKING_RESET_HOUR_UTC;
  $where = "1=1";
  $binds = [];

  // ランキングの種類によって条件変更
  switch ($rankingType) {
    case RANKING_TYPE_DAILY:
      // リセット時間が 5:00 JST = -4:00 UTC
      $where = "created_at > datetime(CURRENT_TIMESTAMP, '+' || :resetHour || ' hours', 'start of day', '+' || :resetHour || ' hours')";
      $binds['resetHour'] = ['value' => $resetHour, 'type' => PDO::PARAM_INT];
      break;

    case RANKING_TYPE_HOURLY:
      $where = "created_at > strftime('%Y-%m-%d %H:00:00', CURRENT_TIMESTAMP)";
      break;
  }

  // リスト取得
  $stmt = $pdo->prepare("SELECT score FROM score_board WHERE $where ORDER BY score DESC LIMIT :limit");
  $stmt->bindValue(":limit", RANKING_LIST_LIMIT, PDO::PARAM_INT);
  foreach ($binds as $k => $v) {
    $stmt->bindValue(":$k", $v['value'], $v['type']);
  }
  $stmt->execute();
  $rankingList = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

  if ($score == -1) {
    return [
      "ranking" => $rankingList,
    ];
  }

  // 順位取得
  $where = "$where AND score > :score";
  $stmt = $pdo->prepare("SELECT count(*) FROM score_board WHERE $where");
  $stmt->bindValue(":score", $score, PDO::PARAM_INT);
  foreach ($binds as $k => $v) {
    $stmt->bindValue(":$k", $v['value'], $v['type']);
  }
  $stmt->execute();
  // NOTE:絶対0番目の添字はあるのでチェック不要
  $rank = (int)$stmt->fetchAll(PDO::FETCH_COLUMN, 0)[0];

  return [
    "ranking" => $rankingList,
    "rank" => $rank,
  ];
}

$pdoOptions = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$pdo = new PDO('sqlite:' . RANKING_FILE, '', '', $pdoOptions);
initDB($pdo);

$json = [];
if (array_key_exists('score', $_POST)) {
  // 入力取ってくる
  $score = trim($_POST['score']);
  // 数値でない場合はエラー
  if (!ctype_digit($score)) {
    throw Exception();
  }

  addRanking($pdo, $score);
  // ランキング計算
  $ranking = getRanking($pdo, RANKING_TYPE_ALWAYS, $score);
  $dailyRanking = getRanking($pdo, RANKING_TYPE_DAILY, $score);
  $hourlyRanking = getRanking($pdo, RANKING_TYPE_HOURLY, $score);

  $json += $ranking;
  $json['lastScore'] = $score;
  $json['daily'] = $dailyRanking;
  $json['hourly'] = $hourlyRanking;
} else {
  // ランキング返すだけ
  $json += getRanking($pdo, RANKING_TYPE_ALWAYS);
  $json['daily'] = getRanking($pdo, RANKING_TYPE_DAILY);
  $json['hourly'] = getRanking($pdo, RANKING_TYPE_HOURLY);
}
header("Content-Type: application/json; charset=utf-8");
echo json_encode($json);

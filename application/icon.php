<?php
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
require_once('./keys.php');
$screenName = $_GET['screen_name'];
$connection = new TwitterOAuth(
    CONSUMER_KEY,
    CONSUMER_SECRET,
    $_SESSION['access_token'],
    $_SESSION['access_token_secret']
);
$user = $connection->get('users/show', ['screen_name' => $screenName]);
header('Location: ' . str_replace( "_normal.", "_bigger.", $user->profile_image_url_https));

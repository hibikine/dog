# のびるすっぱいぬ

[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/HibikineKage/dog) [![Build Status](https://travis-ci.org/HibikineKage/dog.svg?branch=master)](https://travis-ci.org/HibikineKage/dog) [![CircleCI](https://circleci.com/gh/HibikineKage/dog.svg?style=svg)](https://circleci.com/gh/HibikineKage/dog)

https://hibikine.me/dog/

# Development

## Requirement
* yarn
* composer
* docker-compose

## Installment

`application/keys.sample.php`をコピー、keys.phpにリネームする。

中を開き、TwitterAPIキーを設定。

```bash
yarn install
composer install
```

それぞれ別コンソールで

```bash
yarn php-watch
yarn watch
docker-compose up -d
```

その後、 [http://192.168.99.100/dog/](http://192.168.99.100/dog/) にアクセス(アドレスは違うこともある)

止める時は各コンソールで`Ctrl-C`した後に

```bash
docker-compose stop
```

# Build

```bash
yarn install
composer install
yarn build
```

# コーディング規約

## JavaScript

ファイル名はハイフン区切り、小文字のみ使用。拡張子はjs。

改行コードはLF。

クラス名はUpperCamelCase。

定数、変数名、メソッド名、関数名はlowerCamelCase。

## PHP

クラス名はUpperCamelCase。

メソッド名、関数名、変数名はlowerCamelCase。

定数名はUPPER_SNAKE_CASE。


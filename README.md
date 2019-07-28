# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :chatgroups, through:  :users_chatgroups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|chatgroup_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :chatgroup

## chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users,  through:  :users_chatgroups
- has_many  :messages

## users_chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|chatgroup_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :chatgroup

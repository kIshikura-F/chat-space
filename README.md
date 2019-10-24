# README

## usersテーブル

|Column  |Type   |Options |
|--------|-------|--------|
|name    |string |null: false|
|mail    |string |null: false, unique: true|

### Association
- has_many :groups
- has_many :posts

## groupsテーブル

|Column  |Type   |Options |
|--------|-------|--------|
|title   |string |null: false|

### Association
- has_many   :users
- belongs_to :post
- ha_many through :groups_users

## groups_usersテーブル

|Column  |Type   |Options |
|--------|-------|--------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## postsテーブル
|Column  |Type   |Options |
|--------|-------|--------|
|message |text   ||
|image   |text   ||
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
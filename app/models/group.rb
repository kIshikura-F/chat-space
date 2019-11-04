class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :posts
  validates :name, presence: true, uniqueness: true
  
  def show_last_post
    if (last_post = posts.last).present?
      last_post.content? ? last_post.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end



end

class Api::PostsController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_post_id = params[:id].to_i
    @posts = group.posts.includes(:user).where("id > #{last_post_id}")
  end
end
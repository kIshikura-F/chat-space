class PostsController < ApplicationController
  before_action :set_group, only: [:index, :create]
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @post = Post.new
    @posts = @group.posts.includes(:user)
  end

  def create
    @post = @group.posts.new(post_params)
    if @post.save
      respond_to do |format|
        format.html { redirect_to group_posts_path(params[:group_id]), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @post = @group.posts.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
    def set_group
      @group = Group.find(params[:group_id])
    end

    def post_params
      params.require(:post).permit(:content, :image).merge(user_id: current_user.id)
    end
end

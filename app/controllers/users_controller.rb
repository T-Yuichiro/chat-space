class UsersController < ApplicationController

  def edit
  end

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def update
    if current_user.update(user_params) # 保存をできた場合
      redirect_to root_path
    else  # 保存をできなかった場合
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end

class SessionController < ApplicationController
  # GET /login
  def new
  end

  # POST /login
  def create
    user = User.find_by!(name: params[:name])
    session[:user_id] = user.id
    redirect_to dashboard_path
  end

  # GET /logout
  def destroy
    session[:user_id] = nil
    redirect_to login_path
  end
end

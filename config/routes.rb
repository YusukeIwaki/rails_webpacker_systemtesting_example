Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/dashboard', to: 'dashboard#index', as: 'dashboard'

  get '/login', to: 'session#new', as: 'login'
  post '/login', to: 'session#create'
  get '/logout', to: 'session#destroy', as: 'logout'

  namespace :api, defaults: { format: :json } do
    resources :announcements, only: [:index]
  end

  root to: 'dashboard#index'
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/dashboard', to: 'dashboard#index'

  namespace :api, defaults: { format: :json } do
    resources :announcements, only: [:index]
  end
end

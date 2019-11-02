Rails.application.routes.draw do
  resources :products
  devise_for :users
  root to:"groups#index"

  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
    resources :posts, only: [:index]
end

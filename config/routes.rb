Rails.application.routes.draw do
  namespace :api do
    resources :items
    resources :sales
    resources :customers
    get 'dates', to: "dates#get_dates"
  end

  namespace :admin do
    resources :users
    resources :customers
    resources :items
    resources :sales
    root to: "users#index"
  end
  root to: 'visitors#index'
  devise_for :users
  resources :users
  resources :visitors
end

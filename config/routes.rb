Rails.application.routes.draw do


  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/login'
  # get 'sessions/welcome'
  # get 'users/new'
  # get 'users/create'

  resources :users, only: [:new, :create]
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  get 'welcome', to: 'sessions#welcome'
  


  namespace :api do 
    namespace :v1 do 
      resources :schedules
    end 
  end


  get '/', to: "sessions#welcome"
  # root to: "application#welcome"

  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

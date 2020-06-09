Rails.application.routes.draw do


  scope :api do 
    scope :v1 do 
      resources :schedules
    end 
  end

  root to: "views/index.html"
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

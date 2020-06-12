class ApplicationController < ActionController::API
    include ActionController::Helpers
    helper_method :current_user
    helper_method :logged_in?

    def welcome
        render "index"
    end

    def current_user    
        User.find_by(id: session[:user_id])  
    end

    def logged_in?
       
        !current_user.nil?  
    end
    
end

class SchedulesController < ApplicationController

    def index
        @schedules = Schedule.all
        render json: @schedules
    end 
     
    def show
    end 
    
    def cretae
    end 
    
    def update
    end 
   
    def destroy
    end 
    
end

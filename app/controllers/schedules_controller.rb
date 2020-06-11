class SchedulesController < ApplicationController

    def index
        @schedules = Schedule.all
        render json: @schedules
    end 
     
    def show
        render json: @schedule
    end 
    
    def create
        @schedule = Schedule.new(schedule_params)

        if @schedule.save
            render json: @schedule
        else
            render json:{errors: @schedule.errors.full_message}
        end
    end 
    
    def update
    end 
   
    def destroy
    end 

    private

    def schedule_params
        params.require(:schedule).permit(:title, :content)
    end
    
end

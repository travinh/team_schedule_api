class SchedulesController < ApplicationController
    before_action :find_schedule, only:[:show, :update, :destroy,:create]

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
           
            render json:{errors: @schedule.errors.full_messages}
        end
    end 
    
    def update
        if @schedule.update(schedule_params)
            render json: @schedule
        else
            render json:{errors: @schedule.errors.full_messages}
        end
    end
   
    def destroy
        @schedule.destroy
        render json: @schedule
    end 



    private
    def find_schedule
        @schedule =  Schedule.find_by(id:params[:id])
        
    end

    def schedule_params
        params.require(:schedule).permit(:title, :content, :id, :num_member)
    end
    
end

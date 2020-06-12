class API{
    static baseUrl = "http://localhost:3000/api/v1/schedules"
    
    static get(){
        return(
            fetch(baseUrl)
            .then(resp => resp.json())
            .then(schedules => {
                schedules.forEach(function(schedule){
                    const scheduleObj = new Schedule(schedule)
                    scheduleObj.renderSchedule()
                
                })
                
            })
        )
        
    }
}
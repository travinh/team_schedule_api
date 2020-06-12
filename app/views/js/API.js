class API{
    static baseUrl = "http://localhost:3000/api/v1/schedules"
    
    static options = {
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }


    static get(){
        return(
            fetch(baseUrl)
            .then(resp => resp.json())
           
        )
        
    }
    static post(data){

        const options={
            ...API.options,
            method: 'POST',
            body: JSON.stringify({schedule:data}) // body data type must match "Content-Type" header
    
        }
        
        fetch(API.baseUrl,options)
        .then(resp => resp.json())
        .then((data) =>{
            if (!data.errors){
                //add new schedule to schedule List by creating it
                new Schedule(data)
                //display schedules
                Schedule.renderSchedules()
                clearForm()
            }
            else{
                throw new Error( `${data.errors}`)
            }
                        
        })
        .catch(alert)
    }

    
}
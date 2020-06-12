class Schedule{

    static all= []

    constructor({id,title,content,num_member}){
        this.id = id
        this.title = title
        this.content = content
        this.num_member = num_member
        Schedule.all.push(this)
    }

    htmlifySchedule(){
        return(`
        <div class="card"  >
            <div class="card-content" id=${this.id}>
              <span class="card-title">${this.title}</span>
              <p><span>${this.content}</span></p>
              <p class="num_member">${this.num_member}</p>
              <button class="plus">+</button>
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
    
            </div>
            
        </div>
        `
        )
    }

    renderSchedule(){
        const scheduleList = document.querySelector(".schedule-lists")
        scheduleList.innerHTML += this.htmlifySchedule()
    
    
    }

    static loadSchedules(){
        //send request, then create all schedules from data
        API.get()
        .then(data => {
            debugger
        })
    }


}
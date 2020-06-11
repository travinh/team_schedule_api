document.addEventListener("DOMContentLoaded",function(){
    loadSchedules() //load the pages with all schedules and form first
    mountFormListener() // then listen to the next step
    eventDelegation()
})

const formTitle = document.querySelector("#title")
const formContent = document.querySelector("#content")

function eventDelegation(){
    const scheduleList = document.querySelector(".schedule-lists")
    scheduleList.addEventListener("click",function(e){

        if (e.target.className === "plus"){
           
            let num_member = e.target.parentElement.querySelector(".num_member").innerText
            num_member = parseInt(num_member)
            num_member = num_member + 1
        
        }
        else if (e.target.className === "edit"){
            
            //grab the data from this card
            const[title,content] = e.target.parentElement.querySelectorAll("span")
           
            //populate the form with values
            formTitle.value = title.innerText
            formContent.value = content.innerText

            //make change 
            
            // change type of fetch sent

            //clean up
        
        }
        else if (e.target.className === "delete"){
            console.log("delete")
        }
    })

}

function mountFormListener(){
    const postForm = document.getElementById("schedule-form")
    postForm.addEventListener("submit", function(event){
        event.preventDefault()
        
        // grab the text from each field
        const postObj = getScheduleData(event)

        fetch("http://localhost:3000/api/v1/schedules", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(postObj) // body data type must match "Content-Type" header
          })
          .then(resp => resp.json())
          .then((data) =>{
              const htmlSchedule = htmlifySchedule(data)

              renderSchedule(htmlSchedule)
              clearForm()
          })


        //   const htmlSchedule = htmlifySchedule(postObj)
        //   renderSchedule(htmlSchedule)
        //   clearForm(event)


        // if (postForm.dataset.action === "create"){
        //     API.post(postObj)
        // }else if (postForm.dataset.action === "update"){
        //     const Id = event.target.dataset.id
        //     API.patch(postObj, Id)
        // }

    })
}


function loadSchedules(){
    fetch("http://localhost:3000/api/v1/schedules")
    .then(resp => resp.json())
    .then(data => {
        addSchedulesToDom(data)
    })
}

function addSchedulesToDom(schedules){
    schedules.forEach(function(schedule){
        renderSchedule(htmlifySchedule(schedule))
      
        
    })
}

const htmlifySchedule = function(schedule){
    return(`
    <div class="card"  >
        <div class="card-content" id="${this.id}">
          <span class="card-title">${schedule.title}</span>
          <p><span>${schedule.content}</span></p>
          <p class="num_member">${schedule.num_member}</p>
          <button class="plus">+</button>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>

        </div>
        
    </div>
    `
    )
}

const renderSchedule = (schedule) => {
    const scheduleList = document.querySelector(".schedule-lists")
    scheduleList.innerHTML += schedule


}

function getScheduleData(){
    return {
        title: formTitle.value,
        content: formContent.value
    }  
}

function clearForm (){
    formTitle.value = ""
    formContent.value = ""
}
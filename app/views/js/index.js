document.addEventListener("DOMContentLoaded",function(){
    loadSchedules() //load the pages with all schedules and form first
    mountFormListener() // then listen to the next step
    eventDelegation()
})

const formTitle = document.querySelector("#title")
const formContent = document.querySelector("#content")
const postForm = document.getElementById("schedule-form")
const baseUrl = "http://localhost:3000/api/v1/schedules"

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
            postForm.dataset.id = e.target.parentElement.id
            
            //make change 
            document.querySelector(".btn").value = "Edit Schedule"
            postForm.dataset.action = "update"
            

            // change type of fetch sent

            //clean up - havr to change data action back to create
        
        }
        else if (e.target.className === "delete"){
            const id = e.target.parentElement.id
            console.log("delete",id)
            deleteSchedule(id)
            
        }
    })

}

function mountFormListener(){
    const postForm = document.getElementById("schedule-form")
    
    postForm.addEventListener("submit", function(event){
        event.preventDefault()
        
        // grab the text from each field
        const postObj = getScheduleData(event)
        
        let options

        if (postForm.dataset.action === "create")
        {
            options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  "Accept": "application/json"
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(postObj) // body data type must match "Content-Type" header
            }
            url = baseUrl 
            
        }
        else if (postForm.dataset.action === "update"){
            options = {
                method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  "Accept": "application/json"
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(postObj) // body data type must match "Content-Type" header
            }

            url = `${baseUrl}/${postForm.dataset.id}`
        }

        fetch(url,options)
              .then(resp => resp.json())
              .then((data) =>{
                if (!data.errors){
                    loadSchedules()
                    clearForm()
                }
                else{
                    throw new Error( `${data.errors}`)
                }
                              
              })
              .catch(alert)

        


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
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(data => {
        addSchedulesToDom(data)
    })
}

function addSchedulesToDom(schedules){
    document.querySelector(".schedule-lists").innerHTML = ""
    schedules.forEach(function(schedule){
        renderSchedule(htmlifySchedule(schedule))
       
    })
}

const htmlifySchedule = function(schedule){
    return(`
    <div class="card"  >
        <div class="card-content" id=${schedule.id}>
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
    delete postForm.dataset.id
    postForm.dataset.action="create"
    formTitle.value = ""
    formContent.value = ""

    
}

async function deleteSchedule(id){

    const resp = await fetch(`${baseUrl}/${id}`,{
        
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
    })
    
    const data = await resp.json()

    if (!data.errors){
        console.log(data)
    }
    else{
        throw new Error( `${data.errors}`)
    }


    loadSchedules()
}
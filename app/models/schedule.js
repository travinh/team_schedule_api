class Schedule{

    static all= []

    constructor({id,title,content,num_member}){
        this.id = id
        this.title=title
        this.content=content
        this.num_member=num_member
        Schedule.all.push(this)
    }
}
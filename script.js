// INITIALIZE LOCAL STORAGE
function initializePost(){
    if (localStorage.getItem("posts") !== null){
        return
    } else if(localStorage.getItem("posts") === null){
        localStorage.setItem("posts", JSON.stringify([]))
    } else{
        return "Something is wrong. Please try again"
    }
}

// example data REMOVE AT THE END
let posts = [
    {id: 1, author: "Hector", date: new Date().toString(), content: "string", tags:"do we need this"},
    {id: 2, author: "Gorganzola", date: new Date().toString(), content: "string2", tags: "yikes"}]

// READ function


// CREATE function


// UPDATE function


// DELETE function


// SEARCH function


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

initializePost();

// example data REMOVE AT THE END
let posts = [
    {id: 1, author: "Hector", date: new Date().toString(), content: "string", tag: "string"},
    {id: 2, author: "Gorganzola", date: new Date().toString(), content: "string2", tag: "string2"}];

localStorage.setItem("posts", JSON.stringify(posts));

// READ function
getAllPost = () => {
    let allPost = JSON.parse(localStorage.getItem("posts"));
    return allPost;
};

// CREATE function
function createPost(){

    //ties variable to value of textarea box
    let contenttext = document.getElementById("newPost").value;

    //ties variable to value of name box
    let authortext = document.getElementById("newPostAuthor").value;

    //ties variable to current array in storage
    let output = JSON.parse(localStorage.getItem('posts'));

    //ties variable to random number under 100,000
    let idtext = Math.floor(Math.random() * 100000);

    //for loop that iterates through the current array in storage and checks if the random number is already assigned to another object in the array
    for (let i = 0; i < output.length; i++) {
    if (output[i].id === idtext) {
        idtext = Math.floor(Math.random() * 100000);
        i = -1;
        continue;
    }}

    //declares a new object consisting of id, author, date, and content
    let object = {id: idtext, author: authortext, date: new Date().toString(), content: contenttext};

    //pushes new object into the array
    output.push(object);

    //saves new array into local storage
    localStorage.setItem("posts", JSON.stringify(output));

    //clears textarea box
    document.getElementById("newPost").value = '';

    //clears name box
    document.getElementById("newPostAuthor").value = '';
}

// VALIDATE FUNCTION
function validatePost(){
    //ties variable to value of textarea box
    let x = document.getElementById("newPost").value;

    //ties variable to value of name box
    let y = document.getElementById("newPostAuthor").value;

    //if statement that checks if the textarea box is empty or if the name box is empty and sends alert
    if (x != "" && y != "") {
    createPost();
    } else {
        alert("Please fill in all fields")
}}

const el = document.getElementById("submit");
el.addEventListener("click", validatePost);
// UPDATE function


// DELETE function


// SEARCH function


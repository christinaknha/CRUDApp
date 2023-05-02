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
    {id: 1, author: "Hector", date: new Date().toString(), content: "Any Questions?", tags: ["no", "are you sure", "okay"]},
    {id: 2, author: "Erin", date: new Date().toString(), content: "Finish your resumes", tags:[]}]

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

function updatePost(id, updatedContent) {
  //Gets the post data from the local storage.
let posts = JSON.parse(localStorage.getItem("posts"));
//Find the post that needs to be updated by its id.
let postIndex = posts.findIndex(post => post.id === id);
//update the content of the post.
posts[postIndex].content = updatedContent;
// save the updated content to local storage.
localStorage.setItem("posts", JSON.stringify(posts));
}

// DELETE function
function deletePost(id) {
    // retrieves from array, filters array, and stores back in localStorage
    const posts = JSON.parse(localStorage.getItem('posts'));
    const postUpdate = posts.filter(item => item.id !== id);
    
    localStorage.setItem('posts', JSON.stringify(postUpdate));
    
};
console.log(JSON.parse(localStorage.getItem('posts')))

deletePost(2)
console.log(JSON.parse(localStorage.getItem('posts'))) 

// SEARCH function
function searchPosts(){
    let keyWord = document.getElementById("keyWordEntry").value
        console.log(keyWord)

    current_posts = JSON.parse(localStorage.getItem("posts"))
    // console.log(current_posts[1])
    
    if (keyWord && keyWord.length > 0){
        keyWord = keyWord.toLowerCase();
        let post = current_posts.filter(current_post => current_post.tags === keyWord);
        console.log(post)
        return post 
    } else {
        alert ("Please enter a valid search")
    }
}


let searchButton = document.getElementById("keyWordSearch")
searchButton.addEventListener("click", searchPosts)

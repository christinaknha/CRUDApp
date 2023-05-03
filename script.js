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

 let postData = JSON.parse(localStorage.getItem("posts"));

// READ function
    
getAllPost = () => {
    let allPost = JSON.parse(localStorage.getItem("posts"));
    return allPost;
};

// CREATE function

//restrieves array of posts
function getPostData(){
    currentPostData = JSON.parse(localStorage.getItem("posts"));
    return currentPostData;
}

//pushes new array to local storage
function updatePostData(PostObject){ 
    postData.push(PostObject);
    localStorage.setItem("posts", JSON.stringify(postData));
}

function assignRandomId() {
    //declares a new random id
    let idtext = Math.floor(Math.random() * 100000);

    //loops through the array and checks if the id is already in the array and assigns a new random id if true
    for (let i = 0; i < postData.length; i++) {
        if (postData[i].id === idtext) {
            idtext = Math.floor(Math.random() * 100000);
            i = -1;
            continue;
        }}
    return idtext;
}

function createPost() {

    //ties variable to value of textarea box
    let contenttext = document.getElementById("newPost").value;

    //ties variable to value of name box
    let authortext = document.getElementById("newPostAuthor").value;

    //creates a new random id
    let randomid = assignRandomId();

    //declares a new object consisting of id, author, date, and content, and tag
    let PostObject = {id: randomid, author: authortext, date: new Date().toString(), content: contenttext, tag: "string"};

    //adds the object to the array
    updatePostData(PostObject);

    //clears textarea box
    document.getElementById("newPost").value = '';

    //clears name box
    document.getElementById("newPostAuthor").value = '';
}

// // VALIDATE FUNCTION
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
    // needs button with event listener
    // How are we going to demonstrate this in the presentation?

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

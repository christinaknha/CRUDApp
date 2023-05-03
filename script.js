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
    // pulls all post from local storage
    let allPost = JSON.parse(localStorage.getItem("posts"));
    // loops through all post starting from most recent post, pulling necessary info
    for (let i = allPost.length-1; i >= 0; i--){
        let feed = document.getElementById("feed");
        let newPost = document.createElement("div");    
        let authorToAdd = allPost[i].author;
        let dateToAdd = allPost[i].date;
        let postToAdd = allPost[i].content;
        let tagsToAdd = allPost[i].tags;
        let editB = '<button id="editButton' + [i] +'" class="btn btn-primary btn-lg" type="button">Edit Post</button>'
        let deleteB = '<button id="deleteButton'+ [i] +'"class="btn btn-primary btn-lg" type="button">' + 'Delete Post</button>'
        // creates new HTML using post pulled
        newPost.innerHTML = '<div class="p-5 mb-4 bg-body-tertiary rounded-3">'+  
          '<div class="container-fluid py-5">' +
          '<h1  class="display-5 fw-bold">' + authorToAdd + '</h1>' +
          '<p class="post">' + dateToAdd +'</p>' + '<p class="post">' + postToAdd +'</p>' +
          '<p class="post">' + '#' + tagsToAdd +'</p>'  
        //   '<button id="editButton" class="btn btn-primary btn-lg" type="button">Edit Post</button>' +
        //   '<button id="deleteButton" class="btn btn-primary btn-lg" type="button">Delete Post</button>'
        + editB + deleteB +
        '</div>' +
        '</div>'
        // appends it to the screen
        feed.appendChild(newPost)
    }
}

getAllPost();


// CREATE function

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

        let feed = document.getElementById("feed");
    feed.innerHTML="",
    getAllPost();


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

// SEARCH function
function searchPosts(){
    // pulls user input and stores in in keyWord
    let keyWord = document.getElementById("keyWordEntry").value
    // parses stored local data
    current_posts = JSON.parse(localStorage.getItem("posts"))
        // finds all tags that includes keyWord
        let post = current_posts.filter(current_post => current_post.tags.includes(keyWord));
        // resets the page 
        feed.innerHTML=""
        // 
        for (j = post.length-1; j >= 0; j --){
            let feed = document.getElementById("feed");
            let newPost = document.createElement("div");
            newPost.innerHTML = '<div class="p-5 mb-4 bg-body-tertiary rounded-3">'+  
            '<div class="container-fluid py-5">' +
            '<h1  class="display-5 fw-bold">' + post[j].author + '</h1>' +
            '<p class="post">' + post[j].date +'</p>' + '<p class="post">' + post[j].content +'</p>' +
            '<p class="post">' + '#' + post[j].tags +'</p>' + 
            '<button id="editButton" class="btn btn-primary btn-lg" type="button">Edit Post</button>' +
            '<button id="deleteButton" class="btn btn-primary btn-lg" type="button">Delete Post</button>' +
            '</div>' +
            '</div>'
            feed.appendChild(newPost)
            }
            console.log(post)
    }
// }

// Validation for searching keyword
function searchValidation(){
    let keyWord = document.getElementById("keyWordEntry").value
    if (keyWord != "" && keyWord.length > 0){
        searchPosts();
    } else if (keyWord == ""){
        alert("Please enter a valid search")
    }
    }


let searchButton = document.getElementById("searchButton")
searchButton.addEventListener("click", searchValidation)

//button-form event functions
document.getElementById("update-btn").addEventListener("onClick", function(event){

})
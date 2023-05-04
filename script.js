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
initializePost()

let postData = JSON.parse(localStorage.getItem("posts"));

//CODE TO READ AND GENERATE POSTS
function getAllPost () {
    // LOOPS THROUGH ALL POST STARTING FROM MOST RECENT
    for (let i = postData.length-1; i >= 0; i--){
        let feed = document.getElementById("feed");
        let newPost = document.createElement("div");  
        let authorToAdd = postData[i].author;
        let dateToAdd = postData[i].date;
        let postToAdd = postData[i].content;
        let tagsToAdd = postData[i].tags;
        let editB = '<button id="' + postData[i].id2 +' " onClick=renderUpdatePage(this.id) " style="background-color: #003D5B " class="btn btn-primary btn-lg" type="button">Edit Post</button>'
        let deleteB = '<button id="'+ postData[i].id  +'" onclick="deletePost(this.id)"style="background-color: #003D5B " class="btn m-3 btn-primary btn-lg" type="button">' + 'Delete Post</button>'
        // CREATES NEW HTML USING POST PULLED
        newPost.innerHTML = 
        '<div class="p-5 mb-4 bg-body-tertiary rounded-3">'+  
        '<div class="container-fluid py-5">' +
        '<h1  class="display-5 fw-bold">' + authorToAdd + '</h1>' +
        '<p class="post">' + dateToAdd +'</p>' + 
        '<p class="post">' + postToAdd +'</p>' +
        '<p class="post">' + tagsToAdd +'</p>'  
        + editB + deleteB +
        '</div>' +
        '</div>'
        // PRINTS HTML TO SCREEN
        feed.appendChild(newPost)
    }
}

// PRINTS ALL POST TO THE SCREEN
getAllPost();

// CODE FOR CREATING NEW POST 
//FUNCTION THAT PUSHES NEW ARRAY TO LOCAL STORAGE
function updatePostData(PostObject){ 
    postData.push(PostObject);
    localStorage.setItem("posts", JSON.stringify(postData));
}
  
//FUNCTION THAT GENERATES A RANDOM NUMBER AND ASSIGNS IT TO POSTS
function assignRandomId() {
    //DECLARES A NEW RANDOM ID
    let idtext = Math.floor(Math.random() * 100000);
  
    // LOOPS THROUGH THE ARRAY AND CHECKS IF THE ID IS ALREADY USED AND ASSIGNS NEW RANDOM ID IF TRUE
    for (let i = 0; i < postData.length; i++) {
        if (postData[i].id === idtext) {
            idtext = Math.floor(Math.random() * 100000);
            i = -1;
            continue;
        }
    }
    return idtext;
}
  
// FUNCTION TO CREATE POSTS
function createPost() {
  
    //TIES VARIABLE TO VALUE OF TEXTAREA BOX
    let contenttext = document.getElementById("newPost").value;
  
    //TIES VARIABLE TO VALUE OF NAME BOXties
    let authortext = document.getElementById("newPostAuthor").value;

  
    //CREATES TWO NEW RANDOM IDS
    let randomid = assignRandomId();

    let randomid2 = assignRandomId();
  
    //TIES VARIABLE TO VALUE OF TAG BOX
    let tagsText = document.getElementById("newTags").value;
    tagsText = tagsText.split(",")
    
    //DECLARES A NEW OBJECT CONSISTING OF ID, ID2, AUTHOR, DATE, CONTENT, AND TAGS
    let PostObject = {id: randomid, id2: randomid2, author: authortext, date: new Date().toString(), content: contenttext, tags: tagsText};
  
    //ADDS THE OBJECT TO THE ARRAY
    updatePostData(PostObject);
  
    //CLEARS THE TEXTAREA BOX
    document.getElementById("newPost").value = '';
  
    //CLEARS NAME BOX
    document.getElementById("newPostAuthor").value = '';
  
    //CLEARS TAG BOX
    document.getElementById("newTags").value = '';
  }
  
// VALIDATE FUNCTION
function validatePost(){

    //TIES VARIABLE TO VALUE OF TEXTAREA BOX 
    let x = document.getElementById("newPost").value;
  
    //TIES VARIABLE TO VALUE OF NAME BOX
    let y = document.getElementById("newPostAuthor").value;
  
    //CHECKS TO SEE IF THE TEXT AREA BOX IS EMPTY OR IF NAME BOX IS EMPTY
    if (x != "" && y != "") {
        createPost();
        // CLEARS PAGE AND RERENDERS POSTS
        let feed = document.getElementById("feed");
        feed.innerHTML="";
        getAllPost();
    } else {
        alert("Please fill in all fields")
  }}
  
  const el = document.getElementById("submit");
  el.addEventListener("click", validatePost);
  

// CODE FOR UPDATING AN OLD POST 
let neededId;
let neededPost;
// GRABS THE ID2 OF THE POST THAT WAS CLICKED ON
function reply_click(clicked_id){
    console.log(clicked_id)
    return(clicked_id)
}

function renderUpdatePage(a){
    // STORES ID2 GRABBED IN VARIABLE
    neededId = reply_click(a)

    // FILTERS POST FOR POST WITH MATCHING ID2
    neededPost = postData.filter(post => post.id2 == neededId);
    
    // STORES DATA FROM PREVIOUS POST INTO VARIABLES
    let authorToAdd = neededPost[0].author;
    let postToAdd = neededPost[0].content;
    let tagsToAdd = neededPost[0].tags;
    
    // CLEARS THE POST ON PAGE
    let feed = document.getElementById("feed");
    feed.innerHTML = "";

    // CREATES INPUT TEXT FIELD POPULATED WITH AUTHOR DATA
    let inputName = document.createElement("input");
    inputName.type= "text";
    inputName.className = "form-control mb-3";
    inputName.value = authorToAdd;

    // CREATES TEXT AREA FIELD POPULATED WITH POST DATA
    let textareaPost = document.createElement("textarea");
    textareaPost.className = "form-control-lg mb-3";
    textareaPost.value = postToAdd;

    // CREATES INPUT TEXT AREA FIELD POPULATED WITH TAG DATA
    let inputTags = document.createElement("textarea");
    inputTags.className = "text";
    inputName.className = "form-control mb-3";
    inputTags.value = tagsToAdd;

    // CLEARS PAGE AND REPOPULATES TO LET EDITS OCCUR
    // feed.innerHTML="";
    let newPost = document.createElement("div");  
    newPost.innerHTML = 
    '<input id="authorEdit" maxlength="30" type="text" class="form-control mb-3" id="newPostAuthor" value="' + authorToAdd + '">' +
    '<textarea id="contentEdit" maxlength="200" class="form-control-lg mb-3" id="newPost" rows="3" cols="40">' + postToAdd + '</textarea>' +
    '<input id="tagsEdit" maxlength="30" type="text" class="form-control mb-3" id="newTags" value="' + tagsToAdd +'">' +
    '<button id="submitUpdate" onclick="completeUpdate(this.id)" style="font-family: \'Montserrat\';" type="button" class="col-3 btn btn-warning align-self-end">Update Post</button>'
    feed.appendChild(newPost)
}

// UPDATES POST WITH NEW INFORMATION
function completeUpdate(){
    // CREATES VARIABLES THAT STORE DATA INSIDE TEXT FIELDS
    let authorEdit = document.getElementById("authorEdit").value;
    let contentEdit = document.getElementById("contentEdit").value;
    let tagsEdit = document.getElementById("tagsEdit").value;
   
    // FINDS THE POST INDEX
    let neededIndex;
    for (let i = 0; i < postData.length; i ++){
        if (postData[i].id2 == neededId)
        neededIndex = i;
    }

    if(authorEdit != "" && contentEdit != ""){
        // UPDATES LOCAL STORAGE COMPONENTS
        postData[neededIndex].author = authorEdit;
        postData[neededIndex].content = contentEdit;
        postData[neededIndex].tags = tagsEdit

        // SAVES TO LOCAL STORAGE
        localStorage.setItem('posts', JSON.stringify(postData))
    } else {
        alert("Please fill in all fields")
    }
    // CLEARS PAGE AND RERENDERS POSTS
    let feed = document.getElementById("feed");
    feed.innerHTML="";
    getAllPost();

}

// CODE FOR DELETING A POST 
function deletePost(x){

    // STORES ID OF POST IN A VARIABLE
    let y = reply_click(x)

    // SEARCHES LOCAL STORAGE FOR MATCHING ID
    for(let i = 0; i < postData.length; i++){
        if (y == postData[i].id){
            //SPLICES POST WITH MATCHING ID FROM LOCAL STORAGE
            postData.splice(i,1);

            // UPDATES LOCAL STORAGE
            localStorage.setItem('posts', JSON.stringify(postData))
        }
    }
    // CLEARS PAGE AND RERENDERS POSTS
    let feed = document.getElementById("feed");
    feed.innerHTML=""
    getAllPost();
  };


// CODE FOR KEYWORD SEARCHING 
function searchPosts(){
    
    // STORES USER INPUT IN A VARIABLE
    let keyWord = document.getElementById("keyWordEntry").value

    // FILTERS LOCAL STORAGE TO FIND TAGS THAT INCLUDE KEYWORD
    let post = postData.filter(post => post.tags.includes(keyWord));

    // CLEARS THE PAGE
    let feed = document.getElementById("feed");
    feed.innerHTML=""

    // LOOPS THROUGH POST ARRAY AND RENDERS STARTING WITH MOST RECENT POST
    for(let i = post.length - 1; i >= 0; i--){
        let editB = '<button id="' + postData[i].id2 +' " onClick=renderUpdatePage(this.id) " style="background-color: #003D5B " class="btn btn-primary btn-lg" type="button">Edit Post</button>'
        let deleteB = '<button id="'+ postData[i].id  +'" onclick="deletePost(this.id)"style="background-color: #003D5B " class="btn m-3 btn-primary btn-lg" type="button">' + 'Delete Post</button>'
        
        // TEMPLATE FOR POSTS TO RENDER
        let newPost = document.createElement("div");  
        newPost.innerHTML = 
        '<div class="p-5 mb-4 bg-body-tertiary rounded-3">'+  
        '<div class="container-fluid py-5">' +
        '<h1  class="display-5 fw-bold">' + post[i].author + '</h1>' +
        '<p class="post">' + post[i].date +'</p>' + 
        '<p class="post">' + post[i].content +'</p>' +
        '<p class="post">' + post[i].tags +'</p>' + 
        editB + deleteB +
        '</div>' +
        '</div>'
        
        // RENDERS POSTS TO PAGE
        let feed = document.getElementById("feed");
        feed.appendChild(newPost);
        
    }
    // RESET KEYWORD TO BLANK
    keyWord = "";
}

function searchValidation(){
    // STORES USER INPUT INTO A VARIABLE
    let keyWord = document.getElementById("keyWordEntry").value

    // CHECKS TO SEE IF USER INPUT HAS CHARACTERS AND THEN SEARCH POST
    if (keyWord != "" && keyWord.length > 0){
        searchPosts();

    // IF NOT, ALERT WINDOW POPS UP
    } else if (keyWord == ""){
        alert("Please enter a valid search")
    }
}

// CREATE EVENT LISTENER FOR SEARCH BUTTON
let searchButton = document.getElementById("searchButton")
searchButton.addEventListener("click", searchValidation)

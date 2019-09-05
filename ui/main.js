// Js for Hide and show modal
document.getElementById('post-btn').addEventListener('click', 
function() {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', 
function(){
    document.querySelector('.bg-modal').style.display = 'none'; 
});

/////////////////////////////////////////////////////////

// Js for hide and show search bar
document.querySelector('#search-icon').addEventListener('click', 
function(){
    document.querySelector('.search').style.display = 'block'; 
});

///////////////////////////////////////////////////////

// Js for post validation

const myPost = document.querySelector('#my-post');
const topicInput = document.querySelector('#topicInput');
const sayInput = document.querySelector('#sayInput');
const topicError = document.querySelector('.topic-msg');
const topicError1 = document.querySelector('.topic-error1');
const topicError2 = document.querySelector('.topic-error2');
const postBtn = document.querySelector('.post-button');

myPost.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    if(topicInput.value === "" || sayInput.value === "") {
        topicError.classList.add('msg');
        topicError.innerHTML = 'Please fill in Topic and Your Say';
        setTimeout(() => topicError.remove(), 3000);
    } else {
        console.log('success');
    }

}
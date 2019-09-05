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



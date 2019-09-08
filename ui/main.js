// Js for Hide and show modal
document.getElementById("post-btn").addEventListener("click", function() {
  document.querySelector(".bg-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function() {
  document.querySelector(".bg-modal").style.display = "none";
});

window.addEventListener('click', outsidePost);
function outsidePost(e){
  if(e.target == document.querySelector(".bg-modal")) {
    document.querySelector(".bg-modal").style.display = "none";
  }
}

/////////////////////////////////////////////////////////

// Js for hide and show search bar
document.querySelector("#search-icon").addEventListener("click", function() {
  document.querySelector(".search").style.display = "block";
});

///////////////////////////////////////////////////////

// Js for post validation
const myPost = document.querySelector("#my-post");
const topicInput = document.querySelector("#topicInput");
const sayInput = document.querySelector("#sayInput");
const topicError = document.querySelector(".topic-msg");
const modalInput = document.querySelector(".bg-modal");
const heroPost = document.querySelector(".hero");

myPost.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (topicInput.value === "" || sayInput.value === "") {
    topicError.classList.add("msg-error");
    topicError.innerHTML = "Please fill in Topic and Your Say";
    setTimeout(() => topicError.remove(), 3000);
  } else if (topicInput.value.length < 5 || sayInput.value.length < 20) {
    topicError.classList.add("msg-error");
    topicError.innerHTML = "Minimum 5 characters for Topic and 20 for Your Say";
    setTimeout(() => topicError.remove(), 3000);
  } else {
    const post = document.createElement("div");
    post.className = "hero-content-article";

    post.innerHTML = `
    <div class="name-time">
      <p id="username-article">Username</p>
      <p id="time-article">post time</p>
    </div>
    <h4>${topicInput.value}</h4>
    <p>
     ${sayInput.value}
    </p>
    <ul>
      <li onClick="onComment()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="comment"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/></svg>
      </li>
      <li onClick="onVote()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="thumb-down"><path d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"/></svg>
      </li>
    </ul>`;

    topicError.classList.add("msg");
    topicError.innerHTML = "Your Post was sent successfully";
    heroPost.appendChild(post);
    setTimeout(() => topicError.remove(), 3000);

    // clear fields
    topicInput.value = "";
    sayInput.value = "";
  }
}

/////////////////////////////////////////////////////////////////////

// Js for voting article
const onVote = () => {
  document.querySelector("#thumb-down").style.fill = "red";
};

////////////////////////////////////////////////////////////////////////

// Js for Hide and show comment modal
  // Get DOM Elements
  const commentModal = document.querySelector('.bg-comment');
  const commentBtn = document.querySelector('#comment');
  const closeBtn = document.querySelector('.close-icon');
  
  // Events
  commentBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);
  
  // Open
  function openModal() {
    commentModal.style.display = 'flex';
  }
  
  // Close
  function closeModal() {
    commentModal.style.display = 'none';
  }
  
  // Close If Outside Click
  function outsideClick(e) {
    if (e.target == commentModal) {
      commentModal.style.display = 'none';
    }
  }

  ////////////////////////////////////////////////////////////////////
  

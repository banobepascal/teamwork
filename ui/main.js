// Js for Hide and show modal
document.getElementById("post-btn").addEventListener("click", function() {
  document.querySelector(".bg-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function() {
  document.querySelector(".bg-modal").style.display = "none";
});

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
    topicError.innerHTML = "Minimum 3 characters for Topic and 20 for Your Say";
    setTimeout(() => topicError.remove(), 3000);
  } else {
    const post = document.createElement("div");
    post.className = "hero-content-article";

    post.innerHTML = ` <div class="hero-content-article">
        <div class="name-time">
          <p id="username-article">Username</p>
          <p id="time-article">post time</p>
        </div>
        <h4>${topicInput.value}</h4>
        <p>
        ${sayInput.value}
       </p>
        <ul>
          <li>
            <img src="svgs/comment.svg" alt="" id="comment" />
          </li>
          <li>
            <img src="svgs/thumbs-down.svg" alt="" id="thumb-down" />
          </li>
        </ul>
      </div>`;

    topicError.classList.add("msg");
    topicError.innerHTML = "Your Post was sent successfully";
    heroPost.appendChild(post);
    
    // clear fields
    topicInput.value = "";
    sayInput.value = "";
  }
}

/////////////////////////////////////////////////////////////////////

// js for user to view article
const heroView = document.querySelector(".hero-content-article");
const backView = document.querySelector(".test-art");
const hero_view = document.querySelector(".test");


heroView.addEventListener('click', function(){
  heroView.classList.add('test');
  // hero_view.appendChild(heroView);
  // backView.style.display = "flex";
});


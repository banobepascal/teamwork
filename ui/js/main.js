/* eslint-disable no-use-before-define */
// Js for Hide and show modal
document.getElementById('post-btn').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});

// eslint-disable-next-line no-use-before-define
window.addEventListener('click', outsidePost);
function outsidePost(e) {
  // eslint-disable-next-line eqeqeq
  if (e.target == document.querySelector('.bg-modal')) {
    document.querySelector('.bg-modal').style.display = 'none';
  }
}

// ///////////////////////////////////////////////////////

// Js for hide and show search bar
document.querySelector('#search-icon').addEventListener('click', () => {
  document.querySelector('.search').style.display = 'block';
  document.querySelector('#search-icon').style.display = 'none';
  document.querySelector('.close-search').style.display = 'block';
});

document.querySelector('.close-search').addEventListener('click', () => {
  document.querySelector('.search').style.display = 'none';
  document.querySelector('#search-icon').style.display = 'block';
  document.querySelector('.close-search').style.display = 'none';
});

// /////////////////////////////////////////////////////

// Js for post validation
const myPost = document.querySelector('#my-post');
const topicInput = document.querySelector('#topicInput');
const sayInput = document.querySelector('#sayInput');
const topicError = document.querySelector('.topic-msg');
const heroPost = document.querySelector('.hero');

// eslint-disable-next-line no-use-before-define
myPost.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (topicInput.value === ' || sayInput.value === ') {
    topicError.classList.add('msg-error');
    topicError.innerHTML = 'Please fill in Topic and Your Say';
    setTimeout(() => topicError.remove(), 3000);
  } else if (topicInput.value.length < 5 || sayInput.value.length < 50) {
    topicError.classList.add('msg-error');
    topicError.innerHTML = 'Minimum 5 characters for Topic and 20 for Your Say';
    setTimeout(() => topicError.remove(), 3000);
  } else {
    const post = document.createElement('div');
    post.className = 'hero-content-article';

    post.innerHTML = `
    <div class='name-time'>
      <p id='username-article'>John Doe</p>
      <p id='time-article'>Now</p>
    </div>
    <h4>${topicInput.value}</h4>
    <p>
     ${sayInput.value}
    </p>
    <p><a href="viewArticle.html">continue reading</a></p>
    <ul>
    <li>
    <a href="viewArticle.html">
      <i class="fa fa-comment" id="comment"></i>
    </a>
  </li>
  <li>
  <i class="fa fa-flag" id="thumb-down"></i>
  </li>
    </ul>`;

    topicError.classList.add('msg');
    topicError.innerHTML = 'Your Post was sent successfully';
    heroPost.appendChild(post);
    setTimeout(() => topicError.remove(), 3000);

    // clear fields
    topicInput.value = '';
    sayInput.value = '';
  }
}

// ///////////////////////////////////////////////////////////////////


// Flag  an article as in apptopiate

const flagArticle = document.querySelector('#thumb-down');

flagArticle.addEventListener('click', onClickFlag);

function onClickFlag(e) {
  e.preventDefault();
  flagArticle.classList.add('fad-flag');
}

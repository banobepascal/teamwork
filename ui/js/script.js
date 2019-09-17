/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
// Js for Hide and show edit modal
// Get DOM Elements
const editModal = document.querySelector('.bg-edit');
const editBtn = document.querySelector('#edit-btn');
const closeEdit = document.querySelector('.close-edit');

// Events
editBtn.addEventListener('click', openEdit);
closeEdit.addEventListener('click', closeEditModal);
window.addEventListener('click', outsideClose);

// Open
function openEdit() {
  editModal.style.display = 'flex';
}

// Close
function closeEditModal() {
  editModal.style.display = 'none';
}

// Close If Outside Click
function outsideClose(e) {
  if (e.target == editModal) {
    editModal.style.display = 'none';
  }
}

// Delete confirm modal
const onDelete = () => {
  const deleteBtn = document.querySelector('#delete-btn');
  const confirmBox = document.querySelector('.confirm');
  const closeDelete = document.querySelector('.confirm__close');
  const btnOk = document.querySelector('.confirm__button--ok');
  const btnCancel = document.querySelector('.confirm__button--cancel');

  // delete events
  deleteBtn.addEventListener('click', openDelete);
  closeDelete.addEventListener('click', closeDeleteModal);
  btnOk.addEventListener('click', deleteArticle);
  btnCancel.addEventListener('click', cancelDelete);
  window.addEventListener('click', outsideDelete);

  // open delete modal
  function openDelete() {
    confirmBox.style.display = 'flex';
  }

  // delete article
  function deleteArticle() {
    document.querySelector('.hero-content-article').outerHTML = '';
    closeDeleteModal();
  }

  // cancel delete
  function cancelDelete() {
    // eslint-disable-next-line no-use-before-define
    closeDeleteModal();
  }

  // close delete modal
  function closeDeleteModal() {
    confirmBox.style.display = 'none';
  }

  // Close If Outside Click
  function outsideDelete(e) {
    if (e.target == confirmBox) {
      confirmBox.style.display = 'none';
    }
  }
};

onDelete();

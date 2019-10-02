/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */

// Delete confirm modal
const onDelete = () => {
  const deleteComment = document.querySelector('#delete-comment');
  const confirmBox = document.querySelector('.confirm');
  const closeDelete = document.querySelector('.confirm__close');
  const btnOk = document.querySelector('.confirm__button--ok');
  const btnCancel = document.querySelector('.confirm__button--cancel');

  // delete events
  deleteComment.addEventListener('click', openDelete);
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
    if (e.target === confirmBox) {
      confirmBox.style.display = 'none';
    }
  }
};

onDelete();

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


  const onDelete = () => {
    if (confirm('Are you sure to delete this record ?')) {
        document.querySelector(".hero-content-article").outerHTML = "";
    }
}

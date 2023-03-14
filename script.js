const exampleModal = document.getElementById('exampleModalToggle2')
exampleModal.addEventListener('show.bs.modal', event => {
  // Button that triggered the modal
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title')
  const modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = `New message to ${recipient}`
  modalBodyInput.value = recipient
})

function submit_form(){
  var form = document.getElementById("my_form");
  const body = form.message.value;
  location.href = "mailto:vitkovska98@outlook.com?subject=Mail from Portfolio&body="+encodeURIComponent(body);
  form.submit();
}

function reset_form(){
  var form = document.getElementById("my_form");
  const recipient = form.recipient.value;
  document.getElementById("my_form").reset();
  document.getElementById("my_form").recipient.value = "Santa";
}

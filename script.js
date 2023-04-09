/**
 * Send an email from modal
 */
const exampleModal = document.getElementById('exampleModalToggle2')
exampleModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget
  const recipient = button.getAttribute('data-bs-whatever')
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

/**
 * Go to top function
 */
let mybutton = document.getElementById("top");

window.onscroll = function() {scrollFunction()};

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
  if ((document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) && screen.width > 768) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

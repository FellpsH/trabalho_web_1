// Inicializando o carrossel
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementById("carousel").getElementsByTagName("img");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // Altere a duração aqui (em milissegundos)
}
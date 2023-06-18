// Função para buscar produtos pelo título
function searchProducts(query) {
    const productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = '';
  
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => response.json())
      .then(productsData => {
        const filteredProducts = productsData.filter(productData => {
          const title = productData.title.toLowerCase();
          const searchTerm = query.toLowerCase();
          return title.includes(searchTerm);
        });
  
        filteredProducts.forEach(productData => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
  
          const img = document.createElement('img');
          img.src = productData.image;
          img.alt = productData.title;
          productDiv.appendChild(img);
  
          const h3 = document.createElement('h3');
          h3.textContent = productData.title;
          productDiv.appendChild(h3);
  
          const span = document.createElement('span');
          span.textContent = `R$ ${productData.price.toFixed(2)}`;
          productDiv.appendChild(span);
  
          productsContainer.appendChild(productDiv);
        });
      })
      .catch(error => {
        console.log('Ocorreu um erro:', error);
      });
  }
  
  // Evento de clique no botão de pesquisa
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
  
    if (query !== '') {
      searchProducts(query);
    }
  });
  
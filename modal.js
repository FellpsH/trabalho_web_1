// ...

// Adicionar o evento de clique ao produto
productDiv.addEventListener('click', () => {
    const productId = productData.id;
    // Abrir o modal com base no ID do produto
    openModal(productId);
  });
  
  // ...
  
  // Função para abrir o modal com base no ID do produto
  function openModal(productId) {
    // Obter os detalhes do produto com base no ID fornecido
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => response.json())
      .then(productData => {
        const productDetailsContainer = document.getElementById('product-details');
  
        // Limpar os detalhes do produto existentes
        productDetailsContainer.innerHTML = '';
  
        // Criar elementos para exibir os detalhes do produto
        const img = document.createElement('img');
        img.src = productData.image;
        img.alt = productData.title;
        productDetailsContainer.appendChild(img);
  
        const h2 = document.createElement('h2');
        h2.textContent = productData.title;
        productDetailsContainer.appendChild(h2);
  
        const pDescription = document.createElement('p');
        pDescription.textContent = productData.description;
        productDetailsContainer.appendChild(pDescription);
  
        const pPrice = document.createElement('p');
        pPrice.textContent = `Preço: R$ ${productData.price.toFixed(2)}`;
        productDetailsContainer.appendChild(pPrice);
  
        const pRating = document.createElement('p');
        pRating.textContent = `Classificação: ${productData.rating.rate} (${productData.rating.count} avaliações)`;
        productDetailsContainer.appendChild(pRating);
  
        // Abrir o modal
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
      })
      .catch(error => {
        console.log('Ocorreu um erro:', error);
      });
  }
  
  // Fechar o modal quando o usuário clica no botão "Fechar"
  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  });
  
  // Fechar o modal quando o usuário clica fora do modal
  window.addEventListener('click', event => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
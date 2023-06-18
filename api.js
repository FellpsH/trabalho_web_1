fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.querySelector('.products-container');

        data.forEach(productData => {
            // Criar elemento de produto
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Atribuir o ID do produto como um atributo de dados
            productDiv.dataset.productId = productData.id;


            // Atribuir a imagem
            const img = document.createElement('img');
            img.src = productData.image;
            img.alt = productData.title;
            productDiv.appendChild(img);

            // Atribuir o título
            const h3 = document.createElement('h3');
            h3.textContent = productData.title;
            productDiv.appendChild(h3);

            // Atribuir o preço
            const span = document.createElement('span');
            span.textContent = `R$ ${productData.price.toFixed(2)}`;
            productDiv.appendChild(span);

            // Atribuir a classificação
            const rating = productData.rating.rate;
            const count = productData.rating.count;
            const spanRating = document.createElement('span');
            spanRating.classList.add('rating'); // Adicionamos a classe 'rating' aqui
            spanRating.textContent = `Rating: ${rating}`;
            productDiv.appendChild(spanRating);

            // DETALHES.HTML
            // Adicionar o evento de clique ao produto
            // productDiv.addEventListener('click', () => {
            //     const productId = productData.id;
            //     // Redirecionar para a página de detalhes com base no ID do produto
            //     window.location.href = `detalhes.html?id=${productId}`;
            // });


            // MODAL
            productDiv.addEventListener('click', () => {
                const productId = productData.id;
                // Abrir o modal com base no ID do produto
                openModal(productId);
            });

            // Função para abrir o modal com base no ID do produto
            function openModal(productId) {
                // Obter os detalhes do produto com base no ID fornecido
                console.log(`https://fakestoreapi.com/products/${productId}`)
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

            // Função para buscar produtos pelo nome
            function searchProducts(query) {
                // Limpar o conteúdo dos produtos
                const productsContainer = document.querySelector('.products-container');
                productsContainer.innerHTML = '';

                // Fazer a busca na API
                fetch('https://fakestoreapi.com/products')
                    .then(response => response.json())
                    .then(productsData => {
                        // Filtrar os produtos que correspondem ao termo de pesquisa
                        const filteredProducts = productsData.filter(productData => {
                            const title = productData.title.toLowerCase();
                            const searchTerm = query.toLowerCase();
                            return title.includes(searchTerm);
                        });

                        // Exibir os produtos encontrados
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
                          
                            // Adicionar o evento de clique ao produto
                            productDiv.addEventListener('click', () => {
                              openModal(productData.id);
                            });
                        });
                    })
                    .catch(error => {
                        console.log('Ocorreu um erro:', error);
                    });
            }
            // Adicionar o produto ao container
            productsContainer.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.log('Ocorreu um erro:', error);
    });
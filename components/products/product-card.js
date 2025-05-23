class ProductCard extends HTMLElement {
    constructor() {
        super();
        // Define quantidade inicial baseado no tamanho da tela
        this.itemsToShow = window.innerWidth <= 768 ? 2 : 8; // 2 no mobile, 8 no desktop
        this.itemsIncrement = window.innerWidth <= 768 ? 2 : 4; // 2 no mobile, 4 no desktop

        // Adiciona listener para mudança de tamanho da tela
        window.addEventListener('resize', () => {
            const oldItems = this.itemsToShow;
            this.itemsToShow = window.innerWidth <= 768 ? 2 : 8;
            this.itemsIncrement = window.innerWidth <= 768 ? 2 : 4;
            
            // Só re-renderiza se mudou a quantidade de itens
            if (oldItems !== this.itemsToShow) {
                this.render();
            }
        });
    }

    async preloadCardImages(products) {
        console.log('🖼️ Pré-carregando imagens dos cards...');
        
        for (const product of products) {
            if (product.images?.webCarousel) {
                try {
                    const response = await fetch(product.images.webCarousel, {
                        cache: 'force-cache',
                        headers: {
                            'Cache-Control': 'max-age=31536000'
                        }
                    });
                    
                    if (response.ok) {
                        console.log(`✨ Imagem carregada: ${product.images.webCarousel}`);
                    }
                } catch (error) {
                    console.error(`❌ Erro ao carregar imagem: ${product.images.webCarousel}`);
                }
            }
        }
    }

    async connectedCallback() {
        if (typeof mavProducts === 'undefined') {
            console.error('Produtos não carregados ainda');
            return;
        }

        // Pré-carrega as imagens antes de renderizar
        await this.preloadCardImages(mavProducts);
        this.render();
    }

    render() {
        // Ordena os produtos pelo order_gallery
        const orderedProducts = mavProducts
            .filter(product => product.metadata?.order_gallery != null)
            .sort((a, b) => a.metadata.order_gallery - b.metadata.order_gallery);

        // Produtos sem ordem ficam no final
        const unorderedProducts = mavProducts
            .filter(product => product.metadata?.order_gallery == null);

        // Combina as duas listas
        const allProducts = [...orderedProducts, ...unorderedProducts];
        
        // Aplica a paginação no array já ordenado
        const visibleProducts = allProducts.slice(0, this.itemsToShow);
        const hasMore = this.itemsToShow < allProducts.length;

        this.innerHTML = `
            <div class="product-grid">
                ${visibleProducts.map(product => `
                    <div class="product-card">
                        <a href="produto.html?slug=${product.slug}" class="product-image-container">
                            <img src="${product.images.webCarousel}" alt="${product.name}">
                        </a>
                        <div class="product-content">
                            <a href="produto.html?slug=${product.slug}" class="product-title">
                                <h3>${product.name}</h3>
                            </a>
                            <p class="product-description">${product.shortDescription}</p>
                            <a href="produto.html?slug=${product.slug}" class="product-link">
                                Ver mais <i class="bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${hasMore ? `
                <div class="load-more">
                    <button class="load-more-btn">
                        Carregar mais produtos
                        <i class="bi-arrow-down"></i>
                    </button>
                </div>
            ` : ''}
        `;

        if (hasMore) {
            this.querySelector('.load-more-btn').addEventListener('click', () => {
                this.itemsToShow += this.itemsIncrement;
                this.render();
            });
        }
    }
}

customElements.define('product-card', ProductCard); 
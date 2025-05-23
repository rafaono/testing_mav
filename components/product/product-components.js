class ProductSpecifications extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');
        const product = mavProducts.find(p => p.slug === slug);

        if (!product) {
            this.innerHTML = `<div class="product-specs-section"><div class="container"><p>Produto não encontrado.</p></div></div>`;
            return;
        }

        this.render(product);
    }

    render(product) {
        this.innerHTML = `
            <section class="product-specs-section" id="especificacoes">
                <div class="container">
                    <h2 class="specs-title">${product.specifications.title || 'Especificações Técnicas'}</h2>
                    <div class="specs-list">
                        ${product.specifications.items.map(item => `
                            <p>
                                <img class="marcador" src="images/prd-marcador.svg" alt="•">
                                ${item}
                            </p>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('product-specifications', ProductSpecifications); 
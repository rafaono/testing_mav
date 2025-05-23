class ProductHero extends HTMLElement {
    constructor() {
        super();
        this.viewType = 'components'; // Estado inicial: mostrando componentes
    }

    connectedCallback() {
        // Espera o script de produtos carregar
        if (typeof mavProducts === 'undefined') {
            setTimeout(() => this.connectedCallback(), 100);
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');
        
        // Verifica se o produto existe antes de tentar renderizar
        const product = mavProducts?.find(p => p.slug === slug);
        
        if (!product) {
            console.error('Produto não encontrado:', slug);
            window.location.href = 'index.html';
            return;
        }

        this.render(product);

        // Adiciona listener para o botão de especificações
        this.addEventListener('click', (e) => {
            if (e.target.closest('.btn-secondary')) {
                e.preventDefault();
                // Alterna entre os estados
                this.viewType = this.viewType === 'components' ? 'specifications' : 'components';
                this.updateHighlights();
                this.updateButtonText();
            }
        });
    }

    updateButtonText() {
        const button = this.querySelector('.btn-secondary');
        button.innerHTML = `
            <i class="bi-list-ul"></i>
            ${this.viewType === 'components' ? 'Ver Especificações' : 'Ver Componentes'}
        `;
    }

    updateHighlights() {
        const product = this.currentProduct;
        const highlightsContainer = this.querySelector('.product-hero__highlights');
        
        const componentsView = `
            ${product.components?.items?.map(item => `
                <div class="product-hero__highlight-item">
                    <i class="bi-gear-fill"></i>
                    <span>${item}</span>
                </div>
            `).join('')}
        `;

        const specificationsView = `
            ${product.specifications?.items?.map(item => `
                <div class="product-hero__highlight-item">
                    <i class="bi-check-circle-fill"></i>
                    <span>${item}</span>
                </div>
            `).join('')}
        `;

        highlightsContainer.innerHTML = this.viewType === 'components' ? componentsView : specificationsView;
    }

    async render(product) {
        this.currentProduct = product;
        const isMobile = window.innerWidth <= 768;
        const titleSection = `<h1 class="product-hero__title">${product?.name || 'Produto não encontrado'}</h1>`;

        // Tratamento seguro para o modelo 3D
        let model3d = '';
        if (product?.images?.model3d) {
            try {
                model3d = `
                    <div class="product-hero__3d-container">
                        <model-viewer
                            src="${product.images.model3d}"
                            poster="${product.images.thumbnail || ''}"
                            alt="${product.name}"
                            loading="lazy"
                            camera-controls
                            ar
                            ar-modes="webxr scene-viewer quick-look"
                            ios-src="${product.images.model3d}"
                            touch-action="pan-y"
                            style="width: 100%; height: 450px; background: #f8f9fa;">
                            <div slot="poster">Carregando modelo 3D...</div>
                            <div slot="error">Erro ao carregar modelo 3D</div>
                        </model-viewer>
                    </div>
                `;
            } catch (error) {
                console.error('Erro ao renderizar modelo:', error);
                // Fallback para imagem
                model3d = product.images?.thumbnail ? `
                    <div class="product-hero__3d-container">
                        <img src="${product.images.thumbnail}" 
                             alt="${product.name}" 
                             style="width: 100%; height: fit-content;">
                    </div>
                ` : '';
            }
        }

        // Validação mais segura para o vídeo
        const videoSection = product.video?.id ? `
            <div class="product-hero__video">
                <iframe src="https://www.youtube.com/embed/${product.video.id}" 
                    frameborder="0" allowfullscreen></iframe>
            </div>
        ` : '';

        // Só mostra a imagem thumbnail se tiver modelo 3D
        const thumbnailSection = product.images?.model3d ? `
            <div class="product-hero__main-image">
                <img src="${product.images.thumbnail}" alt="${product.name}">
            </div>
        ` : '';

        // Ternários para as seções condicionais
        const featuresSection = product.components?.items ? `
            <div class="product-hero__features">
                <h3>Características</h3>
                <div class="features-grid">
                    ${product.components.items.map(item => `
                        <div class="feature-item">
                            <i class="bi-check-circle-fill"></i>
                            <span>${item}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        const specificationsSection = product.specifications?.items ? `
            <div class="product-hero__specifications">
                <h3>${product.specifications.title || 'Especificações Técnicas'}</h3>
                <div class="specifications-grid">
                    ${product.specifications.items.map(item => `
                        <div class="specification-item">
                            <i class="bi-gear-fill"></i>
                            <span>${item}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        const versionsSection = product.versions?.length ? `
            <div class="product-hero__versions">
                <h3>Versões Disponíveis</h3>
                <div class="versions-list">
                    ${product.versions.map(version => `
                        <div class="version-item">
                            <i class="bi-box-fill"></i>
                            <span>${version}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        this.innerHTML = `
            <section class="product-hero">
                <div class="container">
                    ${isMobile ? titleSection : ''}
                    <div class="product-hero__grid">
                        <div class="product-hero__left">
                            ${model3d}
                            ${videoSection}
                        </div>
                        <div class="product-hero__right">
                            ${!isMobile ? titleSection : ''}
                            <div class="product-hero__description">
                                <p class="product-hero__short">${product.shortDescription}</p>
                                <p class="product-hero__full">${product.fullDescription}</p>
                            </div>
                            
                            ${featuresSection}
                            ${specificationsSection}
                            ${versionsSection}

                            <div class="product-hero__actions">
                                <a href="https://wa.me/5549988746185?text=Olá, gostaria de solicitar um orçamento para ${encodeURIComponent(product.name)}" 
                                   class="btn-primary"
                                   target="_blank">
                                    <i class="bi-whatsapp"></i>
                                    Solicitar Orçamento
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('product-hero', ProductHero); 

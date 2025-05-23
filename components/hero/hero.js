class MavHero extends HTMLElement {
    constructor() {
        super();
        this.currentSlide = 0;
    }

    connectedCallback() {
        // Add CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'components/hero/hero.css';
        document.head.appendChild(link);

        this.render();
        this.initCarousel();
    }

    render() {
        if (!mavProducts?.length) return;

        // Filtra e ordena os produtos que têm order_banner
        const orderedProducts = mavProducts
            .filter(product => product.metadata?.order_banner != null)
            .sort((a, b) => a.metadata.order_banner - b.metadata.order_banner);

        if (!orderedProducts.length) return;

        this.innerHTML = `
            <div class="hero-container">
                <div class="hero-carousel">
                    <div class="carousel-track">
                        ${orderedProducts.map((product, index) => `
                            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <div class="slide-content">
                                    <div class="slide-text">
                                        <h2>${product.name}</h2>
                                        <p>${product.shortDescription}</p>
                                        <div class="slide-buttons">
                                            <a href="produto.html?slug=${product.slug}" class="btn-primary">Ver mais</a>
                                            <a href="#contatos" class="btn-secondary">Contate-nos</a>
                                        </div>
                                    </div>
                                    <div class="slide-image">
                                        <img src="${product.images.webCarousel}" alt="${product.name}">
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <button class="carousel-nav prev" aria-label="Anterior">&lt;</button>
                    <button class="carousel-nav next" aria-label="Próximo">&gt;</button>

                    <div class="carousel-dots">
                        ${orderedProducts.map((_, index) => `
                            <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    initCarousel() {
        const slides = this.querySelectorAll('.carousel-slide');
        const dots = this.querySelectorAll('.dot');
        const prevBtn = this.querySelector('.prev');
        const nextBtn = this.querySelector('.next');
        let autoplayTimer;

        const goToSlide = (index) => {
            const currentSlide = slides[this.currentSlide];
            const nextSlide = slides[index];
            
            // Remove classes anteriores
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev');
            });

            dots.forEach(dot => dot.classList.remove('active'));
            
            // Adiciona classe prev ao slide atual
            currentSlide.classList.add('prev');
            
            // Ativa o novo slide
            nextSlide.classList.add('active');
            dots[index].classList.add('active');
            
            this.currentSlide = index;
        };

        const nextSlide = () => {
            const next = (this.currentSlide + 1) % slides.length;
            goToSlide(next);
        };

        const prevSlide = () => {
            const prev = (this.currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prev);
        };

        const startAutoplay = () => {
            stopAutoplay();
            autoplayTimer = setInterval(nextSlide, 5000);
        };

        const stopAutoplay = () => {
            if (autoplayTimer) clearInterval(autoplayTimer);
        };

        // Event listeners
        prevBtn?.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });

        nextBtn?.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(Number(dot.dataset.index));
                startAutoplay();
            });
        });

        this.addEventListener('mouseenter', stopAutoplay);
        this.addEventListener('mouseleave', startAutoplay);

        // Start autoplay
        startAutoplay();
    }
}

customElements.define('mav-hero', MavHero); 
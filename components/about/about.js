class MavAbout extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <section class="about-section" id="sobre">
                <div class="tech-background"></div>
                <div class="container">
                    <div class="about-content">
                        <div class="about-text">
                            <h2 class="tech-title" data-aos="fade-right">SOBRE</h2>
                            <div class="tech-line" data-aos="fade-right" data-aos-delay="100"></div>
                            <p data-aos="fade-up" data-aos-delay="200">
                                A <strong>MAV Industrial</strong> nasceu de um sonho e da dedicação de dois irmãos, que hoje, levam <strong>inovação</strong> à indústria de laticínios com máquinas eficientes e confiáveis, projetadas para transformar cada etapa da produção.
                            </p>
                            <p data-aos="fade-up" data-aos-delay="300">
                                Somos a porta aberta para a eficiência e a automação, oferecendo tecnologias que transformam laticínios comuns em negócios espetaculares.
                            </p>
                            <p data-aos="fade-up" data-aos-delay="400">
                                Na indústria leiteira, cada gota conta, e nós fazemos o seu tempo valer mais, com processos mais ágeis e menos desperdícios.
                            </p>
                            <p data-aos="fade-up" data-aos-delay="500">
                                Estamos prontos para ser sua nova engrenagem.
                            </p>
                            <h3 class="cta-title" data-aos="fade-up" data-aos-delay="600">
                                VAMOS CRESCER JUNTOS?
                            </h3>
                        </div>
                        
                        <div class="about-gallery">
                            <div class="gallery-grid">
                                <div class="image-card" data-aos="zoom-in" data-aos-delay="200">
                                    <img src="images/mav-produto-1.jpg" alt="Produto MAV - Inovação em Laticínios" loading="lazy">
                                </div>
                                <div class="image-card" data-aos="zoom-in" data-aos-delay="400">
                                    <img src="images/mav-produto-2.jpg" alt="Produto MAV - Tecnologia Avançada" loading="lazy">
                                </div>
                                <div class="image-card" data-aos="zoom-in" data-aos-delay="600">
                                    <img src="images/mav-produto-3.jpg" alt="Produto MAV - Automação Industrial" loading="lazy">
                                </div>
                                <div class="image-card" data-aos="zoom-in" data-aos-delay="800">
                                    <img src="images/mav-produto-4.jpg" alt="Produto MAV - Eficiência em Produção" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('mav-about', MavAbout); 
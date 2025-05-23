class MavContact extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <section class="contact-section" id="contatos">
                <div class="tech-background"></div>
                <div class="container">
                    <div class="contact-content">
                        <h2 class="section-title" data-aos="fade-down">CONTATOS</h2>
                        
                        <div class="contact-grid">
                            <div class="contact-info" data-aos="fade-up">
                                <div class="logo-container">
                                    <img src="images/mav-logo.png" alt="MAV Industrial" class="contact-logo">
                                </div>
                                
                                <div class="contact-card" data-aos="fade-up" data-aos-delay="100">
                                    <div class="contact-item">
                                        <i class="bi-telephone-fill"></i>
                                        <div class="contact-text">
                                            <h4>Telefone</h4>
                                            <p>+55 (49) 98874-6185</p>
                                        </div>
                                    </div>
                                    
                                    <div class="contact-item">
                                        <i class="bi-geo-alt-fill"></i>
                                        <div class="contact-text">
                                            <h4>Endereço</h4>
                                            <p>Rodovia Caetano Chiuchetta, 2295</p>
                                            <p>Bairro Colinas - 89.700-489</p>
                                            <p>Concórdia / SC</p>
                                            <a href="https://www.google.com/maps?q=MAV+Industrial" class="map-link" target="_blank">
                                                <i class="bi-map"></i> Ver no mapa
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="social-container" data-aos="fade-up" data-aos-delay="200">
                                    <h3>Redes Sociais</h3>
                                    <div class="social-grid">
                                        <a href="https://www.youtube.com/@MAVIndustrial" class="social-item" target="_blank" data-aos="zoom-in" data-aos-delay="300">
                                            <i class="bi-youtube"></i>
                                            <span>YouTube</span>
                                        </a>
                                        <a href="https://www.instagram.com/mav_industrial" class="social-item" target="_blank" data-aos="zoom-in" data-aos-delay="400">
                                            <i class="bi-instagram"></i>
                                            <span>Instagram</span>
                                        </a>
                                        <a href="https://www.facebook.com/profile.php?id=100091909660962" class="social-item" target="_blank" data-aos="zoom-in" data-aos-delay="500">
                                            <i class="bi-facebook"></i>
                                            <span>Facebook</span>
                                        </a>
                                        <a href="mailto:vendas@mavindustrial.com.br" class="social-item" data-aos="zoom-in" data-aos-delay="600">
                                            <i class="bi-envelope"></i>
                                            <span>Email</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('mav-contact', MavContact); 
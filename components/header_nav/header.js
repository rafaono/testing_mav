class MavHeader extends HTMLElement {
    constructor() {
        super();
        
        const isProductPage = window.location.pathname.includes('produto.html');
        
        // Links ajustados baseado na página atual
        const homeLink = isProductPage ? 'index.html' : '#';
        const sobreLink = isProductPage ? 'index.html#sobre' : '#sobre';
        const produtosLink = isProductPage ? 'index.html#produtos' : '#produtos';
        const contatosLink = isProductPage ? 'index.html#contatos' : '#contatos';

        // Navbar Desktop
        const desktopNav = `
            <div class="header-fixed__nav desktop-nav">
                <div class="container">
                    <div class="header-fixed__nav-content">
                        <a class="header-fixed__logo" href="index.html">
                            <img src="images/mav-logo.png" alt="MAV Industrial">
                        </a>
                        <nav class="header-fixed__menu">
                            <ul>
                                <li><a href="${homeLink}">Home</a></li>
                                <li><a href="${sobreLink}">Sobre</a></li>
                                <li><a href="${produtosLink}">Produtos</a></li>
                                <li><a href="${contatosLink}">Contatos</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        `;

        // Navbar Mobile
        const mobileNav = `
            <div class="header-fixed__nav mobile-nav">
                <div class="container">
                    <div class="header-fixed__nav-content">
                        <a class="header-fixed__logo" href="index.html">
                            <img src="images/mav-logo.png" alt="MAV Industrial">
                        </a>
                        <button class="header-fixed__menu-toggle">
                            <i class="bi-list"></i>
                        </button>
                    </div>
                </div>
                <div class="mobile-menu">
                    <nav>
                        <ul>
                            <li><a href="${homeLink}">Home</a></li>
                            <li><a href="${sobreLink}">Sobre</a></li>
                            <li><a href="${produtosLink}">Produtos</a></li>
                            <li><a href="${contatosLink}">Contatos</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
        
        this.innerHTML = `
            <div class="header-fixed">
                <div class="header-fixed__top">
                    <div class="container">
                        <div class="header-fixed__top-content">
                            <div class="header-fixed__contact">
                                <div class="copy-wrapper">
                                    <a href="#" title="Clique para copiar" class="copy-trigger" data-copy="vendas@mavindustrial.com.br">
                                        <i class="bi-envelope"></i>
                                        <span>vendas@mavindustrial.com.br</span>
                                    </a>
                                </div>
                                <div class="copy-wrapper">
                                    <a href="#" title="Clique para copiar" class="copy-trigger" data-copy="+55513308-6824">
                                        <i class="bi-telephone"></i>
                                        <span>+55 51 3308-6824</span>
                                    </a>
                                </div>
                            </div>
                            <ul class="header-fixed__social">
                                <li><a href="https://www.youtube.com/@MAVIndustrial" class="bi-youtube"></a></li>
                                <li><a href="https://www.instagram.com/mav_industrial" class="bi-instagram"></a></li>
                                <li><a href="https://www.facebook.com/profile.php?id=100091909660962" class="bi-facebook"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                ${desktopNav}
                ${mobileNav}
            </div>
        `;
    }

    connectedCallback() {
        // Garante que o DOM está pronto
        setTimeout(() => {
            this.initializeMobileMenu();
            this.initializeScrollEffect();
            this.initializeCopyButtons();
        }, 100);

        // Adiciona comportamento de scroll suave para o link Home
        const homeLinks = this.querySelectorAll('a[href="#"]');
        homeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const headerHeight = this.offsetHeight;
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    }

    initializeMobileMenu() {
        const menuToggle = this.querySelector('.header-fixed__menu-toggle');
        const mobileMenu = this.querySelector('.mobile-menu');
        const menuIcon = this.querySelector('.header-fixed__menu-toggle i');

        // Adiciona overlay para fechar o menu
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        this.appendChild(overlay);

        menuToggle?.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuIcon.classList.toggle('bi-list');
            menuIcon.classList.toggle('bi-x-lg');
            document.body.classList.toggle('menu-open'); // Previne scroll
            overlay.classList.toggle('active');
        });

        // Fecha o menu ao clicar no overlay
        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuIcon.classList.add('bi-list');
            menuIcon.classList.remove('bi-x-lg');
            document.body.classList.remove('menu-open');
            overlay.classList.remove('active');
        });

        // Fecha o menu ao clicar em um link
        const menuLinks = this.querySelectorAll('.mobile-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuIcon.classList.add('bi-list');
                menuIcon.classList.remove('bi-x-lg');
                document.body.classList.remove('menu-open');
                overlay.classList.remove('active');
            });
        });
    }

    initializeScrollEffect() {
        // Efeito de scroll
        window.addEventListener('scroll', () => {
            const nav = this.querySelector('.header-fixed__nav');
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    initializeCopyButtons() {
        const copyTriggers = this.querySelectorAll('.copy-trigger');
        
        copyTriggers.forEach(trigger => {
            trigger.addEventListener('click', async (e) => {
                e.preventDefault();
                const textToCopy = trigger.dataset.copy;
                const icon = trigger.querySelector('i');
                const originalClass = icon.classList.contains('bi-envelope') ? 'bi-envelope' : 'bi-telephone';
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    console.log('📋 Copiado:', textToCopy);
                    
                    // Troca o ícone para check
                    icon.classList.remove(originalClass);
                    icon.classList.add('bi-check-lg');
                    trigger.classList.add('copied');
                    
                    // Reverte após 2 segundos
                    setTimeout(() => {
                        icon.classList.remove('bi-check-lg');
                        icon.classList.add(originalClass);
                        trigger.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('❌ Erro ao copiar:', err);
                }
            });
        });
    }
}

customElements.define('mav-header', MavHeader); 
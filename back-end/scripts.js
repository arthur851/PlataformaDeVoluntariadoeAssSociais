class menu extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const template = document.createElement("div")
        template.innerHTML = `
            <header>
            <!-- Barra de navegação -->
                <nav class="navbar">
                <a href="" class="logo">
                    LOGO
                </a>
                <!-- Links de navegação -->
                <ul class="nav-links">
                    <li>
                        <a href="http://127.0.0.1:5501/front-end/apresentacaoDaOng/index.html">Sobre</a>
                    </li>
                    <li>
                        <a href="http://127.0.0.1:5501/front-end/login/index.html">Login</a>
                    </li>
                </ul>
            </nav>
            </header>
        `
        this.appendChild(template)
    }
}class rodape extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const template = document.createElement("div")
        template.innerHTML = `
        <div class="footer-waves-wrapper">
        <div class="waves-canvas">
            
        
            <svg class="waves-svg-container" xmlns="http://w3.org">
            <defs>
            
                <pattern id="wave1" width="400" height="140" patternUnits="userSpaceOnUse">
                <path d="M 0 60 Q 100 110 200 60 T 400 60 L 400 140 L 0 140 Z" fill= "#0f766e" opacity="0.3"/>
                </pattern>
                
            
                <pattern id="wave2" width="300" height="140" patternUnits="userSpaceOnUse" x="80">
                <path d="M 0 70 Q 75 115 150 70 T 300 70 L 300 140 L 0 140 Z" fill="#0f766e" opacity="0.6"/>
                </pattern>
                
            
                <pattern id="wave3" width="500" height="140" patternUnits="userSpaceOnUse" x="150">
                <path d="M 0 80 Q 125 120 250 80 T 500 80 L 500 140 L 0 140 Z" fill="#0f766e" opacity="1"/>
                </pattern>
            </defs>

            <rect width="250vw" height="140" fill="url(#wave1)" />
            <rect width="250vw" height="140" fill="url(#wave2)" />
            <rect width="250vw" height="140" fill="url(#wave3)" />
            </svg>
            
        </div>
        </div>
            <footer class="footer-impacto">
            <div class="impacto-content">
                <span>★ Número de impacto</span>
            </div>
            <div class="apoiadores-bar">
                APOIADORES
            </div>
            </footer>
        `
        this.appendChild(template)
    }
}
customElements.define("meu-menu",menu);
customElements.define("meu-rodape",rodape);
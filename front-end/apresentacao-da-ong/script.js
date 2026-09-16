class MyCustomElement extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const template = document.createElement("div")
        template.innerHTML = `
            <header>
            <!-- Barra de navegação -->
                <nav class="navbar">
                <a href="link" class="logo">
                    LOGO
                </a>
                <!-- Links de navegação -->
                <ul class="nav-links">
                    <li>
                        <a href="link">Sobre</a>
                    </li>
                    <li>
                        <a href="link">Login</a>
                    </li>
                </ul>
            </nav>
            </header>
        `
        this.appendChild(template)
    }
}
customElements.define("meu-menu",MyCustomElement);
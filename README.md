# 🚀 Portfólio Profissional — Thales Mattos

Site de portfólio profissional desenvolvido como entrega do **Laboratório de Desenvolvimento 04**.  
Apresenta trajetória, habilidades, projetos e formas de contato de maneira moderna, responsiva e acessível.

🔗 **Site publicado:** [https://thalesmattos.github.io/Lab-desenvolvimento-04](https://thalesmattos.github.io/Lab-desenvolvimento-04)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| **HTML5** | Estrutura semântica das páginas |
| **CSS3** (Flexbox + Grid) | Estilização e layout responsivo |
| **JavaScript (ES6+)** | Interatividade, animações e lógica do formulário |
| **Font Awesome 6** | Ícones (via CDN) |
| **Google Fonts — Poppins** | Tipografia (via CDN) |
| **AOS.js 2.3.4** | Animações de scroll (via CDN) |
| **EmailJS Browser SDK 3** | Envio de e-mail pelo formulário de contato (via CDN) |

> Nenhuma ferramenta de build (Webpack, Vite, etc.) é necessária — o projeto roda diretamente no browser.

---

## 📦 Dependências e Bibliotecas

Todas carregadas via CDN — sem `npm install` necessário.

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

<!-- Font Awesome 6 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

<!-- AOS — Animate On Scroll -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

<!-- EmailJS Browser SDK -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

---

## 📁 Estrutura de Diretórios

```
Lab-desenvolvimento-04/
│
├── index.html              # Página principal (todas as seções)
│
├── css/
│   └── style.css           # Estilização completa + responsividade
│
├── js/
│   └── main.js             # Lógica: navbar, menu mobile, typed effect,
│                           #         abas PT/EN, formulário + EmailJS
│
├── assets/
└── README.md               # Este arquivo
```

---

## ⚙️ Instalação e Execução Local

### Pré-requisitos
Apenas um browser moderno (Chrome, Firefox, Edge, Safari).  
Nenhuma instalação de runtime ou dependência é necessária.

### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/thalesmattos/Lab-desenvolvimento-04.git
   cd Lab-desenvolvimento-04
   ```

2. **Abra o site:**
   - Opção A — Abra o arquivo `index.html` diretamente no browser.
   - Opção B (recomendada) — Use a extensão **Live Server** no VS Code para servir localmente com hot-reload:
     1. Instale a extensão "Live Server" (Ritwick Dey) no VS Code.
     2. Clique com o botão direito em `index.html` → **Open with Live Server**.
     3. Acesse `http://127.0.0.1:5500`.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos — Laboratório de Desenvolvimento 04.


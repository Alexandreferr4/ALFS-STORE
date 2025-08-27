let textoPesquisa = ""
let categoriaAtual = "all"
let sacola = [] // array da sacola

let produtos = [
    {
        id: 1,
        nome: "iPhone 15 Pro",
        categoria: "smartphones",
        preco: 7999,
        precoOriginal: 8999,
        desconto: 11,
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
        link: "https://www.tudocelular.com/Apple/fichas-tecnicas/n8898/Apple-iPhone-15-Pro.html",
        descricao: "Smartphone Apple com câmera avançada"
    },
    {
        id: 2,
        nome: "MacBook Air M2",
        categoria: "laptops",
        preco: 8999,
        precoOriginal: 10999,
        desconto: 18,
        imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        link: "https://support.apple.com/pt-br/111867",
        descricao: "Notebook Apple ultrafino e potente"
    },
    {
        id: 3,
        nome: "AirPods Pro",
        categoria: "headphones",
        preco: 1899,
        precoOriginal: 2299,
        desconto: 17,
        imagem: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
        link: "https://www.apple.com/br/airpods-pro/",
        descricao: "Fones sem fio com cancelamento de ruído"
    },
    {
        id: 4,
        nome: "Samsung Galaxy S24",
        categoria: "smartphones",
        preco: 5499,
        precoOriginal: 6299,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        link: "https://www.tudocelular.com/Samsung/fichas-tecnicas/n9105/Samsung-Galaxy-S24.html",
        descricao: "Smartphone Samsung com tela AMOLED"
    },
    {
        id: 5,
        nome: "Apple Watch Series 9",
        categoria: "smartwatch",
        preco: 3299,
        precoOriginal: 3799,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400",
        link: "https://www.apple.com/br/watch/",
        descricao: "Relógio inteligente com monitoramento"
    },
    {
        id: 6,
        nome: "Teclado Mecânico",
        categoria: "accessories",
        preco: 499,
        precoOriginal: null,
        desconto: null,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        link: "https://lista.mercadolivre.com.br/teclado-mecanico",
        descricao: "Teclado mecânico RGB para gamers"
    },
    {
        id: 7,
        nome: "Sony WH-1000XM5",
        categoria: "headphones",
        preco: 2499,
        precoOriginal: 2999,
        desconto: 17,
        imagem: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
        link: "https://www.sony.com.br/electronics/headphones-sobre-as-orelhas/wh-1000xm5",
        descricao: "Fone com cancelamento de ruído"
    },
    {
        id: 8,
        nome: "Dell XPS 13",
        categoria: "laptops",
        preco: 7999,
        precoOriginal: null,
        desconto: null,
        imagem: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
        link: "https://www.dell.com/pt-br/shop/notebooks-dell/scr/laptops/appref=xps-product-line",
        descricao: "Notebook Windows premium"
    }
];

let containerProdutos = document.querySelector(".products-container")
let input = document.querySelector(".search-input")
let todosBotoes = document.querySelectorAll(".category-btn")
let bagCount = document.querySelector(".bag h3")

let sacolaContainer = document.getElementById("sacolaContainer")
let sacolaLista = document.getElementById("sacolaLista")
let fecharSacolaBtn = document.getElementById("fecharSacola")
let abrirSacolaBtn = document.getElementById("btnAbrirSacola");

// Função para formatar valores no padrão brasileiro
function formatarPreco(valor){
    if(valor === null || valor === undefined) return "";
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Atualiza o número da sacola
function atualizarSacola() {
    bagCount.textContent = sacola.length
}

// Adiciona produto à sacola
function adicionarNaSacola(idProduto) {
    let produto = produtos.find(p => p.id == idProduto)
    if (produto) {
        sacola.push(produto)
        atualizarSacola()
        mostrarToast(`${produto.nome} adicionado à sacola!`); // mensagem flutuante
    }
}


// Exibe os produtos
function mostrarProdutos() {
    let htmlProdutos = ""
    let produtosFiltrados = produtos.filter(prd => {
        let passouCategoria = (categoriaAtual ==="all" || prd.categoria === categoriaAtual)
        let passouPesquisa = prd.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
        return passouPesquisa && passouCategoria
    })
    
    if(produtosFiltrados.length === 0){
        containerProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>"
        return
    }

    produtosFiltrados.forEach(prd => {
        htmlProdutos += `
    <div class="product-card">
        <a href="${prd.link}" target="_blank">
        <img class="product-img" src="${prd.imagem}" alt="${prd.nome}">
        </a>
        <button class="add-to-bag" data-id="${prd.id}">
            <i class="fa-solid fa-plus"></i>
        </button>

        <div class="product-info">
            <h3 class="product-name">${prd.nome}</h3>
            <p class="product-description">${prd.descricao}</p>
            <div class="preco">
                <p class="product-price">${formatarPreco(prd.preco)}</p>
                ${prd.precoOriginal ? `<p class="old-price">${formatarPreco(prd.precoOriginal)}</p>` : ""}
            </div>
            <a href="${prd.link}" target="_blank">
                <button class="product-button">Ver Detalhes</button>
            </a>
        </div>
    </div>
        `
    })

    containerProdutos.innerHTML = htmlProdutos

    // Ativar botões "Adicionar à Sacola"
    document.querySelectorAll(".add-to-bag").forEach(botao => {
        botao.addEventListener("click", () => {
            let id = botao.getAttribute("data-id")
            adicionarNaSacola(id)
        })
    })
}

// Mensagem Flutuante
function mostrarToast(mensagem) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = mensagem;
    document.body.appendChild(toast);

    // Exibe a mensagem
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Remove após 3 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
}


// Exibir os produtos na sacola
function mostrarSacola() {
    sacolaLista.innerHTML = "";

    if (sacola.length === 0) {
        sacolaLista.innerHTML = "<p>Sua sacola está vazia.</p>";
        return;
    }

    let total = 0;
    let totalDesconto = 0;

    sacola.forEach((produto, index) => {
        total += produto.preco;
        if (produto.precoOriginal) {
            totalDesconto += produto.precoOriginal - produto.preco;
        }

        let li = document.createElement("li");
        li.innerHTML = `
            <span>${produto.nome} - ${formatarPreco(produto.preco)}</span>
            <button onclick="removerDaSacola(${index})">Remover</button>
        `;
        sacolaLista.appendChild(li);
    });

    // Adiciona resumo de total e desconto
    let resumo = document.createElement("div");
    resumo.style.marginTop = "1rem";
    resumo.style.borderTop = "1px solid #ddd";
    resumo.style.paddingTop = "1rem";
    resumo.innerHTML = `
        <p class="value_total"><strong>Total:</strong> ${formatarPreco(total)}</p>
        <p><strong>Economia de:</strong> ${formatarPreco(totalDesconto)}</p>
    `;
    sacolaLista.appendChild(resumo);
}


// Remove produto pelo índice
function removerDaSacola(index) {
    sacola.splice(index, 1);
    atualizarSacola(); // atualiza contador
    mostrarSacola();   // re-renderiza a sacola
}

// Eventos para abrir e fechar
abrirSacolaBtn.addEventListener("click", (e) => {
    e.preventDefault(); // impede qualquer outro comportamento
    sacolaContainer.classList.add("active");
    mostrarSacola();
});

fecharSacolaBtn.addEventListener("click", () => {
    sacolaContainer.classList.remove("active");
});


// Inicializa contador ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarSacola();
});

function pesquisar(){
    textoPesquisa = input.value
    mostrarProdutos()
}

function trocarCategoria(categoria){
    categoriaAtual = categoria

    todosBotoes.forEach(botao =>{
        botao.classList.remove('active')
        if(botao.getAttribute("data-category") === categoria){
            botao.classList.add("active")
        }
    })

    mostrarProdutos()
}

window.addEventListener('DOMContentLoaded', () =>{
    mostrarProdutos()
    input.addEventListener('input', pesquisar)

    todosBotoes.forEach(botao => {
        botao.addEventListener('click', () =>{
            let categoria = botao.getAttribute("data-category")
            trocarCategoria(categoria)
        })
    })
})

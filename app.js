document.addEventListener("DOMContentLoaded", function () {
    const btnAdicionarAmigo = document.getElementById("addButton");
    const btnSortearAmigo = document.getElementById("drawButton");
    const inputAmigo = document.getElementById("inputName");
    const listaAmigosUl = document.getElementById("nameList");
    const resultadoDiv = document.getElementById("result");
    const feedbackMessage = document.getElementById("feedbackMessage");

    let listaAmigos = JSON.parse(localStorage.getItem("listaAmigos")) || [];

    function nomeValido(nome) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(nome);
    }

    function salvarNoLocalStorage() {
        localStorage.setItem("listaAmigos", JSON.stringify(listaAmigos));
    }

    function atualizarListaAmigos() {
        listaAmigosUl.innerHTML = '';
        listaAmigos.forEach(function (amigo, index) {
            const li = document.createElement("li");
            li.textContent = amigo;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remover";
            removeBtn.className = "remove-btn";
            removeBtn.addEventListener("click", function () {
                removerAmigo(index);
            });

            li.appendChild(removeBtn);
            listaAmigosUl.appendChild(li);
        });
        verificarBotaoSortear();
    }

    function adicionarAmigo(nomeAmigo) {
        if (listaAmigos.includes(nomeAmigo)) {
            mostrarFeedback("Esse nome já foi adicionado!", "error");
            return;
        }

        listaAmigos.push(nomeAmigo);
        salvarNoLocalStorage();
        atualizarListaAmigos();
        inputAmigo.value = "";
        mostrarFeedback("Amigo adicionado com sucesso!", "success");
    }

    function removerAmigo(index) {
        listaAmigos.splice(index, 1);
        salvarNoLocalStorage();
        atualizarListaAmigos();
        mostrarFeedback("Amigo removido com sucesso!", "success");
    }

    function verificarBotaoSortear() {
        btnSortearAmigo.disabled = listaAmigos.length === 0;
    }

    function sortearAmigo() {
        const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
        resultadoDiv.textContent = `O amigo sorteado é: ${amigoSorteado}`;
    }

    function adicionarNomeAmigo() {
        const nomeAmigo = inputAmigo.value.trim();
        if (!nomeValido(nomeAmigo)) {
            mostrarFeedback("Por favor, insira um nome válido (apenas letras).", "error");
            return;
        }
        adicionarAmigo(nomeAmigo);
    }

    function mostrarFeedback(mensagem, tipo) {
        feedbackMessage.textContent = mensagem;
        feedbackMessage.className = tipo === "success" ? "feedback-success" : "feedback-error";
        setTimeout(() => feedbackMessage.textContent = "", 3000);
    }

    btnAdicionarAmigo.addEventListener("click", adicionarNomeAmigo);

    inputAmigo.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            adicionarNomeAmigo();
        }
    });

    btnSortearAmigo.addEventListener("click", function () {
        if (listaAmigos.length === 0) {
            mostrarFeedback("Adicione amigos antes de realizar o sorteio.", "error");
            return;
        }
        sortearAmigo();
    });

    // Inicializar a lista ao carregar a página
    atualizarListaAmigos();
});

document.addEventListener("DOMContentLoaded", () => {
    const btnAdicionarAmigo = document.getElementById("addButton");
    const btnSortearAmigo = document.getElementById("drawButton");
    const inputAmigo = document.getElementById("inputName");
    const listaAmigosUl = document.getElementById("nameList");
    const resultadoDiv = document.getElementById("result");
    const feedbackMessage = document.getElementById("feedbackMessage");

    // Array para armazenar os nomes dos amigos
    let listaAmigos = JSON.parse(localStorage.getItem("listaAmigos")) || [];

    // Função para validar o nome (apenas letras e espaços)
    const nomeValido = (nome) => /^[a-zA-Z\s]+$/.test(nome);

    // Função para salvar lista no localStorage
    const salvarNoLocalStorage = () => {
        localStorage.setItem("listaAmigos", JSON.stringify(listaAmigos));
    };

    // Função para atualizar a lista exibida na tela
    const atualizarListaAmigos = () => {
        listaAmigosUl.innerHTML = '';
        listaAmigos.forEach((amigo, index) => {
            const li = document.createElement("li");
            li.textContent = amigo;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remover";
            removeBtn.className = "remove-btn";
            removeBtn.addEventListener("click", () => removerAmigo(index));

            li.appendChild(removeBtn);
            listaAmigosUl.appendChild(li);
        });
        verificarBotaoSortear();
    };

    // Função para adicionar o nome à lista
    const adicionarAmigo = (nomeAmigo) => {
        if (listaAmigos.includes(nomeAmigo)) {
            mostrarFeedback("Esse nome já foi adicionado!", "error");
            return;
        }

        listaAmigos.push(nomeAmigo);
        salvarNoLocalStorage();
        atualizarListaAmigos();
        inputAmigo.value = "";
        mostrarFeedback("Amigo adicionado com sucesso!", "success");
    };

    // Função para remover um amigo da lista
    const removerAmigo = (index) => {
        listaAmigos.splice(index, 1);
        salvarNoLocalStorage();
        atualizarListaAmigos();
        mostrarFeedback("Amigo removido com sucesso!", "success");
    };

    // Função para verificar se o botão de sortear pode ser habilitado
    const verificarBotaoSortear = () => {
        btnSortearAmigo.disabled = listaAmigos.length === 0;
    };

    // Função para realizar o sorteio
    const sortearAmigo = () => {
        const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
        resultadoDiv.textContent = `O amigo sorteado é: ${amigoSorteado}`;
    };

    // Função para adicionar nome ao clicar no botão ou pressionar Enter
    const adicionarNomeAmigo = () => {
        const nomeAmigo = inputAmigo.value.trim();
        if (!nomeAmigo) {
            alert("Digite um nome");
            speak("Digite um nome");
            return;
        }
        if (!nomeValido(nomeAmigo)) {
            mostrarFeedback("Por favor, insira um nome válido (apenas letras).", "error");
            return;
        }
        adicionarAmigo(nomeAmigo);
    };

    // Função para mostrar feedback ao usuário
    const mostrarFeedback = (mensagem, tipo) => {
        feedbackMessage.textContent = mensagem;
        feedbackMessage.className = tipo === "success" ? "feedback-success" : "feedback-error";
        setTimeout(() => feedbackMessage.textContent = "", 3000);
    };

    // Função para falar texto usando a API de Síntese de Fala
    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };

    // Adicionar evento ao botão de adicionar
    btnAdicionarAmigo.addEventListener("click", adicionarNomeAmigo);

    // Adicionar evento ao pressionar Enter no campo de entrada
    inputAmigo.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            adicionarNomeAmigo();
        }
    });

    // Adicionar evento ao botão de sortear
    btnSortearAmigo.addEventListener("click", () => {
        if (listaAmigos.length === 0) {
            mostrarFeedback("Adicione amigos antes de realizar o sorteio.", "error");
            return;
        }
        sortearAmigo();
    });

    // Inicializar a lista ao carregar a página
    atualizarListaAmigos();
});

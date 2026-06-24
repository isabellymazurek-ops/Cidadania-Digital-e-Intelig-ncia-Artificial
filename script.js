// --- BANCO DE DADOS DE CURIOSIDADES ---
const curiosidades = [
    "A primeira IA geradora de imagens surgiu muito antes do boom atual, mas os modelos atuais conseguem processar bilhões de parâmetros simultaneamente.",
    "Estudos indicam que mais de 50% dos jovens não conseguem diferenciar um título de notícia real de uma fake news gerada por IA.",
    "A tecnologia de clonagem de voz por IA agora precisa de apenas 3 segundos de amostra de áudio para replicar a voz de uma pessoa.",
    "Alguns países já criaram legislações específicas para que robôs ou algoritmos que tomem decisões públicas passem por auditorias de direitos humanos.",
    "O termo 'Deepfake' surgiu em 2017 combinando as palavras 'Deep Learning' (aprendizado profundo) e 'Fake' (falso).",
    "Estima-se que os sistemas automatizados de redes sociais espalhem conteúdos falsos de cunho emocional de forma muito mais eficiente do que perfis reais."
];

let curiosidadeAtual = 0;

function inicializarCuriosidade() {
    const elementoTexto = document.getElementById('curiosidade-texto');
    if (elementoTexto) {
        elementoTexto.innerText = curiosidades[0];
    }
}

function proximaCuriosidade() {
    curiosidadeAtual = (curiosidadeAtual + 1) % curiosidades.length;
    const elementoTexto = document.getElementById('curiosidade-texto');
    if (elementoTexto) {
        elementoTexto.innerText = curiosidades[curiosidadeAtual];
    }
}

// --- SISTEMA DE ABAS (SPA) ---
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-tab'));
        
        this.classList.add('active');
        
        const targetId = this.getAttribute('data-target');
        const targetTab = document.getElementById(targetId);
        if (targetTab) {
            targetTab.classList.add('active-tab');
        }
    });
});

function switchTab(tabId) {
    const targetLink = document.querySelector(`[data-target="${tabId}"]`);
    if(targetLink) targetLink.click();
}

// --- ENGINE DO QUIZ ---
const perguntasQuiz = [
    {
        pergunta: "Qual é o principal perigo dos Deepfakes na sociedade?",
        opcoes: [
            "Gastar muita energia elétrica nos servidores.",
            "Destruir a reputação de pessoas e espalhar fraudes visuais convincentes.",
            "Deixar a internet mais lenta devido ao tamanho dos arquivos."
        ],
        correta: 1
    },
    {
        pergunta: "O que caracteriza o conceito de 'Bolha de Filtro'?",
        opcoes: [
            "Uma camada extra de segurança que protege suas senhas de invasões corporativas.",
            "Algoritmos que entregam só o que você concorda, reduzindo o acesso a opiniões plurais.",
            "Um filtro de privacidade que oculta fotos pesadas no feed das redes sociais."
        ],
        correta: 1
    },
    {
        pergunta: "Como se posicionar criticamente como cidadão digital frente a notícias de grande impacto?",
        opcoes: [
            "Validar a informação em agências independentes e portais sérios antes de repassar.",
            "Compartilhar o conteúdo imediatamente nos grupos para alertar conhecidos rapidamente.",
            "Acreditar totalmente caso o link tenha sido compartilhado por um amigo de confiança."
        ],
        correta: 0
    }
];

let questaoAtual = 0;

function carregarQuestao() {
    const q = perguntasQuiz[questaoAtual];
    const contador = document.getElementById('quiz-contador');
    const pergunta = document.getElementById('quiz-pergunta');
    
    if (contador && pergunta) {
        contador.innerText = `Questão ${questaoAtual + 1} de ${perguntasQuiz.length}`;
        pergunta.innerText = q.pergunta;
        document.getElementById('opt0').innerText = q.opcoes[0];
        document.getElementById('opt1').innerText = q.opcoes[1];
        document.getElementById('opt2').innerText = q.opcoes[2];
        
        document.getElementById('quiz-feedback').innerText = "";
        document.getElementById('btn-proximo').style.display = "none";
        document.querySelectorAll('.quiz-options .option-btn').forEach(btn => btn.disabled = false);
    }
}

function verificarResposta(indice) {
    const q = perguntasQuiz[questaoAtual];
    const feedback = document.getElementById('quiz-feedback');
    const btnProximo = document.getElementById('btn-proximo');
    
    document.querySelectorAll('.quiz-options .option-btn').forEach(btn => btn.disabled = true);

    if(indice === q.correta) {
        feedback.innerText = "Correto! A validação de mídias é essencial para a cidadania.";
        feedback.style.color = "#00f2fe";
    } else {
        feedback.innerText = "Resposta incorreta. Lembre-se do impacto político e pessoal dos dados.";
        feedback.style.color = "#ff4757";
    }
    
    if (questaoAtual === perguntasQuiz.length - 1) {
        btnProximo.innerText = "Reiniciar Desafio ↺";
    } else {
        btnProximo.innerText = "Avançar no Desafio →";
    }
    btnProximo.style.display = "block";
}

function proximaQuestao() {
    if (questaoAtual < perguntasQuiz.length - 1) {
        questaoAtual++;
    } else {
        questaoAtual = 0;
    }
    carregarQuestao();
}

// Inicialização segura garantida
window.onload = () => {
    inicializarCuriosidade();
    carregarQuestao();
};

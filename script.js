// --- SISTEMA DE ABAS (SPA) ---
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove classes ativas antigas
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-tab'));
        
        // Adiciona classe ativa ao botão clicado
        this.classList.add('active');
        
        // Ativa a seção correspondente
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-tab');
    });
});

// Função auxiliar para trocar de aba através de botões internos
function switchTab(tabId) {
    const targetLink = document.querySelector(`[data-target="${tabId}"]`);
    if(targetLink) targetLink.click();
}

// --- BANCO DE DADOS DE CURIOSIDADES ---
const curiosidades = [
    "A primeira IA geradora de imagens surgiu muito antes do boom atual, mas os modelos atuais conseguem processar bilhões de parâmetros simultaneamente.",
    "Estudos indicam que mais de 50% dos jovens não conseguem diferenciar um título de notícia real de uma fake news gerada por IA.",
    "A tecnologia de clonagem de voz por IA agora precisa de apenas 3 segundos de amostra de áudio para replicar a voz de uma pessoa.",
    "Alguns países já criaram legislações específicas para que robôs ou algoritmos que tomem decisões públicas passem por auditorias de direitos humanos.",
    "O termo 'Deepfake' surgiu em 2017 a partir da junção dos conceitos de 'Deep Learning' (Aprendizado Profundo) e 'Fake' (Falso).",
    "Bots automatizados nas redes sociais conseguem imitar o comportamento humano a ponto de inflar artificialmente discussões políticas em minutos."
];

let curiosidadeAtual = 0;

function proximaCuriosidade() {
    curiosidadeAtual = (curiosidadeAtual + 1) % curiosidades.length;
    document.getElementById('curiosidade-texto').innerText = curiosidades[curiosidadeAtual];
}

// Inicializar primeira curiosidade ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('curiosidade-texto').innerText = curiosidades[0];
    carregarQuestao();
});

// --- ENGINE DE QUIZ EDUCATIVO (JOGO MULTIQUESTÕES) ---
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
        pergunta: "Como as 'Bolhas de Filtro' afetam a sua visão de mundo nas redes?",
        opcoes: [
            "Elas impedem que você veja anúncios e propagandas indesejadas.",
            "Elas mostram apenas conteúdos que confirmam seus gostos, gerando polarização.",
            "Elas deletam automaticamente contas falsas que espalham vírus."
        ],
        correta: 1
    },
    {
        pergunta: "O que constitui uma postura correta de cidadania digital ao ver uma notícia suspeita?",
        opcoes: [
            "Checar em canais oficiais e agências de checagem antes de compartilhar.",
            "Compartilhar imediatamente em todos os grupos para alertar as pessoas.",
            "Ignorar completamente sem pesquisar se é verdadeira ou falsa."
        ],
        correta: 0
    }
];

let indiceQuestaoAtual = 0;

function carregarQuestao() {
    const q = perguntasQuiz[indiceQuestaoAtual];
    document.getElementById('quiz-contador').innerText = `Questão ${indiceQuestaoAtual + 1} de ${perguntasQuiz.length}`;
    document.getElementById('quiz-pergunta').innerText = q.pergunta;
    document.getElementById('opt0').innerText = q.opcoes[0];
    document.getElementById('opt1').innerText = q.opcoes[1];
    document.getElementById('opt2').innerText = q.opcoes[2];
    
    // Reseta o estado visual do feedback e oculta botão avançar
    document.getElementById('quiz-feedback').innerText = "";
    document.getElementById('btn-proximo').style.display = "none";
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = false);
}

function verificarResposta(indice) {
    const q = perguntasQuiz[indiceQuestaoAtual];
    const feedback = document.getElementById('quiz-feedback');
    const btnProximo = document.getElementById('btn-proximo');
    
    // Desativa opções para evitar duplo clique
    document.querySelectorAll('.option-btn').forEach(btn => {
        if(btn.id !== 'btn-proximo') btn.disabled = true;
    });

    if(indice === q.correta) {
        feedback.innerText = "Correto! A validação de mídias é essencial para a cidadania.";
        feedback.style.color = "#00f2fe";
    } else {
        feedback.innerText = "Resposta incorreta. Lembre-se do impacto político e pessoal dos dados.";
        feedback.style.color = "#ff4757";
    }
    
    // Gerencia o botão de avançar/reiniciar
    if(indiceQuestaoAtual === perguntasQuiz.length - 1) {
        btnProximo.innerText = "Reiniciar Desafio ↺";
    } else {
        btnProximo.innerText = "Avançar no Desafio →";
    }
    btnProximo.style.display = "block";
}

function proximaQuestao() {
    if(indiceQuestaoAtual < perguntasQuiz.length - 1) {
        indiceQuestaoAtual++;
    } else {
        indiceQuestaoAtual = 0; // Reinicia o quiz de forma cíclica
    }
    carregarQuestao();
}

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
    "Alguns países já criaram legislações específicas para que robôs ou algoritmos que tomem decisões públicas passem por auditorias de direitos humanos."
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

// --- ENGINE DE QUIZ EDUCATIVO ---
const perguntasQuiz = [
    {
        pergunta: "Qual é o principal perigo dos Deepfakes na sociedade?",
        opcoes: [
            "Gastar muita energia elétrica nos servidores.",
            "Destruir a reputação de pessoas e espalhar fraudes visuais convincentes.",
            "Deixar a internet mais lenta devido ao tamanho dos arquivos."
        ],
        correta: 1
    }
];

function carregarQuestao() {
    const q = perguntasQuiz[0];
    document.getElementById('quiz-pergunta').innerText = q.pergunta;
    document.getElementById('opt0').innerText = q.opcoes[0];
    document.getElementById('opt1').innerText = q.opcoes[1];
    document.getElementById('opt2').innerText = q.opcoes[2];
}

function verificarResposta(indice) {
    const feedback = document.getElementById('quiz-feedback');
    if(indice === perguntasQuiz[0].correta) {
        feedback.innerText = "Correto! A validação de mídias é essencial para a cidadania.";
        feedback.style.color = "#00f2fe";
    } else {
        feedback.innerText = "Resposta incorreta. Lembre-se do impacto político e pessoal dos Deepfakes.";
        feedback.style.color = "#ff4757";
    }
}

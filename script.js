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
    "A tecnologia de clonagem de voz por IA agora precisa de apenas 3 segundos de amostra de áudio para replicar a voz de uma pessoa com perfeição.",
    "Alguns países já criaram legislações específicas para que robôs ou algoritmos que tomem decisões públicas passem por auditorias de direitos humanos.",
    "O termo 'Deepfake' nasceu em 2017 no fórum Reddit, combinando os termos 'Deep Learning' (aprendizado profundo) e 'Fake' (falso).",
    "Estima-se que as ferramentas modernas de IA generativa consigam criar em um único dia mais imagens e artes digitais do que toda a humanidade levou séculos para pintar à mão."
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

// --- ENGINE DE QUIZ EDUCATIVO EXPANDIDO (SISTEMA DE JOGO) ---
const perguntasQuiz = [
    {
        pergunta: "Qual é o principal perigo dos Deepfakes na sociedade?",
        opcoes: [
            "Gastar muita energia elétrica nos servidores de processamento.",
            "Destruir a reputação de pessoas e espalhar fraudes visuais altamente convincentes.",
            "Deixar os uploads e downloads da internet mais lentos devido ao tamanho dos arquivos gráficos."
        ],
        correta: 1
    },
    {
        pergunta: "O que caracteriza uma 'Bolha de Filtro' nas redes sociais?",
        opcoes: [
            "Um vírus que bloqueia as imagens do seu feed de notícias.",
            "Configurações que limitam o tempo diário de uso de telas pelo usuário.",
            "Algoritmos que te isolam mostrando apenas ideias com as quais você já concorda, aumentando a polarização."
        ],
        correta: 2
    },
    {
        pergunta: "Qual a melhor postura ao receber um link alarmista ou bizarro em um grupo de mensagens?",
        opcoes: [
            "Checar em portais de notícias confiáveis e agências de checagem antes de compartilhar.",
            "Repassar imediatamente para todos os seus contatos por precaução.",
            "Acreditar totalmente se a mensagem tiver sido enviada por um amigo ou familiar próximo."
        ],
        correta: 0
    }
];

let questaoAtual = 0;

function carregarQuestao() {
    const q = perguntasQuiz[questaoAtual];
    
    // Atualiza progresso e texto
    document.getElementById('quiz-progresso').innerText = `Pergunta ${questaoAtual + 1} de ${perguntasQuiz.length}`;
    document.getElementById('quiz-pergunta').innerText = q.pergunta;
    document.getElementById('opt0').innerText = q.opcoes[0];
    document.getElementById('opt1').innerText = q.opcoes[1];
    document.getElementById('opt2').innerText = q.opcoes[2];
    
    // Reseta estado visual do feedback e botões
    document.getElementById('quiz-feedback').innerText = "";
    document.getElementById('btn-proxima-pergunta').style.display = "none";
    
    // Reativa botões de opção
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = false);
}

function verificarResposta(indice) {
    const feedback = document.getElementById('quiz-feedback');
    const botaoproximo = document.getElementById('btn-proxima-pergunta');
    
    // Trava os botões para não clicar mais de uma vez
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    if(indice === perguntasQuiz[questaoAtual].correta) {
        feedback.innerText = "✨ Correto! Excelente reflexão sobre cidadania e ética.";
        feedback.style.color = "#00f2fe";
    } else {
        feedback.innerText = "❌ Incorreto. Analise bem o impacto social e tecnológico envolvido.";
        feedback.style.color = "#ff4757";
    }
    
    // Mostra o botão para avançar no jogo
    botaoproximo.style.display = "block";
    if (questaoAtual === perguntasQuiz.length - 1) {
        botaoproximo.innerHTML = 'Reiniciar Quiz <i class="fa-solid fa-arrow-rotate-left"></i>';
    } else {
        botaoproximo.innerHTML = 'Avançar <i class="fa-solid fa-arrow-right"></i>';
    }
}

function proximaQuestao() {
    if (questaoAtual < perguntasQuiz.length - 1) {
        questaoAtual++;
        carregarQuestao();
    } else {
        // Reinicia o quiz se chegou ao fim
        questaoAtual = 0;
        carregarQuestao();
    }
}

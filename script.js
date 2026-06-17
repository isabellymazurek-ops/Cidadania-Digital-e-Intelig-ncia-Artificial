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

// --- MENU RESPONSIVO MOBILE ---
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.styleFloat = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 11, 16, 0.95)';
            navLinks.style.padding = '2rem';
        }
    });
}

// --- BANCO DE DADOS DE CURIOSIDADES ---
const curiosidades = [
    "A primeira IA geradora de imagens surgiu muito antes do boom atual, mas os modelos atuais conseguem processar bilhões de parâmetros simultaneamente.",
    "Estudos indicam que mais de 50% dos jovens não conseguem diferenciar um título de notícia real de uma fake news gerada por IA.",
    "A tecnologia de clonagem de voz por IA agora precisa de apenas 3 segundos de amostra de áudio para replicar a voz de uma pessoa com fidelidade emocional.",
    "Alguns países já criaram legislações específicas para que robôs ou algoritmos que tomem decisões públicas passem por auditorias humanas regulares.",
    "O termo 'Deepfake' nasceu em 2017 em uma comunidade do Reddit, misturando os termos 'Deep Learning' (aprendizado profundo) e 'Fake' (falso)."
];

let curiosidadeAtual = 0;

function proximaCuriosidade() {
    curiosidadeAtual = (curiosidadeAtual + 1) % curiosidades.length;
    document.getElementById('curiosidade-texto').innerText = curiosidades[curiosidadeAtual];
}

// --- ENGINE DE QUIZ EDUCATIVO (EXPANDIDO) ---
const perguntasQuiz = [
    {
        pergunta: "Qual é o principal perigo dos Deepfakes na sociedade moderna?",
        opcoes: [
            "Gastar muita energia elétrica nos servidores de processamento de imagem.",
            "Destruir a reputação de pessoas e espalhar fraudes políticas/visuais muito convincentes.",
            "Deixar a infraestrutura de internet mundial lenta devido ao tamanho de seus arquivos."
        ],
        correta: 1
    },
    {
        pergunta: "O que caracteriza o fenômeno conhecido como 'Câmara de Eco' nas redes?",
        opcoes: [
            "Falhas de áudio durante chamadas de vídeo criptografadas.",
            "A propagação de sinais de satélite em áreas puramente rurais.",
            "Algoritmos que mostram apenas conteúdos que reforçam suas próprias crenças prévias."
        ],
        correta: 2
    },
    {
        pergunta: "Como a cidadania digital define o termo explicabilidade na IA?",
        opcoes: [
            "O direito de saber como um algoritmo chegou a uma decisão que afeta sua vida.",
            "A capacidade de um robô traduzir textos para múltiplos idiomas simultaneamente.",
            "A velocidade de digitação automatizada em centrais de atendimento ao cliente."
        ],
        correta: 0
    }
];

let questaoAtual = 0;

function carregarQuestao() {
    const q = perguntasQuiz[questaoAtual];
    document.getElementById('quiz-progresso').innerText = `Questão ${questaoAtual + 1}/${perguntasQuiz.length}`;
    document.getElementById('quiz-pergunta').innerText = q.pergunta;
    document.getElementById('opt0').innerText = q.opcoes[0];
    document.getElementById('opt1').innerText = q.opcoes[1];
    document.getElementById('opt2').innerText = q.opcoes[2];
    document.getElementById('quiz-feedback').innerText = "";
    document.getElementById('btn-next-quiz').style.display = "none";
}

function verificarResposta(indice) {
    const feedback = document.getElementById('quiz-feedback');
    const correto = perguntasQuiz[questaoAtual].correta;
    
    if(indice === correto) {
        feedback.innerText = "Correto! Excelente análise crítica.";
        feedback.style.color = "#00f2fe";
    } else {
        feedback.innerText = "Incorreto. Analise os impactos éticos da questão.";
        feedback.style.color = "#ff4757";
    }
    document.getElementById('btn-next-quiz').style.display = "inline-block";
}

function proximaQuestao() {
    questaoAtual = (questaoAtual + 1) % perguntasQuiz.length;
    carregarQuestao();
}

// --- MINI JOGO: JORNADA DA CIDADANIA ---
let playerStep = 1;
const historiasJogo = {
    1: { text: "Você recebeu um link alarmante em um grupo de mensagens. O que você faz?", opt1: "Checar fontes confiáveis antes", opt2: "Compartilhar imediatamente" },
    2: { text: "Um perfil de IA clonou o rosto de um amigo pedindo dinheiro urgente via chat. Qual sua reação?", opt1: "Ligar por canal seguro para validar", opt2: "Fazer a transferência correndo" },
    3: { text: "Um app pede acesso a todos os seus dados e fotos para fazer uma caricatura digital em segundos. Você aceita?", opt1: "Recusar e ler os termos de privacidade", opt2: "Permitir tudo sem ler nada" },
    4: { text: "Você encontrou um comentário preconceituoso impulsionado visivelmente por robôs artificiais. O que faz?", opt1: "Denunciar a conta à plataforma", opt2: "Discutir irritado com o robô" }
};

function jogarTurno(escolhaCorreta) {
    const storyText = document.getElementById('game-story');
    const btnContainer = document.getElementById('game-btn-container');

    if (escolhaCorreta) {
        document.getElementById(`step${playerStep}`).classList.remove('active-step');
        playerStep++;
        
        if(playerStep <= 4) {
            document.getElementById(`step${playerStep}`).classList.add('active-step');
            storyText.innerText = historiasJogo[playerStep].text;
            btnContainer.innerHTML = `
                <button class="option-btn" onclick="jogarTurno(true)">

document.querySelectorAll('.video-container video').forEach(vid => {
    vid.onclick = () => {
        const videoCode = vid.parentElement.dataset.code;
        const videoName = vid.parentElement.querySelector('p').innerText; // Obtém o nome do vídeo
        console.log('Código do vídeo clicado:', videoCode);
        console.log('Nome do vídeo:', videoName);
        document.querySelector('.popup-video').style.display = 'block';
        document.querySelector('.popup-video video').src = vid.src;
        document.querySelector('.popup-video p').innerText = videoName; // Define o nome do vídeo no pop-up
    }
});

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const videos = document.querySelectorAll('.video');
let noResultMessage = document.getElementById('noResultMessage'); // Seleciona a mensagem de "Nenhum produto encontrado"

// Função para pesquisar vídeos
function searchVideos() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let found = false; // Variável para controlar se pelo menos um vídeo foi encontrado

    if (searchTerm === '') {
        // Se o campo de pesquisa estiver vazio, exibir todos os vídeos e ocultar a mensagem de "Nenhum produto encontrado"
        videos.forEach(video => {
            video.style.display = 'block';
        });
        if (noResultMessage) {
            noResultMessage.style.display = 'none';
        }
        return; // Encerra a função se o campo de pesquisa estiver vazio
    }

    // Pesquisar pelos vídeos correspondentes ao termo de pesquisa
    videos.forEach(video => {
        const videoCode = video.dataset.code.toLowerCase();
        if (videoCode === searchTerm) {
            video.style.display = 'block';
            found = true; // Um vídeo foi encontrado
        } else {
            video.style.display = 'none';
        }
    });

    // Exibir ou ocultar a mensagem de "Nenhum produto encontrado"
    if (noResultMessage) {
        noResultMessage.style.display = found ? 'none' : 'block';
    } else if (!found) {
        // Adicionar uma mensagem de "Nenhum produto encontrado" se não existir
        const container = document.querySelector('.container');
        noResultMessage = document.createElement('div');
        noResultMessage.id = 'noResultMessage';
        noResultMessage.textContent = 'Nenhum produto encontrado';
        container.appendChild(noResultMessage);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll('.video-container .video');
    
    videos.forEach((video, index) => {
        video.classList.add('fade-in');
        video.style.animationDelay = `${index * 0.1}s`; // Ajuste o valor para alterar o atraso
    });
});


searchButton.addEventListener('click', searchVideos);

// Adicionar evento de pressionar a tecla "Enter" ao campo de entrada de pesquisa
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchVideos();
    }
});

// Selecionar o botão de fechar o vídeo pop-up
const closeButton = document.querySelector('.popup-video span');

// Adicionar evento de clique ao botão de fechar
closeButton.addEventListener('click', () => {
    document.querySelector('.popup-video').style.display = 'none';
});

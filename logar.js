function logar() {
    event.stopPropagation();
    var log = document.getElementById('login').value;
    var pass = document.getElementById('pass').value;

    if (log == "vz" && pass == "vz") {
        document.getElementById('loginpanel').style.display = "none";
        document.getElementById('panelmanager').style.display = "block";
    } else {
        alert('Login incorreto.');
    }
}

async function enviarParaGitHub() {
    event.stopPropagation();
    // Obtenha o valor do input
    const inputValue = document.getElementById('meuInput').value;

    if (!inputValue) {
        alert("Por favor, insira um valor para o código.");
        return;
    }

    // Defina o código JavaScript com o valor do input
    const code = `
function sensi() {
window.location.href = "sensibilidades.html";
}

function insta() {
window.open("https://www.instagram.com/vz_vendas._/", "_blank");
}

function grupo() {
window.location.href = "${inputValue}";
}

function headtracking() {
    window.location.href = "headtracking.html";
}
`;

    // Codifique o código em base64
    const encodedCode = btoa(code);

    // Token de acesso do GitHub (substitua pelo seu token)
    const GITHUB_TOKEN = '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';

    // Repositório do GitHub
    const REPO_OWNER = 'samukzxp';
    const REPO_NAME = 'vzstore';

    // Nome do arquivo onde o código será salvo
    const fileName = 'script.js'; // Nome do arquivo no repositório

    // URL da API do GitHub para obter o SHA do arquivo
    const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fileName}`;

    try {
        // Fazendo a requisição GET para obter os detalhes do arquivo
        const fileResponse = await fetch(getFileUrl, {
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!fileResponse.ok) {
            throw new Error('Erro ao obter informações do arquivo.');
        }

        const fileData = await fileResponse.json();
        const sha = fileData.sha;  // Obtenha o SHA do arquivo

        // URL da API do GitHub para atualizar o arquivo no repositório
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fileName}`;

        // Corpo da requisição para enviar o código atualizado
        const data = {
            message: 'Atualizando o código JavaScript via API',  // Mensagem de commit
            content: encodedCode,  // Código codificado em base64
            sha: sha,  // Inclua o SHA do arquivo existente
            branch: 'main'  // Ou o nome do seu branch
        };

        // Fazendo a requisição PUT para a API do GitHub
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            alert('Link atualizado com sucesso!');
        } else {
            const errorData = await response.json();
            alert('Erro ao atualizar no GitHub: ' + errorData.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao tentar atualizar o código no GitHub.');
    }
}
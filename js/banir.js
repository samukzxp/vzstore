// Defina as variáveis necessárias para acessar o repositório
const token = "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"; // Insira seu token de acesso pessoal do GitHub
const repoOwner = "samukzxp"; // Seu nome de usuário no GitHub
const repoName = "bdvz"; // Nome do repositório onde deseja salvar os dados
const pathOwner = "dados/owner.json"; // Caminho do arquivo owner.json
const path = "dados/usuarios.json"; // Caminho do arquivo JSON no repositório

// Função para buscar os dados do owner (admin)
async function fetchOwner() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathOwner}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            const decodedContent = atob(data.content);
            return JSON.parse(decodedContent); // Retorna os dados do owner.json
        } else {
            throw new Error(`Erro ao buscar o arquivo do owner: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Erro:", error.message);
        alert("Erro ao buscar os dados de login.");
        return []; // Retorna um array vazio em caso de erro
    }
}

async function loginAdmin(event) {
    event.preventDefault();  // Impede o comportamento padrão de submit do formulário

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    const owners = await fetchOwner();  // Carrega os dados do owner

    // Verifica se o login e a senha correspondem ao admin
    const owner = owners.find(o => o.username === username && o.password === password);

    if (owner) {
        alert("Login bem-sucedido!");
        document.getElementById('loginForm').style.display = 'none';  // Esconde o formulário de login
        document.getElementById('banFormContainer').style.display = 'block';  // Exibe o formulário de cadastro
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

// Função para buscar os dados dos usuários no GitHub
async function fetchUsuarios() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            const decodedContent = atob(data.content); // Decodifica o conteúdo do arquivo
            return JSON.parse(decodedContent);  // Retorna os dados dos usuários
        } else if (response.status === 404) {
            return [];  // Se o arquivo não for encontrado, retorna um array vazio
        } else {
            throw new Error(`Erro ao buscar o arquivo: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Erro:", error.message);
        return [];  // Retorna um array vazio em caso de erro
    }
}

// Função para buscar o SHA do arquivo
async function fetchSHA() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            return data.sha;  // Retorna o SHA do arquivo
        } else {
            throw new Error(`Erro ao buscar o SHA: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Erro:", error.message);
        alert("Erro ao buscar o SHA do arquivo.");
        return null;
    }
}

// Função para listar os usuários e adicionar botões de banir com a classe "btnlogar"
async function loadUsersForBan() {
    const usuarios = await fetchUsuarios();  // Carrega os usuários
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = '';  // Limpa a lista

    if (usuarios.length === 0) {
        userListDiv.innerHTML = "<p>Nenhum usuário encontrado.</p>";
        return;
    }

    usuarios.forEach((usuario) => {
        const btn = document.createElement('div');  // Usando div em vez de button
        btn.classList.add('btnlogar');  // Aplica a classe "btnlogar" do CSS
        btn.innerHTML = `Banir ${usuario.username}`;
        btn.onclick = () => banirUsuario(usuario.username);  // Ação de banir
        userListDiv.appendChild(btn);  // Adiciona o botão à lista
    });
}

// Função para banir o usuário
async function banirUsuario(username) {
    const usuarios = await fetchUsuarios();  // Carrega os usuários
    const updatedUsuarios = usuarios.filter(usuario => usuario.username !== username);  // Filtra o usuário a ser banido

    const conteudoArquivo = JSON.stringify(updatedUsuarios, null, 2);  // Cria o conteúdo JSON com a lista atualizada
    const sha = await fetchSHA();  // Obtém o SHA do arquivo

    if (!sha) {
        alert("Erro ao buscar o SHA do arquivo.");
        return;
    }

    // Atualiza o arquivo no GitHub com o novo conteúdo
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: 'Banir usuário',
                content: btoa(conteudoArquivo),  // Converte o conteúdo para base64
                sha: sha,  // Inclui o SHA do arquivo
            }),
        });

        if (response.ok) {

            loadUsersForBan();  // Atualiza a lista de usuários
        } else {
            const errorData = await response.json();  // Obtém o conteúdo do erro
            alert(`Erro ao atualizar o arquivo: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("Erro:", error.message);
        alert(`Erro ao banir o usuário: ${error.message}`);
    }
}

// Carregar os usuários quando a página for carregada
document.addEventListener('DOMContentLoaded', loadUsersForBan);

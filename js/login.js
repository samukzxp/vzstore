// Defina as variáveis necessárias para acessar o repositório
const token = "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"; // Insira seu token de acesso pessoal do GitHub
const repoOwner = "samukzxp"; // Seu nome de usuário no GitHub
const repoName = "bdvz"; // Nome do repositório onde deseja salvar os dados
const path = "dados/usuarios.json"; // Caminho do arquivo JSON no repositório

// Função para buscar os dados dos usuários no GitHub
// Função para buscar os dados dos usuários no GitHub
async function fetchUsuarios() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
            headers: {
                Authorization: `token ${token}`
            }
        });

        const data = await response.json();

        // Verifique se a resposta foi bem-sucedida e decodifique o conteúdo base64 para JSON
        if (data.content) {
            const usuarios = JSON.parse(atob(data.content));
            return usuarios;
        } else {
            console.error("Erro ao carregar os dados do repositório:", data);
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return [];
    }
}

// Função de login
async function entrar(event) {
    event.preventDefault();  // Evita o comportamento padrão de submit do formulário

    const login = document.getElementById('login').value.trim(); // Remove espaços extras
    const password = document.getElementById('password').value.trim(); // Remove espaços extras

    console.log("Tentando fazer login com:", login, password);  // Verifique os valores de login e senha

    if (!login || !password) {  // Verifique se login ou senha estão vazios
        alert("Por favor, preencha ambos os campos.");
        return;  // Retorna para evitar a execução do código se algum campo estiver vazio
    }

    const usuarios = await fetchUsuarios();  // Carrega os usuários

    console.log("Usuários carregados:", usuarios);  // Verifique os dados retornados

    // Verifica se o login e a senha correspondem a um usuário cadastrado
    const usuario = usuarios.find(u => u.username?.trim() === login && u.password?.trim() === password); // Alterei 'senha' para 'password'

    if (usuario) {
        console.log("Usuário encontrado:", usuario);  // Verifique se o usuário foi encontrado

        // Esconde todas as divs de acesso primeiro (para limpar qualquer conteúdo visível)
        const divs = document.querySelectorAll('[id^="headtracking"], [id^="packvz"]');
        divs.forEach(div => div.style.display = 'none');

        // Exibe a div com o id correspondente ao valor de acesso do usuário
        const acessoDiv = document.getElementById(usuario.acesso);  // Obtém a div com o id do acesso
        if (acessoDiv) {
            acessoDiv.style.display = 'block';  // Exibe a div com display block
        }
        document.getElementById('loginvit').style.display = "none";
    } else {
        console.log("Usuário ou senha incorretos!");  // Mensagem no log caso não encontre o usuário
        alert("Usuário ou senha incorretos!");
    }
}

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
    const GITHUB_TOKEN = '<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro com GitHub</title>
</head>
<body>

  <h2>Cadastro de Usuário</h2>
  <form onsubmit="registrarUsuario(event)">
    <input type="text" id="username" placeholder="Nome de usuário" required>
    <input type="email" id="email" placeholder="Email" required>
    <button type="submit">Cadastrar</button>
  </form>

  <script>
    async function enviarCadastroParaGithub(username, email) {
      const token = "SEU_TOKEN_AQUI"; // Insira seu token de acesso pessoal do GitHub
      const repoOwner = "SEU_USUARIO"; // Seu nome de usuário no GitHub
      const repoName = "SEU_REPOSITORIO"; // Nome do repositório onde deseja salvar os dados
      const path = "dados/usuarios.json"; // Caminho do arquivo JSON no repositório

      const novoUsuario = { username, email };

      try {
        let conteudoArquivo = "[]"; // Conteúdo inicial se o arquivo não existir ainda

        // Buscar conteúdo atual do arquivo
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          const decodedContent = atob(data.content);
          const usuarios = JSON.parse(decodedContent);
          usuarios.push(novoUsuario);
          conteudoArquivo = JSON.stringify(usuarios, null, 2);
        } else if (response.status === 404) {
          conteudoArquivo = JSON.stringify([novoUsuario], null, 2);
        } else {
          throw new Error(`Erro ao buscar o arquivo: ${response.statusText}`);
        }

        // Enviar conteúdo atualizado para o GitHub
        const responseAtualizacao = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Adicionando novo usuário",
            content: btoa(conteudoArquivo),
            sha: response.ok ? (await response.json()).sha : undefined,
          }),
        });

        if (responseAtualizacao.ok) {
          console.log("Usuário cadastrado com sucesso no GitHub!");
        } else {
          throw new Error(`Erro ao atualizar o arquivo: ${responseAtualizacao.statusText}`);
        }
      } catch (error) {
        console.error("Erro:", error.message);
      }
    }

    function registrarUsuario(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      enviarCadastroParaGithub(username, email);
    }
  </script>

</body>
</html>
';

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
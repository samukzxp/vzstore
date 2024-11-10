

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
        document.getElementById('loginForm').style.display = 'none';  // Esconde o formulário de login
        document.getElementById('escolha').style.left = "10px";
        setTimeout(() => {
            document.getElementById('escolha2').style.left = "10px";
        }, 100);
        setTimeout(() => {
            document.getElementById('escolha3').style.left = "10px";
        }, 200);
        setTimeout(() => {
            document.getElementById('escolha5').style.left = "10px";
        }, 300);
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

// Função para mudar o onclick de todos os elementos com a classe 'btnlogar2'
// Função para mudar o onclick de todos os elementos com a classe 'btnlogar2'
async function ban() {
    document.getElementById('bankickunkicktxt').innerHTML = "Banir Usuários"
    setTimeout(() => {
        document.getElementById('escolha5').style.display = "none";
        document.getElementById('escolha2').style.display = "none";
        document.getElementById('escolha3').style.display = "none";
    }, 100);
    document.getElementById('escolha5').style.left = "-1000px";
    document.getElementById('escolha2').style.left = "-1000px";
    document.getElementById('escolha3').style.left = "-1000px";
    document.getElementById('escolha4').style.left = "10px";
    document.getElementById('banFormContainer').style.display = 'block';  // Exibe o formulário de cadastro
    const botoes = document.querySelectorAll('.btnlogar2'); // Seleciona todos os elementos com a classe 'btnlogar2'
    botoes.forEach((botao) => {
        botao.onclick = async function() {
            const username = botao.innerHTML.trim(); // Obtém o nome de usuário do botão (você pode ajustar isso conforme necessário)

            const usuarios = await fetchUsuarios();  // Carrega os usuários

            // Filtra o usuário que será removido, excluindo-o da lista
            const updatedUsuarios = usuarios.filter(usuario => usuario.username !== username);

            const conteudoArquivo = JSON.stringify(updatedUsuarios, null, 2);  // Cria o conteúdo JSON com a lista atualizada
            const sha = await fetchSHA();  // Obtém o SHA do arquivo

            if (!sha) {
                alert("Erro ao buscar o SHA do arquivo.");
                return;
            }

            // Atualiza o arquivo no GitHub com o novo conteúdo (sem o usuário removido)
            try {
                const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: 'Remover usuário',
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
                alert(`Erro ao remover o usuário: ${error.message}`);
            }
        };
    });
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
        btn.classList.add('btnlogar2');  // Aplica a classe "btnlogar" do CSS
        btn.id = `btnlogar2`;  // Define um ID único usando o nome de usuário
        btn.innerHTML = `${usuario.username}`;
        btn.onclick = () => kickuser(usuario.username);  // Ação de banir
        userListDiv.appendChild(btn);  // Adiciona o botão à lista
    });
}


// Função para mudar o onclick de todos os elementos com a classe 'btnlogar2'
async function kickar() {
    document.getElementById('bankickunkicktxt').innerHTML = "Expulsar Usuários"
    setTimeout(() => {
        document.getElementById('escolha5').style.display = "none";
        document.getElementById('escolha').style.display = "none";
        document.getElementById('escolha3').style.display = "none";
    }, 100);
    document.getElementById('escolha5').style.left = "-1000px";
    document.getElementById('escolha').style.left = "-1000px";
    document.getElementById('escolha3').style.left = "-1000px";
    document.getElementById('escolha4').style.left = "10px";
    const botoes = document.querySelectorAll('.btnlogar2'); // Seleciona todos os elementos com a classe 'btnlogar2'
    botoes.forEach((botao) => {
        document.getElementById('banFormContainer').style.display = 'block';  // Exibe o formulário de cadastro
        botao.onclick = async function() {
            const username = botao.innerHTML.trim(); // Obtém o nome de usuário do botão (você pode ajustar isso conforme necessário)

            const usuarios = await fetchUsuarios();  // Carrega os usuários

            // Atualiza o campo "acesso" para "kicked" para o usuário especificado
            const updatedUsuarios = usuarios.map(usuario => 
                usuario.username === username ? { ...usuario, acesso: "kicked" } : usuario
            );

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
                        message: 'Banir usuário',  // Mensagem para indicar que o usuário foi banido
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
        };
    });
}

function openlinksm() {
    setTimeout(() => {
        document.getElementById('escolha2').style.display = "none";
        document.getElementById('escolha').style.display = "none";
        document.getElementById('escolha3').style.display = "none";
    }, 100);
    document.getElementById('escolha2').style.left = "-1000px";
    document.getElementById('escolha').style.left = "-1000px";
    document.getElementById('escolha3').style.left = "-1000px";
    document.getElementById('escolha4').style.left = "10px";
    document.getElementById('panelmanager').style.display = "block";
}

function voltar() {
    document.getElementById('panelmanager').style.display = "none";
    document.getElementById('escolha4').style.left = "-1000px";
    document.getElementById('banFormContainer').style.display = 'none';  // Exibe o formulário de cadastro
    setTimeout(() => {
        document.getElementById('escolha5').style.left = "10px";
        document.getElementById('escolha5').style.left = "10px";
        document.getElementById('escolha2').style.left = "10px";
        document.getElementById('escolha3').style.left = "10px";
        document.getElementById('escolha').style.left = "10px";
    }, 100);
    document.getElementById('escolha5').style.display = "block";
    document.getElementById('escolha5').style.display = "block";
    document.getElementById('escolha2').style.display = "block";
    document.getElementById('escolha3').style.display = "block";
    document.getElementById('escolha').style.display = "block";
}

async function unkick() {
    document.getElementById('bankickunkicktxt').innerHTML = "voltar Usuários"
    setTimeout(() => {
        document.getElementById('escolha5').style.display = "none";
        document.getElementById('escolha').style.display = "none";
        document.getElementById('escolha2').style.display = "none";
    }, 100);
    document.getElementById('escolha5').style.left = "-1000px";
    document.getElementById('escolha').style.left = "-1000px";
    document.getElementById('escolha2').style.left = "-1000px";
    document.getElementById('escolha4').style.left = "10px";
    document.getElementById('banFormContainer').style.display = 'block';  // Exibe o formulário de cadastro
    const botoes = document.querySelectorAll('.btnlogar2'); // Seleciona todos os elementos com a classe 'btnlogar2'
    botoes.forEach((botao) => {
        botao.onclick = async function() {
            const username = botao.innerHTML.trim(); // Obtém o nome de usuário do botão (você pode ajustar isso conforme necessário)

            const usuarios = await fetchUsuarios();  // Carrega os usuários

            // Atualiza o campo "acesso" para "kicked" para o usuário especificado
            const updatedUsuarios = usuarios.map(usuario => 
                usuario.username === username ? { ...usuario, acesso: "unckicked" } : usuario
            );

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
                        message: 'Banir usuário',  // Mensagem para indicar que o usuário foi banido
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
        };
    });
}


// Carregar os usuários quando a página for carregada
document.addEventListener('DOMContentLoaded', loadUsersForBan);





//Links Grupo




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

    // Codifica o código em base64
    const encodedCode = btoa(code);  // Converte o código para base64

    // URL da API do GitHub para obter o SHA do arquivo
    const getFileUrl = `https://api.github.com/repos/samukzxp/vzstore/contents/script.js`;

    try {
        // Fazendo a requisição GET para obter os detalhes do arquivo
        const fileResponse = await fetch(getFileUrl, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!fileResponse.ok) {
            throw new Error('Erro ao obter informações do arquivo.');
        }

        const fileData = await fileResponse.json();
        const sha = fileData.sha;  // Obtenha o SHA do arquivo

        // URL da API do GitHub para atualizar o arquivo no repositório
        const url = `https://api.github.com/repos/samukzxp/vzstore/contents/script.js`;

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
                'Authorization': `token ${token}`,
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

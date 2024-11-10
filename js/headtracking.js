function comprarhead() {
    alert('comprando');
}

function headd() {
    event.stopPropagation();
    const minhaDiv = document.getElementById('plataform');
    minhaDiv.style.display = 'block';
    document.getElementById('op').style.opacity = "0.2";
    document.getElementById('avs').style.opacity = "0.2";

    // Adiciona um evento de clique para verificar se clicou fora da div
    document.onclick = function(evento) {
        const botaoDiv = document.getElementById('headplat');
        if (!minhaDiv.contains(evento.target) && evento.target !== botaoDiv) {
            console.log('Clicou fora da div!');
            minhaDiv.style.display = 'none'; // Ou outro comando desejado
            document.getElementById('op').style.opacity = "1";
            document.getElementById('avs').style.opacity = "1";
        }
    }
}

function sensii() {
    event.stopPropagation();
    const minhaDiv = document.getElementById('plataform2');
    minhaDiv.style.display = 'block';
    document.getElementById('op').style.opacity = "0.2";
    document.getElementById('avs').style.opacity = "0.2";

    // Adiciona um evento de clique para verificar se clicou fora da div
    document.onclick = function(evento) {
        const botaoDiv = document.getElementById('sensiplat');
        if (!minhaDiv.contains(evento.target) && evento.target !== botaoDiv) {
            console.log('Clicou fora da div!');
            minhaDiv.style.display = 'none'; // Ou outro comando desejado
            document.getElementById('op').style.opacity = "1";
            document.getElementById('avs').style.opacity = "1";
        }
    }
}

function pack() {
    event.stopPropagation();
    const minhaDiv = document.getElementById('plataform3');
    minhaDiv.style.display = 'block';
    document.getElementById('op').style.opacity = "0.2";
    document.getElementById('avs').style.opacity = "0.2";

    // Adiciona um evento de clique para verificar se clicou fora da div
    document.onclick = function(evento) {
        const botaoDiv = document.getElementById('packplat');
        if (!minhaDiv.contains(evento.target) && evento.target !== botaoDiv) {
            console.log('Clicou fora da div!');
            minhaDiv.style.display = 'none'; // Ou outro comando desejado
            document.getElementById('op').style.opacity = "1";
            document.getElementById('avs').style.opacity = "1";
        }
    }
}

function regetid() {
    event.stopPropagation();
    const minhaDiv = document.getElementById('plataform4');
    minhaDiv.style.display = 'block';
    document.getElementById('op').style.opacity = "0.2";
    document.getElementById('avs').style.opacity = "0.2";

    // Adiciona um evento de clique para verificar se clicou fora da div
    document.onclick = function(evento) {
        const botaoDiv = document.getElementById('regplat');
        if (!minhaDiv.contains(evento.target) && evento.target !== botaoDiv) {
            console.log('Clicou fora da div!');
            minhaDiv.style.display = 'none'; // Ou outro comando desejado
            document.getElementById('op').style.opacity = "1";
            document.getElementById('avs').style.opacity = "1";
        }
    }
}

function scrollParaFim() {
    // Rola a página para o final
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'  // Para adicionar um efeito suave ao scroll
    });
}

function headandroind() {
    alert('select:(headtracking android)');
}

function headios() {
    alert('select:(headtracking ios)');
}

function sensiandroid() {
    alert('select:(sensi android)');
}

function sensiios() {
    alert('select:(sensi ios)');
}

function combovzandroid() {
    alert('select:(combo vz android)');
}

function combovzios() {
    alert('select:(combo vz ios)');
}

function regandroid() {
    alert('select:(regedit android)');
}

function regios() {
    alert('select:(regedit ios)');
}
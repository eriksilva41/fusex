function pesquisarCPF() {
    const cpf = document.getElementById('cpfInput').value;
    const controlePromise = fetch('controle_de_guias.csv').then(response => response.text());
    const inicioPromise = fetch('inicio.csv').then(response => response.text());
    
    Promise.all([controlePromise, inicioPromise]).then(([controleData, inicioData]) => {
        const controleLinhas = controleData.split('\n');
        const inicioLinhas = inicioData.split('\n');
        
        const resultados = controleLinhas.filter(linha => linha.includes(cpf));
        mostrarResultados(resultados);
    });
}

function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    resultados.forEach((resultado, index) => {
        const [cpf, descricao, link] = resultado.split(',');
        resultadosDiv.innerHTML += `
            <div>
                <p>CPF: ${cpf}</p>
                <p>Descrição: ${descricao}</p>
                <p><a href="${link}" target="_blank">Baixar Guia</a></p>
                <hr>
            </div>
        `;
    });
}

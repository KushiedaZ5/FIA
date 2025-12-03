document.addEventListener('DOMContentLoaded', () => {

    const tituloCarrera = document.getElementById('titulo-carrera');
    const ciclosContainer = document.getElementById('ciclos-container');

    const urlParams = new URLSearchParams(window.location.search);
    const carreraKey = urlParams.get('carrera');

    if (carreraKey && dataCarreras[carreraKey]) {
        const carreraData = dataCarreras[carreraKey];
        tituloCarrera.textContent = `Selecciona un Ciclo de ${carreraData.nombre}`;

        for (let i = 1; i <= 6; i++) {
            const cicloKey = `ciclo${i}`;
            const ciclo = carreraData.ciclos[cicloKey];
            
            let cursosHtml = '<li>(Próximamente...)</li>';
            if (ciclo && ciclo.length > 0) {
                cursosHtml = ciclo.map(curso => `<li>${curso.text}</li>`).join('');
            }

            const tieneCursos = ciclo && ciclo.length > 0;
            const linkClass = tieneCursos ? "cycle-block" : "cycle-block cycle-block-disabled";
            const linkHref = tieneCursos ? `calculadora.html?carrera=${carreraKey}&ciclo=${cicloKey}` : "#";

            // CAMBIO AQUÍ: "CICLO" en mayúsculas explícito
            const cicloHtml = `
                <div class="col-md-6">
                    <a href="${linkHref}" class="${linkClass}" ${!tieneCursos ? 'onclick="return false;"' : ''}>
                        <h4>CICLO ${i}</h4>
                        <ul>
                            ${cursosHtml}
                        </ul>
                    </a>
                </div>
            `;
            ciclosContainer.innerHTML += cicloHtml;
        }

    } else {
        tituloCarrera.textContent = 'Error: Carrera no encontrada';
        ciclosContainer.innerHTML = '<p class="text-center text-danger">Por favor, regresa al inicio.</p>';
    }
});
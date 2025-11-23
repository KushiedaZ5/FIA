document.addEventListener('DOMContentLoaded', () => {

    // ========== 🧠 PARTE 1: LA BASE DE DATOS DE CURSOS ==========
    // ¡LA CONST "dataCarreras" FUE ELIMINADA DE AQUÍ!
    // Ahora se carga desde "data/data.js" en el HTML.


    // ========== 🎯 PARTE 2: REFERENCIAS HTML ==========
    // --- Referencias a elementos VISIBLES ---
    const tituloCiclo = document.getElementById('titulo-ciclo');
    const cursosBotonesContainer = document.getElementById('cursos-botones-container');
    const syllabusSection = document.getElementById('syllabus-section');
    const imagenSilabo = document.getElementById('imagenSilabo');
    const textoSilabo = document.getElementById('textoSilabo');
    const calculadoraContenido = document.getElementById('calculadoraContenido');
    const columnaDerechaNotas = document.getElementById('columnaDerechaNotas');
    const contenedorPesos = document.getElementById('contenedorPesos');

    // --- Referencias a elementos OCULTOS (pero necesarios para la lógica) ---
    const selectCarrera = document.getElementById('selectCarrera');
    const selectCiclo = document.getElementById('selectCiclo');
    const selectCurso = document.getElementById('selectCurso');

    // --- Referencias a Inputs de Notas ---
    const camposPractica = [
        document.getElementById('campoP1'), document.getElementById('campoP2'),
        document.getElementById('campoP3'), document.getElementById('campoP4')
    ];
    const campoW1 = document.getElementById('campoW1');
    const campoEP = document.getElementById('campoEP');
    const campoEF = document.getElementById('campoEF');
    const camposLaboratorioContainer = document.getElementById('camposLaboratorio');
    const camposControlesContainer = document.getElementById('camposControles');
    const camposLab = [
        document.getElementById('campoLb1'), document.getElementById('campoLb2'), document.getElementById('campoLb3'),
        document.getElementById('campoLb4'), document.getElementById('campoLb5'), document.getElementById('campoLb6'),
        document.getElementById('campoLb7')
    ];
    const inputsControl = [
        document.getElementById('control1'), document.getElementById('control2'), document.getElementById('control3'),
        document.getElementById('control4'), document.getElementById('control5'), document.getElementById('control6'),
        document.getElementById('control7'), document.getElementById('control8')
    ];
    const inputsPractica = [
        document.getElementById('practica1'), document.getElementById('practica2'),
        document.getElementById('practica3'), document.getElementById('practica4')
    ];
    const trabajoPracticoInput = document.getElementById('trabajoPractico');
    const examenParcialInput = document.getElementById('examenParcial');
    const examenFinalInput = document.getElementById('examenFinal');
    const inputsLab = [
        document.getElementById('lab1'), document.getElementById('lab2'), document.getElementById('lab3'),
        document.getElementById('lab4'), document.getElementById('lab5'), document.getElementById('lab6'),
        document.getElementById('lab7')
    ];
    const promedioFinalDiv = document.getElementById('promedioFinal');
    const notaMinimaFinalDiv = document.getElementById('notaMinimaFinal');
    const NOTA_APROBATORIA = 10.5;


    // ========== 🔄 PARTE 3: LÓGICA DE LISTAS DEPENDIENTES ==========

    function poblarCarreras() {
        Object.keys(dataCarreras).forEach(carreraKey => {
            const carrera = dataCarreras[carreraKey];
            const option = new Option(carrera.nombre, carreraKey);
            selectCarrera.add(option);
        });
    }

    function poblarCiclos() {
        const carreraKey = selectCarrera.value;
        selectCiclo.innerHTML = '';
        if (carreraKey && dataCarreras[carreraKey]) {
            const ciclos = dataCarreras[carreraKey].ciclos;
            Object.keys(ciclos).forEach(cicloKey => {
                if (parseInt(cicloKey.replace('ciclo', '')) <= 6) {
                    const option = new Option(cicloKey.replace('ciclo', 'Ciclo '), cicloKey);
                    selectCiclo.add(option);
                }
            });
        }
    }

    function generarBotonesDeCurso(carreraKey, cicloKey) {
        cursosBotonesContainer.innerHTML = '';

        if (carreraKey && cicloKey && dataCarreras[carreraKey].ciclos[cicloKey]) {
            const cursos = dataCarreras[carreraKey].ciclos[cicloKey];

            if (cursos.length === 0) {
                cursosBotonesContainer.innerHTML = '<p class="text-body-secondary">No hay cursos registrados para este ciclo. (Próximamente...)</p>';
                return;
            }

            cursos.forEach(curso => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-curso';
                button.textContent = curso.text;
                button.dataset.value = curso.value;
                cursosBotonesContainer.appendChild(button);
            });
        } else {
            cursosBotonesContainer.innerHTML = '<p class="text-danger">Error al cargar cursos.</p>';
        }
    }

    function poblarCursos() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        selectCurso.innerHTML = '';

        if (carreraKey && cicloKey && dataCarreras[carreraKey].ciclos[cicloKey]) {
            const cursos = dataCarreras[carreraKey].ciclos[cicloKey];
            cursos.forEach(curso => {
                const option = new Option(curso.text, curso.value);
                selectCurso.add(option);
            });
        }
    }

    function actualizarVistaCurso() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;

        if (!carreraKey || !cicloKey || !cursoVal) {
            calculadoraContenido.classList.add('d-none');
            columnaDerechaNotas.classList.add('d-none');
            columnaDerechaNotas.classList.remove('d-lg-block');
            syllabusSection.classList.add('d-none');
            return;
        }

        syllabusSection.classList.remove('d-none');
        calculadoraContenido.classList.remove('d-none');
        columnaDerechaNotas.classList.remove('d-none');
        columnaDerechaNotas.classList.add('d-lg-block');

        const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(curso => curso.value === cursoVal);
        if (cursoData) {
            // ✨ NUEVA LÓGICA: Leer imagen desde esquemas en lugar de cursoData
            const esquema = esquemas[cursoData.esquema];
            imagenSilabo.src = esquema?.imagen || 'imagenes/040.png';
            imagenSilabo.style.display = 'block';
            textoSilabo.style.display = 'none';
            actualizarCamposDeNotas(cursoData.esquema);
            mostrarPesos(cursoData.esquema);
        }

        document.querySelectorAll('.btn-curso').forEach(btn => {
            btn.classList.remove('active');
        });
        const botonActivo = document.querySelector(`.btn-curso[data-value="${cursoVal}"]`);
        if (botonActivo) {
            botonActivo.classList.add('active');
        }

        calcularNotas();
    }

    selectCarrera.addEventListener('change', poblarCiclos);
    selectCiclo.addEventListener('change', poblarCursos);
    selectCurso.addEventListener('change', actualizarVistaCurso);

    cursosBotonesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-curso')) {
            const cursoValue = e.target.dataset.value;
            selectCurso.value = cursoValue;
            selectCurso.dispatchEvent(new Event('change'));
        }
    });


    // ========== 📊 PARTE 4: MOSTRAR PESOS ==========
    function mostrarPesos(esquemaId) {
        contenedorPesos.innerHTML = '';

        if (!esquemaId || !esquemas[esquemaId]) {
            return;
        }

        const esquema = esquemas[esquemaId];
        const pesos = esquema.pesos || [];

        const pesosOrdenados = [...pesos].sort((a, b) => b.v - a.v);

        pesosOrdenados.forEach(item => {
            const html = `
                <div>
                    <div class="d-flex justify-content-between mb-1 small">
                        <span class="fw-bold text-light">${item.n}</span>
                        <span class="text-white-50">${item.v.toFixed(1)}%</span>
                    </div>
                    <div class="progress" role="progressbar" style="height: 10px; background-color: #333;">
                        <div class="progress-bar ${item.c || 'bg-primary'}" style="width: ${item.v}%"></div>
                    </div>
                </div>
            `;
            contenedorPesos.innerHTML += html;
        });
    }

    // ========== ⚙️ PARTE 5: CÁLCULOS Y CAMPOS ==========

    function actualizarCamposDeNotas(esquemaId) {
        [...camposPractica, campoW1, campoEP, camposLaboratorioContainer, camposControlesContainer, ...camposLab].forEach(c => c && c.classList.add('d-none'));

        if (!esquemaId || !esquemas[esquemaId]) {
            return;
        }

        const inputs = esquemas[esquemaId].inputs || [];

        inputs.forEach(inputName => {
            if (inputName.startsWith('P')) {
                const num = parseInt(inputName.substring(1));
                if (num >= 1 && num <= 4) camposPractica[num - 1]?.classList.remove('d-none');
                if (num === 5) camposPractica[4]?.classList.remove('d-none');
            } else if (inputName === 'W1') {
                campoW1?.classList.remove('d-none');
            } else if (inputName === 'EP') {
                campoEP?.classList.remove('d-none');
            } else if (inputName === 'EF') {
                campoEF?.classList.remove('d-none');
            } else if (inputName.startsWith('Lb')) {
                const num = parseInt(inputName.substring(2));
                camposLaboratorioContainer?.classList.remove('d-none');
                if (num >= 1 && num <= 7) camposLab[num - 1]?.classList.remove('d-none');
            } else if (inputName.startsWith('C')) {
                camposControlesContainer?.classList.remove('d-none');
            }
        });
    }

    function resetearCampos() {
        calculadoraContenido.classList.add('d-none');
        columnaDerechaNotas.classList.add('d-none');
        columnaDerechaNotas.classList.remove('d-lg-block');
        syllabusSection.classList.add('d-none');

        imagenSilabo.style.display = 'none';
        textoSilabo.style.display = 'block';
        textoSilabo.textContent = 'Selecciona un curso para ver su sílabo y fórmula';

        contenedorPesos.innerHTML = '';
        cursosBotonesContainer.innerHTML = '<p class="text-body-secondary">Cargando cursos...</p>';

        actualizarCamposDeNotas('default');

        [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(i => i && (i.value = 0));

        selectCurso.value = '';

        calcularNotas();
    }

    function calcularNotas() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;
        let esquemaId = null;

        if (carreraKey && cicloKey && cursoVal) {
            const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(curso => curso.value === cursoVal);
            if (cursoData) esquemaId = cursoData.esquema;
        }

        if (!esquemaId || !esquemas[esquemaId]) {
            promedioFinalDiv.textContent = "0.00";
            notaMinimaFinalDiv.textContent = "N/A";
            notaMinimaFinalDiv.style.color = '#f7e07a';
            return;
        }

        const notasObj = {
            P1: parseFloat(inputsPractica[0]?.value) || 0,
            P2: parseFloat(inputsPractica[1]?.value) || 0,
            P3: parseFloat(inputsPractica[2]?.value) || 0,
            P4: parseFloat(inputsPractica[3]?.value) || 0,
            P5: parseFloat(inputsPractica[4]?.value) || 0,
            W1: parseFloat(trabajoPracticoInput?.value) || 0,
            EP: parseFloat(examenParcialInput?.value) || 0,
            EF: parseFloat(examenFinalInput?.value) || 0,
            Lb1: parseFloat(inputsLab[0]?.value) || 0,
            Lb2: parseFloat(inputsLab[1]?.value) || 0,
            Lb3: parseFloat(inputsLab[2]?.value) || 0,
            Lb4: parseFloat(inputsLab[3]?.value) || 0,
            Lb5: parseFloat(inputsLab[4]?.value) || 0,
            Lb6: parseFloat(inputsLab[5]?.value) || 0,
            Lb7: parseFloat(inputsLab[6]?.value) || 0,
            C1: parseFloat(inputsControl[0]?.value) || 0,
            C2: parseFloat(inputsControl[1]?.value) || 0,
            C3: parseFloat(inputsControl[2]?.value) || 0,
            C4: parseFloat(inputsControl[3]?.value) || 0,
            C5: parseFloat(inputsControl[4]?.value) || 0,
            C6: parseFloat(inputsControl[5]?.value) || 0,
            C7: parseFloat(inputsControl[6]?.value) || 0,
            C8: parseFloat(inputsControl[7]?.value) || 0
        };

        const promedio = esquemas[esquemaId].calcular(notasObj);
        promedioFinalDiv.textContent = promedio.toFixed(2);

        // ========== CÁLCULO DE NOTA MÍNIMA PARA APROBAR ==========
        const notasSinFinal = { ...notasObj, EF: 0 };
        const promedioSinFinal = esquemas[esquemaId].calcular(notasSinFinal);

        const notasConFinalMax = { ...notasObj, EF: 20 };
        const promedioConFinalMax = esquemas[esquemaId].calcular(notasConFinalMax);

        const contribucionEF = promedioConFinalMax - promedioSinFinal;
        const pesoEF = contribucionEF / 20;

        const notaNecesariaFinal = (NOTA_APROBATORIA - promedioSinFinal) / pesoEF;

        if (promedio >= NOTA_APROBATORIA) {
            notaMinimaFinalDiv.textContent = "Ya aprobaste!";
            notaMinimaFinalDiv.style.color = '#76ff03';
        } else if (notaNecesariaFinal > 20) {
            notaMinimaFinalDiv.textContent = "Imposible aprobar";
            notaMinimaFinalDiv.style.color = '#ff1744';
        } else if (notaNecesariaFinal <= 0) {
            notaMinimaFinalDiv.textContent = "Ya aprobaste!";
            notaMinimaFinalDiv.style.color = '#76ff03';
        } else {
            notaMinimaFinalDiv.textContent = notaNecesariaFinal.toFixed(2);
            notaMinimaFinalDiv.style.color = '#f7e07a';
        }
    }

    // ========== 🏁 PARTE 6: INICIALIZACIÓN ==========

    function autoseleccionarDesdeURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const carreraKey = urlParams.get('carrera');
        const cicloKey = urlParams.get('ciclo');

        const btnVolver = document.getElementById('btnVolverMapa');
        if (carreraKey) {
            btnVolver.href = `carrera.html?carrera=${carreraKey}`;
        } else {
            btnVolver.href = 'index.html';
        }

        if (carreraKey && selectCarrera.querySelector(`option[value="${carreraKey}"]`)) {
            selectCarrera.value = carreraKey;
            selectCarrera.dispatchEvent(new Event('change'));

            if (cicloKey && selectCiclo.querySelector(`option[value="${cicloKey}"]`)) {
                selectCiclo.value = cicloKey;
                selectCiclo.dispatchEvent(new Event('change'));

                const cicloTexto = cicloKey.replace('ciclo', 'Ciclo ');
                tituloCiclo.textContent = `${cicloTexto} - ${dataCarreras[carreraKey].nombre}`;

                generarBotonesDeCurso(carreraKey, cicloKey);

            } else {
                tituloCiclo.textContent = 'Error: Ciclo no válido';
                cursosBotonesContainer.innerHTML = '<p class="text-danger">Ciclo no encontrado. Por favor, vuelve a intentarlo.</p>';
            }
        } else {
            tituloCiclo.textContent = 'Error: Carrera no válida';
            cursosBotonesContainer.innerHTML = '<p class="text-danger">Carrera no encontrada. Por favor, vuelve al inicio.</p>';
        }
    }

    [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(input => {
        input && input.addEventListener('input', calcularNotas);
    });

    poblarCarreras();
    resetearCampos();
    autoseleccionarDesdeURL();
});
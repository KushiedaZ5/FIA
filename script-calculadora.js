document.addEventListener('DOMContentLoaded', () => {

    // ========== 🎯 PARTE 1: REFERENCIAS AL DOM ==========
    
    // Títulos y Contenedores
    const tituloCiclo = document.getElementById('titulo-ciclo');
    const cursosBotonesContainer = document.getElementById('cursos-botones-container');
    const syllabusSection = document.getElementById('syllabus-section');
    const imagenSilabo = document.getElementById('imagenSilabo');
    const textoSilabo = document.getElementById('textoSilabo');
    const calculadoraContenido = document.getElementById('calculadoraContenido');
    const columnaDerechaNotas = document.getElementById('columnaDerechaNotas');
    const contenedorPesos = document.getElementById('contenedorPesos');

    // Selectores Ocultos (Para mantener la lógica de navegación)
    const selectCarrera = document.getElementById('selectCarrera');
    const selectCiclo = document.getElementById('selectCiclo');
    const selectCurso = document.getElementById('selectCurso');

    // Inputs de Notas (Agrupados para fácil acceso)
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
    
    const inputsControl = [
        document.getElementById('control1'), document.getElementById('control2'), document.getElementById('control3'),
        document.getElementById('control4'), document.getElementById('control5'), document.getElementById('control6'),
        document.getElementById('control7'), document.getElementById('control8')
    ];

    // Contenedores de Inputs (Para ocultar/mostrar)
    const camposPracticaContainers = [
        document.getElementById('campoP1'), document.getElementById('campoP2'),
        document.getElementById('campoP3'), document.getElementById('campoP4')
    ];
    const campoW1Container = document.getElementById('campoW1');
    const campoEPContainer = document.getElementById('campoEP');
    const campoEFContainer = document.getElementById('campoEF');
    const camposLaboratorioContainer = document.getElementById('camposLaboratorio');
    const camposControlesContainer = document.getElementById('camposControles');
    
    // Contenedores individuales de Labs (para ocultar los que no se usen)
    const camposLabContainers = [
        document.getElementById('campoLb1'), document.getElementById('campoLb2'), document.getElementById('campoLb3'),
        document.getElementById('campoLb4'), document.getElementById('campoLb5'), document.getElementById('campoLb6'),
        document.getElementById('campoLb7')
    ];

    // Elementos de Resultado
    const promedioFinalDiv = document.getElementById('promedioFinal');
    const notaMinimaFinalDiv = document.getElementById('notaMinimaFinal');
    const NOTA_APROBATORIA = 10.5;


    // ========== 🔄 PARTE 2: NAVEGACIÓN Y CARGA DE DATOS ==========

    // 1. Llenar el select oculto de Carreras
    function poblarCarreras() {
        if (typeof dataCarreras === 'undefined') return; // Seguridad por si no carga data.js
        Object.keys(dataCarreras).forEach(carreraKey => {
            const carrera = dataCarreras[carreraKey];
            const option = new Option(carrera.nombre, carreraKey);
            selectCarrera.add(option);
        });
    }

    // 2. Llenar el select oculto de Ciclos
    function poblarCiclos() {
        const carreraKey = selectCarrera.value;
        selectCiclo.innerHTML = ''; // Limpiar
        if (carreraKey && dataCarreras[carreraKey]) {
            const ciclos = dataCarreras[carreraKey].ciclos;
            Object.keys(ciclos).forEach(cicloKey => {
                // Solo mostramos hasta ciclo 6 por ahora
                if (parseInt(cicloKey.replace('ciclo', '')) <= 6) {
                    const option = new Option(cicloKey.replace('ciclo', 'Ciclo '), cicloKey);
                    selectCiclo.add(option);
                }
            });
        }
    }

    // 3. Generar los Botones Visibles (La parte visual importante)
    function generarBotonesDeCurso(carreraKey, cicloKey) {
        cursosBotonesContainer.innerHTML = ''; // Limpiar botones viejos

        if (carreraKey && cicloKey && dataCarreras[carreraKey].ciclos[cicloKey]) {
            const cursos = dataCarreras[carreraKey].ciclos[cicloKey];

            if (cursos.length === 0) {
                cursosBotonesContainer.innerHTML = '<p class="text-body-secondary">No hay cursos registrados para este ciclo. (Próximamente...)</p>';
                return;
            }

            cursos.forEach(curso => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-curso'; // Clase CSS nueva
                button.textContent = curso.text;
                button.dataset.value = curso.value; // Guardamos el ID del curso
                cursosBotonesContainer.appendChild(button);
            });
        } else {
            cursosBotonesContainer.innerHTML = '<p class="text-danger">Error al cargar cursos.</p>';
        }
    }

    // 4. Llenar el select oculto de Cursos (para mantener sincronía)
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


    // ========== 🎨 PARTE 3: ACTUALIZACIÓN DE LA VISTA ==========

    function actualizarVistaCurso() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;

        // Si no hay selección completa, ocultamos la calculadora
        if (!carreraKey || !cicloKey || !cursoVal) {
            calculadoraContenido.classList.add('d-none');
            columnaDerechaNotas.classList.add('d-none');
            columnaDerechaNotas.classList.remove('d-lg-block');
            syllabusSection.classList.add('d-none');
            return;
        }

        // Mostramos las secciones
        syllabusSection.classList.remove('d-none');
        calculadoraContenido.classList.remove('d-none');
        columnaDerechaNotas.classList.remove('d-none');
        columnaDerechaNotas.classList.add('d-lg-block');

        // Buscamos los datos del curso seleccionado
        const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(curso => curso.value === cursoVal);
        
        if (cursoData) {
            // Buscamos el esquema en la librería esquemas.js
            const esquemaId = cursoData.esquema; // Ej: '041'
            const esquema = esquemas[esquemaId];

            if (esquema) {
                // Actualizamos Imagen del Sílabo
                // Prioridad: Imagen en data.js > Imagen en esquemas.js > Default
                const rutaImagen = cursoData.imagen || esquema.imagen || 'imagenes/silabo_default.png';
                imagenSilabo.src = rutaImagen;
                imagenSilabo.style.display = 'block';
                textoSilabo.style.display = 'none';

                // Renderizamos Inputs y Pesos
                actualizarCamposDeNotas(esquemaId);
                mostrarPesos(esquemaId);
            } else {
                console.error("Esquema no encontrado:", esquemaId);
            }
        }

        // Resaltar el botón activo visualmente
        document.querySelectorAll('.btn-curso').forEach(btn => btn.classList.remove('active'));
        const botonActivo = document.querySelector(`.btn-curso[data-value="${cursoVal}"]`);
        if (botonActivo) botonActivo.classList.add('active');

        // Calcular con los valores actuales (o ceros)
        calcularNotas();
    }


    // ========== 📊 PARTE 4: RENDERIZADO DINÁMICO (Inputs y Pesos) ==========

    function mostrarPesos(esquemaId) {
        contenedorPesos.innerHTML = '';
        if (!esquemaId || !esquemas[esquemaId]) return;

        const esquema = esquemas[esquemaId];
        const pesos = esquema.pesos || [];

        // Ordenamos de mayor peso a menor
        const pesosOrdenados = [...pesos].sort((a, b) => b.v - a.v);

        pesosOrdenados.forEach(item => {
            // Asignamos colores según el nombre o valor
            let colorBarra = item.c || 'bg-primary'; 
            if(item.n.includes('Final')) colorBarra = 'bg-danger';
            if(item.n.includes('Parcial')) colorBarra = 'bg-warning';

            const html = `
                <div>
                    <div class="d-flex justify-content-between mb-1 small">
                        <span class="fw-bold text-light">${item.n}</span>
                        <span class="text-white-50">${item.v.toFixed(1)}%</span>
                    </div>
                    <div class="progress" role="progressbar" style="height: 8px; background-color: #333;">
                        <div class="progress-bar ${colorBarra}" style="width: ${item.v}%"></div>
                    </div>
                </div>
            `;
            contenedorPesos.innerHTML += html;
        });
    }

    function actualizarCamposDeNotas(esquemaId) {
        // 1. Ocultar TODO primero
        [...camposPracticaContainers, campoW1Container, campoEPContainer, campoEFContainer, 
         camposLaboratorioContainer, camposControlesContainer, ...camposLabContainers].forEach(c => c && c.classList.add('d-none'));

        if (!esquemaId || !esquemas[esquemaId]) return;

        // 2. Leer qué inputs necesita este esquema
        const inputsRequeridos = esquemas[esquemaId].inputs || [];

        // 3. Mostrar solo lo necesario
        inputsRequeridos.forEach(inputName => {
            if (inputName.startsWith('P')) {
                // P1, P2, P3, P4
                const num = parseInt(inputName.substring(1));
                if (num >= 1 && num <= 4) camposPracticaContainers[num - 1]?.classList.remove('d-none');
            } 
            else if (inputName === 'W1') campoW1Container?.classList.remove('d-none');
            else if (inputName === 'EP') campoEPContainer?.classList.remove('d-none');
            else if (inputName === 'EF') campoEFContainer?.classList.remove('d-none');
            else if (inputName.startsWith('Lb')) {
                // Labs
                camposLaboratorioContainer?.classList.remove('d-none');
                const num = parseInt(inputName.substring(2));
                if (num >= 1 && num <= 7) camposLabContainers[num - 1]?.classList.remove('d-none');
            } 
            else if (inputName.startsWith('C')) {
                // Controles
                camposControlesContainer?.classList.remove('d-none');
            }
        });
    }


    // ========== 🧮 PARTE 5: EL CEREBRO MATEMÁTICO ==========

    function calcularNotas() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;
        let esquemaId = null;

        // Buscar qué esquema estamos usando
        if (carreraKey && cicloKey && cursoVal) {
            const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(curso => curso.value === cursoVal);
            if (cursoData) esquemaId = cursoData.esquema;
        }

        if (!esquemaId || !esquemas[esquemaId]) {
            promedioFinalDiv.textContent = "0.00";
            notaMinimaFinalDiv.textContent = "N/A";
            return;
        }

        // 1. Recolectar valores de los inputs (Sanitización)
        const notasObj = {
            P1: parseFloat(inputsPractica[0]?.value) || 0,
            P2: parseFloat(inputsPractica[1]?.value) || 0,
            P3: parseFloat(inputsPractica[2]?.value) || 0,
            P4: parseFloat(inputsPractica[3]?.value) || 0,
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

        // 2. Calcular Promedio Actual
        const promedio = esquemas[esquemaId].calcular(notasObj);
        promedioFinalDiv.textContent = promedio.toFixed(2);

        // 3. ✨ LÓGICA DELTA: Calcular Nota Mínima para Aprobar
        // Estrategia: Calculamos el promedio asumiendo EF=0 y EF=20 para hallar el "peso real" del final.
        
        const notasSinFinal = { ...notasObj, EF: 0 };
        const promedioSinFinal = esquemas[esquemaId].calcular(notasSinFinal);

        const notasConFinalMax = { ...notasObj, EF: 20 };
        const promedioConFinalMax = esquemas[esquemaId].calcular(notasConFinalMax);

        // ¿Cuánto sube el promedio por cada punto en el final?
        const contribucionEF = promedioConFinalMax - promedioSinFinal;
        const pesoEF = contribucionEF / 20;

        let notaNecesariaFinal = 0;

        if (pesoEF > 0) {
            // Despejamos: PromedioDeseado = PromedioSinFinal + (NotaNecesaria * PesoEF)
            notaNecesariaFinal = (NOTA_APROBATORIA - promedioSinFinal) / pesoEF;
        }

        // 4. Mostrar Mensaje de Estado
        if (promedio >= NOTA_APROBATORIA) {
            notaMinimaFinalDiv.textContent = "¡Ya aprobaste!";
            notaMinimaFinalDiv.style.color = '#00E676'; // Verde Success
        } else if (notaNecesariaFinal > 20) {
            notaMinimaFinalDiv.textContent = "Imposible aprobar :(";
            notaMinimaFinalDiv.style.color = '#FF1744'; // Rojo Danger
        } else if (notaNecesariaFinal <= 0) {
            notaMinimaFinalDiv.textContent = "¡Ya aprobaste!";
            notaMinimaFinalDiv.style.color = '#00E676';
        } else {
            notaMinimaFinalDiv.textContent = notaNecesariaFinal.toFixed(2);
            notaMinimaFinalDiv.style.color = '#f7e07a'; // Amarillo Advertencia
        }
    }


    // ========== 🚀 PARTE 6: INICIALIZACIÓN (START ENGINE) ==========

    function resetearCampos() {
        calculadoraContenido.classList.add('d-none');
        columnaDerechaNotas.classList.add('d-none');
        columnaDerechaNotas.classList.remove('d-lg-block');
        syllabusSection.classList.add('d-none');
        imagenSilabo.style.display = 'none';
        textoSilabo.style.display = 'block';
        contenedorPesos.innerHTML = '';
        cursosBotonesContainer.innerHTML = '<p class="text-body-secondary">Cargando cursos...</p>';
        
        // Limpiar valores inputs
        [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(i => i && (i.value = ''));
        
        selectCurso.value = '';
    }

    function autoseleccionarDesdeURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const carreraKey = urlParams.get('carrera');
        const cicloKey = urlParams.get('ciclo');

        // Configurar botón "Volver"
        const btnVolver = document.getElementById('btnVolverMapa');
        if (carreraKey) {
            btnVolver.href = `carrera.html?carrera=${carreraKey}`;
        } else {
            btnVolver.href = 'index.html';
        }

        // Cascada de selección automática
        if (carreraKey && selectCarrera.querySelector(`option[value="${carreraKey}"]`)) {
            selectCarrera.value = carreraKey;
            selectCarrera.dispatchEvent(new Event('change')); // Cargar ciclos

            if (cicloKey && selectCiclo.querySelector(`option[value="${cicloKey}"]`)) {
                selectCiclo.value = cicloKey;
                selectCiclo.dispatchEvent(new Event('change')); // Cargar cursos

                const cicloTexto = cicloKey.replace('ciclo', 'Ciclo ');
                tituloCiclo.textContent = `${cicloTexto} - ${dataCarreras[carreraKey].nombre}`;

                generarBotonesDeCurso(carreraKey, cicloKey);

            } else {
                tituloCiclo.textContent = 'Error: Ciclo no encontrado';
                cursosBotonesContainer.innerHTML = '<p class="text-danger">Ciclo no válido.</p>';
            }
        } else {
            tituloCiclo.textContent = 'Error: Carrera no encontrada';
            cursosBotonesContainer.innerHTML = '<p class="text-danger">Regresa al inicio.</p>';
        }
    }

    // Event Listeners Globales
    selectCarrera.addEventListener('change', poblarCiclos);
    selectCiclo.addEventListener('change', poblarCursos);
    selectCurso.addEventListener('change', actualizarVistaCurso);

    // Click en botones de cursos (Delegación de eventos)
    cursosBotonesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-curso')) {
            const cursoValue = e.target.dataset.value;
            selectCurso.value = cursoValue;
            selectCurso.dispatchEvent(new Event('change'));
        }
    });

    // Inputs: Recalcular al escribir
    [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(input => {
        input && input.addEventListener('input', calcularNotas);
    });

    // ¡ARRANCAR!
    poblarCarreras();
    resetearCampos();
    autoseleccionarDesdeURL();
});
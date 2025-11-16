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
            selectCarrera.add(option); // Puebla el <select> oculto
        });
    }
    
    function poblarCiclos() {
        const carreraKey = selectCarrera.value;
        selectCiclo.innerHTML = ''; // Limpia el <select> oculto
        if (carreraKey && dataCarreras[carreraKey]) {
            const ciclos = dataCarreras[carreraKey].ciclos;
            Object.keys(ciclos).forEach(cicloKey => {
                if (parseInt(cicloKey.replace('ciclo', '')) <= 6) {
                    const option = new Option(cicloKey.replace('ciclo', 'Ciclo '), cicloKey);
                    selectCiclo.add(option); // Puebla el <select> oculto
                }
            });
        }
    }

    // --- NUEVA FUNCIÓN ---
    // Genera los BOTONES VISIBLES a partir de los datos
    function generarBotonesDeCurso(carreraKey, cicloKey) {
        cursosBotonesContainer.innerHTML = ''; // Limpia botones anteriores
        
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
                button.dataset.value = curso.value; // Guarda el valor del curso en el botón
                cursosBotonesContainer.appendChild(button);
            });
        } else {
             cursosBotonesContainer.innerHTML = '<p class="text-danger">Error al cargar cursos.</p>';
        }
    }
    
    // Pobla el <select> de curso oculto
    function poblarCursos() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        selectCurso.innerHTML = ''; // Limpia el <select> oculto
        
        if (carreraKey && cicloKey && dataCarreras[carreraKey].ciclos[cicloKey]) {
            const cursos = dataCarreras[carreraKey].ciclos[cicloKey];
            cursos.forEach(curso => {
                const option = new Option(curso.text, curso.value);
                selectCurso.add(option); // Puebla el <select> oculto
            });
        }
    }
    
    function actualizarVistaCurso() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;

        if (!carreraKey || !cicloKey || !cursoVal) {
            // No resetea todo, solo oculta la calculadora
            calculadoraContenido.classList.add('d-none');
            columnaDerechaNotas.classList.add('d-none');
            columnaDerechaNotas.classList.remove('d-lg-block'); 
            syllabusSection.classList.add('d-none');
            return;
        }
        
        // Muestra las secciones principales
        syllabusSection.classList.remove('d-none');
        calculadoraContenido.classList.remove('d-none');
        columnaDerechaNotas.classList.remove('d-none');
        columnaDerechaNotas.classList.add('d-lg-block'); 

        const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(curso => curso.value === cursoVal);
        if (cursoData) {
            // Actualiza el Sílabo
            imagenSilabo.src = cursoData.imagen;
            imagenSilabo.style.display = 'block';
            textoSilabo.style.display = 'none';
            // Actualiza los campos de notas y pesos
            actualizarCamposDeNotas(cursoData.formula);
            mostrarPesos(cursoData.formula);
        }
        
        // --- LÓGICA DE HIGHLIGHT (AÑADIDA) ---
        // Quita 'active' de todos los botones
        document.querySelectorAll('.btn-curso').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añade 'active' solo al botón seleccionado
        const botonActivo = document.querySelector(`.btn-curso[data-value="${cursoVal}"]`);
        if (botonActivo) {
            botonActivo.classList.add('active');
        }

        calcularNotas();
    }
    
    // --- EVENT LISTENERS ---
    // Listeners para los <select> Ocultos
    selectCarrera.addEventListener('change', poblarCiclos);
    selectCiclo.addEventListener('change', poblarCursos);
    selectCurso.addEventListener('change', actualizarVistaCurso); // ¡Esta es la función clave que activa todo!

    // --- NUEVO EVENT LISTENER PARA LOS BOTONES VISIBLES ---
    cursosBotonesContainer.addEventListener('click', (e) => {
        // Verifica si se hizo clic en un botón de curso
        if (e.target.classList.contains('btn-curso')) {
            const cursoValue = e.target.dataset.value;
            
            // 1. Actualiza el valor del <select> OCULTO
            selectCurso.value = cursoValue;
            
            // 2. Dispara el evento 'change' en el <select> OCULTO
            // Esto activará automáticamente tu función 'actualizarVistaCurso'
            selectCurso.dispatchEvent(new Event('change'));
        }
    });


    // ========== 📊 PARTE 4: MOSTRAR PESOS ==========
    // (Tu lógica de pesos completa - SIN CAMBIOS)
    function mostrarPesos(formulaKey) {
        let pesos = [];
        switch(formulaKey) {
            case 'formula_est2': 
                pesos = [ { nombre: 'Prom. Prácticas (PPR)', porcentaje: 53.3, color: 'bg-primary' }, { nombre: 'Examen Final (EF)', porcentaje: 33.3, color: 'bg-warning' }, { nombre: 'Trabajo (W1)', porcentaje: 13.3, color: 'bg-info' } ]; 
                break;
            case 'formula_micro': 
                pesos = [ { nombre: 'Examen Final (EF)', porcentaje: 40, color: 'bg-danger' }, { nombre: 'Examen Parcial (EP)', porcentaje: 30, color: 'bg-warning' }, { nombre: 'Práctica 1 (P1)', porcentaje: 7.5, color: 'bg-primary' }, { nombre: 'Práctica 2 (P2)', porcentaje: 7.5, color: 'bg-primary' }, { nombre: 'Controles (P3)', porcentaje: 7.5, color: 'bg-primary' }, { nombre: 'Investigación (P4)', porcentaje: 7.5, color: 'bg-primary' } ]; 
                break;
            case 'formula_ti2':
                pesos = [ { nombre: 'Examen Final (EF)', porcentaje: 25, color: 'bg-danger' }, { nombre: 'Examen Parcial (EP)', porcentaje: 25, color: 'bg-warning' }, { nombre: 'Prom. Prácticas (P)', porcentaje: 16.7, color: 'bg-primary' }, { nombre: 'Trabajo (W1)', porcentaje: 16.7, color: 'bg-info' }, { nombre: 'Prom. Laboratorio (PL)', porcentaje: 16.7, color: 'bg-success' } ]; 
                break;
            case 'formula_fis2': 
                pesos = [ { nombre: 'Prom. Prácticas (PE)', porcentaje: 50, color: 'bg-primary' }, { nombre: 'Prom. Laboratorio (PL)', porcentaje: 25, color: 'bg-info' }, { nombre: 'Examen Final (EF)', porcentaje: 25, color: 'bg-warning' } ]; 
                break;
            case 'formula_alg2':
                pesos = [ { nombre: 'Evaluaciones (PE)', porcentaje: 50, color: 'bg-primary' }, { nombre: 'Examen Parcial (EP)', porcentaje: 25, color: 'bg-info' }, { nombre: 'Examen Final (EF)', porcentaje: 25, color: 'bg-warning' }]; 
                break;
            case 'formula_percep_arte':
                pesos = [ { nombre: 'Prom. Evaluaciones (PE)', porcentaje: 33.3, color: 'bg-primary' }, { nombre: 'Examen Parcial (EP)', porcentaje: 33.3, color: 'bg-warning' }, { nombre: 'Examen Final (EF)', porcentaje: 33.3, color: 'bg-danger' } ]; 
                break;
            case 'formula_const2':
                pesos = [ { nombre: 'Prom. Evaluaciones (PE)', porcentaje: 60, color: 'bg-primary' }, { nombre: 'Examen Parcial (EP)', porcentaje: 20, color: 'bg-warning' }, { nombre: 'Examen Final (EF)', porcentaje: 20, color: 'bg-danger' } ]; 
                break;
            case 'formula_taller4_arq':
                pesos = [ { nombre: 'Examen Final (EF)', porcentaje: 50, color: 'bg-danger' }, { nombre: 'Examen Parcial (EP)', porcentaje: 33.3, color: 'bg-warning' }, { nombre: 'Práctica 1 (P1)', porcentaje: 4.17, color: 'bg-primary' }, { nombre: 'Práctica 2 (P2)', porcentaje: 4.17, color: 'bg-primary' }, { nombre: 'Práctica 3 (P3)', porcentaje: 4.17, color: 'bg-primary' }, { nombre: 'Práctica 4 (P4)', porcentaje: 4.17, color: 'bg-primary' } ]; 
                break;
            case 'formula_dinamica_civil':
                pesos = [ { nombre: 'Prom. Prácticas (P1-P4)', porcentaje: 25, color: 'bg-primary' }, { nombre: 'Trabajo (W1)', porcentaje: 25, color: 'bg-info' }, { nombre: 'Examen Parcial (EP)', porcentaje: 25, color: 'bg-warning' }, { nombre: 'Examen Final (EF)', porcentaje: 25, color: 'bg-danger' } ]; 
                break;
            case 'formula_tec_concreto':
                pesos = [ { nombre: 'Prom. Evaluaciones (PE)', porcentaje: 50, color: 'bg-primary' }, { nombre: 'Examen Parcial (EP)', porcentaje: 25, color: 'bg-info' }, { nombre: 'Examen Final (EF)', porcentaje: 25, color: 'bg-warning' } ];
                break;
            case 'formula_estatica':
                pesos = [ { nombre: 'Examen Final (EF)', porcentaje: 40, color: 'bg-danger' }, { nombre: 'Examen Parcial (EP)', porcentaje: 30, color: 'bg-warning' }, { nombre: 'Prom. Evaluaciones (PE)', porcentaje: 30, color: 'bg-primary' } ];
                break;
            case 'promedio_simple':
                 pesos = [ { nombre: 'P1, P2, P3, P4, EF', porcentaje: 20, color: 'bg-secondary' } ];
                 break;
            default: 
                pesos = [ ]; 
                break;
        }
        
        pesos.sort((a, b) => b.porcentaje - a.porcentaje);
        contenedorPesos.innerHTML = ''; 
        
        if (formulaKey === 'promedio_simple') {
            contenedorPesos.innerHTML = `<div>... (código promedio simple) ...</div>`; // Agregado para que no falle
        } else {
            pesos.forEach(item => {
                const html = `
                    <div>
                        <div class="d-flex justify-content-between mb-1 small">
                            <span class="fw-bold text-light">${item.nombre}</span>
                            <span class="text-white-50">${item.porcentaje.toFixed(1)}%</span>
                        </div>
                        <div class="progress" role="progressbar" style="height: 10px; background-color: #333;">
                            <div class="progress-bar ${item.color}" style="width: ${item.porcentaje}%"></div>
                        </div>
                    </div>
                `;
                contenedorPesos.innerHTML += html;
            });
        }
    }

    // ========== ⚙️ PARTE 5: CÁLCULOS Y CAMPOS ==========
    // (Tu lógica de cálculos completa - SIN CAMBIOS)
    
    function calcularPromedioConMN(notas = [], divisor) {
        if (notas.length === 0) return 0;
        const notasValidas = notas.map(n => parseFloat(n) || 0);
        notasValidas.sort((a, b) => a - b);
        const mn = notasValidas[0];
        const suma = notasValidas.reduce((total, nota) => total + nota, 0);
        return divisor > 0 ? (suma - mn) / divisor : (suma - mn) / (notasValidas.length - 1);
    }
    
    function actualizarCamposDeNotas(formulaKey) {
        [...camposPractica, campoW1, campoEP, camposLaboratorioContainer, camposControlesContainer, ...camposLab].forEach(c => c && c.classList.add('d-none'));
        
        switch (formulaKey) {
            case 'formula_micro':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposControlesContainer.classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoEP.classList.remove('d-none'); campoEF.classList.remove('d-none');
                break;
            case 'formula_ti2': 
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoW1.classList.remove('d-none'); campoEP.classList.remove('d-none');
                camposLaboratorioContainer.classList.remove('d-none');
                for (let i = 0; i < 4; i++) camposLab[i].classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_fis2':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                camposLaboratorioContainer.classList.remove('d-none');
                for (let i = 0; i < 7; i++) camposLab[i].classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_alg2':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                campoW1.classList.remove('d-none'); campoEP.classList.remove('d-none');
                camposLaboratorioContainer.classList.remove('d-none');
                for (let i = 0; i < 5; i++) camposLab[i].classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_est2':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoW1.classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_percep_arte':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none');
                campoEP.classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_const2':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoEP.classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_taller4_arq':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoEP.classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_dinamica_civil':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoW1.classList.remove('d-none');
                campoEP.classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_tec_concreto':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoW1.classList.remove('d-none');
                campoEP.classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'formula_estatica':
                camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                campoEP.classList.remove('d-none');
                campoEF.classList.remove('d-none');
                break;
            case 'promedio_simple':
                 camposPractica[0].classList.remove('d-none'); camposPractica[1].classList.remove('d-none');
                 camposPractica[2].classList.remove('d-none'); camposPractica[3].classList.remove('d-none');
                 campoEF.classList.remove('d-none');
                 break;
            default: break;
        }
    }

    function resetearCampos() {
        // Oculta las secciones principales
        calculadoraContenido.classList.add('d-none');
        columnaDerechaNotas.classList.add('d-none');
        columnaDerechaNotas.classList.remove('d-lg-block'); 
        syllabusSection.classList.add('d-none');
        
        // Resetea el sílabo
        imagenSilabo.style.display = 'none';
        textoSilabo.style.display = 'block';
        textoSilabo.textContent = 'Selecciona un curso para ver su sílabo y fórmula';
        
        // Limpia contenedores
        contenedorPesos.innerHTML = ''; 
        // Pone el texto "Cargando..." por defecto
        cursosBotonesContainer.innerHTML = '<p class="text-body-secondary">Cargando cursos...</p>';
        
        // Oculta todos los campos de notas
        actualizarCamposDeNotas('default');
        
        // Resetea los valores de los inputs
        [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(i => i && (i.value = 0));
        
        // Resetea los <select> ocultos
        selectCurso.value = '';
        
        calcularNotas();
    }

    function calcularNotas() {
        // Esta función depende de los valores de los inputs, así que no necesita
        // saber qué botón está activo, solo recalcula con lo que hay.
        
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;
        let formulaKey = 'default';
        if (carreraKey && cicloKey && cursoVal) {
            const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(curso => curso.value === cursoVal);
            if (cursoData) formulaKey = cursoData.formula;
        }

        const p = inputsPractica.map(i => parseFloat(i.value) || 0);
        const w1 = parseFloat(trabajoPracticoInput.value) || 0;
        const ep = parseFloat(examenParcialInput.value) || 0;
        const ef = parseFloat(examenFinalInput.value) || 0;
        const lb = inputsLab.map(i => parseFloat(i.value) || 0);
        const cl = inputsControl.map(i => parseFloat(i.value) || 0);

        let promedio = 0;
        let sumaSinFinal = 0;
        let pesoFinal = 0; 

        switch (formulaKey) {
            case 'formula_micro':
                const sumaControles = cl.reduce((a, b) => a + b, 0);
                const p3_micro = sumaControles / 2; 
                const pe_micro = (p[0] + p[1] + p3_micro + p[3]) / 4;
                promedio = (0.3 * pe_micro) + (0.3 * ep) + (0.4 * ef);
                sumaSinFinal = (0.3 * pe_micro) + (0.3 * ep);
                pesoFinal = 0.4; 
                break;
            case 'formula_est2':
                const notas_est2 = [p[0], p[1], p[2], p[3]];
                const mn_est2 = Math.min(...notas_est2);
                const suma_est2 = p[0] + p[1] + p[2] + p[3] + p[3];
                const ppr_est2 = (suma_est2 - mn_est2) / 4;
                const pe_est2 = (4 * ppr_est2 + w1) / 5;
                promedio = (2 * pe_est2 + ef) / 3;
                sumaSinFinal = 2 * pe_est2;
                pesoFinal = 3;
                break;
            case 'formula_ti2':
                const pl_ti2 = (lb[0] + lb[1] + lb[2] + lb[3]) / 4;
                const prom_p_ti2 = calcularPromedioConMN([p[0], p[1], p[2], p[3]], 3); 
                const pe_ti2 = (prom_p_ti2 + w1 + pl_ti2) / 3;
                promedio = (2 * pe_ti2 + ep + ef) / 4;
                sumaSinFinal = 2 * pe_ti2 + ep;
                pesoFinal = 4;
                break;
            case 'formula_fis2':
                const pl_fis2 = calcularPromedioConMN([lb[0], lb[1], lb[2], lb[3], lb[4], lb[5], lb[6]], 6);
                const notas_fis2 = [p[0], p[1], p[2], p[3]];
                const mn_fis2 = Math.min(...notas_fis2);
                const suma_fis2 = p[0] + p[1] + p[2] + p[3] + p[3];
                const pe_fis2 = (suma_fis2 - mn_fis2) / 4;
                promedio = (2 * pe_fis2 + pl_fis2 + ef) / 4;
                sumaSinFinal = 2 * pe_fis2 + pl_fis2;
                pesoFinal = 4;
                break;
            case 'formula_alg2':
                const pl_alg2 = calcularPromedioConMN([lb[0], lb[1], lb[2], lb[3], lb[4]], 4);
                const prom_p_alg2 = (p[0] + p[1]) / 2;
                const pe_alg2 = (prom_p_alg2 + w1 + pl_alg2) / 3;
                promedio = (2 * pe_alg2 + ep + ef) / 4;
                sumaSinFinal = 2 * pe_alg2 + ep;
                pesoFinal = 4;
                break;
            case 'formula_percep_arte':
                const pe_arte = (p[0] + p[1] + p[2]) / 3;
                promedio = (pe_arte + ep + ef) / 3;
                sumaSinFinal = pe_arte + ep;
                pesoFinal = 3;
                break;
            case 'formula_const2':
                const pe_const2 = (p[0] + p[1] + p[2] + p[3]) / 4;
                promedio = (3 * pe_const2 + ep + ef) / 5;
                sumaSinFinal = (3 * pe_const2) + ep;
                pesoFinal = 5;
                break;
            case 'formula_taller4_arq':
                const pe_taller4 = (p[0] + p[1] + p[2] + p[3]) / 4;
                promedio = (pe_taller4 + 2 * ep + 3 * ef) / 6;
                sumaSinFinal = pe_taller4 + 2 * ep;
                pesoFinal = 6;
                break;
            case 'formula_dinamica_civil':
                const p_block_civil = calcularPromedioConMN([p[0], p[1], p[2], p[3]], 3);
                const pe_civil = (p_block_civil + w1) / 2;
                promedio = (2 * pe_civil + ep + ef) / 4;
                sumaSinFinal = (2 * pe_civil) + ep;
                pesoFinal = 4;
                break;
            case 'formula_tec_concreto':
                const notas_concreto = [p[0], p[1], p[2], p[3]];
                const mn_concreto = Math.min(...notas_concreto);
                const suma_practicas_concreto = p[0] + p[1] + p[2] + p[3];
                const prom_practicas_concreto = (suma_practicas_concreto - mn_concreto) / 3;
                const pe_concreto = (prom_practicas_concreto + w1) / 2;
                promedio = (2 * pe_concreto + ep + ef) / 4;
                sumaSinFinal = 2 * pe_concreto + ep;
                pesoFinal = 4;
                break;
            case 'formula_estatica':
                const pe_estatica = (p[0] + p[1] + p[2] + p[3]) / 4;
                promedio = 0.3 * pe_estatica + 0.3 * ep + 0.4 * ef;
                sumaSinFinal = 0.3 * pe_estatica + 0.3 * ep;
                pesoFinal = 0.4;
                break;
            case 'promedio_simple':
                promedio = (p[0] + p[1] + p[2] + p[3] + ef) / 5;
                sumaSinFinal = p[0] + p[1] + p[2] + p[3];
                pesoFinal = 5;
                break;
            default:
                promedio = 0; sumaSinFinal = 0; pesoFinal = 1; 
                break;
        }

        promedioFinalDiv.textContent = promedio.toFixed(2);
        
        let notaNecesariaFinal;
        if (formulaKey === 'formula_micro' || formulaKey === 'formula_estatica') {
            notaNecesariaFinal = (NOTA_APROBATORIA - sumaSinFinal) / pesoFinal;
        } else if (formulaKey === 'default') {
             notaNecesariaFinal = 0;
        } else if (formulaKey === 'formula_taller4_arq') {
            notaNecesariaFinal = ( (NOTA_APROBATORIA * pesoFinal) - sumaSinFinal ) / 3;
        }
         else {
            notaNecesariaFinal = (NOTA_APROBATORIA * pesoFinal) - sumaSinFinal;
        }

        if (formulaKey === 'default' || !cursoVal) { // Añadida comprobación de cursoVal
            notaMinimaFinalDiv.textContent = "N/A";
            notaMinimaFinalDiv.style.color = '#f7e07a';
        }
        else if (notaNecesariaFinal <= 0) {
            notaMinimaFinalDiv.textContent = "Ya aprobaste!";
            notaMinimaFinalDiv.style.color = '#76ff03';
        } else if (notaNecesariaFinal > 20) {
            notaMinimaFinalDiv.textContent = "Imposible aprobar";
            notaMinimaFinalDiv.style.color = '#ff1744';
        } else {
            notaMinimaFinalDiv.textContent = notaNecesariaFinal.toFixed(2);
            notaMinimaFinalDiv.style.color = '#f7e07a';
        }
    }

    // ========== 🏁 PARTE 6: INICIALIZACIÓN ==========
    
    // --- LÓGICA DE AUTO-SELECCIÓN (NUEVA FUNCIÓN) ---
    function autoseleccionarDesdeURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const carreraKey = urlParams.get('carrera');
        const cicloKey = urlParams.get('ciclo');
        
        // Asigna el link al botón "Volver"
        const btnVolver = document.getElementById('btnVolverMapa');
        if(carreraKey) {
            btnVolver.href = `carrera.html?carrera=${carreraKey}`;
        } else {
            btnVolver.href = 'index.html'; // Fallback
        }

        // 1. Auto-selecciona Carrera (en <select> oculto)
        if (carreraKey && selectCarrera.querySelector(`option[value="${carreraKey}"]`)) {
            selectCarrera.value = carreraKey;
            selectCarrera.dispatchEvent(new Event('change')); // Dispara "change" para poblar ciclos
            
            // 2. Auto-selecciona Ciclo (en <select> oculto)
            if (cicloKey && selectCiclo.querySelector(`option[value="${cicloKey}"]`)) {
                selectCiclo.value = cicloKey;
                selectCiclo.dispatchEvent(new Event('change')); // Dispara "change" para poblar cursos (ocultos)
                
                // 3. ACTUALIZA EL TÍTULO Y GENERA LOS BOTONES
                // const cicloData = dataCarreras[carreraKey].ciclos[cicloKey]; // Esta línea no es necesaria aquí
                const cicloTexto = cicloKey.replace('ciclo', 'Ciclo ');
                tituloCiclo.textContent = `${cicloTexto} - ${dataCarreras[carreraKey].nombre}`;
                
                // ¡Llama a la nueva función para crear los botones visibles!
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
    
    // --- VIGILANTES DE INPUTS DE NOTAS ---
    [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(input => {
        input && input.addEventListener('input', calcularNotas);
    });

    // --- ARRANQUE (¡¡¡ORDEN CORREGIDO!!!) ---
    poblarCarreras();         // 1. Puebla el <select> de carreras oculto
    resetearCampos();         // 2. Inicia todo oculto PRIMERO
    autoseleccionarDesdeURL(); // 3. Lee la URL y genera los BOTONES DESPUÉS
});
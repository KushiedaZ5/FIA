document.addEventListener('DOMContentLoaded', () => {

    // ========== 🧠 PARTE 1: LA NUEVA BASE DE DATOS DE CURSOS ==========
    const dataCarreras = {
        'ingSistemas': {
            nombre: 'Ingeniería de Computación y Sistemas',
            ciclos: {
                'ciclo4': [
                    { value: 'est2', text: 'Estadística 2', imagen: 'imagenes/est2_formulas.jpg', formula: 'formula_est2' },
                    { value: 'ti2', text: 'Tecnología de Información 2', imagen: 'imagenes/ti2_formulas.jpg', formula: 'formula_ti2' },
                    { value: 'fis2', text: 'Física 2', imagen: 'imagenes/fis2_formulas.jpg', formula: 'formula_fis2' },
                    { value: 'alg2', text: 'Algoritmos 2', imagen: 'imagenes/alg2_formulas.jpg', formula: 'formula_alg2' },
                    { value: 'micro', text: 'Microeconomía', imagen: 'imagenes/micro_formulas.jpg', formula: 'formula_micro' }
                ],
                'ciclo5': [
                    { value: 'calc3', text: 'Cálculo 3', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' },
                    { value: 'estadistica2_otra', text: 'Estadística 2 (otra)', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }
                ],
                'ciclo6': [
                    // Cursos de Ciclo 6 de Sistemas
                ]
            }
        },
        'ingCivil': {
            nombre: 'Ingeniería Civil',
            ciclos: {
                'ciclo1': [ { value: 'mate1_civil', text: 'Matemática 1 (Civil)', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }],
                'ciclo2': [], 'ciclo3': [], 'ciclo4': [], 'ciclo5': [], 'ciclo6': []
            }
        },
        'ingIndustrial': {
            nombre: 'Ingeniería Industrial',
            ciclos: {
                'ciclo1': [ { value: 'quimica1', text: 'Química 1 (Industrial)', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }],
                'ciclo2': [], 'ciclo3': [], 'ciclo4': [], 'ciclo5': [],
                'ciclo6': [
                    // ▼▼▼ ¡NUEVO CURSO AGREGADO! ▼▼▼
                    {
                        value: 'proc_manuf',
                        text: 'Proceso de Manufactura',
                        imagen: 'imagenes/procesomanuf_formulas.jpg', // Asegúrate de que este sea el nombre de tu imagen
                        formula: 'formula_alg2' // Re-usa la fórmula de Algoritmos 2, que es idéntica
                    }
                ]
            }
        }
    };

    // ========== 🎯 PARTE 2: REFERENCIAS HTML ==========
    // (Sin cambios)
    const selectCarrera = document.getElementById('selectCarrera');
    const selectCiclo = document.getElementById('selectCiclo');
    const selectCurso = document.getElementById('selectCurso');
    const imagenSilabo = document.getElementById('imagenSilabo');
    const textoSilabo = document.getElementById('textoSilabo');
    const contenedorPesos = document.getElementById('contenedorPesos');
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
    // (Sin cambios)
    function poblarCarreras() {
        Object.keys(dataCarreras).forEach(carreraKey => {
            const carrera = dataCarreras[carreraKey];
            const option = new Option(carrera.nombre, carreraKey);
            selectCarrera.add(option);
        });
    }
    function poblarCiclos() {
        const carreraKey = selectCarrera.value;
        selectCiclo.innerHTML = '<option selected disabled value="">Selecciona un ciclo...</option>';
        selectCurso.innerHTML = '<option selected disabled value="">Selecciona un ciclo primero...</option>';
        selectCiclo.disabled = true;
        selectCurso.disabled = true;
        if (carreraKey && dataCarreras[carreraKey]) {
            const ciclos = dataCarreras[carreraKey].ciclos;
            Object.keys(ciclos).forEach(cicloKey => {
                const option = new Option(cicloKey.replace('ciclo', 'Ciclo '), cicloKey);
                selectCiclo.add(option);
            });
            selectCiclo.disabled = false;
        }
        resetearCampos();
    }
    function poblarCursos() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        selectCurso.innerHTML = '<option selected disabled value="">Selecciona un curso...</option>';
        selectCurso.disabled = true;
        if (carreraKey && cicloKey && dataCarreras[carreraKey].ciclos[cicloKey]) {
            const cursos = dataCarreras[carreraKey].ciclos[cicloKey];
            cursos.forEach(curso => {
                const option = new Option(curso.text, curso.value);
                selectCurso.add(option);
            });
            selectCurso.disabled = false;
        }
        resetearCampos();
    }
    function actualizarVistaCurso() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;
        if (!carreraKey || !cicloKey || !cursoVal) {
            resetearCampos();
            return;
        }
        const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(curso => curso.value === cursoVal);
        if (cursoData) {
            imagenSilabo.src = cursoData.imagen;
            imagenSilabo.style.display = 'block';
            textoSilabo.style.display = 'none';
            actualizarCamposDeNotas(cursoData.formula);
            mostrarPesos(cursoData.formula);
        }
        calcularNotas();
    }
    selectCarrera.addEventListener('change', poblarCiclos);
    selectCiclo.addEventListener('change', poblarCursos);
    selectCurso.addEventListener('change', actualizarVistaCurso);

    // ========== 📊 PARTE 4: MOSTRAR PESOS ==========
    // (Sin cambios, formula_alg2 ya estaba incluida)
    function mostrarPesos(formulaKey) {
        let pesos = [];
        switch(formulaKey) {
            case 'formula_est2':
                pesos = [ { nombre: 'Evaluaciones (PE)', porcentaje: 66.7, color: 'bg-primary' }, { nombre: 'Examen Final', porcentaje: 33.3, color: 'bg-warning' }];
                break;
            case 'formula_micro':
                pesos = [ { nombre: 'Examen Final', porcentaje: 40, color: 'bg-danger' }, { nombre: 'Examen Parcial', porcentaje: 30, color: 'bg-warning' }, { nombre: 'Evaluaciones (PE)', porcentaje: 30, color: 'bg-primary' }];
                break;
            case 'formula_fis2':
            case 'formula_ti2':
                pesos = [ { nombre: 'Evaluaciones (PE)', porcentaje: 50, color: 'bg-primary' }, { nombre: 'Laboratorios (PL)', porcentaje: 25, color: 'bg-info' }, { nombre: 'Examen Final', porcentaje: 25, color: 'bg-warning' }];
                break;
            case 'formula_alg2': // Esta es la que usa "Proceso de Manufactura"
                pesos = [ { nombre: 'Evaluaciones (PE)', porcentaje: 50, color: 'bg-primary' }, { nombre: 'Examen Parcial', porcentaje: 25, color: 'bg-info' }, { nombre: 'Examen Final', porcentaje: 25, color: 'bg-warning' }];
                break;
            default:
                pesos = [ { nombre: 'Todas valen igual', porcentaje: 100, color: 'bg-secondary' } ];
                break;
        }
        pesos.sort((a, b) => b.porcentaje - a.porcentaje);
        contenedorPesos.innerHTML = ''; 
        pesos.forEach(item => {
            const html = `
                <div>
                    <div class="d-flex justify-content-between mb-1 small">
                        <span class="fw-bold text-light">${item.nombre}</span>
                        <span class="text-white-50">${item.porcentaje}%</span>
                    </div>
                    <div class="progress" role="progressbar" style="height: 10px; background-color: #333;">
                        <div class="progress-bar ${item.color}" style="width: ${item.porcentaje}%"></div>
                    </div>
                </div>
            `;
            contenedorPesos.innerHTML += html;
        });
    }

    // ========== ⚙️ PARTE 5: CÁLCULOS Y CAMPOS ==========
    // (Sin cambios, todo el código de fórmulas es el mismo)
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
                camposPractica[0].classList.remove('d-none');
                camposPractica[1].classList.remove('d-none');
                camposControlesContainer.classList.remove('d-none');
                camposPractica[3].classList.remove('d-none');
                campoEP.classList.remove('d-none');
                break;
            case 'formula_ti2': 
                camposPractica[0].classList.remove('d-none');
                camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none');
                camposPractica[3].classList.remove('d-none');
                campoW1.classList.remove('d-none');
                campoEP.classList.remove('d-none');
                camposLaboratorioContainer.classList.remove('d-none');
                for (let i = 0; i < 4; i++) camposLab[i].classList.remove('d-none');
                break;
            case 'formula_fis2':
                camposPractica[0].classList.remove('d-none');
                camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none');
                camposPractica[3].classList.remove('d-none');
                camposLaboratorioContainer.classList.remove('d-none');
                for (let i = 0; i < 7; i++) camposLab[i].classList.remove('d-none');
                break;
            case 'formula_alg2': // Esta es la que usa "Proceso de Manufactura"
                camposPractica[0].classList.remove('d-none');
                camposPractica[1].classList.remove('d-none');
                campoW1.classList.remove('d-none');
                campoEP.classList.remove('d-none');
                camposLaboratorioContainer.classList.remove('d-none');
                for (let i = 0; i < 5; i++) camposLab[i].classList.remove('d-none');
                break;
            case 'formula_est2':
                camposPractica[0].classList.remove('d-none');
                camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none');
                camposPractica[3].classList.remove('d-none');
                campoW1.classList.remove('d-none');
                break;
            default:
                // No mostrar nada si no hay fórmula (o es 'promedio_simple')
                break;
        }
    }

    function resetearCampos() {
        imagenSilabo.style.display = 'none';
        textoSilabo.style.display = 'block';
        contenedorPesos.innerHTML = ''; 
        actualizarCamposDeNotas('default'); // Oculta todos los campos
        [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(i => i && (i.value = 0));
        calcularNotas();
    }

    function calcularNotas() {
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
            case 'formula_alg2': // Esta es la que usa "Proceso de Manufactura"
                const pl_alg2 = calcularPromedioConMN([lb[0], lb[1], lb[2], lb[3], lb[4]], 4);
                const prom_p_alg2 = (p[0] + p[1]) / 2;
                const pe_alg2 = (prom_p_alg2 + w1 + pl_alg2) / 3;
                promedio = (2 * pe_alg2 + ep + ef) / 4;
                sumaSinFinal = 2 * pe_alg2 + ep;
                pesoFinal = 4;
                break;
            default:
                promedio = 0;
                sumaSinFinal = 0;
                pesoFinal = 1; 
                break;
        }

        promedioFinalDiv.textContent = promedio.toFixed(2);
        
        let notaNecesariaFinal;
        if (formulaKey === 'formula_micro') {
            notaNecesariaFinal = (NOTA_APROBATORIA - sumaSinFinal) / pesoFinal;
        } else if (formulaKey === 'default') {
             notaNecesariaFinal = 0; // No mostrar nada si no hay fórmula
        } else {
            notaNecesariaFinal = (NOTA_APROBATORIA * pesoFinal) - sumaSinFinal;
        }

        if (formulaKey === 'default') {
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
    [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(input => {
        input && input.addEventListener('input', calcularNotas);
    });
    
    poblarCarreras();
    resetearCampos();
});
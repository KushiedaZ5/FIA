document.addEventListener('DOMContentLoaded', () => {

    // ========== 🧠 PARTE 1: DATOS DE LOS CURSOS ==========
    const cursosPorCiclo = {
        'ciclo1': [
            { value: 'mate1', text: 'Matemática 1', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' },
            { value: 'lenguaje1', text: 'Lenguaje 1', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }
        ],
        'ciclo2': [
            { value: 'calc1', text: 'Cálculo 1', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' },
            { value: 'algebra', text: 'Álgebra Lineal', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' },
            { value: 'intro_prog', text: 'Introducción a la Programación', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }
        ],
        'ciclo3': [
            { value: 'fisica1', text: 'Física 1', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' },
            { value: 'algoritmos1', text: 'Algoritmos 1', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }
        ],
        'ciclo4': [
            { value: 'est2', text: 'Estadística 2', imagen: 'imagenes/est2_formulas.jpg', formula: 'formula_est2' },
            { value: 'ti2', text: 'Tecnología de Información 2', imagen: 'imagenes/ti2_formulas.jpg', formula: 'formula_ti2' },
            { value: 'fis2', text: 'Física 2', imagen: 'imagenes/fis2_formulas.jpg', formula: 'formula_fis2' },
            { value: 'alg2', text: 'Algoritmos 2', imagen: 'imagenes/alg2_formulas.jpg', formula: 'formula_alg2' },
            { value: 'micro', text: 'Microeconomía', imagen: 'imagenes/micro_formulas.jpg', formula: 'formula_micro' }
        ],
        'ciclo5': [
            { value: 'calc3', text: 'Cálculo 3', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' },
            { value: 'estadistica2', text: 'Estadística 2 (otra)', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }
        ]
    };

    // ========== 🎯 PARTE 2: REFERENCIAS A ELEMENTOS HTML ==========
    const cicloSelect = document.getElementById('ciclo');
    const cursoSelect = document.getElementById('curso');
    const imagenSilabo = document.getElementById('imagenSilabo');
    const textoSilabo = document.getElementById('textoSilabo');
    
    const camposPractica = [
        document.getElementById('campoP1'), document.getElementById('campoP2'),
        document.getElementById('campoP3'), document.getElementById('campoP4')
    ];
    const campoW1 = document.getElementById('campoW1');
    const campoEP = document.getElementById('campoEP');
    const campoEF = document.getElementById('campoEF');
    
    const camposLaboratorioContainer = document.getElementById('camposLaboratorio');
    const camposLab = [
        document.getElementById('campoLb1'), document.getElementById('campoLb2'), document.getElementById('campoLb3'),
        document.getElementById('campoLb4'), document.getElementById('campoLb5'), document.getElementById('campoLb6'),
        document.getElementById('campoLb7')
    ];
    
    // NUEVO: Referencias para Controles de Lectura
    const camposControlesContainer = document.getElementById('camposControles');
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
    cicloSelect.addEventListener('change', () => {
        const cicloSeleccionado = cicloSelect.value;
        const cursos = cursosPorCiclo[cicloSeleccionado] || [];
        cursoSelect.innerHTML = '<option selected disabled value="">Selecciona tu curso...</option>';
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.value;
            option.textContent = curso.text;
            cursoSelect.appendChild(option);
        });
        resetearCampos();
    });

    cursoSelect.addEventListener('change', () => {
        const cicloVal = cicloSelect.value;
        const cursoVal = cursoSelect.value;
        if (!cicloVal || !cursoVal) return;
        const cursoData = cursosPorCiclo[cicloVal].find(curso => curso.value === cursoVal);
        if (cursoData) {
            imagenSilabo.src = cursoData.imagen;
            imagenSilabo.style.display = 'block';
            textoSilabo.style.display = 'none';
            actualizarCamposDeNotas(cursoData.formula);
        }
        calcularNotas();
    });

    // ========== ⚙️ PARTE 4: LÓGICA DE CÁLCULO Y VISUALIZACIÓN ==========
    function calcularPromedioConMN(notas = [], divisor) {
        if (notas.length === 0) return 0;
        const notasValidas = notas.map(n => parseFloat(n) || 0);
        notasValidas.sort((a, b) => a - b);
        const mn = notasValidas[0];
        const suma = notasValidas.reduce((total, nota) => total + nota, 0);
        return divisor > 0 ? (suma - mn) / divisor : (suma - mn) / (notasValidas.length - 1);
    }
    
    function actualizarCamposDeNotas(formulaKey) {
        // 1. Ocultar TODO por defecto
        [...camposPractica, campoW1, campoEP, camposLaboratorioContainer, camposControlesContainer, ...camposLab].forEach(c => c && c.classList.add('d-none'));
        
        // 2. Mostrar según fórmula
        switch (formulaKey) {
            case 'formula_micro':
                camposPractica[0].classList.remove('d-none'); // P1
                camposPractica[1].classList.remove('d-none'); // P2
                // P3 es el promedio de controles (calculado), así que ocultamos el input manual de P3 y mostramos los controles
                camposControlesContainer.classList.remove('d-none'); // C1 a C8
                camposPractica[3].classList.remove('d-none'); // P4
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

            case 'formula_alg2':
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
                camposPractica[0].classList.remove('d-none');
                camposPractica[1].classList.remove('d-none');
                camposPractica[2].classList.remove('d-none');
                camposPractica[3].classList.remove('d-none');
                break;
        }
    }

    function resetearCampos() {
        imagenSilabo.style.display = 'none';
        textoSilabo.style.display = 'block';
        actualizarCamposDeNotas('promedio_simple');
        [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(i => i && (i.value = 0));
        calcularNotas();
    }

    function calcularNotas() {
        const cicloVal = cicloSelect.value;
        const cursoVal = cursoSelect.value;
        let formulaKey = 'promedio_simple';
        if (cicloVal && cursoVal) {
            const cursoData = cursosPorCiclo[cicloVal].find(curso => curso.value === cursoVal);
            if (cursoData) formulaKey = cursoData.formula;
        }

        const p = inputsPractica.map(i => parseFloat(i.value) || 0);
        const w1 = parseFloat(trabajoPracticoInput.value) || 0;
        const ep = parseFloat(examenParcialInput.value) || 0;
        const ef = parseFloat(examenFinalInput.value) || 0;
        const lb = inputsLab.map(i => parseFloat(i.value) || 0);
        // Obtener notas de controles
        const cl = inputsControl.map(i => parseFloat(i.value) || 0);

        let promedio = 0;
        let sumaSinFinal = 0;
        let pesoFinal = 0; 

        switch (formulaKey) {
            case 'formula_micro':
                // P3 = (CL1 + ... + CL8) / 2
                const sumaControles = cl.reduce((a, b) => a + b, 0);
                const p3_micro = sumaControles / 2; 
                
                // PE = (P1 + P2 + P3 + P4) / 4
                const pe_micro = (p[0] + p[1] + p3_micro + p[3]) / 4;
                
                // PF = 0.3*PE + 0.3*EP + 0.4*EF
                promedio = (0.3 * pe_micro) + (0.3 * ep) + (0.4 * ef);
                
                // Minima: 10.5 = 0.3*PE + 0.3*EP + 0.4*EF_min
                // Despejando EF: (10.5 - 0.3*PE - 0.3*EP) / 0.4
                sumaSinFinal = (0.3 * pe_micro) + (0.3 * ep);
                pesoFinal = 0.4; // El divisor para despejar EF
                // Nota: aquí pesoFinal actúa como el coeficiente del EF, no como divisor total
                // Ajuste de lógica visual abajo: (NotaAprobatoria - sumaSinFinal) / pesoFinal
                break;

            case 'formula_est2':
                const notas_est2 = [p[0], p[1], p[2], p[3]];
                const mn_est2 = Math.min(...notas_est2);
                const suma_est2 = p[0] + p[1] + p[2] + p[3] + p[3];
                const ppr_est2 = (suma_est2 - mn_est2) / 4;
                const pe_est2 = (4 * ppr_est2 + w1) / 5;
                promedio = (2 * pe_est2 + ef) / 3;
                sumaSinFinal = 2 * pe_est2;
                pesoFinal = 3; // Aquí pesoFinal es el divisor total (3)
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

            default:
                promedio = (p[0] + p[1] + p[2] + p[3] + ef) / 5;
                sumaSinFinal = p[0] + p[1] + p[2] + p[3];
                pesoFinal = 5;
                break;
        }

        promedioFinalDiv.textContent = promedio.toFixed(2);
        
        // Cálculo de Nota Mínima (Lógica Ajustada para Pesos Decimales)
        let notaNecesariaFinal;
        if (formulaKey === 'formula_micro') {
            // Para pesos decimales: (10.5 - SumaParcial) / PesoEF
            notaNecesariaFinal = (NOTA_APROBATORIA - sumaSinFinal) / pesoFinal;
        } else {
            // Para promedios estándar: (10.5 * DivisorTotal) - SumaParcial
            notaNecesariaFinal = (NOTA_APROBATORIA * pesoFinal) - sumaSinFinal;
        }

        if (notaNecesariaFinal <= 0) {
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

    [...inputsPractica, trabajoPracticoInput, examenParcialInput, examenFinalInput, ...inputsLab, ...inputsControl].forEach(input => {
        input && input.addEventListener('input', calcularNotas);
    });

    resetearCampos();
});
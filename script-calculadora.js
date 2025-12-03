document.addEventListener('DOMContentLoaded', () => {

    // ========== 🎯 PARTE 1: REFERENCIAS AL DOM ==========
    const tituloCiclo = document.getElementById('titulo-ciclo');
    const cursosBotonesContainer = document.getElementById('cursos-botones-container');
    const syllabusSection = document.getElementById('syllabus-section');
    const imagenSilabo = document.getElementById('imagenSilabo');
    const textoSilabo = document.getElementById('textoSilabo');
    const calculadoraContenido = document.getElementById('calculadoraContenido');
    const columnaDerechaNotas = document.getElementById('columnaDerechaNotas');
    const contenedorPesos = document.getElementById('contenedorPesos');

    // Referencia a la CAJA DEL PROMEDIO (Para cambiarle el color)
    const resultBox = document.querySelector('.result-box');

    const selectCarrera = document.getElementById('selectCarrera');
    const selectCiclo = document.getElementById('selectCiclo');
    const selectCurso = document.getElementById('selectCurso');

    // Mapeo de inputs
    const inputsMap = {
        practica: [
            document.getElementById('practica1'), document.getElementById('practica2'),
            document.getElementById('practica3'), document.getElementById('practica4')
        ],
        trabajo: document.getElementById('trabajoPractico'),
        parcial: document.getElementById('examenParcial'),
        final: document.getElementById('examenFinal'),
        lab: [
            document.getElementById('lab1'), document.getElementById('lab2'), document.getElementById('lab3'),
            document.getElementById('lab4'), document.getElementById('lab5'), document.getElementById('lab6'),
            document.getElementById('lab7')
        ],
        control: [
            document.getElementById('control1'), document.getElementById('control2'), document.getElementById('control3'),
            document.getElementById('control4'), document.getElementById('control5'), document.getElementById('control6'),
            document.getElementById('control7'), document.getElementById('control8')
        ]
    };

    // Contenedores
    const containersMap = {
        practica: [
            document.getElementById('campoP1'), document.getElementById('campoP2'),
            document.getElementById('campoP3'), document.getElementById('campoP4')
        ],
        trabajo: document.getElementById('campoW1'),
        parcial: document.getElementById('campoEP'),
        final: document.getElementById('campoEF'),
        labMain: document.getElementById('camposLaboratorio'),
        controlMain: document.getElementById('camposControles'),
        lab: [
            document.getElementById('campoLb1'), document.getElementById('campoLb2'), document.getElementById('campoLb3'),
            document.getElementById('campoLb4'), document.getElementById('campoLb5'), document.getElementById('campoLb6'),
            document.getElementById('campoLb7')
        ]
    };

    const promedioFinalDiv = document.getElementById('promedioFinal');
    const notaMinimaFinalDiv = document.getElementById('notaMinimaFinal');
    const NOTA_APROBATORIA = 10.5;


    // ========== 🔄 PARTE 2: NAVEGACIÓN ==========

    function poblarCarreras() {
        if (typeof dataCarreras === 'undefined') return;
        Object.keys(dataCarreras).forEach(key => {
            selectCarrera.add(new Option(dataCarreras[key].nombre, key));
        });
    }

    function poblarCiclos() {
        const carreraKey = selectCarrera.value;
        selectCiclo.innerHTML = '';
        if (carreraKey && dataCarreras[carreraKey]) {
            Object.keys(dataCarreras[carreraKey].ciclos).forEach(cicloKey => {
                if (parseInt(cicloKey.replace('ciclo', '')) <= 6) {
                    selectCiclo.add(new Option(cicloKey.replace('ciclo', 'Ciclo '), cicloKey));
                }
            });
        }
    }

    function generarBotonesDeCurso(carreraKey, cicloKey) {
        cursosBotonesContainer.innerHTML = '';
        const cursos = dataCarreras[carreraKey]?.ciclos[cicloKey] || [];

        if (cursos.length === 0) {
            cursosBotonesContainer.innerHTML = '<p class="text-body-secondary">Próximamente...</p>';
            return;
        }

        cursos.forEach(curso => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-curso';
            btn.textContent = curso.text;
            btn.dataset.value = curso.value;
            cursosBotonesContainer.appendChild(btn);
        });
    }

    function poblarCursos() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        selectCurso.innerHTML = '';

        const cursos = dataCarreras[carreraKey]?.ciclos[cicloKey] || [];
        cursos.forEach(curso => {
            selectCurso.add(new Option(curso.text, curso.value));
        });
    }


    // ========== 🎨 PARTE 3: VISTA ==========

    function actualizarVistaCurso() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;

        if (!carreraKey || !cicloKey || !cursoVal) {
            resetearCampos();
            return;
        }

        syllabusSection.classList.remove('d-none');
        calculadoraContenido.classList.remove('d-none');
        columnaDerechaNotas.classList.remove('d-none');
        columnaDerechaNotas.classList.add('d-lg-block');

        const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(c => c.value === cursoVal);

        if (cursoData && typeof esquemas !== 'undefined' && esquemas[cursoData.esquema]) {
            const esquema = esquemas[cursoData.esquema];
            const esquemaId = cursoData.esquema;

            imagenSilabo.src = `imagenes/${esquemaId}.jpg`;

            imagenSilabo.onerror = function () {
                this.onerror = function () {
                    this.src = 'imagenes/logo.png';
                    this.onerror = null;
                };
                this.src = `imagenes/${esquemaId}.png`;
            };

            imagenSilabo.style.display = 'block';
            textoSilabo.style.display = 'none';

            actualizarCamposDeNotas(esquema);
            mostrarPesos(esquema);

            limpiarInputs();
            calcularNotas();
        } else {
            console.error("Falta data o esquema para:", cursoVal);
        }

        document.querySelectorAll('.btn-curso').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.btn-curso[data-value="${cursoVal}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    function resetearCampos() {
        calculadoraContenido.classList.add('d-none');
        columnaDerechaNotas.classList.add('d-none');
        columnaDerechaNotas.classList.remove('d-lg-block');
        syllabusSection.classList.add('d-none');
        imagenSilabo.style.display = 'none';
        textoSilabo.style.display = 'block';
        contenedorPesos.innerHTML = '';
        cursosBotonesContainer.innerHTML = '<p class="text-body-secondary">Cargando cursos...</p>';

        limpiarInputs();
        selectCurso.value = '';

        // Reset visual
        actualizarColorPromedio(0);
    }

    function limpiarInputs() {
        const allInputs = [
            ...inputsMap.practica, inputsMap.trabajo, inputsMap.parcial, inputsMap.final,
            ...inputsMap.lab, ...inputsMap.control
        ];
        allInputs.forEach(input => { if (input) input.value = ''; });
    }


    // ========== 📊 PARTE 4: RENDERIZADO ==========

    function mostrarPesos(esquema) {
        contenedorPesos.innerHTML = '';
        const pesos = [...(esquema.pesos || [])].sort((a, b) => b.v - a.v);

        pesos.forEach(item => {
            let color = item.c || 'bg-primary';
            if (item.n.includes('Final')) color = 'bg-danger';
            if (item.n.includes('Parcial')) color = 'bg-warning';

            contenedorPesos.innerHTML += `
                <div>
                    <div class="d-flex justify-content-between mb-1 small">
                        <span class="fw-bold text-light">${item.n}</span>
                        <span class="text-white-50">${item.v.toFixed(1)}%</span>
                    </div>
                    <div class="progress" style="height: 8px; background-color: #333;">
                        <div class="progress-bar ${color}" style="width: ${item.v}%"></div>
                    </div>
                </div>
            `;
        });
    }

    function actualizarCamposDeNotas(esquema) {
        [...containersMap.practica, containersMap.trabajo, containersMap.parcial, containersMap.final,
        containersMap.labMain, containersMap.controlMain, ...containersMap.lab].forEach(el => el?.classList.add('d-none'));

        const inputs = esquema.inputs || [];

        inputs.forEach(name => {
            if (name.startsWith('P')) {
                const n = parseInt(name.substring(1));
                if (n <= 4) containersMap.practica[n - 1]?.classList.remove('d-none');
            }
            else if (name === 'W1') containersMap.trabajo?.classList.remove('d-none');
            else if (name === 'EP') containersMap.parcial?.classList.remove('d-none');
            else if (name === 'EF') containersMap.final?.classList.remove('d-none');
            else if (name.startsWith('Lb')) {
                containersMap.labMain?.classList.remove('d-none');
                const n = parseInt(name.substring(2));
                if (n <= 7) containersMap.lab[n - 1]?.classList.remove('d-none');
            }
            else if (name.startsWith('C')) {
                containersMap.controlMain?.classList.remove('d-none');
            }
        });
    }


    // ========== 🧮 PARTE 5: CÁLCULOS + RGB DINÁMICO ==========

    function calcularNotas() {
        const carreraKey = selectCarrera.value;
        const cicloKey = selectCiclo.value;
        const cursoVal = selectCurso.value;

        if (!carreraKey || !cicloKey || !cursoVal) return;

        const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(c => c.value === cursoVal);
        const esquema = esquemas[cursoData?.esquema];

        if (!esquema) return;

        const getVal = (el) => parseFloat(el?.value) || 0;

        const notas = {
            P1: getVal(inputsMap.practica[0]), P2: getVal(inputsMap.practica[1]),
            P3: getVal(inputsMap.practica[2]), P4: getVal(inputsMap.practica[3]),
            W1: getVal(inputsMap.trabajo),
            EP: getVal(inputsMap.parcial),
            EF: getVal(inputsMap.final),
            Lb1: getVal(inputsMap.lab[0]), Lb2: getVal(inputsMap.lab[1]),
            Lb3: getVal(inputsMap.lab[2]), Lb4: getVal(inputsMap.lab[3]),
            Lb5: getVal(inputsMap.lab[4]), Lb6: getVal(inputsMap.lab[5]), Lb7: getVal(inputsMap.lab[6]),
            C1: getVal(inputsMap.control[0]), C2: getVal(inputsMap.control[1]),
            C3: getVal(inputsMap.control[2]), C4: getVal(inputsMap.control[3]),
            C5: getVal(inputsMap.control[4]), C6: getVal(inputsMap.control[5]),
            C7: getVal(inputsMap.control[6]), C8: getVal(inputsMap.control[7])
        };

        const promedio = esquema.calcular(notas);

        actualizarColorPromedio(promedio);
        calcularNotaMinima(esquema, notas, promedio);
    }

    function actualizarColorPromedio(promedio) {
        promedioFinalDiv.textContent = promedio.toFixed(2);

        let hue, saturation, lightness;

        // FASE 1: JALADO (0 a 10.49) - Rojo a Amarillo
        if (promedio < 10.5) {
            const t = Math.max(0, promedio / 10.5);
            hue = Math.round(60 * t); // 0 (Rojo) -> 60 (Amarillo)
            saturation = 100;
            lightness = 50;
        }
        // FASE 2: APROBADO (10.5 a 14.00) - Verde a Cyan
        else if (promedio >= 10.5 && promedio < 14) {
            const t = (promedio - 10.5) / (14 - 10.5);
            hue = Math.round(120 + (217 - 120) * t); // 120 (Verde) -> 217 (Azul)
            saturation = 95;
            lightness = 60;
        }
        // FASE 3: NOTAZA (14+) - Cyan Fijo
        else {
            hue = 217;
            saturation = 91;
            lightness = 60;
        }

        const colorFinal = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const bgTint = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.1)`; // Fondo con 10% opacidad

        // Aplicar color al TEXTO
        promedioFinalDiv.style.color = colorFinal;
        promedioFinalDiv.style.textShadow = `0 0 35px ${colorFinal}`;

        // Aplicar color al RECUADRO (Border + Background Tint)
        // Aplicar color al RECUADRO (Border + Background Tint - SUAVIZADO)
        if (resultBox) {
            // Usamos una opacidad menor para el borde y el brillo
            const softColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`; // 50% opacidad
            const softBgTint = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.05)`; // 5% opacidad (muy sutil)

            resultBox.style.borderColor = softColor; // Borde menos agresivo
            resultBox.style.background = `linear-gradient(145deg, ${softBgTint}, transparent)`;
            resultBox.style.boxShadow = `0 0 10px ${softBgTint}`; // Brillo muy tenue
        }
    }

    function calcularNotaMinima(esquema, notas, promedioActual) {
        const notasSinFinal = { ...notas, EF: 0 };
        const pSinFinal = esquema.calcular(notasSinFinal);

        const notasConFinalMax = { ...notas, EF: 20 };
        const pConFinalMax = esquema.calcular(notasConFinalMax);

        const pesoEF = (pConFinalMax - pSinFinal) / 20;

        let necesario = 0;
        if (pesoEF > 0.001) {
            necesario = (NOTA_APROBATORIA - pSinFinal) / pesoEF;
        }

        if ((pSinFinal) >= NOTA_APROBATORIA) {
            notaMinimaFinalDiv.innerHTML = "<span style='color:#00E676'>¡Ya aprobaste!</span>";
        } else if (necesario > 20) {
            notaMinimaFinalDiv.innerHTML = "<span style='color:#FF1744'>Imposible aprobar :(</span>";
        } else if (necesario <= 0) {
            notaMinimaFinalDiv.innerHTML = "<span style='color:#00E676'>¡Ya aprobaste!</span>";
        } else {
            notaMinimaFinalDiv.innerHTML = `<span style='color:#f7e07a'>${necesario.toFixed(2)}</span>`;
        }
    }


    // ========== 🚀 PARTE 6: EVENT LISTENERS ==========

    const allInputs = [
        ...inputsMap.practica, inputsMap.trabajo, inputsMap.parcial, inputsMap.final,
        ...inputsMap.lab, ...inputsMap.control
    ];

    allInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                window.requestAnimationFrame(calcularNotas);
            });
        }
    });

    selectCarrera.addEventListener('change', poblarCiclos);
    selectCiclo.addEventListener('change', poblarCursos);
    selectCurso.addEventListener('change', actualizarVistaCurso);

    cursosBotonesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-curso')) {
            selectCurso.value = e.target.dataset.value;
            selectCurso.dispatchEvent(new Event('change'));
        }
    });

    // Auto-selección
    function autoseleccionarDesdeURL() {
        const params = new URLSearchParams(window.location.search);
        const c = params.get('carrera');
        const ci = params.get('ciclo');

        if (c) {
            const btn = document.getElementById('btnVolverMapa');
            if (btn) btn.href = `carrera.html?carrera=${c}`;

            if (selectCarrera.querySelector(`option[value="${c}"]`)) {
                selectCarrera.value = c;
                poblarCiclos();
                if (ci && selectCiclo.querySelector(`option[value="${ci}"]`)) {
                    selectCiclo.value = ci;
                    poblarCursos();
                    tituloCiclo.textContent = `${ci.replace('ciclo', 'Ciclo ')} - ${dataCarreras[c].nombre}`;
                    generarBotonesDeCurso(c, ci);
                }
            }
        }
    }

    poblarCarreras();
    resetearCampos();
    autoseleccionarDesdeURL();
});
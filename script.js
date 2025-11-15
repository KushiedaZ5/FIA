document.addEventListener("DOMContentLoaded", () => {
  // ========== 🧠 PARTE 1: LA BASE DE DATOS DE CURSOS ==========
  const dataCarreras = {
    ingSistemas: {
      nombre: "Ingeniería de Computación y Sistemas",
      ciclos: {
        ciclo1: [],
        ciclo2: [],
        ciclo3: [],
        ciclo4: [
          {
            value: "est2",
            text: "Estadística 2",
            imagen: "imagenes/est2_formulas.jpg",
            formula: "formula_est2",
          },
          {
            value: "ti2",
            text: "Tecnología de Información 2",
            imagen: "imagenes/ti2_formulas.jpg",
            formula: "formula_ti2",
          },
          {
            value: "fis2",
            text: "Física 2",
            imagen: "imagenes/fis2_formulas.jpg",
            formula: "formula_fis2",
          },
          {
            value: "alg2",
            text: "Algoritmos 2",
            imagen: "imagenes/alg2_formulas.jpg",
            formula: "formula_alg2",
          },
          {
            value: "micro",
            text: "Microeconomía",
            imagen: "imagenes/micro_formulas.jpg",
            formula: "formula_micro",
          },
        ],
        ciclo5: [
          {
            value: "calc3",
            text: "Cálculo 3",
            imagen: "imagenes/silabo_default.png",
            formula: "promedio_simple",
          },
          {
            value: "estadistica2_otra",
            text: "Estadística 2 (otra)",
            imagen: "imagenes/silabo_default.png",
            formula: "promedio_simple",
          },
        ],
        ciclo6: [],
      },
    },
    ingCivil: {
      nombre: "Ingeniería Civil",
      ciclos: {
        ciclo1: [
          {
            value: "mate1_civil",
            text: "Matemática 1 (Civil)",
            imagen: "imagenes/silabo_default.png",
            formula: "promedio_simple",
          },
        ],
        ciclo2: [],
        ciclo3: [],
        // --- ¡BLOQUE DE CIVIL CICLO 4 FUSIONADO! ---
        ciclo4: [
          { 
            value: 'dinamica_civil', 
            text: 'Dinámica', 
            imagen: 'imagenes/dinamica_formulas.jpg', // Esta era la 'formula_civil_c4_1'
            formula: 'formula_dinamica_civil' // Renombrada para claridad
          },
          {
            value: "tec_concreto",
            text: "Tecnología del Concreto",
            imagen: "imagenes/tec_concreto_formulas.jpg",
            formula: "formula_tec_concreto",
          },
          {
            value: "estatica",
            text: "Estática",
            imagen: "imagenes/estatica_formulas.jpg",
            formula: "formula_estatica",
          },
        ],
        ciclo5: [],
        ciclo6: [],
      },
    },
    ingIndustrial: {
      nombre: "Ingeniería Industrial",
      ciclos: {
        ciclo1: [
          {
            value: "quimica1",
            text: "Química 1 (Industrial)",
            imagen: "imagenes/silabo_default.png",
            formula: "promedio_simple",
          },
        ],
        ciclo2: [],
        ciclo3: [],
        ciclo4: [],
        ciclo5: [],
        ciclo6: [
          {
            value: "proc_manuf",
            text: "Proceso de Manufactura",
            imagen: "imagenes/procesomanuf_formulas.jpg",
            formula: "formula_alg2",
          },
        ],
      },
    },
    arquitectura: {
      nombre: "Arquitectura",
      ciclos: {
        ciclo1: [],
        ciclo2: [],
        ciclo3: [],
        ciclo4: [
          {
            value: "const2",
            text: "Construcción 2",
            imagen: "imagenes/const2_formulas.jpg",
            formula: "formula_const2",
          },
          {
            value: "exp_arq4",
            text: "Expresión Arquitectónica 4",
            imagen: "imagenes/percep_arte_formulas.jpg",
            formula: "formula_percep_arte",
          },
          {
            value: "estruc2_arq",
            text: "Estructuras 2",
            imagen: "imagenes/percep_arte_formulas.jpg",
            formula: "formula_percep_arte",
          },
          {
            value: "taller4_arq",
            text: "Taller 4",
            imagen: "imagenes/taller4_arq_formulas.jpg",
            formula: "formula_taller4_arq",
          },
          {
            value: "foto_arq",
            text: "Fotografía",
            imagen: "imagenes/percep_arte_formulas.jpg",
            formula: "formula_percep_arte",
          },
          {
            value: "percep_arte",
            text: "Percepción del Arte y la Arquitectura",
            imagen: "imagenes/percep_arte_formulas.jpg",
            formula: "formula_percep_arte",
          },
        ],
        ciclo5: [],
        ciclo6: [],
      },
    },
    aeronautica: {
      nombre: "Ciencias Aeronáuticas",
      ciclos: {
        ciclo1: [],
        ciclo2: [],
        ciclo3: [],
        ciclo4: [],
        ciclo5: [],
        ciclo6: [],
      },
    },
  };

  // ========== 🎯 PARTE 2: REFERENCIAS HTML ==========
  const selectCarrera = document.getElementById("selectCarrera");
  const selectCiclo = document.getElementById("selectCiclo");
  const selectCurso = document.getElementById("selectCurso");
  const imagenSilabo = document.getElementById("imagenSilabo");
  const textoSilabo = document.getElementById("textoSilabo");
  const calculadoraContenido = document.getElementById("calculadoraContenido");
  const columnaDerechaNotas = document.getElementById("columnaDerechaNotas");
  const contenedorPesos = document.getElementById("contenedorPesos");
  const camposPractica = [
    document.getElementById("campoP1"),
    document.getElementById("campoP2"),
    document.getElementById("campoP3"),
    document.getElementById("campoP4"),
  ];
  const campoW1 = document.getElementById("campoW1");
  const campoEP = document.getElementById("campoEP");
  const campoEF = document.getElementById("campoEF");
  const camposLaboratorioContainer =
    document.getElementById("camposLaboratorio");
  const camposControlesContainer = document.getElementById("camposControles");
  const camposLab = [
    document.getElementById("campoLb1"),
    document.getElementById("campoLb2"),
    document.getElementById("campoLb3"),
    document.getElementById("campoLb4"),
    document.getElementById("campoLb5"),
    document.getElementById("campoLb6"),
    document.getElementById("campoLb7"),
  ];
  const inputsControl = [
    document.getElementById("control1"),
    document.getElementById("control2"),
    document.getElementById("control3"),
    document.getElementById("control4"),
    document.getElementById("control5"),
    document.getElementById("control6"),
    document.getElementById("control7"),
    document.getElementById("control8"),
  ];
  const inputsPractica = [
    document.getElementById("practica1"),
    document.getElementById("practica2"),
    document.getElementById("practica3"),
    document.getElementById("practica4"),
  ];
  const trabajoPracticoInput = document.getElementById("trabajoPractico");
  const examenParcialInput = document.getElementById("examenParcial");
  const examenFinalInput = document.getElementById("examenFinal");
  const inputsLab = [
    document.getElementById("lab1"),
    document.getElementById("lab2"),
    document.getElementById("lab3"),
    document.getElementById("lab4"),
    document.getElementById("lab5"),
    document.getElementById("lab6"),
    document.getElementById("lab7"),
  ];
  const promedioFinalDiv = document.getElementById("promedioFinal");
  const notaMinimaFinalDiv = document.getElementById("notaMinimaFinal");
  const NOTA_APROBATORIA = 10.5;

  // ========== 🔄 PARTE 3: LÓGICA DE LISTAS DEPENDIENTES ==========
  function poblarCarreras() {
    Object.keys(dataCarreras).forEach((carreraKey) => {
      const carrera = dataCarreras[carreraKey];
      const option = new Option(carrera.nombre, carreraKey);
      selectCarrera.add(option);
    });
  }
  function poblarCiclos() {
    const carreraKey = selectCarrera.value;
    selectCiclo.innerHTML =
      '<option selected disabled value="">Selecciona un ciclo...</option>';
    selectCurso.innerHTML =
      '<option selected disabled value="">Selecciona un ciclo primero...</option>';
    selectCiclo.disabled = true;
    selectCurso.disabled = true;
    if (carreraKey && dataCarreras[carreraKey]) {
      const ciclos = dataCarreras[carreraKey].ciclos;
      Object.keys(ciclos).forEach((cicloKey) => {
        const option = new Option(
          cicloKey.replace("ciclo", "Ciclo "),
          cicloKey
        );
        selectCiclo.add(option);
      });
      selectCiclo.disabled = false;
    }
    resetearCampos();
  }
  function poblarCursos() {
    const carreraKey = selectCarrera.value;
    const cicloKey = selectCiclo.value;
    selectCurso.innerHTML =
      '<option selected disabled value="">Selecciona un curso...</option>';
    selectCurso.disabled = true;
    if (carreraKey && cicloKey && dataCarreras[carreraKey].ciclos[cicloKey]) {
      const cursos = dataCarreras[carreraKey].ciclos[cicloKey];
      cursos.forEach((curso) => {
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
    calculadoraContenido.classList.remove("d-none");
    columnaDerechaNotas.classList.remove("d-none");
    columnaDerechaNotas.classList.add("d-lg-block");
    const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(
      (curso) => curso.value === cursoVal
    );
    if (cursoData) {
      imagenSilabo.src = cursoData.imagen;
      imagenSilabo.style.display = "block";
      textoSilabo.style.display = "none";
      actualizarCamposDeNotas(cursoData.formula);
      mostrarPesos(cursoData.formula);
    }
    calcularNotas();
  }
  selectCarrera.addEventListener("change", poblarCiclos);
  selectCiclo.addEventListener("change", poblarCursos);
  selectCurso.addEventListener("change", actualizarVistaCurso);

  // ========== 📊 PARTE 4: MOSTRAR PESOS (ACTUALIZADO) ==========

  function mostrarPesos(formulaKey) {
    let pesos = [];
    switch (formulaKey) {
      case "formula_est2":
        pesos = [
          {
            nombre: "Prom. Prácticas (PPR)",
            porcentaje: 53.3,
            color: "bg-primary",
          },
          {
            nombre: "Examen Final (EF)",
            porcentaje: 33.3,
            color: "bg-warning",
          },
          { nombre: "Trabajo (W1)", porcentaje: 13.3, color: "bg-info" },
        ];
        break;
      case "formula_micro":
        pesos = [
          { nombre: "Examen Final (EF)", porcentaje: 40, color: "bg-danger" },
          {
            nombre: "Examen Parcial (EP)",
            porcentaje: 30,
            color: "bg-warning",
          },
          { nombre: "Práctica 1 (P1)", porcentaje: 7.5, color: "bg-primary" },
          { nombre: "Práctica 2 (P2)", porcentaje: 7.5, color: "bg-primary" },
          { nombre: "Controles (P3)", porcentaje: 7.5, color: "bg-primary" },
          {
            nombre: "Investigación (P4)",
            porcentaje: 7.5,
            color: "bg-primary",
          },
        ];
        break;
      case "formula_ti2":
        pesos = [
          { nombre: "Examen Final (EF)", porcentaje: 25, color: "bg-danger" },
          {
            nombre: "Examen Parcial (EP)",
            porcentaje: 25,
            color: "bg-warning",
          },
          {
            nombre: "Prom. Prácticas (P)",
            porcentaje: 16.7,
            color: "bg-primary",
          },
          { nombre: "Trabajo (W1)", porcentaje: 16.7, color: "bg-info" },
          {
            nombre: "Prom. Laboratorio (PL)",
            porcentaje: 16.7,
            color: "bg-success",
          },
        ];
        break;
      case "formula_fis2":
        pesos = [
          {
            nombre: "Prom. Prácticas (PE)",
            porcentaje: 50,
            color: "bg-primary",
          },
          {
            nombre: "Prom. Laboratorio (PL)",
            porcentaje: 25,
            color: "bg-info",
          },
          { nombre: "Examen Final (EF)", porcentaje: 25, color: "bg-warning" },
        ];
        break;
      case "formula_alg2":
        pesos = [
          { nombre: "Evaluaciones (PE)", porcentaje: 50, color: "bg-primary" },
          { nombre: "Examen Parcial (EP)", porcentaje: 25, color: "bg-info" },
          { nombre: "Examen Final (EF)", porcentaje: 25, color: "bg-warning" },
        ];
        break;
      case "promedio_simple":
        pesos = [
          {
            nombre: "P1, P2, P3, P4, EF",
            porcentaje: 20,
            color: "bg-secondary",
          },
        ];
        break;
      case "formula_percep_arte":
        pesos = [
          {
            nombre: "Prom. Evaluaciones (PE)",
            porcentaje: 33.3,
            color: "bg-primary",
          },
          {
            nombre: "Examen Parcial (EP)",
            porcentaje: 33.3,
            color: "bg-warning",
          },
          { nombre: "Examen Final (EF)", porcentaje: 33.3, color: "bg-danger" },
        ];
        break;
      case "formula_const2":
        pesos = [
          {
            nombre: "Prom. Evaluaciones (PE)",
            porcentaje: 60,
            color: "bg-primary",
          },
          {
            nombre: "Examen Parcial (EP)",
            porcentaje: 20,
            color: "bg-warning",
          },
          { nombre: "Examen Final (EF)", porcentaje: 20, color: "bg-danger" },
        ];
        break;

      case "formula_taller4_arq":
        pesos = [
          { nombre: "Examen Final (EF)", porcentaje: 50, color: "bg-danger" },
          {
            nombre: "Examen Parcial (EP)",
            porcentaje: 33.3,
            color: "bg-warning",
          },
          { nombre: "Práctica 1 (P1)", porcentaje: 4.17, color: "bg-primary" },
          { nombre: "Práctica 2 (P2)", porcentaje: 4.17, color: "bg-primary" },
          { nombre: "Práctica 3 (P3)", porcentaje: 4.17, color: "bg-primary" },
          { nombre: "Práctica 4 (P4)", porcentaje: 4.17, color: "bg-primary" },
        ];
        break;

      // --- AGREGADO: Pesos para Dinámica (ex-civil_c4_1) ---
      case "formula_dinamica_civil":
        pesos = [ 
            { nombre: 'Prom. Prácticas (P1-P4)', porcentaje: 25, color: 'bg-primary' },
            { nombre: 'Trabajo (W1)', porcentaje: 25, color: 'bg-info' },
            { nombre: 'Examen Parcial (EP)', porcentaje: 25, color: 'bg-warning' },
            { nombre: 'Examen Final (EF)', porcentaje: 25, color: 'bg-danger' }
        ]; 
        break;

      // --- AGREGADO: Pesos para Tecnología del Concreto ---
      case "formula_tec_concreto":
        pesos = [
          {
            nombre: "Prom. Evaluaciones (PE)",
            porcentaje: 50,
            color: "bg-primary",
          },
          { nombre: "Examen Parcial (EP)", porcentaje: 25, color: "bg-info" },
          { nombre: "Examen Final (EF)", porcentaje: 25, color: "bg-warning" },
        ];
        break;

      // --- AGREGADO: Pesos para Estática ---
      case "formula_estatica":
        pesos = [
          { nombre: "Examen Final (EF)", porcentaje: 40, color: "bg-danger" },
          {
            nombre: "Examen Parcial (EP)",
            porcentaje: 30,
            color: "bg-warning",
          },
          {
            nombre: "Prom. Evaluaciones (PE)",
            porcentaje: 30,
            color: "bg-primary",
          },
        ];
        break;

      default:
        pesos = [];
        break;
    }
    pesos.sort((a, b) => b.porcentaje - a.porcentaje);
    contenedorPesos.innerHTML = "";
    if (formulaKey === "promedio_simple") {
      // (código para promedio_simple)
    } else {
      pesos.forEach((item) => {
        const html = `
                      <div>
                          <div class="d-flex justify-content-between mb-1 small">
                              <span class="fw-bold text-light">${
                                item.nombre
                              }</span>
                              <span class="text-white-50">${item.porcentaje.toFixed(
                                1
                              )}%</span>
                          </div>
                          <div class="progress" role="progressbar" style="height: 10px; background-color: #333;">
                              <div class="progress-bar ${
                                item.color
                              }" style="width: ${item.porcentaje}%"></div>
                          </div>
                      </div>
                  `;
        contenedorPesos.innerHTML += html;
      });
    }
  }

  // ========== ⚙️ PARTE 5: CÁLCULOS Y CAMPOS (ACTUALIZADO) ==========

  function calcularPromedioConMN(notas = [], divisor) {
    if (notas.length === 0) return 0;
    const notasValidas = notas.map((n) => parseFloat(n) || 0);
    notasValidas.sort((a, b) => a - b);
    const mn = notasValidas[0];
    const suma = notasValidas.reduce((total, nota) => total + nota, 0);
    return divisor > 0
      ? (suma - mn) / divisor
      : (suma - mn) / (notasValidas.length - 1);
  }

  function actualizarCamposDeNotas(formulaKey) {
    [
      ...camposPractica,
      campoW1,
      campoEP,
      camposLaboratorioContainer,
      camposControlesContainer,
      ...camposLab,
    ].forEach((c) => c && c.classList.add("d-none"));

    switch (formulaKey) {
      case "formula_micro":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposControlesContainer.classList.remove("d-none");
        camposPractica[3].classList.remove("d-none");
        campoEP.classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "formula_ti2":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposPractica[2].classList.remove("d-none");
        camposPractica[3].classList.remove("d-none");
        campoW1.classList.remove("d-none");
        campoEP.classList.remove("d-none");
        camposLaboratorioContainer.classList.remove("d-none");
        for (let i = 0; i < 4; i++) camposLab[i].classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "formula_fis2":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposPractica[2].classList.remove("d-none");
        camposPractica[3].classList.remove("d-none");
        camposLaboratorioContainer.classList.remove("d-none");
        for (let i = 0; i < 7; i++) camposLab[i].classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "formula_alg2":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        campoW1.classList.remove("d-none");
        campoEP.classList.remove("d-none");
        camposLaboratorioContainer.classList.remove("d-none");
        for (let i = 0; i < 5; i++) camposLab[i].classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "formula_est2":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposPractica[2].classList.remove("d-none");
        camposPractica[3].classList.remove("d-none");
        campoW1.classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "promedio_simple":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposPractica[2].classList.remove("d-none");
        camposPractica[3].classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "formula_percep_arte":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposPractica[2].classList.remove("d-none");
        campoEP.classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "formula_const2":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposPractica[2].classList.remove("d-none");
        camposPractica[3].classList.remove("d-none");
        campoEP.classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;
      case "formula_taller4_arq":
        camposPractica[0].classList.remove("d-none");
        camposPractica[1].classList.remove("d-none");
        camposPractica[2].classList.remove("d-none");
        camposPractica[3].classList.remove("d-none");
        campoEP.classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;

      // --- AGREGADO: Campos para Dinámica (ex-civil_c4_1) ---
      case "formula_dinamica_civil":
        camposPractica[0].classList.remove("d-none"); // P1
        camposPractica[1].classList.remove("d-none"); // P2
        camposPractica[2].classList.remove("d-none"); // P3
        camposPractica[3].classList.remove("d-none"); // P4
        campoW1.classList.remove("d-none");
        campoEP.classList.remove("d-none");
        campoEF.classList.remove("d-none");
        break;

      // --- AGREGADO: Campos para Tecnología del Concreto ---
      case "formula_tec_concreto":
        camposPractica[0].classList.remove("d-none"); // P1
        camposPractica[1].classList.remove("d-none"); // P2
        camposPractica[2].classList.remove("d-none"); // P3
        camposPractica[3].classList.remove("d-none"); // P4
        campoW1.classList.remove("d-none"); // W1
        campoEP.classList.remove("d-none"); // EP
        campoEF.classList.remove("d-none"); // EF
        break;

      // --- AGREGADO: Campos para Estática ---
      case "formula_estatica":
        camposPractica[0].classList.remove("d-none"); // P1
        camposPractica[1].classList.remove("d-none"); // P2
        camposPractica[2].classList.remove("d-none"); // P3
        camposPractica[3].classList.remove("d-none"); // P4
        campoEP.classList.remove("d-none"); // EP
        campoEF.classList.remove("d-none"); // EF
        break;

      default:
        break;
    }
  }

  function resetearCampos() {
    calculadoraContenido.classList.add("d-none");
    columnaDerechaNotas.classList.add("d-none");
    columnaDerechaNotas.classList.remove("d-lg-block");
    imagenSilabo.style.display = "none";
    textoSilabo.style.display = "block";
    contenedorPesos.innerHTML = "";
    actualizarCamposDeNotas("default");
    [
      ...inputsPractica,
      trabajoPracticoInput,
      examenParcialInput,
      examenFinalInput,
      ...inputsLab,
      ...inputsControl,
    ].forEach((i) => i && (i.value = 0));
    calcularNotas();
  }

  function calcularNotas() {
    const carreraKey = selectCarrera.value;
    const cicloKey = selectCiclo.value;
    const cursoVal = selectCurso.value;
    let formulaKey = "default";
    if (carreraKey && cicloKey && cursoVal) {
      const cursoData = dataCarreras[carreraKey].ciclos[cicloKey].find(
        (curso) => curso.value === cursoVal
      );
      if (cursoData) formulaKey = cursoData.formula;
    }

    const p = inputsPractica.map((i) => parseFloat(i.value) || 0);
    const w1 = parseFloat(trabajoPracticoInput.value) || 0;
    const ep = parseFloat(examenParcialInput.value) || 0;
    const ef = parseFloat(examenFinalInput.value) || 0;
    const lb = inputsLab.map((i) => parseFloat(i.value) || 0);
    const cl = inputsControl.map((i) => parseFloat(i.value) || 0);

    let promedio = 0;
    let sumaSinFinal = 0;
    let pesoFinal = 0;

    switch (formulaKey) {
      case "formula_micro":
        const sumaControles = cl.reduce((a, b) => a + b, 0);
        const p3_micro = sumaControles / 2;
        const pe_micro = (p[0] + p[1] + p3_micro + p[3]) / 4;
        promedio = 0.3 * pe_micro + 0.3 * ep + 0.4 * ef;
        sumaSinFinal = 0.3 * pe_micro + 0.3 * ep;
        pesoFinal = 0.4;
        break;
      case "formula_est2":
        const notas_est2 = [p[0], p[1], p[2], p[3]];
        const mn_est2 = Math.min(...notas_est2);
        const suma_est2 = p[0] + p[1] + p[2] + p[3] + p[3];
        const ppr_est2 = (suma_est2 - mn_est2) / 4;
        const pe_est2 = (4 * ppr_est2 + w1) / 5;
        promedio = (2 * pe_est2 + ef) / 3;
        sumaSinFinal = 2 * pe_est2;
        pesoFinal = 3;
        break;
      case "formula_ti2":
        const pl_ti2 = (lb[0] + lb[1] + lb[2] + lb[3]) / 4;
        const prom_p_ti2 = calcularPromedioConMN([p[0], p[1], p[2], p[3]], 3);
        const pe_ti2 = (prom_p_ti2 + w1 + pl_ti2) / 3;
        promedio = (2 * pe_ti2 + ep + ef) / 4;
        sumaSinFinal = 2 * pe_ti2 + ep;
        pesoFinal = 4;
        break;
      case "formula_fis2":
        const pl_fis2 = calcularPromedioConMN(
          [lb[0], lb[1], lb[2], lb[3], lb[4], lb[5], lb[6]],
          6
        );
        const notas_fis2 = [p[0], p[1], p[2], p[3]];
        const mn_fis2 = Math.min(...notas_fis2);
        const suma_fis2 = p[0] + p[1] + p[2] + p[3] + p[3];
        const pe_fis2 = (suma_fis2 - mn_fis2) / 4;
        promedio = (2 * pe_fis2 + pl_fis2 + ef) / 4;
        sumaSinFinal = 2 * pe_fis2 + pl_fis2;
        pesoFinal = 4;
        break;
      case "formula_alg2":
        const pl_alg2 = calcularPromedioConMN(
          [lb[0], lb[1], lb[2], lb[3], lb[4]],
          4
        );
        const prom_p_alg2 = (p[0] + p[1]) / 2;
        const pe_alg2 = (prom_p_alg2 + w1 + pl_alg2) / 3;
        promedio = (2 * pe_alg2 + ep + ef) / 4;
        sumaSinFinal = 2 * pe_alg2 + ep;
        pesoFinal = 4;
        break;
      case "promedio_simple":
        promedio = (p[0] + p[1] + p[2] + p[3] + ef) / 5;
        sumaSinFinal = p[0] + p[1] + p[2] + p[3];
        pesoFinal = 5;
        break;
      case "formula_percep_arte":
        const pe_arte = (p[0] + p[1] + p[2]) / 3;
        promedio = (pe_arte + ep + ef) / 3;
        sumaSinFinal = pe_arte + ep;
        pesoFinal = 3;
        break;
      case "formula_const2":
        const pe_const2 = (p[0] + p[1] + p[2] + p[3]) / 4;
        promedio = (3 * pe_const2 + ep + ef) / 5;
        sumaSinFinal = 3 * pe_const2 + ep;
        pesoFinal = 5;
        break;
      case "formula_taller4_arq":
        const pe_taller4 = (p[0] + p[1] + p[2] + p[3]) / 4;
        promedio = (pe_taller4 + 2 * ep + 3 * ef) / 6;
        sumaSinFinal = pe_taller4 + 2 * ep;
        pesoFinal = 6;
        break;

      // --- AGREGADO: Cálculos para Dinámica (ex-civil_c4_1) ---
      case "formula_dinamica_civil":
        const p_block_civil = calcularPromedioConMN([p[0], p[1], p[2], p[3]], 3);
        const pe_civil = (p_block_civil + w1) / 2;
        promedio = (2 * pe_civil + ep + ef) / 4;
        sumaSinFinal = (2 * pe_civil) + ep;
        pesoFinal = 4;
        break;

      // --- AGREGADO: Cálculos para Tecnología del Concreto ---
      case "formula_tec_concreto":
        const notas_concreto = [p[0], p[1], p[2], p[3]];
        const mn_concreto = Math.min(...notas_concreto);
        const suma_practicas_concreto = p[0] + p[1] + p[2] + p[3];
        const prom_practicas_concreto =
          (suma_practicas_concreto - mn_concreto) / 3;
        const pe_concreto = (prom_practicas_concreto + w1) / 2;
        promedio = (2 * pe_concreto + ep + ef) / 4;
        sumaSinFinal = 2 * pe_concreto + ep;
        pesoFinal = 4;
        break;

      // --- AGREGADO: Cálculos para Estática ---
      case "formula_estatica":
        const pe_estatica = (p[0] + p[1] + p[2] + p[3]) / 4;
        promedio = 0.3 * pe_estatica + 0.3 * ep + 0.4 * ef;
        sumaSinFinal = 0.3 * pe_estatica + 0.3 * ep;
        pesoFinal = 0.4;
        break;

      default:
        promedio = 0;
        sumaSinFinal = 0;
        pesoFinal = 1;
        break;
    }

    promedioFinalDiv.textContent = promedio.toFixed(2);

    let notaNecesariaFinal;

    // Bloque de lógica para calcular "Cuanto necesito en el final"
    if (formulaKey === "formula_micro" || formulaKey === "formula_estatica") {
      // Lógica para pesos decimales (Micro y Estática)
      notaNecesariaFinal = (NOTA_APROBATORIA - sumaSinFinal) / pesoFinal;
    } else if (formulaKey === "default") {
      notaNecesariaFinal = 0;
    } else if (formulaKey === "formula_taller4_arq") {
      notaNecesariaFinal = (NOTA_APROBATORIA * pesoFinal - sumaSinFinal) / 3;
    } else {
      // Caso estándar donde pesoFinal es el divisor total
      notaNecesariaFinal = NOTA_APROBATORIA * pesoFinal - sumaSinFinal;
    }

    if (formulaKey === "default") {
      notaMinimaFinalDiv.textContent = "N/A";
      notaMinimaFinalDiv.style.color = "#f7e07a";
    } else if (notaNecesariaFinal <= 0) {
      notaMinimaFinalDiv.textContent = "Ya aprobaste!";
      notaMinimaFinalDiv.style.color = "#76ff03";
    } else if (notaNecesariaFinal > 20) {
      notaMinimaFinalDiv.textContent = "Imposible aprobar";
      notaMinimaFinalDiv.style.color = "#ff1744";
    } else {
      notaMinimaFinalDiv.textContent = notaNecesariaFinal.toFixed(2);
      notaMinimaFinalDiv.style.color = "#f7e07a";
    }
  }

  // ========== 🏁 PARTE 6: INICIALIZACIÓN ==========
  [
    ...inputsPractica,
    trabajoPracticoInput,
    examenParcialInput,
    examenFinalInput,
    ...inputsLab,
    ...inputsControl,
  ].forEach((input) => {
    input && input.addEventListener("input", calcularNotas);
  });

  poblarCarreras();
  resetearCampos();
});
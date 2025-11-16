// Este archivo AHORA contiene la base de datos.
// ¡Bórralo de "script-calculadora.js"!
const dataCarreras = {
    'ingSistemas': {
        nombre: 'Ingeniería de Computación y Sistemas',
        ciclos: {
            'ciclo1': [], 'ciclo2': [], 'ciclo3': [],
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
            'ciclo6': []
        }
    },
    'ingCivil': {
        nombre: 'Ingeniería Civil',
        ciclos: {
            'ciclo1': [ { value: 'mate1_civil', text: 'Matemática 1 (Civil)', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }],
            'ciclo2': [], 'ciclo3': [], 
            'ciclo4': [
                { value: 'dinamica_civil', text: 'Dinámica', imagen: 'imagenes/civil_c4_1.jpg', formula: 'formula_dinamica_civil' },
                { value: "tec_concreto", text: "Tecnología del Concreto", imagen: "imagenes/tec_concreto_formulas.jpg", formula: "formula_tec_concreto" },
                { value: "estatica", text: "Estática", imagen: "imagenes/estatica_formulas.jpg", formula: "formula_estatica" }
            ], 
            'ciclo5': [], 'ciclo6': []
        }
    },
    'ingIndustrial': {
        nombre: 'Ingeniería Industrial',
        ciclos: {
            'ciclo1': [ { value: 'quimica1', text: 'Química 1 (Industrial)', imagen: 'imagenes/silabo_default.png', formula: 'promedio_simple' }],
            'ciclo2': [], 'ciclo3': [], 'ciclo4': [], 'ciclo5': [],
            'ciclo6': [
                { value: 'proc_manuf', text: 'Proceso de Manufactura', imagen: 'imagenes/procesomanuf_formulas.jpg', formula: 'formula_alg2' }
            ]
        }
    },
    'arquitectura': {
        nombre: 'Arquitectura',
        ciclos: { 
            'ciclo1': [], 'ciclo2': [], 'ciclo3': [], 
            'ciclo4': [
                { value: 'const2', text: 'Construcción 2', imagen: 'imagenes/const2_formulas.jpg', formula: 'formula_const2' },
                { value: 'exp_arq4', text: 'Expresión Arquitectónica 4', imagen: 'imagenes/percep_arte_formulas.jpg', formula: 'formula_percep_arte' },
                { value: 'estruc2_arq', text: 'Estructuras 2', imagen: 'imagenes/percep_arte_formulas.jpg', formula: 'formula_percep_arte' },
                { value: 'taller4_arq', text: 'Taller 4', imagen: 'imagenes/taller4_arq_formulas.jpg', formula: 'formula_taller4_arq' },
                { value: 'foto_arq', text: 'Fotografía', imagen: 'imagenes/percep_arte_formulas.jpg', formula: 'formula_percep_arte' },
                { value: 'percep_arte', text: 'Percepción del Arte y la Arquitectura', imagen: 'imagenes/percep_arte_formulas.jpg', formula: 'formula_percep_arte' }
            ], 
            'ciclo5': [], 'ciclo6': [] 
        }
    },
    'aeronautica': {
        nombre: 'Ciencias Aeronáuticas',
        ciclos: { 'ciclo1': [], 'ciclo2': [], 'ciclo3': [], 'ciclo4': [], 'ciclo5': [], 'ciclo6': [] }
    }
};
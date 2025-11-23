// Este archivo AHORA contiene la base de datos.
// ¡Bórralo de "script-calculadora.js"!
const dataCarreras = {
    'ingSistemas': {
        nombre: 'Ingeniería de Computación y Sistemas',
        ciclos: {
            'ciclo1': [], 'ciclo2': [], 'ciclo3': [],
            'ciclo4': [
                { value: 'est2', text: 'Estadística 2', esquema: '041' },
                { value: 'ti2', text: 'Tecnología de Información 2', esquema: '046' },
                { value: 'fis2', text: 'Física 2', esquema: '042' },
                { value: 'alg2', text: 'Algoritmos 2', esquema: '047' },
                { value: 'micro', text: 'Microeconomía', esquema: '054' }
            ],
            'ciclo5': [
                { value: 'calc3', text: 'Cálculo 3', esquema: '040' },
                { value: 'estadistica2_otra', text: 'Estadística 2 (otra)', esquema: '040' }
            ],
            'ciclo6': []
        }
    },
    'ingCivil': {
        nombre: 'Ingeniería Civil',
        ciclos: {
            'ciclo1': [{ value: 'mate1_civil', text: 'Matemática 1 (Civil)', esquema: '040' }],
            'ciclo2': [], 'ciclo3': [],
            'ciclo4': [
                { value: 'dinamica_civil', text: 'Dinámica', esquema: '045' },
                { value: "tec_concreto", text: "Tecnología del Concreto", esquema: "045" },
                { value: "estatica", text: "Estática", esquema: "049" }
            ],
            'ciclo5': [], 'ciclo6': []
        }
    },
    'ingIndustrial': {
        nombre: 'Ingeniería Industrial',
        ciclos: {
            'ciclo1': [{ value: 'quimica1', text: 'Química 1 (Industrial)', esquema: '040' }],
            'ciclo2': [], 'ciclo3': [], 'ciclo4': [], 'ciclo5': [],
            'ciclo6': [
                { value: 'proc_manuf', text: 'Proceso de Manufactura', esquema: '047' }
            ]
        }
    },
    'arquitectura': {
        nombre: 'Arquitectura',
        ciclos: {
            'ciclo1': [], 'ciclo2': [], 'ciclo3': [],
            'ciclo4': [
                { value: 'const2', text: 'Construcción 2', esquema: '129' },
                { value: 'exp_arq4', text: 'Expresión Arquitectónica 4', esquema: '038' },
                { value: 'estruc2_arq', text: 'Estructuras 2', esquema: '038' },
                { value: 'taller4_arq', text: 'Taller 4', esquema: '127' },
                { value: 'foto_arq', text: 'Fotografía', esquema: '038' },
                { value: 'percep_arte', text: 'Percepción del Arte y la Arquitectura', esquema: '038' }
            ],
            'ciclo5': [], 'ciclo6': []
        }
    },
    'aeronautica': {
        nombre: 'Ciencias Aeronáuticas',
        ciclos: { 'ciclo1': [], 'ciclo2': [], 'ciclo3': [], 'ciclo4': [], 'ciclo5': [], 'ciclo6': [] }
    }
};
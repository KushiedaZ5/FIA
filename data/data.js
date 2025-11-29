// Este archivo AHORA contiene la base de datos.
// ¡Bórralo de "script-calculadora.js"!
const dataCarreras = {
    'ingSistemas': {
        nombre: 'Ingeniería de Computación y Sistemas',
        ciclos: {
            'ciclo1': [
                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049' },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049' },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049' },
                { value: 'filosofia', text: 'Filosofía', esquema: '045' },
                { value: 'geom_analitica', text: 'Geometría Analítica', esquema: '040' },
                { value: 'mate_discreta', text: 'Matemática Discreta', esquema: '040' },
                { value: 'intro_sis_info', text: 'Introducción a Sistemas de Información', esquema: '045' },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039' },
            ], 
            'ciclo2': [
                { value: 'ingles2', text: 'Inglés II', esquema: '039' },
                { value: 'calculo1', text: 'Cálculo I', esquema: '040' },
                { value: 'algebra_lineal', text: 'Álgebra Lineal', esquema: '040' },
                { value: 'fund_diseno_web', text: 'Fundamentos del Diseño Web', esquema: '045' },
                { value: 'intro_economia', text: 'Introducción a la Economía', esquema: '038' },
                { value: 'intro_programacion', text: 'Introducción a la Programación', esquema: '128' },
            ],
            'ciclo3': [
                { value: 'alg1', text: 'Algoritmos y Estructura de Datos I', esquema: '128' },
                { value: 'fis1', text: 'Física I', esquema: '042' },
                { value: 'ti1', text: 'Tecnología de Información I', esquema: '046' },
                { value: 'est1', text: 'Estadística y Probabilidades I', esquema: '041' },
                { value: 'sis_info', text: 'Sistemas de Información', esquema: '038' }
            ],
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
            'ciclo6': [
                { value: 'ing_costos', text: 'Ingeniería de Costos', esquema: '038' },
                { value: 'ing_software1', text: 'Ingeniería de Software I', esquema: '128' },
                { value: 'inv_operativa', text: 'Investigación Operativa', esquema: '038' },
                { value: 'programacion1', text: 'Programación I', esquema: '046' },
            ]
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
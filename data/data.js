// Este archivo AHORA contiene la base de datos.
// ¡Bórralo de "script-calculadora.js"!
const dataCarreras = {
    'ingSistemas': {
        nombre: 'Ingeniería de Computación y Sistemas',
        ciclos: {
            'ciclo1': [

                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 4 },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 4 },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 4 },
                { value: 'filosofia', text: 'Filosofía', esquema: '045', creditos: 4 },
                { value: 'geom_analitica', text: 'Geometría Analítica', esquema: '040', creditos: 4 },
                { value: 'mate_discreta', text: 'Matemática Discreta', esquema: '040', creditos: 4 },
                { value: 'intro_sis_info', text: 'Introducción a Sistemas de Información', esquema: '045', creditos: 4 },
                { value: 'actividades1', text: 'Actividades 1', esquema: '038', creditos: 1 },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 4 },
            ],
            'ciclo2': [

                { value: 'ingles2', text: 'Inglés II', esquema: '039', creditos: 1 },
                { value: 'calculo1', text: 'Cálculo I', esquema: '040', creditos: 5 },
                { value: 'algebra_lineal', text: 'Álgebra Lineal', esquema: '040', creditos: 5 },
                { value: 'fund_diseno_web', text: 'Fundamentos del Diseño Web', esquema: '045', creditos: 3 },
                { value: 'intro_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 3 },
                { value: 'actividades2', text: 'Actividades 2', esquema: '038', creditos: 1 },
                { value: 'intro_programacion', text: 'Introducción a la Programación', esquema: '128', creditos: 5 },
            ],
            'ciclo3': [
                { value: 'alg1', text: 'Algoritmos y Estructura de Datos I', esquema: '128', creditos: 5 },
                { value: 'fis1', text: 'Física I', esquema: '042', creditos: 5 },
                { value: 'ti1', text: 'Tecnología de Información I', esquema: '046', creditos: 5 },
                { value: 'est1', text: 'Estadística y Probabilidades I', esquema: '041', creditos: 4 },
                { value: 'sis_info', text: 'Sistemas de Información', esquema: '038', creditos: 3 }
            ],
            'ciclo4': [
                { value: 'est2', text: 'Estadística 2', esquema: '041', creditos: 4 },
                { value: 'ti2', text: 'Tecnología de Información 2', esquema: '046', creditos: 4 },
                { value: 'fis2', text: 'Física 2', esquema: '042', creditos: 5 },
                { value: 'alg2', text: 'Algoritmos 2', esquema: '047', creditos: 5 },
                { value: 'micro', text: 'Microeconomía', esquema: '054', creditos: 4 }
            ],
            'ciclo5': [
                { value: 'contabilidad_general', text: 'Contabilidad General', esquema: '038', creditos: 4 },
                { value: 'gestion_procesos', text: 'Gestión de Procesos', esquema: '132', creditos: 4 },
                { value: 'ing_administrativa', text: 'Ingeniería Administrativa', esquema: '132', creditos: 4 },
                { value: 'sistemas_operativos', text: 'Sistemas Operativos y Plataformas', esquema: '129', creditos: 4 },
                { value: 'teoria_bd', text: 'Teoría y Diseño de Base de Datos', esquema: '043', creditos: 4 }
            ],
            'ciclo6': [
                { value: 'ing_costos', text: 'Ingeniería de Costos', esquema: '038', creditos: 4 },
                { value: 'ing_software1', text: 'Ingeniería de Software I', esquema: '128', creditos: 4 },
                { value: 'inv_operativa', text: 'Investigación Operativa', esquema: '038', creditos: 4 },
                { value: 'programacion1', text: 'Programación I', esquema: '046', creditos: 4 },
                { value: 'teoria_sistemas', text: 'Teoría General de Sistemas (Proximamente...)', esquema: '046', creditos: 4 },
            ]
        }
    },
    'ingCivil': {
        nombre: 'Ingeniería Civil',
        ciclos: {
            'ciclo1': [
                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 4 },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 4 },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 4 },
                { value: 'filosofia', text: 'Filosofía', esquema: '045', creditos: 4 },
                { value: 'geom_analitica', text: 'Geometría Analítica', esquema: '040', creditos: 4 },
                { value: 'mate_discreta', text: 'Matemática Discreta', esquema: '040', creditos: 4 },
                { value: 'intro_ing', text: 'Introducción a la Ingeniería(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 4 }
            ],
            'ciclo2': [
                { value: 'ingles2', text: 'Inglés II', esquema: '039', creditos: 4 },
                { value: 'calculo1', text: 'Cálculo I', esquema: '040', creditos: 4 },
                { value: 'algebra_lineal', text: 'Álgebra Lineal', esquema: '040', creditos: 4 },
                { value: 'diseño_grafico', text: 'Dibujo y Diseño Gráfico(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'intro_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 4 },
                { value: 'topografia', text: 'Topografía(Proximamente...)', esquema: '128', creditos: 4 },
                { value: 'geologia_general', text: 'Geología General(Proximamente...)', esquema: '128', creditos: 4 },
            ],
            'ciclo3': [
                { value: 'calculo2', text: 'Calculo II', esquema: '040', creditos: 4 },
                { value: 'est1', text: 'Estadística y Probabilidades I', esquema: '041', creditos: 4 },
                { value: 'fis1', text: 'Física I', esquema: '042', creditos: 4 },
                { value: 'quimicage', text: 'Química General', esquema: '043', creditos: 4 },
                { value: 'tecnologia_materiales', text: 'Tecnología de los materiales', esquema: '046', creditos: 4 },
                { value: 'topoavanzada', text: 'Topografía Avanzada', esquema: '045', creditos: 4 }],
            'ciclo4': [
                { value: 'dinamica_civil', text: 'Dinámica', esquema: '045', creditos: 4 },
                { value: 'tec_concreto', text: 'Tecnología del Concreto', esquema: '045', creditos: 4 },
                { value: 'estatica', text: 'Estática', esquema: '049', creditos: 4 },
                { value: 'construccion1_civil', text: 'Construcción 1', esquema: '045', creditos: 4 },
                { value: 'ec_diferenciales_civil', text: 'Ecuaciones Diferenciales', esquema: '040', creditos: 4 },
                { value: 'fis2', text: 'Física 2', esquema: '042', creditos: 4 },
            ],
            'ciclo5': [
                { value: 'contabilidad_general', text: 'Contabilidad General', esquema: '038', creditos: 4 },
                { value: 'construccion2_civil', text: 'Construcción II(Proximamente...)', esquema: '046', creditos: 4 },
                { value: 'caminos1', text: 'Caminos I(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'resistencia_materiales1', text: 'Resistencia de Materiales I(Proximamente...)', esquema: '129', creditos: 4 },
                { value: 'ecologia_impacto', text: 'Ecología e Impacto Ambiental(Proximamente...)', esquema: '043', creditos: 4 },
                { value: 'instalaciones_electricas', text: 'Instalaciones Eléctricas en Edificaciones(Proximamente...)', esquema: '042', creditos: 4 },
            ],
            'ciclo6': [
                { value: 'mecanica_fluidos1', text: 'Mecánica de Fluidos I(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'pavimentos', text: 'Pavimentos(Proximamente...)', esquema: '128', creditos: 4 },
                { value: 'gestion_financiera', text: 'Gestión Financiera(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'mecanica_suelos1', text: 'Mecánica de Suelos I(Proximamente...)', esquema: '046', creditos: 4 },
                { value: 'resistencia_materiales2', text: 'Resistencia de Materiales II(Proximamente...)', esquema: '046', creditos: 4 },
            ]
        }
    },
    'ingIndustrial': {
        nombre: 'Ingeniería Industrial',
        ciclos: {
            'ciclo1': [
                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 4 },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 4 },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 4 },
                { value: 'filosofia', text: 'Filosofía', esquema: '045', creditos: 4 },
                { value: 'geom_analitica', text: 'Geometría Analítica', esquema: '040', creditos: 4 },
                { value: 'mate_discreta', text: 'Matemática Discreta', esquema: '040', creditos: 4 },
                { value: 'intro_ing', text: 'Introducción a la Ingeniería(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 4 }
            ],
            'ciclo2': [
                { value: 'ingles2', text: 'Inglés II', esquema: '039', creditos: 4 },
                { value: 'calculo1', text: 'Cálculo I', esquema: '040', creditos: 4 },
                { value: 'algebra_lineal', text: 'Álgebra Lineal', esquema: '040', creditos: 4 },
                { value: 'diseño_grafico', text: 'Dibujo y Diseño Gráfico(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'intro_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 4 },
                { value: 'intro_programacion', text: 'Introducción a la Programación(Proximamente...)', esquema: '128', creditos: 4 }
            ],
            'ciclo3': [
                { value: 'calculo2', text: 'Calculo II', esquema: '040', creditos: 4 },
                { value: 'quimica_industrial', text: 'Química Industrial(Falta Añadir EO)', esquema: '130', creditos: 4 },
                { value: 'fis1', text: 'Física I', esquema: '042', creditos: 4 },
                { value: 'micro', text: 'Microeconomía', esquema: '054', creditos: 4 },
                { value: 'dis_ind_com', text: 'Diseño Industrial por Computador', esquema: '038', creditos: 4 },
                { value: 'discapacidad_inclusion', text: 'Discapacidad e Inclusión(Proximamente...)', esquema: '045', creditos: 4 }
            ], 'ciclo4': [
                { value: 'alg1', text: 'Algoritmos y Estructura de Datos I(Proximamente...)', esquema: '128', creditos: 4 },
                { value: 'est1', text: 'Estadística y Probabilidades I', esquema: '041', creditos: 4 },
                { value: 'fis2', text: 'Física II', esquema: '042', creditos: 4 },
                { value: 'ec_diferenciales_civil', text: 'Ecuaciones Diferenciales', esquema: '040', creditos: 4 },
                { value: 'materiales_ingenieria', text: 'Materiales de Ingeniería(Proximamente...)', esquema: '046', creditos: 4 },
            ], 'ciclo5': [
                { value: 'est2', text: 'Estadística y Probabilidades II', esquema: '041', creditos: 4 },
                { value: 'contabilidad_general', text: 'Contabilidad General', esquema: '038', creditos: 4 },
                { value: 'ing_administrativa', text: 'Ingeniería Administrativa', esquema: '132', creditos: 4 },
                { value: 'ing_electrica', text: 'Ingeniería Eléctrica y Electrónica', esquema: '047', creditos: 5 },
                { value: 'mecanica_materiales', text: 'Mecánica de Materiales', esquema: '128', creditos: 5 },
            ],
            'ciclo6': [
                { value: 'ing_costos', text: 'Ingeniería de Costos', esquema: '038', creditos: 4 },
                { value: 'ing_mtodos1', text: 'Ingeniería de Métodos I', esquema: '038', creditos: 4 },
                { value: 'gestion_procesos', text: 'Gestión de Procesos', esquema: '132', creditos: 4 },
                { value: 'investigacion_operativa1', text: 'Investigación Operativa I', esquema: '038', creditos: 4 },
                { value: 'proceso_manufactura', text: 'Proceso de Manufactura', esquema: '047', creditos: 4 },
                { value: 'taller_herramientas', text: 'Taller de Herramientas Informáticas', esquema: '133', creditos: 2 },
            ]
        }
    },
    'arquitectura': {
        nombre: 'Arquitectura',
        ciclos: {
            'ciclo1': [
                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 4 },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 4 },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 4 },
                { value: 'taller1', text: 'Taller I(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'matematica1', text: 'Matemática I(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'exp_arq1', text: 'Expresión Arquitectónica I(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 4 },
            ], 'ciclo2': [
                { value: 'geom_des', text: 'Geometría Descriptiva(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'matematica2', text: 'Matemática II(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'taller2', text: 'Taller II(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'exp_arq2', text: 'Expresión Arquitectónica II(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'topografia', text: 'Topografía(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'ingles2', text: 'Inglés 2', esquema: '039', creditos: 4 },
            ], 'ciclo3': [
                { value: 'const1', text: 'Construcción 1(Proximamente...)', esquema: '129', creditos: 4 },
                { value: 'exp_arq3', text: 'Expresión Arquitectónica 3(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'estruc1_arq', text: 'Estructuras 1(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'taller3_arq', text: 'Taller 3(Proximamente...)', esquema: '127', creditos: 4 },
                { value: 'fisica1', text: 'Física General I(Proximamente...)', esquema: '038', creditos: 4 },
            ],
            'ciclo4': [
                { value: 'const2', text: 'Construcción 2', esquema: '129', creditos: 4 },
                { value: 'exp_arq4', text: 'Expresión Arquitectónica 4', esquema: '038', creditos: 4 },
                { value: 'estruc2_arq', text: 'Estructuras 2', esquema: '038', creditos: 4 },
                { value: 'taller4_arq', text: 'Taller 4', esquema: '127', creditos: 4 },
                { value: 'foto_arq', text: 'Fotografía', esquema: '038', creditos: 4 },
                { value: 'percep_arte', text: 'Percepción del Arte y la Arquitectura', esquema: '038', creditos: 4 }
            ],
            'ciclo5': [
                { value: 'const3', text: 'Construcción 3(Proximamente...)', esquema: '129', creditos: 4 },
                { value: 'urb1', text: 'Urbanismo I(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'bio1', text: 'Diseño Bioclimático I(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'taller5_arq', text: 'Taller 5(Proximamente...)', esquema: '127', creditos: 4 },
                { value: 'hist1', text: 'Historia de la Arquitectura I(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'discapacidad_inclusion', text: 'Discapacidad e Inclusión(Proximamente...)', esquema: '038', creditos: 4 }
            ], 'ciclo6': [
                { value: 'inst_sanitarias', text: 'Instalaciones Sanitarias y Electromecánicas(Proximamente...)', esquema: '129', creditos: 4 },
                { value: 'urb2  ', text: 'Urbanismo II(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'bio2', text: 'Diseño Bioclimático II(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'taller6_arq', text: 'Taller 6(Proximamente...)', esquema: '127', creditos: 4 },
                { value: 'hist2', text: 'Historia de la Arquitectura II(Proximamente...)', esquema: '038', creditos: 4 },
                { value: 'liderazgo_oratoria', text: 'Liderazgo y Oratoria(Proximamente...)', esquema: '038', creditos: 4 }
            ]
        }
    },
    'aeronautica': {
        nombre: 'Ciencias Aeronáuticas',
        ciclos: {
            'ciclo1': [
                { value: 'fisica1', text: 'Física General I(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'matematica1', text: 'Matemática I(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'metodos_est', text: 'Métodos de Estudio(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'realidad_nacional', text: 'Realidad Nacional(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'introduccion_aviacion', text: 'Introducción a la Aviación(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'metereologia1', text: 'Metereología I(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 4 },
                { value: 'lenguaje', text: 'Lenguaje(Proximamente...)', esquema: '039', creditos: 4 },
                { value: 'regulaciones_1', text: 'Regulaciones Aéreas I(Proximamente...)', esquema: '039', creditos: 4 },
            ], 'ciclo2': [
                { value: 'fisica2', text: 'Física General II(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'matematica2', text: 'Matemática II(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'operaciones_piloto_privado', text: 'Operaciones de Piloto Privado(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'aerodinamica', text: 'Aerodinámica(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'factores_humanos_aviacion', text: 'Factores Humanos en Aviación(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'performance_aeronaves1', text: 'Performance de Aeronaves I(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'ingles2', text: 'Inglés 2', esquema: '039', creditos: 4 },
            ], 'ciclo3': [
                { value: 'navegacion_domestica_internacional', text: 'Navegación Doméstica e Internacional(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'sistemas_y_componentes_aeronaves', text: 'Sistemas y Componentes de Aeronaves(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'administracion', text: 'Administración(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'mercancias_peligrosas', text: 'Mercancías Peligrosas(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'etica', text: 'Ética(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'metereologia2', text: 'Metereología II(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'performance_aeronaves2', text: 'Performance de Aeronaves II(Proximamente...)', esquema: '039', creditos: 4 },
                { value: 'regulaciones_2', text: 'Regulaciones Aéreas II(Proximamente...)', esquema: '039', creditos: 4 },
            ], 'ciclo4': [
                { value: 'estadistica_probabilidades', text: 'Estadística y Probabilidades(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'motores_aeronaves', text: 'Motores de Aeronaves', esquema: '038', creditos: 4 },
                { value: 'fisiologia_vuelo', text: 'Fisiología de Vuelo(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'introduccion_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 4 },
                { value: 'planeamiento_carrera', text: 'Planeamiento de Carrera', esquema: '045', creditos: 4 },
                { value: 'liderazgo_profesionalizacion', text: 'Liderazgo y Profesionalización', esquema: '038', creditos: 4 },
                { value: 'teoria_vuelo_instrumental', text: 'Teoría de Vuelo Instrumental', esquema: '038', creditos: 4 },
            ], 'ciclo5': [
                { value: 'administracion_logistica', text: 'Administración Logística(Proximamente...)', esquema: '049', creditos: 4 },
                { value: 'contabilidad_general', text: 'Contabilidad General(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'mercadotecnia', text: 'Mercadotecnia(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'comportamiento_organizacional', text: 'Comportamiento Organizacional en Aviación(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'operaciones_piloto_comercial', text: 'Operaciones de Piloto Comercial(Proximamente...)', esquema: '039', creditos: 4 },
            ], 'ciclo6': [
                { value: 'administracion_operaciones', text: 'Administración de Operaciones(Proximamente...)', esquema: '039', creditos: 4 },
                { value: 'investigacion_mercados', text: 'Investigación de Mercados(Proximamente...)', esquema: '045', creditos: 4 },
                { value: 'operaciones_despacho_aereo', text: 'Operaciones de Despacho Aéreo(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'costos_presupuestos', text: 'Costos y Presupuestos(Proximamente...)', esquema: '040', creditos: 4 },
                { value: 'sms_i', text: 'Sistema de Gestión de Seguridad Operacional I (SMS-I)(Proximamente...)', esquema: '039', creditos: 4 },
            ]
        }
    }
};
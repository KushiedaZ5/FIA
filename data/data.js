const dataCarreras = {
    'ingSistemas': {
        nombre: 'Ingeniería de Computación y Sistemas',
        ciclos: {
            'ciclo1': [

                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 2, clave: 'CI' },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 2, clave: 'LEN' },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 2, clave: 'ME' },
                { value: 'filosofia', text: 'Filosofía', esquema: '045', creditos: 3, clave: 'FIL' },
                { value: 'geom_analitica', text: 'Geometría Analítica', esquema: '040', creditos: 4, clave: 'GA' },
                { value: 'mate_discreta', text: 'Matemática Discreta', esquema: '040', creditos: 5, clave: 'MD' },
                { value: 'intro_sis_info', text: 'Introducción a Sistemas de Información', esquema: '045', creditos: 2, clave: 'ISI' },
                { value: 'actividades1', text: 'Actividades 1', esquema: '038', creditos: 1, clave: 'ACT1' },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 1, clave: 'ING1' },
            ],
            'ciclo2': [

                { value: 'ingles2', text: 'Inglés II', esquema: '039', creditos: 1, clave: 'ING2' },
                { value: 'calculo1', text: 'Cálculo I', esquema: '040', creditos: 5, clave: 'C1' },
                { value: 'algebra_lineal', text: 'Álgebra Lineal', esquema: '040', creditos: 5, clave: 'AL' },
                { value: 'fund_diseno_web', text: 'Fundamentos del Diseño Web', esquema: '045', creditos: 3, clave: 'FDW' },
                { value: 'intro_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 3, clave: 'IE' },
                { value: 'actividades2', text: 'Actividades 2', esquema: '038', creditos: 1, clave: 'ACT2' },
                { value: 'intro_programacion', text: 'Introducción a la Programación', esquema: '128', creditos: 5, clave: 'IP' },
            ],
            'ciclo3': [
                { value: 'alg1', text: 'Algoritmos y Estructura de Datos I', esquema: '128', creditos: 5, clave: 'AED1' },
                { value: 'fis1', text: 'Física I', esquema: '042', creditos: 5, clave: 'F1' },
                { value: 'ti1', text: 'Tecnología de Información I', esquema: '046', creditos: 5, clave: 'TI1' },
                { value: 'est1', text: 'Estadística y Probabilidades I', esquema: '041', creditos: 4, clave: 'EST1' },
                { value: 'sis_info', text: 'Sistemas de Información', esquema: '038', creditos: 3, clave: 'SI' }
            ],
            'ciclo4': [
                { value: 'est2', text: 'Estadística 2', esquema: '041', creditos: 4, clave: 'EST2' },
                { value: 'ti2', text: 'Tecnología de Información 2', esquema: '046', creditos: 4, clave: 'TI2' },
                { value: 'fis2_castro', text: 'Física 2 - Prof. Castro', esquema: '042', creditos: 5, clave: 'F2C' },
                { value: 'fis2_tejada', text: 'Física 2 - Prof. Tejada', esquema: '042', creditos: 5, clave: 'F2T' },
                { value: 'alg2', text: 'Algoritmos 2', esquema: '047', creditos: 5, clave: 'AED2' },
                { value: 'micro', text: 'Microeconomía', esquema: '054', creditos: 4, clave: 'MICRO' }
            ],
            'ciclo5': [
                { value: 'contabilidad_general', text: 'Contabilidad General', esquema: '038', creditos: 4, clave: 'CG' },
                { value: 'gestion_procesos', text: 'Gestión de Procesos', esquema: '132', creditos: 5, clave: 'GP' },
                { value: 'ing_administrativa', text: 'Ingeniería Administrativa', esquema: '132', creditos: 4, clave: 'IA' },
                { value: 'sistemas_operativos', text: 'Sistemas Operativos y Plataformas', esquema: '129', creditos: 4, clave: 'SOP' },
                { value: 'teoria_bd', text: 'Teoría y Diseño de Base de Datos', esquema: '043', creditos: 5, clave: 'TBD' }
            ],
            'ciclo6': [
                { value: 'ing_costos', text: 'Ingeniería de Costos', esquema: '038', creditos: 4, clave: 'ICO' },
                { value: 'ing_software1', text: 'Ingeniería de Software I', esquema: '128', creditos: 5, clave: 'IS1' },
                { value: 'inv_operativa', text: 'Investigación Operativa', esquema: '038', creditos: 4, clave: 'IO' },
                { value: 'programacion1', text: 'Programación I', esquema: '046', creditos: 5, clave: 'PROG1' },
                { value: 'teoria_sistemas', text: 'Teoría General de Sistemas (Proximamente...)', esquema: '046', creditos: 4, clave: 'TGS' },
            ]
        }
    },
    'ingCivil': {
        nombre: 'Ingeniería Civil',
        ciclos: {
            'ciclo1': [
                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 2, clave: 'CI' },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 2, clave: 'LEN' },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 2, clave: 'ME' },
                { value: 'filosofia', text: 'Filosofía', esquema: '045', creditos: 3, clave: 'FIL' },
                { value: 'geom_analitica', text: 'Geometría Analítica', esquema: '040', creditos: 4, clave: 'GA' },
                { value: 'mate_discreta', text: 'Matemática Discreta', esquema: '040', creditos: 5, clave: 'MD' },
                { value: 'intro_ing', text: 'Introducción a la Ingeniería(Proximamente...)', esquema: '045', creditos: 2, clave: 'II' },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 1, clave: 'ING1' }
            ],
            'ciclo2': [
                { value: 'ingles2', text: 'Inglés II', esquema: '039', creditos: 1, clave: 'ING2' },
                { value: 'calculo1', text: 'Cálculo I', esquema: '040', creditos: 5, clave: 'C1' },
                { value: 'algebra_lineal', text: 'Álgebra Lineal', esquema: '040', creditos: 5, clave: 'AL' },
                { value: 'diseño_grafico', text: 'Dibujo y Diseño Gráfico(Proximamente...)', esquema: '045', creditos: 3, clave: 'DDG' },
                { value: 'intro_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 3, clave: 'IE' },
                { value: 'topografia', text: 'Topografía(Proximamente...)', esquema: '128', creditos: 3, clave: 'TOPO' },
                { value: 'geologia_general', text: 'Geología General(Proximamente...)', esquema: '128', creditos: 2, clave: 'GG' },
            ],
            'ciclo3': [
                { value: 'calculo2', text: 'Calculo II', esquema: '040', creditos: 5, clave: 'C2' },
                { value: 'est1', text: 'Estadística y Probabilidades I', esquema: '041', creditos: 4, clave: 'EST1' },
                { value: 'fis1', text: 'Física I', esquema: '042', creditos: 5, clave: 'F1' },
                { value: 'quimicage', text: 'Química General', esquema: '043', creditos: 3, clave: 'QG' },
                { value: 'tecnologia_materiales', text: 'Tecnología de los materiales', esquema: '046', creditos: 3, clave: 'TM' },
                { value: 'topoavanzada', text: 'Topografía Avanzada', esquema: '045', creditos: 2, clave: 'TOPOA' }],
            'ciclo4': [
                { value: 'dinamica_civil', text: 'Dinámica', esquema: '045', creditos: 3, clave: 'DIN' },
                { value: 'tec_concreto', text: 'Tecnología del Concreto', esquema: '045', creditos: 3, clave: 'TC' },
                { value: 'estatica', text: 'Estática', esquema: '049', creditos: 4, clave: 'ESTA' },
                { value: 'construccion1_civil', text: 'Construcción 1', esquema: '045', creditos: 3, clave: 'CON1' },
                { value: 'ec_diferenciales_civil', text: 'Ecuaciones Diferenciales', esquema: '040', creditos: 4, clave: 'ED' },
                { value: 'fis2_castro', text: 'Física 2 - Prof. Castro', esquema: '042', creditos: 5, clave: 'F2C' },
                { value: 'fis2_tejada', text: 'Física 2 - Prof. Tejada', esquema: '042', creditos: 5, clave: 'F2T' },
            ],
            'ciclo5': [
                { value: 'contabilidad_general', text: 'Contabilidad General', esquema: '038', creditos: 4, clave: 'CG' },
                { value: 'construccion2_civil', text: 'Construcción II(Proximamente...)', esquema: '046', creditos: 4, clave: 'CON2' },
                { value: 'caminos1', text: 'Caminos I(Proximamente...)', esquema: '045', creditos: 4, clave: 'CAM1' },
                { value: 'resistencia_materiales1', text: 'Resistencia de Materiales I(Proximamente...)', esquema: '129', creditos: 5, clave: 'RM1' },
                { value: 'ecologia_impacto', text: 'Ecología e Impacto Ambiental(Proximamente...)', esquema: '043', creditos: 3, clave: 'EIA' },
                { value: 'instalaciones_electricas', text: 'Instalaciones Eléctricas en Edificaciones(Proximamente...)', esquema: '042', creditos: 2, clave: 'IEE' },
            ],
            'ciclo6': [
                { value: 'mecanica_fluidos1', text: 'Mecánica de Fluidos I(Proximamente...)', esquema: '038', creditos: 5, clave: 'MF1' },
                { value: 'pavimentos', text: 'Pavimentos(Proximamente...)', esquema: '128', creditos: 5, clave: 'PAV' },
                { value: 'gestion_financiera', text: 'Gestión Financiera(Proximamente...)', esquema: '038', creditos: 4, clave: 'GF' },
                { value: 'mecanica_suelos1', text: 'Mecánica de Suelos I(Proximamente...)', esquema: '046', creditos: 4, clave: 'MS1' },
                { value: 'resistencia_materiales2', text: 'Resistencia de Materiales II(Proximamente...)', esquema: '046', creditos: 4, clave: 'RM2' },
            ]
        }
    },
    'ingIndustrial': {
        nombre: 'Ingeniería Industrial',
        ciclos: {
            'ciclo1': [
                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 2, clave: 'CI' },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 2, clave: 'LEN' },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 2, clave: 'ME' },
                { value: 'filosofia', text: 'Filosofía', esquema: '045', creditos: 3, clave: 'FIL' },
                { value: 'geom_analitica', text: 'Geometría Analítica', esquema: '040', creditos: 4, clave: 'GA' },
                { value: 'mate_discreta', text: 'Matemática Discreta', esquema: '040', creditos: 5, clave: 'MD' },
                { value: 'intro_ing', text: 'Introducción a la Ingeniería(Proximamente...)', esquema: '045', creditos: 2, clave: 'II' },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 1, clave: 'ING1' }
            ],
            'ciclo2': [
                { value: 'ingles2', text: 'Inglés II', esquema: '039', creditos: 1, clave: 'ING2' },
                { value: 'calculo1', text: 'Cálculo I', esquema: '040', creditos: 5, clave: 'C1' },
                { value: 'algebra_lineal', text: 'Álgebra Lineal', esquema: '040', creditos: 5, clave: 'AL' },
                { value: 'diseño_grafico', text: 'Dibujo y Diseño Gráfico(Proximamente...)', esquema: '045', creditos: 3, clave: 'DDG' },
                { value: 'intro_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 3, clave: 'IE' },
                { value: 'intro_programacion', text: 'Introducción a la Programación(Proximamente...)', esquema: '128', creditos: 5, clave: 'IP' }
            ],
            'ciclo3': [
                { value: 'calculo2', text: 'Calculo II', esquema: '040', creditos: 5, clave: 'C2' },
                { value: 'quimica_industrial', text: 'Química Industrial', esquema: '130', creditos: 5, clave: 'QI' },
                { value: 'fis1', text: 'Física I', esquema: '042', creditos: 5, clave: 'F1' },
                { value: 'micro', text: 'Microeconomía', esquema: '054', creditos: 4, clave: 'MICRO' },
                { value: 'dis_ind_com', text: 'Diseño Industrial por Computador', esquema: '038', creditos: 3, clave: 'DIC' },
                { value: 'discapacidad_inclusion', text: 'Discapacidad e Inclusión(Proximamente...)', esquema: '045', creditos: 3, clave: 'DI' }
            ], 'ciclo4': [
                { value: 'alg1', text: 'Algoritmos y Estructura de Datos I(Proximamente...)', esquema: '128', creditos: 5, clave: 'AED1' },
                { value: 'est1', text: 'Estadística y Probabilidades I', esquema: '041', creditos: 4, clave: 'EST1' },
                { value: 'fis2_castro', text: 'Física 2 - Prof. Castro', esquema: '042', creditos: 5, clave: 'F2C' },
                { value: 'fis2_tejada', text: 'Física 2 - Prof. Tejada', esquema: '042', creditos: 5, clave: 'F2T' },
                { value: 'ec_diferenciales_civil', text: 'Ecuaciones Diferenciales', esquema: '040', creditos: 4, clave: 'ED' },
                { value: 'materiales_ingenieria', text: 'Materiales de Ingeniería(Proximamente...)', esquema: '046', creditos: 4, clave: 'MI' },
            ], 'ciclo5': [
                { value: 'est2', text: 'Estadística y Probabilidades II', esquema: '041', creditos: 4, clave: 'EST2' },
                { value: 'contabilidad_general', text: 'Contabilidad General', esquema: '038', creditos: 4, clave: 'CG' },
                { value: 'ing_administrativa', text: 'Ingeniería Administrativa', esquema: '132', creditos: 4, clave: 'IA' },
                { value: 'ing_electrica', text: 'Ingeniería Eléctrica y Electrónica', esquema: '047', creditos: 5, clave: 'IEE' },
                { value: 'mecanica_materiales', text: 'Mecánica de Materiales', esquema: '128', creditos: 5, clave: 'MM' },
            ],
            'ciclo6': [
                { value: 'ing_costos', text: 'Ingeniería de Costos', esquema: '038', creditos: 4, clave: 'ICO' },
                { value: 'ing_mtodos1', text: 'Ingeniería de Métodos I', esquema: '038', creditos: 4, clave: 'IM1' },
                { value: 'gestion_procesos', text: 'Gestión de Procesos', esquema: '132', creditos: 4, clave: 'GP' },
                { value: 'investigacion_operativa1', text: 'Investigación Operativa I', esquema: '038', creditos: 4, clave: 'IO1' },
                { value: 'proceso_manufactura', text: 'Proceso de Manufactura', esquema: '047', creditos: 4, clave: 'PM' },
                { value: 'taller_herramientas', text: 'Taller de Herramientas Informáticas', esquema: '133', creditos: 2, clave: 'THI' },
            ]
        }
    },
    'arquitectura': {
        nombre: 'Arquitectura',
        ciclos: {
            'ciclo1': [
                { value: 'ciu_int', text: 'Ciudadanía Intercultural', esquema: '049', creditos: 2, clave: 'CI' },
                { value: 'lenguaje', text: 'Lenguaje', esquema: '049', creditos: 2, clave: 'LEN' },
                { value: 'metodos_est', text: 'Métodos de Estudio', esquema: '049', creditos: 2, clave: 'ME' },
                { value: 'taller1', text: 'Taller I(Proximamente...)', esquema: '045', creditos: 7, clave: 'T1' },
                { value: 'matematica1', text: 'Matemática I(Proximamente...)', esquema: '040', creditos: 4, clave: 'MAT1' },
                { value: 'exp_arq1', text: 'Expresión Arquitectónica I(Proximamente...)', esquema: '040', creditos: 3, clave: 'EA1' },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 1, clave: 'ING1' },
            ], 'ciclo2': [
                { value: 'geom_des', text: 'Geometría Descriptiva(Proximamente...)', esquema: '049', creditos: 4, clave: 'GD' },
                { value: 'matematica2', text: 'Matemática II(Proximamente...)', esquema: '049', creditos: 4, clave: 'MAT2' },
                { value: 'taller2', text: 'Taller II(Proximamente...)', esquema: '045', creditos: 7, clave: 'T2' },
                { value: 'exp_arq2', text: 'Expresión Arquitectónica II(Proximamente...)', esquema: '040', creditos: 3, clave: 'EA2' },
                { value: 'topografia', text: 'Topografía(Proximamente...)', esquema: '040', creditos: 3, clave: 'TOPO' },
                { value: 'ingles2', text: 'Inglés 2', esquema: '039', creditos: 1, clave: 'ING2' },
            ], 'ciclo3': [
                { value: 'const1', text: 'Construcción 1(Proximamente...)', esquema: '129', creditos: 4, clave: 'CON1' },
                { value: 'exp_arq3', text: 'Expresión Arquitectónica 3', esquema: '038', creditos: 3, clave: 'EA3' },
                { value: 'estruc1_arq', text: 'Estructuras 1(Proximamente...)', esquema: '038', creditos: 3, clave: 'ESTR1' },
                { value: 'taller3_arq', text: 'Taller 3', esquema: '127', creditos: 8, clave: 'T3' },
                { value: 'fisica1', text: 'Física General I', esquema: '040', creditos: 4, clave: 'F1' },
            ],
            'ciclo4': [
                { value: 'const2', text: 'Construcción 2', esquema: '129', creditos: 4, clave: 'CON2' },
                { value: 'exp_arq4', text: 'Expresión Arquitectónica 4', esquema: '038', creditos: 3, clave: 'EA4' },
                { value: 'estruc2_arq', text: 'Estructuras 2', esquema: '038', creditos: 3, clave: 'ESTR2' },
                { value: 'taller4_arq', text: 'Taller 4', esquema: '127', creditos: 8, clave: 'T4' },
                { value: 'foto_arq', text: 'Fotografía', esquema: '038', creditos: 2, clave: 'FOTO' },
                { value: 'percep_arte', text: 'Percepción del Arte y la Arquitectura', esquema: '038', creditos: 2, clave: 'PAA' }
            ],
            'ciclo5': [
                { value: 'const3', text: 'Construcción 3', esquema: '129', creditos: 4, clave: 'CON3' },
                { value: 'urb1', text: 'Urbanismo I', esquema: '127', creditos: 4, clave: 'URB1' },
                { value: 'bio1', text: 'Diseño Bioclimático I', esquema: '038', creditos: 3, clave: 'DB1' },
                { value: 'taller5_arq', text: 'Taller 5', esquema: '127', creditos: 8, clave: 'T5' },
                { value: 'hist1', text: 'Historia de la Arquitectura I', esquema: '038', creditos: 3, clave: 'HA1' },
                { value: 'discapacidad_inclusion', text: 'Discapacidad e Inclusión(Proximamente...)', esquema: '038', creditos: 1, clave: 'DI' }
            ], 'ciclo6': [
                { value: 'inst_sanitarias', text: 'Instalaciones Sanitarias y Electromecánicas(Proximamente...)', esquema: '129', creditos: 3, clave: 'ISE' },
                { value: 'urb2', text: 'Urbanismo II(Proximamente...)', esquema: '038', creditos: 4, clave: 'URB2' },
                { value: 'bio2', text: 'Diseño Bioclimático II(Proximamente...)', esquema: '038', creditos: 3, clave: 'DB2' },
                { value: 'taller6_arq', text: 'Taller 6(Proximamente...)', esquema: '127', creditos: 8, clave: 'T6' },
                { value: 'hist2', text: 'Historia de la Arquitectura II(Proximamente...)', esquema: '038', creditos: 3, clave: 'HA2' },
                { value: 'liderazgo_oratoria', text: 'Liderazgo y Oratoria(Proximamente...)', esquema: '038', creditos: 2, clave: 'LO' }
            ]
        }
    },
    'aeronautica': {
        nombre: 'Ciencias Aeronáuticas',
        ciclos: {
            'ciclo1': [
                { value: 'fisica1', text: 'Física General I(Proximamente...)', esquema: '040', creditos: 4, clave: 'F1A' },
                { value: 'matematica1', text: 'Matemática I(Proximamente...)', esquema: '041', creditos: 4, clave: 'MAT1A' },
                { value: 'metodos_est', text: 'Métodos de Estudio(Proximamente...)', esquema: '049', creditos: 2, clave: 'ME' },
                { value: 'realidad_nacional', text: 'Realidad Nacional(Proximamente...)', esquema: '045', creditos: 3, clave: 'RN' },
                { value: 'introduccion_aviacion', text: 'Introducción a la Aviación(Proximamente...)', esquema: '040', creditos: 2, clave: 'IAV' },
                { value: 'metereologia1', text: 'Metereología I(Proximamente...)', esquema: '040', creditos: 2, clave: 'MET1' },
                { value: 'ingles1', text: 'Inglés 1', esquema: '039', creditos: 1, clave: 'ING1' },
                { value: 'lenguaje', text: 'Lenguaje(Proximamente...)', esquema: '039', creditos: 2, clave: 'LEN' },
                { value: 'regulaciones_1', text: 'Regulaciones Aéreas I(Proximamente...)', esquema: '039', creditos: 2, clave: 'RA1' },
            ], 'ciclo2': [
                { value: 'fisica2', text: 'Física General II', esquema: '040', creditos: 4, clave: 'F2A' },
                { value: 'matematica2', text: 'Matemática II', esquema: '041', creditos: 4, clave: 'MAT2A' },
                { value: 'operaciones_piloto_privado', text: 'Operaciones de Piloto Privado', esquema: '055', creditos: 5, clave: 'OPP' },
                { value: 'aerodinamica', text: 'Aerodinámica', esquema: '038', creditos: 4, clave: 'AERO' },
                { value: 'factores_humanos_aviacion', text: 'Factores Humanos en Aviación', esquema: '045', creditos: 2, clave: 'FHA' },
                { value: 'performance_aeronaves1', text: 'Performance de Aeronaves I', esquema: '045', creditos: 2, clave: 'PA1' },
                { value: 'ingles2', text: 'Inglés 2', esquema: '039', creditos: 1, clave: 'ING2' },
            ], 'ciclo3': [
                { value: 'navegacion_domestica_internacional', text: 'Navegación Doméstica e Internacional', esquema: '045', creditos: 4, clave: 'NDI' },
                { value: 'sistemas_y_componentes_aeronaves', text: 'Sistemas y Componentes de Aeronaves', esquema: '038', creditos: 4, clave: 'SCA' },
                { value: 'administracion', text: 'Administración(Proximamente...)', esquema: '049', creditos: 3, clave: 'ADM' },
                { value: 'mercancias_peligrosas', text: 'Mercancías Peligrosas(Proximamente...)', esquema: '045', creditos: 3, clave: 'MP' },
                { value: 'etica', text: 'Ética(Proximamente...)', esquema: '040', creditos: 2, clave: 'ETI' },
                { value: 'metereologia2', text: 'Metereología II', esquema: '045', creditos: 3, clave: 'MET2' },
                { value: 'performance_aeronaves2', text: 'Performance de Aeronaves II', esquema: '045', creditos: 2, clave: 'PA2' },
                { value: 'regulaciones_2', text: 'Regulaciones Aéreas II(Proximamente...)', esquema: '039', creditos: 2, clave: 'RA2' },
            ], 'ciclo4': [
                { value: 'estadistica_probabilidades', text: 'Estadística y Probabilidades', esquema: '041', creditos: 4, clave: 'EP' },
                { value: 'motores_aeronaves', text: 'Motores de Aeronaves', esquema: '038', creditos: 4, clave: 'MA' },
                { value: 'fisiologia_vuelo', text: 'Fisiología de Vuelo(Proximamente...)', esquema: '049', creditos: 3, clave: 'FV' },
                { value: 'introduccion_economia', text: 'Introducción a la Economía', esquema: '038', creditos: 3, clave: 'IE' },
                { value: 'planeamiento_carrera', text: 'Planeamiento de Carrera', esquema: '045', creditos: 3, clave: 'PC' },
                { value: 'liderazgo_profesionalizacion', text: 'Liderazgo y Profesionalización', esquema: '038', creditos: 2, clave: 'LP' },
                { value: 'teoria_vuelo_instrumental', text: 'Teoría de Vuelo Instrumental', esquema: '038', creditos: 2, clave: 'TVI' },
            ], 'ciclo5': [
                { value: 'administracion_logistica', text: 'Administración Logística', esquema: '045', creditos: 4, clave: 'AL' },
                { value: 'contabilidad_general', text: 'Contabilidad General', esquema: '038', creditos: 4, clave: 'CG' },
                { value: 'mercadotecnia', text: 'Mercadotecnia', esquema: '045', creditos: 4, clave: 'MKT' },
                { value: 'comportamiento_organizacional', text: 'Comportamiento Organizacional en Aviación', esquema: '045', creditos: 3, clave: 'COA' },
                { value: 'operaciones_piloto_comercial', text: 'Operaciones de Piloto Comercial', esquema: '045', creditos: 3, clave: 'OPC' },
            ], 'ciclo6': [
                { value: 'administracion_operaciones', text: 'Administración de Operaciones', esquema: '038', creditos: 4, clave: 'AO' },
                { value: 'investigacion_mercados', text: 'Investigación de Mercados', esquema: '045', creditos: 4, clave: 'IMKT' },
                { value: 'operaciones_despacho_aereo', text: 'Operaciones de Despacho Aéreo', esquema: '045', creditos: 4, clave: 'ODA' },
                { value: 'costos_presupuestos', text: 'Costos y Presupuestos', esquema: '038', creditos: 3, clave: 'CP' },
                { value: 'sms_i', text: 'Sistema de Gestión de Seguridad Operacional I (SMS-I)', esquema: '038', creditos: 3, clave: 'SMS1' },
            ]
        }
    }
};

// Mapeo de tipos de examen para mostrar nombres legibles
const tiposExamen = {
    'PC1': 'Práctica 1',
    'PC2': 'Práctica 2',
    'PC3': 'Práctica 3',
    'PC4': 'Práctica 4',
    'EF': 'Examen Final',
    'EP': 'Examen Parcial',
    'W1': 'Trabajo 1',
    'W2': 'Trabajo 2',
    'W3': 'Trabajo 3',
    'LB1': 'Laboratorio 1',
    'LB2': 'Laboratorio 2',
    'LB3': 'Laboratorio 3',
    'LB4': 'Laboratorio 4',
    'LB5': 'Laboratorio 5',
    'LB6': 'Laboratorio 6',
    'LB7': 'Laboratorio 7'
};

// Mapeo de ciclos académicos para mostrar nombres legibles
const ciclosAcademicos = {
    '202': '2020-2',
    '231': '2023-1',
    '232': '2023-2',
    '241': '2024-1',
    '242': '2024-2',
    '251': '2025-1',
    '252': '2025-2'
};
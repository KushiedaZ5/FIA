/**
 * Componente Alpine.js para la página de selección de cursos
 * cursos-alpine.js
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('cursosApp', () => ({
        carrera: '',
        carreraNombre: '',
        titulo: 'Cargando...',
        cursos: [],
        tiposExamen: {},

        init() {
            // Cargar mapeo de tipos de examen
            this.tiposExamen = typeof tiposExamen !== 'undefined' ? tiposExamen : {
                'PC1': 'Práctica 1',
                'PC2': 'Práctica 2',
                'PC3': 'Práctica 3',
                'PC4': 'Práctica 4',
                'EF': 'Examen Final',
                'EP': 'Examen Parcial',
                'W1': 'Trabajo 1',
                'LB1': 'Lab 1'
            };

            // Obtener parámetro de URL
            const urlParams = new URLSearchParams(window.location.search);
            this.carrera = urlParams.get('carrera') || '';

            if (!this.carrera || !dataCarreras[this.carrera]) {
                this.titulo = 'Carrera no encontrada';
                this.cursos = [];
                return;
            }

            // Cargar datos de la carrera
            const carreraData = dataCarreras[this.carrera];
            this.carreraNombre = carreraData.nombre;
            this.titulo = `Selecciona un Curso de ${this.carreraNombre}`;

            // Actualizar título de la página
            document.title = `Cursos - ${this.carreraNombre} - Exámenes FIA USMP`;

            // Construir lista de cursos con sus exámenes disponibles
            this.cursos = this.buildCursosList(carreraData.ciclos);
        },

        /**
         * Construye la lista de cursos con información de exámenes disponibles
         */
        buildCursosList(ciclos) {
            const cursosList = [];
            const cicloNumeros = {
                'ciclo1': 1,
                'ciclo2': 2,
                'ciclo3': 3,
                'ciclo4': 4,
                'ciclo5': 5,
                'ciclo6': 6,
                'ciclo7': 7,
                'ciclo8': 8,
                'ciclo9': 9,
                'ciclo10': 10
            };

            for (const [cicloKey, cursosCiclo] of Object.entries(ciclos)) {
                const cicloNum = cicloNumeros[cicloKey] || parseInt(cicloKey.replace('ciclo', ''));

                for (const curso of cursosCiclo) {
                    // Obtener tipos de examen disponibles para este curso
                    const tiposDisponibles = this.getTiposDisponibles(curso.clave);

                    cursosList.push({
                        value: curso.value,
                        text: curso.text.replace('(Proximamente...)', '').trim(),
                        clave: curso.clave || '???',
                        ciclo: cicloNum,
                        esquema: curso.esquema,
                        creditos: curso.creditos,
                        tiposDisponibles: tiposDisponibles,
                        tieneExamenes: tiposDisponibles.length > 0,
                        href: this.buildHref(curso, cicloNum)
                    });
                }
            }

            // Ordenar: primero los que tienen exámenes, luego por ciclo
            return cursosList.sort((a, b) => {
                // Primero los que tienen exámenes
                if (a.tieneExamenes && !b.tieneExamenes) return -1;
                if (!a.tieneExamenes && b.tieneExamenes) return 1;
                // Luego por ciclo
                return a.ciclo - b.ciclo;
            });
        },

        /**
         * Obtiene los tipos de examen disponibles para un curso
         */
        getTiposDisponibles(clave) {
            if (typeof examenesDisponibles === 'undefined' || !clave) {
                return [];
            }

            const cursoExamenes = examenesDisponibles[clave];
            if (!cursoExamenes) {
                return [];
            }

            return Object.keys(cursoExamenes);
        },

        /**
         * Construye el href para ir al visualizador de PDF
         */
        buildHref(curso, cicloNum) {
            const params = new URLSearchParams({
                carrera: this.carrera,
                curso: curso.value,
                clave: curso.clave || '',
                ciclo: cicloNum
            });
            return `pdf.html?${params.toString()}`;
        }
    }));
});

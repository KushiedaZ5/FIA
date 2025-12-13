/**
 * Componente Alpine.js para el visualizador de PDFs
 * pdf-viewer-alpine.js
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('pdfViewerApp', () => ({
        // Datos del curso
        carrera: '',
        carreraNombre: '',
        curso: '',
        cursoNombre: '',
        clave: '',
        cicloNum: '',

        // Selecciones
        tipoSeleccionado: '',
        cicloSeleccionado: '',

        // Datos disponibles
        tiposDisponibles: [],
        ciclosDisponibles: [],

        // PDF
        pdfUrl: '',
        pdfFileName: '',

        // UI
        linkCopiado: false,
        calculadoraUrl: '',

        // Mapeos
        tiposExamenMap: {},
        ciclosAcademicosMap: {},

        init() {
            // Cargar mapeos
            this.tiposExamenMap = typeof tiposExamen !== 'undefined' ? tiposExamen : {
                'PC1': 'Práctica 1',
                'PC2': 'Práctica 2',
                'PC3': 'Práctica 3',
                'PC4': 'Práctica 4',
                'EF': 'Examen Final',
                'EP': 'Examen Parcial',
                'W1': 'Trabajo 1',
                'W2': 'Trabajo 2',
                'LB1': 'Lab 1',
                'LB2': 'Lab 2',
                'LB3': 'Lab 3',
                'LB4': 'Lab 4',
                'LB5': 'Lab 5',
                'LB6': 'Lab 6',
                'LB7': 'Lab 7'
            };

            this.ciclosAcademicosMap = typeof ciclosAcademicos !== 'undefined' ? ciclosAcademicos : {
                '241': '2024-1',
                '242': '2024-2',
                '251': '2025-1',
                '252': '2025-2'
            };

            // Obtener parámetros de URL
            const urlParams = new URLSearchParams(window.location.search);
            this.carrera = urlParams.get('carrera') || '';
            this.curso = urlParams.get('curso') || '';
            this.clave = urlParams.get('clave') || '';
            this.cicloNum = urlParams.get('ciclo') || '';

            // Cargar datos del curso
            this.loadCursoData();

            // Cargar tipos de examen disponibles
            this.loadTiposDisponibles();

            // Construir URL de calculadora
            this.calculadoraUrl = `calculadora.html?carrera=${this.carrera}&ciclo=ciclo${this.cicloNum}&curso=${this.curso}`;

            // Si hay tipo y ciclo en la URL, preseleccionar
            const tipoUrl = urlParams.get('tipo');
            const cicloExamenUrl = urlParams.get('cicloExamen');

            if (tipoUrl && this.tiposDisponibles.includes(tipoUrl)) {
                this.selectTipo(tipoUrl);
                if (cicloExamenUrl && this.ciclosDisponibles.includes(cicloExamenUrl)) {
                    this.selectCiclo(cicloExamenUrl);
                }
            }
        },

        /**
         * Carga los datos del curso desde dataCarreras
         */
        loadCursoData() {
            if (!this.carrera || !dataCarreras[this.carrera]) {
                this.cursoNombre = 'Curso no encontrado';
                this.carreraNombre = '';
                return;
            }

            const carreraData = dataCarreras[this.carrera];
            this.carreraNombre = carreraData.nombre;

            // Buscar el curso en todos los ciclos
            for (const [cicloKey, cursos] of Object.entries(carreraData.ciclos)) {
                for (const c of cursos) {
                    if (c.value === this.curso) {
                        this.cursoNombre = c.text.replace('(Proximamente...)', '').trim();
                        this.clave = c.clave || this.clave;
                        break;
                    }
                }
            }

            // Actualizar título de la página
            document.title = `${this.cursoNombre} - Exámenes - CalculadoraFIAUSMP`;
        },

        /**
         * Carga los tipos de examen disponibles para este curso
         */
        loadTiposDisponibles() {
            // Lista predeterminada de tipos de examen
            const tiposPredeterminados = ['PC1', 'PC2', 'PC3', 'PC4', 'EF', 'EP', 'W1', 'LB1', 'LB2', 'LB3'];

            if (typeof examenesDisponibles !== 'undefined' && this.clave && examenesDisponibles[this.clave]) {
                // Usar solo los tipos que tienen exámenes
                this.tiposDisponibles = Object.keys(examenesDisponibles[this.clave]);
            } else {
                // Mostrar todos los tipos predeterminados (pero deshabilitados)
                this.tiposDisponibles = tiposPredeterminados;
            }
        },

        /**
         * Verifica si un tipo de examen tiene PDFs disponibles
         */
        isTipoDisponible(tipo) {
            if (typeof examenesDisponibles === 'undefined' || !this.clave) {
                return false;
            }
            return examenesDisponibles[this.clave]?.[tipo]?.length > 0;
        },

        /**
         * Selecciona un tipo de examen
         */
        selectTipo(tipo) {
            this.tipoSeleccionado = tipo;
            this.cicloSeleccionado = '';
            this.pdfUrl = '';
            this.pdfFileName = '';

            // Cargar ciclos disponibles para este tipo
            if (typeof examenesDisponibles !== 'undefined' && this.clave) {
                this.ciclosDisponibles = examenesDisponibles[this.clave]?.[tipo] || [];
            } else {
                this.ciclosDisponibles = [];
            }

            // Si solo hay un ciclo disponible, seleccionarlo automáticamente
            if (this.ciclosDisponibles.length === 1) {
                this.selectCiclo(this.ciclosDisponibles[0]);
            }
        },

        /**
         * Selecciona un ciclo académico y carga el PDF
         */
        selectCiclo(ciclo) {
            this.cicloSeleccionado = ciclo;

            // Construir nombre del archivo PDF
            this.pdfFileName = `${this.clave}-${this.tipoSeleccionado}-${ciclo}.pdf`;
            this.pdfUrl = `pdfs/${this.pdfFileName}`;

            // Actualizar URL para compartir
            this.updateUrl();
        },

        /**
         * Actualiza la URL del navegador para compartir
         */
        updateUrl() {
            const params = new URLSearchParams({
                carrera: this.carrera,
                curso: this.curso,
                clave: this.clave,
                ciclo: this.cicloNum,
                tipo: this.tipoSeleccionado,
                cicloExamen: this.cicloSeleccionado
            });

            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState({}, '', newUrl);
        },

        /**
         * Obtiene el nombre legible de un tipo de examen
         */
        getTipoNombre(tipo) {
            return this.tiposExamenMap[tipo] || tipo;
        },

        /**
         * Obtiene el nombre legible de un ciclo académico
         */
        getCicloNombre(ciclo) {
            return this.ciclosAcademicosMap[ciclo] || ciclo;
        },

        /**
         * Copia el link del examen al portapapeles
         */
        async compartirLink() {
            try {
                await navigator.clipboard.writeText(window.location.href);
                this.linkCopiado = true;

                setTimeout(() => {
                    this.linkCopiado = false;
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
                // Fallback para navegadores que no soportan clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = window.location.href;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                this.linkCopiado = true;
                setTimeout(() => {
                    this.linkCopiado = false;
                }, 2000);
            }
        }
    }));
});

document.addEventListener('alpine:init', () => {
    Alpine.data('appCalculadora', () => ({
        // ============================================
        // 1. ESTADO (STATE)
        // ============================================
        carreraSeleccionada: '',
        cicloSeleccionado: '',
        cursoSeleccionado: '', // ID del curso
        cursoObj: null, // Objeto completo del curso actual
        esquema: null,  // Objeto del esquema de calificaciÃ³n

        // Listas para los Selects
        listaCarreras: [],
        listaCiclos: [],
        listaCursos: [],

        // Estado de Notas (Reactivo)
        notas: {
            P1: '', P2: '', P3: '', P4: '',
            W1: '',
            APPC: '', AFPC: '', // Avance Parcial/Final del Proyecto de Curso
            EP: '',
            EF: '',
            Lb1: '', Lb2: '', Lb3: '', Lb4: '', Lb5: '', Lb6: '', Lb7: '',
            C1: '', C2: '', C3: '', C4: '', C5: '', C6: '', C7: '', C8: ''
        },

        // Errores de ValidaciÃ³n (Reactivo)
        erroresValidacion: {
            P1: '', P2: '', P3: '', P4: '',
            W1: '',
            APPC: '', AFPC: '',
            EP: '',
            EF: '',
            Lb1: '', Lb2: '', Lb3: '', Lb4: '', Lb5: '', Lb6: '', Lb7: '',
            C1: '', C2: '', C3: '', C4: '', C5: '', C6: '', C7: '', C8: ''
        },

        // Resultado calculado
        promedio: 0,

        // Manejo de ImÃ¡genes
        imagenSilaboSrc: '',
        imagenErrorCount: 0, // Para evitar bucles infinitos

        // Constantes
        NOTA_APROBATORIA: 10.5,

        // ============================================
        // 2. INICIALIZACIÃ“N Y RUTAS
        // ============================================
        init() {
            // Verificar que existan las dependencias globales
            if (typeof dataCarreras === 'undefined' || typeof esquemas === 'undefined') {
                console.error("Faltan data.js o esquemas.js");
                return;
            }

            // Llenar lista de carreras
            this.listaCarreras = Object.entries(dataCarreras).map(([key, val]) => ({
                id: key,
                nombre: val.nombre
            }));

            // Auto-selección desde URL (Query Params)
            const params = new URLSearchParams(window.location.search);
            const c = params.get('carrera');
            const ci = params.get('ciclo');
            const cu = params.get('curso'); // NEW: Read course param from URL

            if (c && dataCarreras[c]) {
                this.carreraSeleccionada = c;
                this.actualizarCiclos();

                if (ci && this.listaCiclos.some(ciclo => ciclo.id === ci)) {
                    this.cicloSeleccionado = ci;
                    this.actualizarCursos();

                    // NEW: Auto-select course if URL param exists
                    if (cu && this.listaCursos.some(curso => curso.value === cu)) {
                        this.seleccionarCursoFromURL(cu);
                    }
                }
            }
        },

        // ============================================
        // NEW: Select course from URL (loads saved notes)
        // ============================================
        seleccionarCursoFromURL(cursoValue) {
            this.cursoSeleccionado = cursoValue;

            // Buscar la data del curso
            this.cursoObj = this.listaCursos.find(c => c.value === cursoValue);

            if (this.cursoObj && esquemas[this.cursoObj.esquema]) {
                this.esquema = esquemas[this.cursoObj.esquema];

                // Reset notes initially (will be overwritten by loaded notes)
                this.limpiarNotas();
                this.imagenErrorCount = 0;
                this.imagenSilaboSrc = `imagenes/${this.cursoObj.esquema}.jpg`;

                // Load saved notes from Firestore
                this.cargarNotasGuardadas(cursoValue);
            } else {
                console.error("Esquema no encontrado para", cursoValue);
            }
        },

        // ============================================
        // NEW: Load saved notes from Firestore
        // ============================================
        async cargarNotasGuardadas(cursoId) {
            // Wait for auth to be ready
            const waitForAuth = () => {
                return new Promise((resolve) => {
                    const checkAuth = () => {
                        const authStore = Alpine.store('auth');
                        if (authStore && !authStore.loading) {
                            resolve(authStore);
                        } else {
                            setTimeout(checkAuth, 100);
                        }
                    };
                    checkAuth();
                });
            };

            const authStore = await waitForAuth();

            if (!authStore.isLoggedIn) {
                console.log('📭 Usuario no logueado, no se cargan notas guardadas');
                this.calcularPromedio();
                return;
            }

            try {
                // Use global firebaseAuth from auth.alpine.js
                const userId = authStore.userId;
                const { db } = window.firebaseAuth;

                // Import Firestore functions dynamically
                const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

                const noteRef = doc(db, 'users', userId, 'saved_notes', cursoId);
                const noteSnap = await getDoc(noteRef);

                if (noteSnap.exists()) {
                    const savedData = noteSnap.data();

                    // Populate notes from saved data
                    if (savedData.notas) {
                        Object.keys(savedData.notas).forEach(key => {
                            if (this.notas.hasOwnProperty(key)) {
                                this.notas[key] = savedData.notas[key];
                            }
                        });
                    }

                    // Recalculate average with loaded notes
                    this.calcularPromedio();
                    console.log('✅ Notas cargadas desde Firestore:', cursoId);
                } else {
                    console.log('📭 No hay notas guardadas para:', cursoId);
                    this.calcularPromedio();
                }
            } catch (error) {
                console.error('❌ Error cargando notas guardadas:', error);
                this.calcularPromedio();
            }
        },

        // ============================================
        // 3. LOGICA DE NAVEGACIÃ“N
        // ============================================
        actualizarCiclos() {
            this.listaCiclos = [];
            this.listaCursos = [];
            this.resetCurso();

            if (this.carreraSeleccionada) {
                const carrera = dataCarreras[this.carreraSeleccionada];
                this.listaCiclos = Object.keys(carrera.ciclos)
                    .filter(key => parseInt(key.replace('ciclo', '')) <= 6) // Filtro opcional
                    .map(key => ({
                        id: key,
                        nombre: key.replace('ciclo', 'Ciclo ')
                    }));
            }

            // Actualizar link de "Volver"
            const btnVolver = document.getElementById('btnVolverMapa');
            if (btnVolver) btnVolver.href = `carrera.html?carrera=${this.carreraSeleccionada}`;
        },

        actualizarCursos() {
            this.listaCursos = [];
            this.resetCurso();

            if (this.carreraSeleccionada && this.cicloSeleccionado) {
                const rawCursos = dataCarreras[this.carreraSeleccionada].ciclos[this.cicloSeleccionado] || [];
                this.listaCursos = rawCursos;
            }
        },

        seleccionarCurso(cursoValue) {
            this.cursoSeleccionado = cursoValue;

            // Buscar la data del curso
            this.cursoObj = this.listaCursos.find(c => c.value === cursoValue);

            if (this.cursoObj && esquemas[this.cursoObj.esquema]) {
                this.esquema = esquemas[this.cursoObj.esquema];

                // Resetear notas e imagen
                this.limpiarNotas();
                this.imagenErrorCount = 0;
                this.imagenSilaboSrc = `imagenes/${this.cursoObj.esquema}.jpg`;

                // Calcular inicial (0)
                this.calcularPromedio();
            } else {
                console.error("Esquema no encontrado para", cursoValue);
            }
        },

        resetCurso() {
            this.cursoSeleccionado = '';
            this.cursoObj = null;
            this.esquema = null;
            this.limpiarNotas();
        },

        limpiarNotas() {
            // Reiniciar todas las notas a string vacÃ­o
            Object.keys(this.notas).forEach(k => this.notas[k] = '');
            // Limpiar errores de validaciÃ³n
            Object.keys(this.erroresValidacion).forEach(k => this.erroresValidacion[k] = '');
            this.promedio = 0;
        },

        // ============================================
        // 4. VALIDACIÃ“N DE INPUTS
        // ============================================

        // FunciÃ³n auxiliar: Contar decimales
        contarDecimales(valor) {
            if (!valor || valor === '') return 0;
            const str = String(valor);
            if (str.includes('.')) {
                return str.split('.')[1].length;
            }
            return 0;
        },

        // Validación principal
        validarInput(key, valor) {
            // Si está vacío, no hay error
            if (valor === '' || valor === null || valor === undefined) {
                return '';
            }

            const num = parseFloat(valor);

            // Verificar si es un número válido
            if (isNaN(num) || !isFinite(num)) {
                return 'Valor inválido';
            }

            // Verificar decimales (máximo 2)
            if (this.contarDecimales(valor) > 2) {
                return 'Máximo 2 decimales permitidos';
            }

            // Verificar negativos
            if (num < 0) {
                return 'No se permiten valores negativos';
            }

            // Determinar límite según tipo de input Y esquema actual
            const esControl = key.startsWith('C');
            let limite = 20; // Default para inputs estándar

            if (esControl) {
                // Verificar si es el esquema de Inglés (039) que usa 0-20 para controles
                const esIngles = this.cursoObj && this.cursoObj.esquema === '039';
                limite = esIngles ? 20 : 5; // Inglés: 0-20, Otros: 0-5
            }

            // Verificar límite superior
            if (num > limite) {
                return `El valor máximo es ${limite}`;  // ✅ CORRECTO
            }
            return ''; // Sin error
        },

        // MÃ©todo para validar y actualizar errores
        validarYActualizar(key) {
            const valor = this.notas[key];
            this.erroresValidacion[key] = this.validarInput(key, valor);
            this.calcularPromedio();
        },

        // ============================================
        // 5. HELPERS VISUALES (VISIBILIDAD)
        // ============================================
        // Verifica si el input debe mostrarse segÃºn el esquema actual
        showInput(inputKey) {
            if (!this.esquema) return false;
            // Manejo especial para grupos (Lab y Control)
            if (inputKey.startsWith('Lb')) {
                return this.esquema.inputs.includes(inputKey);
            }
            return this.esquema.inputs.includes(inputKey);
        },

        hasAnyLab() {
            return this.esquema && this.esquema.inputs.some(i => i.startsWith('Lb'));
        },

        hasAnyControl() {
            return this.esquema && this.esquema.inputs.some(i => i.startsWith('C'));
        },

        // TÃ­tulo dinÃ¡mico del ciclo
        get tituloCicloTexto() {
            if (!this.cicloSeleccionado || !this.carreraSeleccionada) return 'CARGANDO...';
            const nombreCarrera = dataCarreras[this.carreraSeleccionada].nombre;
            const nombreCiclo = this.cicloSeleccionado.replace('ciclo', 'Ciclo ');
            return `${nombreCiclo} - ${nombreCarrera}`;
        },

        // Manejo de error de imagen (Fallback)
        // Manejo de error de imagen (Fallback) - VERSIÃ“N CORREGIDA
        handleImageError() {
            // ðŸ›¡ï¸ ESCUDO: Si cursoObj es null, salimos inmediatamente para no causar error
            if (!this.cursoObj) return;

            this.imagenErrorCount++;
            if (this.imagenErrorCount === 1) {
                // Intento 1: Probar PNG
                this.imagenSilaboSrc = `imagenes/${this.cursoObj.esquema}.png`;
            } else {
                // Intento 2: Fallback al logo por defecto
                this.imagenSilaboSrc = 'imagenes/logo.png';
            }
        },

        // ============================================
        // 5. CÃLCULOS
        // ============================================
        calcularPromedio() {
            if (!this.esquema) return;

            // Convertir strings a floats, sanitizar valores inválidos
            const notasNumericas = {};
            Object.keys(this.notas).forEach(k => {
                const valor = this.notas[k];
                const error = this.validarInput(k, valor);
                // Si hay error de validación, usar 0 para el cálculo
                if (error !== '') {
                    notasNumericas[k] = 0;
                } else {
                    notasNumericas[k] = parseFloat(valor) || 0;
                }
            });

            this.promedio = this.esquema.calcular(notasNumericas);
        },

        // CÃ¡lculo Delta (Nota mÃ­nima en Final)
        get notaMinimaNecesaria() {
            if (!this.esquema) return null;

            // Convertir strings a floats, sanitizar valores inválidos
            const notasNumericas = {};
            Object.keys(this.notas).forEach(k => {
                const valor = this.notas[k];
                const error = this.validarInput(k, valor);

                // Si hay error de validación, usar 0 para el cálculo
                if (error !== '') {
                    notasNumericas[k] = 0;
                } else {
                    notasNumericas[k] = parseFloat(valor) || 0;
                }
            });

            // Escenario 1: Sin Final
            const notasSinFinal = { ...notasNumericas, EF: 0 };
            const pSinFinal = this.esquema.calcular(notasSinFinal);

            // Si ya aprobÃ³ sin dar final
            if (pSinFinal >= this.NOTA_APROBATORIA) return { estado: 'aprobado', valor: 0 };

            // Escenario 2: Final perfecto (20)
            const notasConFinalMax = { ...notasNumericas, EF: 20 };
            const pConFinalMax = this.esquema.calcular(notasConFinalMax);

            // Peso del EF
            const pesoEF = (pConFinalMax - pSinFinal) / 20;

            if (pesoEF <= 0.001) return { estado: 'aprobado', valor: 0 }; // El final no vale nada?

            const necesario = (this.NOTA_APROBATORIA - pSinFinal) / pesoEF;

            if (necesario > 20) return { estado: 'imposible', valor: necesario };
            if (necesario <= 0) return { estado: 'aprobado', valor: 0 };

            return { estado: 'posible', valor: necesario };
        },

        // ============================================
        // 6. ESTILOS DINÃMICOS (HSL & BARRAS)
        // ============================================
        get estilosPromedio() {
            const p = this.promedio;
            let hue, saturation, lightness;

            if (p < 10.5) {
                // 0 -> 10.49 (Rojo -> Amarillo)
                const t = Math.max(0, p / 10.5);
                hue = Math.round(60 * t);
                saturation = 90;
                lightness = 50;
            } else if (p >= 10.5 && p < 14) {
                // 10.5 -> 13.99 (Verde -> Azul)
                const t = (p - 10.5) / (14 - 10.5);
                hue = Math.round(120 + (217 - 120) * t);
                saturation = 90;
                lightness = 50;
            } else {
                // 14+ (Cyan fijo)
                hue = 217;
                saturation = 91;
                lightness = 60;
            }

            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            const bgTint = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.05)`;
            const borderColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;

            return {
                texto: {
                    color: color,
                    textShadow: `0 0 80px ${color}`
                },
                caja: {
                    borderColor: borderColor,

                }
            };
        },
        get estilosNotaMinima() {
            if (!this.notaMinimaNecesaria || this.notaMinimaNecesaria.estado !== 'posible') {
                return { color: '', textShadow: '' };
            }
            const nota = this.notaMinimaNecesaria.valor;
            let hue, saturation, lightness;
            if (nota >= 14) {
                // 20 → 14: Rojo neón (como promedio 0)
                hue = 0;
                saturation = 100;
                lightness = 50;
            } else {
                // 14 → 0: Gradiente rojo → verde (invertido)
                const t = 1 - (nota / 14); // Invertir: nota alta = 0, nota baja = 1
                hue = Math.round(120 * t); // 0 (rojo) → 120 (verde)
                saturation = 90;
                lightness = 50;
            }
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            return {
                color: color,
                textShadow: ``, // Brillo suave
                fontWeight: '900' // Extra bold
            };
        },

        // Obtener pesos para la barra lateral (CON CORRECCIÃ“N DE COLORES)
        // Obtener pesos para la barra lateral (CON CORRECCIÃ“N DE COLORES Y DEFAULT AZUL)
        get listaPesos() {
            if (!this.esquema || !this.esquema.pesos) return [];

            // Clonamos y ordenamos por valor (peso) descendente
            return [...this.esquema.pesos].sort((a, b) => b.v - a.v).map(item => {

                // 1. Definimos el default como Azul Fuerte (bg-blue-600)
                // IMPORTANTE: Ignoramos item.c si queremos forzar nuestra lÃ³gica, 
                // o lo usamos solo si no detectamos el nombre.
                let colorClass = 'bg-blue-600';

                // 2. Detectar tipo de nota por nombre
                const nombre = item.n.toLowerCase();

                if (nombre.includes('final')) {
                    colorClass = 'bg-red-500';      // Rojo
                }
                else if (nombre.includes('parcial')) {
                    colorClass = 'bg-yellow-400';   // Amarillo
                }
                else if (nombre.includes('práctica') || nombre.includes('pe')) {
                    colorClass = 'bg-blue-600';   // Naranja
                }
                else if (nombre.includes('laboratorio') || nombre.includes('lb')) {
                    colorClass = 'bg-cyan-500';     // Cyan
                }
                else if (nombre.includes('trabajo') || nombre.includes('w')) {
                    colorClass = 'bg-green-500';    // Verde
                }
                else if (nombre.includes('investigación') || nombre.includes('inv')) {
                    colorClass = 'bg-blue-600';     // Azul Fuerte
                }
                // AQUÃ AGREGAMOS LA REGLA PARA LOS RESTANTES (Controles, InvestigaciÃ³n, etc.)
                else if (nombre.includes('control') || nombre.includes('c')) {
                    colorClass = 'bg-cyan-500';     // Azul Fuerte
                }


                return { ...item, colorClass };
            });
        }
    }));
});

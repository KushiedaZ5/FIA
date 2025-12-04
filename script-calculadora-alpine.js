document.addEventListener('alpine:init', () => {
    Alpine.data('appCalculadora', () => ({
        // ============================================
        // 1. ESTADO (STATE)
        // ============================================
        carreraSeleccionada: '',
        cicloSeleccionado: '',
        cursoSeleccionado: '', // ID del curso
        cursoObj: null, // Objeto completo del curso actual
        esquema: null,  // Objeto del esquema de calificación
        
        // Listas para los Selects
        listaCarreras: [],
        listaCiclos: [],
        listaCursos: [],

        // Estado de Notas (Reactivo)
        notas: {
            P1: '', P2: '', P3: '', P4: '',
            W1: '',
            EP: '',
            EF: '',
            Lb1: '', Lb2: '', Lb3: '', Lb4: '', Lb5: '', Lb6: '', Lb7: '',
            C1: '', C2: '', C3: '', C4: '', C5: '', C6: '', C7: '', C8: ''
        },

        // Resultado calculado
        promedio: 0,
        
        // Manejo de Imágenes
        imagenSilaboSrc: '',
        imagenErrorCount: 0, // Para evitar bucles infinitos

        // Constantes
        NOTA_APROBATORIA: 10.5,

        // ============================================
        // 2. INICIALIZACIÓN Y RUTAS
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

            if (c && dataCarreras[c]) {
                this.carreraSeleccionada = c;
                this.actualizarCiclos();

                if (ci && this.listaCiclos.some(ciclo => ciclo.id === ci)) {
                    this.cicloSeleccionado = ci;
                    this.actualizarCursos();
                }
            }
        },

        // ============================================
        // 3. LOGICA DE NAVEGACIÓN
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
            if(btnVolver) btnVolver.href = `carrera.html?carrera=${this.carreraSeleccionada}`;
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
            // Reiniciar todas las notas a string vacío
            Object.keys(this.notas).forEach(k => this.notas[k] = '');
            this.promedio = 0;
        },

        // ============================================
        // 4. HELPERS VISUALES (VISIBILIDAD)
        // ============================================
        // Verifica si el input debe mostrarse según el esquema actual
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

        // Título dinámico del ciclo
        get tituloCicloTexto() {
            if (!this.cicloSeleccionado || !this.carreraSeleccionada) return 'CARGANDO...';
            const nombreCarrera = dataCarreras[this.carreraSeleccionada].nombre;
            const nombreCiclo = this.cicloSeleccionado.replace('ciclo', 'Ciclo ');
            return `${nombreCiclo} - ${nombreCarrera}`;
        },

        // Manejo de error de imagen (Fallback)
       // Manejo de error de imagen (Fallback) - VERSIÓN CORREGIDA
        handleImageError() {
            // 🛡️ ESCUDO: Si cursoObj es null, salimos inmediatamente para no causar error
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
        // 5. CÁLCULOS
        // ============================================
        calcularPromedio() {
            if (!this.esquema) return;

            // Convertir strings a floats, default 0
            const notasNumericas = {};
            Object.keys(this.notas).forEach(k => {
                notasNumericas[k] = parseFloat(this.notas[k]) || 0;
            });

            this.promedio = this.esquema.calcular(notasNumericas);
        },

        // Cálculo Delta (Nota mínima en Final)
        get notaMinimaNecesaria() {
            if (!this.esquema) return null;

            const notasNumericas = {};
            Object.keys(this.notas).forEach(k => {
                notasNumericas[k] = parseFloat(this.notas[k]) || 0;
            });

            // Escenario 1: Sin Final
            const notasSinFinal = { ...notasNumericas, EF: 0 };
            const pSinFinal = this.esquema.calcular(notasSinFinal);

            // Si ya aprobó sin dar final
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
        // 6. ESTILOS DINÁMICOS (HSL & BARRAS)
        // ============================================
        get estilosPromedio() {
            const p = this.promedio;
            let hue, saturation, lightness;

            if (p < 10.5) {
                // 0 -> 10.49 (Rojo -> Amarillo)
                const t = Math.max(0, p / 10.5);
                hue = Math.round(60 * t);
                saturation = 100; 
                lightness = 50;
            } else if (p >= 10.5 && p < 14) {
                // 10.5 -> 13.99 (Verde -> Azul)
                const t = (p - 10.5) / (14 - 10.5);
                hue = Math.round(120 + (217 - 120) * t);
                saturation = 95; 
                lightness = 60;
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
                    textShadow: `0 0 35px ${color}`
                },
                caja: {
                    borderColor: borderColor,
                    background: `linear-gradient(145deg, ${bgTint}, transparent)`,
                    boxShadow: `0 0 10px ${bgTint}`
                }
            };
        },
        
        // Obtener pesos para la barra lateral (CON CORRECCIÓN DE COLORES)
      // Obtener pesos para la barra lateral (CON CORRECCIÓN DE COLORES Y DEFAULT AZUL)
        get listaPesos() {
            if (!this.esquema || !this.esquema.pesos) return [];
            
            // Clonamos y ordenamos por valor (peso) descendente
            return [...this.esquema.pesos].sort((a, b) => b.v - a.v).map(item => {
                
                // 1. Definimos el default como Azul Fuerte (bg-blue-600)
                // IMPORTANTE: Ignoramos item.c si queremos forzar nuestra lógica, 
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
                // AQUÍ AGREGAMOS LA REGLA PARA LOS RESTANTES (Controles, Investigación, etc.)
                else if (nombre.includes('control') || nombre.includes('c')) {
                    colorClass = 'bg-cyan-500';     // Azul Fuerte
                }
                
                
                return { ...item, colorClass };
            });
        }
    }));
});
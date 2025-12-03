// ========================================
// CALCULADORA ALPINE.JS COMPONENT
// Migración de 402 líneas de vanilla JS
// ========================================

document.addEventListener('alpine:init', () => {
    Alpine.data('calculadoraApp', () => ({

        // ========== ESTADO REACTIVO ==========

        // Navegación
        carreraKey: null,
        cicloKey: null,
        cursoSeleccionado: null,

        // Notas (21 inputs reactivos)
        notas: {
            // Prácticas (4)
            P1: '', P2: '', P3: '', P4: '',
            // Trabajo (1)
            W1: '',
            // Parcial (1)
            EP: '',
            // Final (1)
            EF: '',
            // Laboratorios (7)
            Lb1: '', Lb2: '', Lb3: '', Lb4: '', Lb5: '', Lb6: '', Lb7: '',
            // Controles (8)
            C1: '', C2: '', C3: '', C4: '', C5: '', C6: '', C7: '', C8: ''
        },

        // Constantes
        NOTA_APROBATORIA: 10.5,

        // ========== INICIALIZACIÓN ==========

        init() {
            this.cargarDesdeURL();
            this.setupWatchers();
        },

        cargarDesdeURL() {
            const params = new URLSearchParams(window.location.search);
            this.carreraKey = params.get('carrera');
            this.cicloKey = params.get('ciclo');

            // Actualizar botón volver al mapa
            const btn = document.getElementById('btnVolverMapa');
            if (btn && this.carreraKey) {
                btn.href = `carrera.html?carrera=${this.carreraKey}`;
            }
        },

        setupWatchers() {
            // Watch cuando se selecciona un curso nuevo
            this.$watch('cursoSeleccionado', (nuevo) => {
                if (nuevo) {
                    this.limpiarNotas();
                }
            });
        },

        // ========== COMPUTED PROPERTIES ==========

        // Lista de carreras para select (aunque esté hidden)
        get carreras() {
            if (typeof dataCarreras === 'undefined') return [];
            return Object.entries(dataCarreras).map(([key, data]) => ({
                value: key,
                text: data.nombre
            }));
        },

        // Lista de ciclos de la carrera seleccionada
        get ciclos() {
            if (!this.carreraKey || !dataCarreras[this.carreraKey]) return [];
            return Object.keys(dataCarreras[this.carreraKey].ciclos)
                .filter(key => parseInt(key.replace('ciclo', '')) <= 6)
                .map(key => ({
                    value: key,
                    text: key.replace('ciclo', 'Ciclo ')
                }));
        },

        // Lista de cursos del ciclo seleccionado
        get cursos() {
            if (!this.carreraKey || !this.cicloKey) return [];
            return dataCarreras[this.carreraKey]?.ciclos[this.cicloKey] || [];
        },

        // Título dinámico del header
        get titulo() {
            if (!this.carreraKey || !this.cicloKey) return 'CARGANDO...';
            const cicloTexto = this.cicloKey.replace('ciclo', 'Ciclo ');
            const carreraNombre = dataCarreras[this.carreraKey]?.nombre || '';
            return `${cicloTexto} - ${carreraNombre}`;
        },

        // Data del curso seleccionado
        get cursoData() {
            if (!this.cursoSeleccionado) return null;
            return this.cursos.find(c => c.value === this.cursoSeleccionado);
        },

        // Esquema actual del curso (con fórmulas de cálculo)
        get esquemaActual() {
            if (!this.cursoData) return null;
            if (typeof esquemas === 'undefined') return null;
            return esquemas[this.cursoData.esquema] || null;
        },

        // Imagen del sílabo
        get imagenSilabo() {
            if (!this.cursoData) return 'imagenes/logo.png';
            return `imagenes/${this.cursoData.esquema}.jpg`;
        },

        // ===== CÁLCULO DEL PROMEDIO =====
        get promedio() {
            if (!this.esquemaActual) return 0;

            // Convertir todas las notas a números
            const notasNumericas = {};
            Object.keys(this.notas).forEach(key => {
                notasNumericas[key] = parseFloat(this.notas[key]) || 0;
            });

            // Usar la función calcular del esquema
            return this.esquemaActual.calcular(notasNumericas);
        },

        // ===== COLOR DINÁMICO DEL PROMEDIO (Algoritmo HSL) =====
        get colorPromedio() {
            const p = this.promedio;
            let hue, saturation, lightness;

            // FASE 1: JALADO (0 a 10.49) - Rojo a Amarillo
            if (p < 10.5) {
                const t = Math.max(0, p / 10.5);
                hue = Math.round(60 * t); // 0 (Rojo) -> 60 (Amarillo)
                saturation = 100;
                lightness = 50;
            }
            // FASE 2: APROBADO (10.5 a 14.00) - Verde a Cyan
            else if (p >= 10.5 && p < 14) {
                const t = (p - 10.5) / (14 - 10.5);
                hue = Math.round(120 + (217 - 120) * t); // 120 (Verde) -> 217 (Azul)
                saturation = 95;
                lightness = 60;
            }
            // FASE 3: NOTAZA (14+) - Cyan Fijo
            else {
                hue = 217;
                saturation = 91;
                lightness = 60;
            }

            return { hue, saturation, lightness };
        },

        // Estilos inline para el texto del promedio
        get estilosPromedio() {
            const { hue, saturation, lightness } = this.colorPromedio;
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            return {
                color: color,
                textShadow: `0 0 35px ${color}`
            };
        },

        // Estilos inline para la caja del resultado (border + bg)
        get estilosResultBox() {
            const { hue, saturation, lightness } = this.colorPromedio;
            const softColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
            const softBgTint = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.05)`;

            return {
                borderColor: softColor,
                background: `linear-gradient(145deg, ${softBgTint}, transparent)`,
                boxShadow: `0 0 10px ${softBgTint}`
            };
        },

        // ===== NOTA MÍNIMA PARA APROBAR =====
        get notaMinimaFinal() {
            if (!this.esquemaActual) {
                return { texto: '0.00', color: '#888' };
            }

            // Convertir notas a números
            const notasNumericas = {};
            Object.keys(this.notas).forEach(key => {
                notasNumericas[key] = parseFloat(this.notas[key]) || 0;
            });

            // Calcular promedio SIN examen final
            const notasSinFinal = { ...notasNumericas, EF: 0 };
            const pSinFinal = this.esquemaActual.calcular(notasSinFinal);

            // Calcular promedio CON examen final en 20
            const notasConFinalMax = { ...notasNumericas, EF: 20 };
            const pConFinalMax = this.esquemaActual.calcular(notasConFinalMax);

            // Peso del examen final
            const pesoEF = (pConFinalMax - pSinFinal) / 20;

            // Nota necesaria en el final para aprobar
            let necesario = (this.NOTA_APROBATORIA - pSinFinal) / pesoEF;

            // Casos
            if (pSinFinal >= this.NOTA_APROBATORIA) {
                return { texto: '¡Ya aprobaste!', color: '#00E676' };
            } else if (necesario > 20 || pesoEF < 0.001) {
                return { texto: 'Imposible aprobar :(', color: '#FF1744' };
            } else {
                return { texto: necesario.toFixed(2), color: '#f7e07a' };
            }
        },

        // ===== VISIBILIDAD DE CAMPOS =====
        get camposVisibles() {
            if (!this.esquemaActual) return {};
            const inputs = this.esquemaActual.inputs || [];

            return {
                P1: inputs.includes('P1'),
                P2: inputs.includes('P2'),
                P3: inputs.includes('P3'),
                P4: inputs.includes('P4'),
                W1: inputs.includes('W1'),
                EP: inputs.includes('EP'),
                EF: inputs.includes('EF'),
                Lb1: inputs.includes('Lb1'),
                Lb2: inputs.includes('Lb2'),
                Lb3: inputs.includes('Lb3'),
                Lb4: inputs.includes('Lb4'),
                Lb5: inputs.includes('Lb5'),
                Lb6: inputs.includes('Lb6'),
                Lb7: inputs.includes('Lb7'),
                labsSection: inputs.some(i => i.startsWith('Lb')),
                controlesSection: inputs.some(i => i.startsWith('C'))
            };
        },

        // ===== PESOS DE NOTAS (Para sidebar) =====
        get pesosOrdenados() {
            if (!this.esquemaActual) return [];
            const pesos = [...(this.esquemaActual.pesos || [])];
            return pesos.sort((a, b) => b.v - a.v).map(item => ({
                ...item,
                color: this.getColorPeso(item)
            }));
        },

        // ========== MÉTODOS ==========

        // Seleccionar un curso (desde botones)
        seleccionarCurso(valor) {
            this.cursoSeleccionado = valor;
        },

        // Limpiar todas las notas
        limpiarNotas() {
            Object.keys(this.notas).forEach(key => {
                this.notas[key] = '';
            });
        },

        // Obtener color para un peso de nota
        getColorPeso(item) {
            if (item.n.includes('Final')) return 'bg-red-500';
            if (item.n.includes('Parcial')) return 'bg-yellow-500';
            return item.c || 'bg-blue-500';
        },

        // Error handler para imagen de sílabo
        onImagenSilaboError(event) {
            const img = event.target;

            // Intentar .png si .jpg falla
            if (img.src.endsWith('.jpg')) {
                img.src = img.src.replace('.jpg', '.png');
            }
            // Si también falla, usar logo
            else {
                img.src = 'imagenes/logo.png';
            }
        }

    }));
});

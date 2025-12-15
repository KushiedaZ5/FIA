// =====================================================
// 📘 LIBRERÍA DE ESQUEMAS DE EVALUACIÓN (FIA USMP)
// =====================================================
// Transcripción de los 23 esquemas del PDF oficial.

const esquemas = {

    // --- GRUPO 1: PROMEDIOS BÁSICOS ---
    "038": {
        descripcion: "Promedio Simple P1, P2, P3",
        imagen: "imagenes/038.jpg",
        inputs: ["P1", "P2", "P3", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones (PE)", v: 33.3, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 33.3, c: "bg-warning" }, { n: "Examen Final (EF)", v: 33.3, c: "bg-danger" }],
        calcular: (n) => {
            const pe = (n.P1 + n.P2 + n.P3) / 3;
            return (pe + n.EP + n.EF) / 3;
        }
    },
    "039": {
        descripcion: "Inglés (Controles C1-C4)",
        imagen: "imagenes/039.jpg",
        inputs: ["C1", "C2", "C3", "C4", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones (PE)", v: 70, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 15, c: "bg-warning" }, { n: "Examen Final (EF)", v: 15, c: "bg-danger" }],
        calcular: (n) => {
            const pe = (n.C1 + n.C2 + n.C3 + n.C4) / 4;
            return (0.7 * pe) + (0.15 * n.EP) + (0.15 * n.EF);
        }
    },
    "040": {
        descripcion: "Ecuaciones Diferenciales (P4 Doble)",
        imagen: "imagenes/040.jpg",
        inputs: ["P1", "P2", "P3", "P4", "EF"],
        pesos: [{ n: "Prom. Prácticas (PE)", v: 66.7, c: "bg-primary" }, { n: "Examen Final (EF)", v: 33.3, c: "bg-danger" }],
        calcular: (n) => {
            const p = [n.P1, n.P2, n.P3, n.P4];
            const min = Math.min(...p);
            const sumaP = p.reduce((a, b) => a + b, 0) + n.P4; // P1+P2+P3+P4+P4
            const pe = (sumaP - min) / 4;
            return ((2 * pe) + n.EF) / 3;
        }
    },

    // --- GRUPO 2: FÓRMULAS COMPLEJAS ---
    "041": {
        descripcion: "Estadística (P4 Doble + W1)",
        imagen: "imagenes/041.jpg",
        inputs: ["P1", "P2", "P3", "P4", "W1", "EF"],
        pesos: [{ n: "Prom. Prácticas (PPR)", v: 53.3, c: "bg-primary" }, { n: "Trabajo (W1)", v: 13.3, c: "bg-info" }, { n: "Examen Final (EF)", v: 33.3, c: "bg-warning" }],
        calcular: (n) => {
            const p = [n.P1, n.P2, n.P3, n.P4];
            const min = Math.min(...p);
            const sumaP = p.reduce((a, b) => a + b, 0) + n.P4;
            const ppr = (sumaP - min) / 4;
            const pe = ((4 * ppr) + n.W1) / 5;
            return ((2 * pe) + n.EF) / 3;
        }
    },
    "042": {
        descripcion: "Física (P4 Doble + 7 Labs)",
        imagen: "imagenes/042.jpg",
        inputs: ["P1", "P2", "P3", "P4", "Lb1", "Lb2", "Lb3", "Lb4", "Lb5", "Lb6", "Lb7", "EF"],
        pesos: [{ n: "Prom. Prácticas (PE)", v: 50, c: "bg-primary" }, { n: "Prom. Laboratorio (PL)", v: 25, c: "bg-success" }, { n: "Examen Final (EF)", v: 25, c: "bg-warning" }],
        calcular: (n) => {
            const p = [n.P1, n.P2, n.P3, n.P4];
            const minP = Math.min(...p);
            const sumaP = p.reduce((a, b) => a + b, 0) + n.P4;
            const pe = (sumaP - minP) / 4;

            const l = [n.Lb1, n.Lb2, n.Lb3, n.Lb4, n.Lb5, n.Lb6, n.Lb7];
            const minL = Math.min(...l);
            const pl = (l.reduce((a, b) => a + b, 0) - minL) / 6;

            return ((2 * pe) + pl + n.EF) / 4;
        }
    },
    "043": {
        descripcion: "Labs (6) + Examen Oral",
        imagen: "imagenes/043.jpg",
        inputs: ["P1", "P2", "W1", "Lb1", "Lb2", "Lb3", "Lb4", "Lb5", "Lb6", "EO", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones", v: 50, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 25, c: "bg-warning" }, { n: "Examen Final (EF)", v: 25, c: "bg-danger" }],
        calcular: (n) => {
            const ppr = (n.P1 + n.P2) / 2;
            const sumL = n.Lb1 + n.Lb2 + n.Lb3 + n.Lb4 + n.Lb5 + n.Lb6;
            const pl = ((sumL / 6) + n.EO) / 2;
            const pe = (ppr + n.W1 + pl) / 3;
            return ((2 * pe) + n.EP + n.EF) / 4;
        }
    },
    "044": {
        descripcion: "Proyectos (Solo EP y EF)",
        inputs: ["EP", "EF"],
        pesos: [{ n: "Examen Parcial (EP)", v: 50, c: "bg-warning" }, { n: "Examen Final (EF)", v: 50, c: "bg-danger" }],
        calcular: (n) => (n.EP + n.EF) / 2
    },
    "045": {
        descripcion: "Dinámica / Tec. Concreto",
        imagen: "imagenes/045.jpg",
        inputs: ["P1", "P2", "P3", "P4", "W1", "EP", "EF"],
        pesos: [{ n: "Prom. Prácticas", v: 25, c: "bg-primary" }, { n: "Trabajo (W1)", v: 25, c: "bg-info" }, { n: "Examen Parcial (EP)", v: 25, c: "bg-warning" }, { n: "Examen Final (EF)", v: 25, c: "bg-danger" }],
        calcular: (n) => {
            const p = [n.P1, n.P2, n.P3, n.P4];
            const min = Math.min(...p);
            const promP = (p.reduce((a, b) => a + b, 0) - min) / 3;
            const pe = (promP + n.W1) / 2;
            return ((2 * pe) + n.EP + n.EF) / 4;
        }
    },
    "046": {
        descripcion: "TI 2 - 4 Labs",
        imagen: "imagenes/046.jpg",
        inputs: ["P1", "P2", "P3", "P4", "W1", "Lb1", "Lb2", "Lb3", "Lb4", "EP", "EF"],
        pesos: [{ n: "Examen Final (EF)", v: 25, c: "bg-danger" }, { n: "Examen Parcial (EP)", v: 25, c: "bg-warning" }, { n: "Prom. Prácticas (P)", v: 16.7, c: "bg-primary" }, { n: "Trabajo (W1)", v: 16.7, c: "bg-info" }, { n: "Prom. Laboratorio (PL)", v: 16.7, c: "bg-success" }],
        calcular: (n) => {
            const pl = (n.Lb1 + n.Lb2 + n.Lb3 + n.Lb4) / 4;
            const p = [n.P1, n.P2, n.P3, n.P4];
            const min = Math.min(...p);
            const promP = (p.reduce((a, b) => a + b, 0) - min) / 3;
            const pe = (promP + n.W1 + pl) / 3;
            return ((2 * pe) + n.EP + n.EF) / 4;
        }
    },
    "047": {
        descripcion: "Algoritmos 2 - Labs + Trabajos",
        imagen: "imagenes/047.jpg",
        inputs: ["P1", "P2", "W1", "Lb1", "Lb2", "Lb3", "Lb4", "Lb5", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones (PE)", v: 50, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 25, c: "bg-info" }, { n: "Examen Final (EF)", v: 25, c: "bg-warning" }],
        calcular: (n) => {
            const l = [n.Lb1, n.Lb2, n.Lb3, n.Lb4, n.Lb5];
            const minL = Math.min(...l);
            const pl = (l.reduce((a, b) => a + b, 0) - minL) / 4;
            const promP = (n.P1 + n.P2) / 2;
            const pe = (promP + n.W1 + pl) / 3;
            return ((2 * pe) + n.EP + n.EF) / 4;
        }
    },

    // --- GRUPO 3: PESOS DECIMALES ---
    "049": {
        descripcion: "Decimales 0.3, 0.3, 0.4",
        imagen: "imagenes/049.jpg",
        inputs: ["P1", "P2", "P3", "P4", "EP", "EF"],
        pesos: [{ n: "Final (EF)", v: 40, c: "bg-danger" }, { n: "Parcial (EP)", v: 30, c: "bg-warning" }, { n: "Evaluaciones (PE)", v: 30, c: "bg-primary" }],
        calcular: (n) => {
            const pe = (n.P1 + n.P2 + n.P3 + n.P4) / 4;
            return (0.3 * pe) + (0.3 * n.EP) + (0.4 * n.EF);
        }
    },
    "050": {
        descripcion: "Proyectos (Informes y Trabajos)",
        inputs: ["C1", "C2", "W1", "C3", "C4", "C5", "C6", "C7", "EP", "EF"],
        pesos: [{ n: "Evaluaciones", v: 40, c: "bg-primary" }, { n: "Final", v: 60, c: "bg-danger" }],
        calcular: (n) => {
            const pe = (n.C1 + n.C2 + n.W1 + n.C3 + n.C4 + n.C5 + n.C6 + n.C7) / 8;
            return (0.40 * pe) + (0.60 * n.EF);
        }
    },
    "051": {
        descripcion: "Decimales (0.15, 0.45, 0.40)",
        inputs: ["P1", "P2", "P3", "P4", "EP", "EF"],
        pesos: [{ n: "Parcial", v: 45, c: "bg-warning" }, { n: "Final", v: 40, c: "bg-danger" }, { n: "Evaluaciones", v: 15, c: "bg-primary" }],
        calcular: (n) => {
            const pe = (n.P1 + n.P2 + n.P3 + n.P4) / 4;
            return (0.15 * pe) + (0.45 * n.EP) + (0.40 * n.EF);
        }
    },
    "052": {
        descripcion: "Decimales (0.20, 0.20, 0.60)",
        inputs: ["P1", "P2", "EP", "EF"],
        pesos: [{ n: "Final", v: 60, c: "bg-danger" }, { n: "Evaluaciones", v: 20, c: "bg-primary" }, { n: "Parcial", v: 20, c: "bg-warning" }],
        calcular: (n) => {
            const pe = (0.35 * n.P1) + (0.65 * n.P2);
            return (0.20 * pe) + (0.20 * n.EP) + (0.60 * n.EF);
        }
    },
    "053": {
        descripcion: "Divisor 7 (Trabajos)",
        inputs: ["P1", "P2", "P3", "P4", "EP", "EF"],
        pesos: [{ n: "Final", v: 57.1, c: "bg-danger" }, { n: "Parcial", v: 28.6, c: "bg-warning" }, { n: "Trabajos", v: 14.3, c: "bg-primary" }],
        calcular: (n) => {
            const pe = (n.P1 + n.P2 + n.P3 + n.P4) / 4;
            return (pe + (2 * n.EP) + (4 * n.EF)) / 7;
        }
    },
    "054": {
        descripcion: "Microeconomía 0.3, 0.3, 0.4",
        imagen: "imagenes/054.jpg",
        inputs: ["P1", "P2", "P4", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "EP", "EF"],
        pesos: [{ n: "Examen Final (EF)", v: 40, c: "bg-danger" }, { n: "Examen Parcial (EP)", v: 30, c: "bg-warning" }, { n: "Práctica 1 (P1)", v: 7.5, c: "bg-primary" }, { n: "Práctica 2 (P2)", v: 7.5, c: "bg-primary" }, { n: "Controles (P3)", v: 7.5, c: "bg-primary" }, { n: "Investigación (P4)", v: 7.5, c: "bg-primary" }],
        calcular: (n) => {
            const sumaControles = n.C1 + n.C2 + n.C3 + n.C4 + n.C5 + n.C6 + n.C7 + n.C8;
            const p3 = sumaControles / 2;
            const pe = (n.P1 + n.P2 + p3 + n.P4) / 4;
            return (0.3 * pe) + (0.3 * n.EP) + (0.4 * n.EF);
        }
    },
    "055": {
        descripcion: "Decimales (0.3, 0.2, 0.5) -  P5",
        imagen: "imagenes/055.jpg",
        inputs: ["P1", "P2", "P3", "P4", "P5", "EP", "EF"],
        pesos: [{ n: "Examen Final (EF)", v: 50, c: "bg-danger" }, { n: "Prom. Evaluaciones (PE)", v: 30, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 20, c: "bg-warning" }],
        calcular: (n) => {
            const p = [n.P1, n.P2, n.P3, n.P4, n.P5];
            const min = Math.min(...p);
            const pe = (p.reduce((a, b) => a + b, 0) - min) / 4;
            return (0.3 * pe) + (0.2 * n.EP) + (0.5 * n.EF);
        }
    },
    "056": {
        descripcion: "Compleja (PPR Ponderado + W1)",
        inputs: ["P1", "P2", "P3", "P4", "C1", "C2", "W1", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones (PE)", v: 65, c: "bg-primary" }, { n: "Examen Final (EF)", v: 20, c: "bg-danger" }, { n: "Examen Parcial (EP)", v: 15, c: "bg-warning" }],
        calcular: (n) => {
            const ppr = (0.05 * n.P1) + (0.10 * n.P2) + (0.15 * n.P3) + (0.15 * n.P4);
            const pe = ppr + (0.05 * n.C1) + (0.05 * n.C2) + (0.10 * n.W1);
            return pe + (0.15 * n.EP) + (0.20 * n.EF);
        }
    },

    // --- GRUPO 4: 12X / 13X ---
    "127": {
        descripcion: "Taller 4 Arquitectura",
        imagen: "imagenes/127.jpg",
        inputs: ["P1", "P2", "P3", "P4", "EP", "EF"],
        pesos: [{ n: "Examen Final (EF)", v: 50, c: "bg-danger" }, { n: "Examen Parcial (EP)", v: 33.3, c: "bg-warning" }, { n: "Prom. Evaluaciones (PE)", v: 16.7, c: "bg-primary" }],
        calcular: (n) => {
            const pe = (n.P1 + n.P2 + n.P3 + n.P4) / 4;
            return ((3 * pe) + n.EP + n.EF) / 5;
        }
    },
    "128": {
        descripcion: "Algoritmos I - Labs + Prácticas",
        imagen: "imagenes/128.jpg",
        inputs: ["P1", "P2", "Lb1", "Lb2", "Lb3", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones (PE)", v: 33.3, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 33.3, c: "bg-warning" }, { n: "Examen Final (EF)", v: 33.3, c: "bg-danger" }],
        calcular: (n) => {
            const ppr = (n.P1 + n.P2) / 2;
            const pl = (n.Lb1 + n.Lb2 + n.Lb3) / 3;
            const pe = (0.6 * ppr) + (0.4 * pl);
            return (pe + n.EP + n.EF) / 3;
        }
    },
    "129": {
        descripcion: "Construcción 2 - Divisor 5",
        imagen: "imagenes/129.jpg",
        inputs: ["P1", "P2", "P3", "P4", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones (PE)", v: 60, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 20, c: "bg-warning" }, { n: "Examen Final (EF)", v: 20, c: "bg-danger" }],
        calcular: (n) => {
            const pe = (n.P1 + n.P2 + n.P3 + n.P4) / 4;
            return ((3 * pe) + n.EP + n.EF) / 5;
        }
    },
    "130": {
        descripcion: "Química Industrial (Labs + EO)",
        imagen: "imagenes/130.jpg",
        inputs: ["P1", "P2", "W1", "Lb1", "Lb2", "Lb3", "Lb4", "Lb5", "Lb6", "EO", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones", v: 33.3, c: "bg-primary" }, { n: "Examen Parcial (EP)", v: 33.3, c: "bg-warning" }, { n: "Examen Final (EF)", v: 33.3, c: "bg-danger" }],
        calcular: (n) => {
            const ppr = (n.P1 + n.P2) / 2;
            const sumL = n.Lb1 + n.Lb2 + n.Lb3 + n.Lb4 + n.Lb5 + n.Lb6;
            const pl = ((sumL / 6) + n.EO) / 2;
            const pe = (ppr + n.W1 + pl) / 3;
            return (pe + n.EP + n.EF) / 3;
        }
    },
    "131": {
        descripcion: "Variante 3-1-2",
        inputs: ["P1", "P2", "P3", "EP", "EF"],
        pesos: [{ n: "Prom. Evaluaciones", v: 50, c: "bg-primary" }, { n: "Examen Final (EF)", v: 33.3, c: "bg-danger" }, { n: "Examen Parcial (EP)", v: 16.7, c: "bg-warning" }],
        calcular: (n) => {
            const pe = (n.P1 + n.P2 + n.P3) / 3;
            return ((3 * pe) + n.EP + (2 * n.EF)) / 6;
        }
    },
    "132": {
        descripcion: "Gestión de Procesos (APPC + AFPC)",
        imagen: "imagenes/130.jpg",
        inputs: ["P1", "P2", "P3", "P4", "APPC", "AFPC", "EP", "EF"],
        pesos: [
            { n: "Prom. Prácticas", v: 25, c: "bg-primary" },
            { n: "Proyecto (APPC+AFPC)", v: 25, c: "bg-info" },
            { n: "Examen Parcial (EP)", v: 25, c: "bg-warning" },
            { n: "Examen Final (EF)", v: 25, c: "bg-danger" }
        ],
        calcular: (n) => {
            // W1 = (APPC + AFPC) / 2
            const w1 = (n.APPC + n.AFPC) / 2;

            // PE = ((P1+P2+P3+P4-MN)/3 + W1) / 2
            const p = [n.P1, n.P2, n.P3, n.P4];
            const min = Math.min(...p);
            const promP = (p.reduce((a, b) => a + b, 0) - min) / 3;
            const pe = (promP + w1) / 2;

            // PF = (2*PE + EP + EF) / 4
            return ((2 * pe) + n.EP + n.EF) / 4;
        }
    },
    "133": {
        descripcion: "Taller Herramientas Info (0.30, 0.30, 0.40)",
        imagen: "imagenes/133.jpg",
        inputs: ["P1", "P2", "P3", "P4", "EP", "EF"],
        pesos: [
            { n: "Examen Final (EF)", v: 40, c: "bg-danger" },
            { n: "Examen Parcial (EP)", v: 30, c: "bg-warning" },
            { n: "Prom. Evaluaciones (PE)", v: 30, c: "bg-primary" }
        ],
        calcular: (n) => {
            // PE = (P1 + P2 + P3 + P4) / 4
            const pe = (n.P1 + n.P2 + n.P3 + n.P4) / 4;
            // PF = PE × 0.30 + EP × 0.30 + EF × 0.40
            return (0.30 * pe) + (0.30 * n.EP) + (0.40 * n.EF);
        }
    },

};
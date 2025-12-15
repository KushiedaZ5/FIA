/**
 * Catálogo de exámenes disponibles
 * Estructura: clave del curso -> tipo de examen -> array de ciclos disponibles
 * 
 * Ejemplo de nombre de archivo: MD-PC1-241.pdf
 * - MD = clave del curso (Matemática Discreta)
 * - PC1 = tipo de examen (Práctica Calificada 1)
 * - 241 = ciclo académico (2024-1)
 */

const examenesDisponibles = {
    // Matemática Discreta
    'MD': {
        'PC1': ['241'],  // MD-PC1-241.pdf existe
        'PC2': ['241'],
        'PC3': ['242'],
        'PC4': ['241'], // MD-PC2-241.pdf ✅ NUEVO
        'EF': ['241'], // MD-PC2-241.pdf ✅ NUEVO
        // Agrega más tipos y ciclos conforme subas PDFs
        // 'PC2': ['241', '242'],
        // 'PC3': ['241'],
        // 'PC4': ['241'],
        // 'EF': ['241']
    },
    'F1': {
        'PC1': ['241'],
        'LAB1': ['232'], // MD-PC1-241.pdf existe
        'LAB6': ['202'], // MD-PC2-241.pdf ✅ NUEVO
        // Agrega más tipos y ciclos conforme subas PDFs
        // 'PC2': ['241', '242'],
        // 'PC3': ['241'],
        // 'PC4': ['241'],
        // 'EF': ['241']
    },

    // Física 2 - Prof. Castro
    // Carpeta: pdfs/F2C/
    'F2C': {
        'PC1': ['241'],
        // Agrega tipos y ciclos conforme subas PDFs
        // 'PC1': ['241'],
        // 'PC2': ['241'],
        // 'EF': ['241']
    },

    // Física 2 - Prof. Tejada
    // Carpeta: pdfs/F2T/
    'F2T': {
        'PC1': ['241'],
        // Agrega tipos y ciclos conforme subas PDFs
        // 'PC1': ['241'],
        // 'PC2': ['241'],
        // 'EF': ['241']
    },

    // Geometría Analítica  
    // 'GA': {
    //     'PC1': ['241'],
    //     'EF': ['241']
    // },

    // Cálculo I
    // 'C1': {
    //     'PC1': ['241', '242'],
    //     'PC2': ['241'],
    //     'EF': ['241']
    // },

    // Agrega más cursos conforme subas PDFs...
};

/**
 * Función helper para verificar si existe un PDF
 * @param {string} clave - Clave del curso (ej: 'MD')
 * @param {string} tipo - Tipo de examen (ej: 'PC1')
 * @param {string} ciclo - Ciclo académico (ej: '241')
 * @returns {boolean}
 */
function existeExamen(clave, tipo, ciclo) {
    return examenesDisponibles[clave]?.[tipo]?.includes(ciclo) || false;
}

/**
 * Obtiene la URL del PDF
 * Nueva estructura: pdfs/CLAVE/TIPO-CICLO.pdf
 * Ejemplo: pdfs/MD/PC1-241.pdf
 * @param {string} clave - Clave del curso (será la carpeta)
 * @param {string} tipo - Tipo de examen
 * @param {string} ciclo - Ciclo académico
 * @returns {string} URL del PDF
 */
function getPdfUrl(clave, tipo, ciclo) {
    return `pdfs/${clave}/${tipo}-${ciclo}.pdf`;
}

/**
 * Obtiene todos los tipos de examen disponibles para un curso
 * @param {string} clave - Clave del curso
 * @returns {string[]} Array de tipos disponibles
 */
function getTiposDisponibles(clave) {
    if (!examenesDisponibles[clave]) return [];
    return Object.keys(examenesDisponibles[clave]);
}

/**
 * Obtiene todos los ciclos disponibles para un curso y tipo
 * @param {string} clave - Clave del curso
 * @param {string} tipo - Tipo de examen
 * @returns {string[]} Array de ciclos disponibles
 */
function getCiclosDisponibles(clave, tipo) {
    return examenesDisponibles[clave]?.[tipo] || [];
}

/**
 * Obtiene todos los cursos que tienen exámenes disponibles
 * @returns {string[]} Array de claves de cursos
 */
function getCursosConExamenes() {
    return Object.keys(examenesDisponibles);
}

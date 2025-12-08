// ============================================================================
// 🔐 AUTH.ALPINE.JS - Firebase Authentication + Firestore para Alpine.js
// ============================================================================
// Stack: No-Build (CDN) | Firebase v9 Modular | Alpine.js Component Pattern
// ============================================================================

// Importar Firebase desde CDN (ES Modules)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getAuth,
    signInWithPopup,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
    deleteDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// ============================================================================
// 🔧 CONFIGURACIÓN DE FIREBASE (PRODUCCIÓN)
// ============================================================================
const firebaseConfig = {
    apiKey: "AIzaSyAjkq47oLgfnUMfU_n-oOY_qsztkfvPau0",
    authDomain: "calculadorafiausmp.firebaseapp.com",
    projectId: "calculadorafiausmp",
    storageBucket: "calculadorafiausmp.firebasestorage.app",
    messagingSenderId: "764543904006",
    appId: "1:764543904006:web:abb540ab3d8db3987c9687"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Provider de Google
const googleProvider = new GoogleAuthProvider();

// ============================================================================
// 🌐 ALPINE.JS GLOBAL STORE - Estado compartido entre componentes
// ============================================================================
document.addEventListener('alpine:init', () => {

    // ========================================================================
    // STORE GLOBAL: authStore (accesible desde cualquier componente)
    // ========================================================================
    Alpine.store('auth', {
        // Estado del usuario
        user: null,
        loading: true,
        error: null,

        // Getters
        get isLoggedIn() {
            return this.user !== null;
        },
        get userName() {
            if (!this.user) return '';
            // Extraer primer nombre
            const fullName = this.user.displayName || '';
            return fullName.split(' ')[0] || 'Usuario';
        },
        get userPhoto() {
            return this.user?.photoURL || 'https://ui-avatars.com/api/?name=U&background=1E88E5&color=fff';
        },
        get userEmail() {
            return this.user?.email || '';
        },
        get userId() {
            return this.user?.uid || null;
        }
    });

    // ========================================================================
    // COMPONENTE: authSystem (para el header)
    // ========================================================================
    Alpine.data('authSystem', () => ({
        // Estado local del componente
        isLoggingIn: false,
        showDropdown: false,

        // Inicialización - Escuchar cambios de autenticación
        init() {
            onAuthStateChanged(auth, (user) => {
                Alpine.store('auth').user = user;
                Alpine.store('auth').loading = false;
                Alpine.store('auth').error = null;

                if (user) {
                    console.log('✅ Usuario autenticado:', user.displayName);
                } else {
                    console.log('👤 Usuario no autenticado');
                }
            });
        },

        // Login con Google (Popup)
        async login() {
            this.isLoggingIn = true;
            Alpine.store('auth').error = null;

            try {
                const result = await signInWithPopup(auth, googleProvider);
                console.log('🎉 Login exitoso:', result.user.displayName);
                this.showDropdown = false;
            } catch (error) {
                console.error('❌ Error en login:', error);
                Alpine.store('auth').error = this.getErrorMessage(error.code);
            } finally {
                this.isLoggingIn = false;
            }
        },

        // Logout
        async logout() {
            try {
                await firebaseSignOut(auth);
                this.showDropdown = false;
                console.log('👋 Sesión cerrada');
            } catch (error) {
                console.error('❌ Error en logout:', error);
            }
        },

        // Toggle dropdown de usuario
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },

        // Cerrar dropdown al hacer click fuera
        closeDropdown() {
            this.showDropdown = false;
        },

        // Mensajes de error amigables
        getErrorMessage(errorCode) {
            const messages = {
                'auth/popup-closed-by-user': 'Ventana cerrada. Intenta de nuevo.',
                'auth/network-request-failed': 'Error de conexión. Verifica tu internet.',
                'auth/cancelled-popup-request': 'Solicitud cancelada.',
                'auth/popup-blocked': 'Popup bloqueado. Permite popups para este sitio.'
            };
            return messages[errorCode] || 'Error desconocido. Intenta de nuevo.';
        }
    }));

    // ========================================================================
    // COMPONENTE: noteSaver (para guardar notas)
    // ========================================================================
    Alpine.data('noteSaver', () => ({
        // Estado local
        isSaving: false,
        saveStatus: null, // 'success' | 'error' | null
        lastSaved: null,

        // Guardar notas en Firestore
        async saveNotes(cursoData) {
            const authStore = Alpine.store('auth');

            // Verificar login
            if (!authStore.isLoggedIn) {
                // Trigger login si no está autenticado
                console.log('📝 Usuario no autenticado, iniciando login...');

                try {
                    await signInWithPopup(auth, googleProvider);
                    // Después del login exitoso, intentar guardar de nuevo
                    return this.saveNotes(cursoData);
                } catch (error) {
                    console.error('❌ Error en login para guardar:', error);
                    this.saveStatus = 'error';
                    return false;
                }
            }

            // Guardar en Firestore
            this.isSaving = true;
            this.saveStatus = null;

            try {
                const userId = authStore.userId;
                const cursoId = cursoData.cursoId;

                // Referencia al documento: users/{uid}/saved_notes/{cursoId}
                const noteRef = doc(db, 'users', userId, 'saved_notes', cursoId);

                // Datos a guardar
                const noteData = {
                    carrera: cursoData.carrera,
                    carreraNombre: cursoData.carreraNombre,
                    ciclo: cursoData.ciclo,
                    cursoId: cursoData.cursoId,
                    cursoNombre: cursoData.cursoNombre,
                    esquema: cursoData.esquema,
                    notas: cursoData.notas,
                    promedio: cursoData.promedio,
                    updatedAt: serverTimestamp(),
                    createdAt: cursoData.createdAt || serverTimestamp()
                };

                await setDoc(noteRef, noteData, { merge: true });

                this.saveStatus = 'success';
                this.lastSaved = new Date();
                console.log('💾 Notas guardadas:', cursoId);

                // Limpiar status después de 3 segundos
                setTimeout(() => {
                    this.saveStatus = null;
                }, 3000);

                return true;
            } catch (error) {
                console.error('❌ Error guardando notas:', error);
                this.saveStatus = 'error';
                return false;
            } finally {
                this.isSaving = false;
            }
        },

        // Cargar notas de un curso específico
        async loadNotes(cursoId) {
            const authStore = Alpine.store('auth');

            if (!authStore.isLoggedIn) {
                return null;
            }

            try {
                const userId = authStore.userId;
                const noteRef = doc(db, 'users', userId, 'saved_notes', cursoId);
                const noteSnap = await getDoc(noteRef);

                if (noteSnap.exists()) {
                    console.log('📂 Notas cargadas:', cursoId);
                    return noteSnap.data();
                } else {
                    console.log('📭 No hay notas guardadas para:', cursoId);
                    return null;
                }
            } catch (error) {
                console.error('❌ Error cargando notas:', error);
                return null;
            }
        },

        // Cargar todas las notas del usuario
        async loadAllNotes() {
            const authStore = Alpine.store('auth');

            if (!authStore.isLoggedIn) {
                return [];
            }

            try {
                const userId = authStore.userId;
                const notesRef = collection(db, 'users', userId, 'saved_notes');
                const notesSnap = await getDocs(notesRef);

                const notes = [];
                notesSnap.forEach((doc) => {
                    notes.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                console.log('📚 Total notas cargadas:', notes.length);
                return notes;
            } catch (error) {
                console.error('❌ Error cargando todas las notas:', error);
                return [];
            }
        },

        // Eliminar notas de un curso
        async deleteNotes(cursoId) {
            const authStore = Alpine.store('auth');

            if (!authStore.isLoggedIn) {
                return false;
            }

            try {
                const userId = authStore.userId;
                const noteRef = doc(db, 'users', userId, 'saved_notes', cursoId);
                await deleteDoc(noteRef);

                console.log('🗑️ Notas eliminadas:', cursoId);
                return true;
            } catch (error) {
                console.error('❌ Error eliminando notas:', error);
                return false;
            }
        }
    }));

    // ========================================================================
    // COMPONENTE: promedioGeneral (para la página de promedio ponderado)
    // ========================================================================
    Alpine.data('promedioGeneral', () => ({
        // Estado
        allNotes: [],
        isLoading: true,
        promedioSimple: 0,

        // Inicialización
        async init() {
            // Esperar a que el auth esté listo
            const checkAuth = () => {
                return new Promise((resolve) => {
                    const unsubscribe = onAuthStateChanged(auth, (user) => {
                        unsubscribe();
                        resolve(user);
                    });
                });
            };

            await checkAuth();
            await this.loadData();
        },

        // Cargar datos
        async loadData() {
            this.isLoading = true;
            const authStore = Alpine.store('auth');

            if (!authStore.isLoggedIn) {
                this.allNotes = [];
                this.isLoading = false;
                return;
            }

            try {
                const userId = authStore.userId;
                const notesRef = collection(db, 'users', userId, 'saved_notes');
                const notesSnap = await getDocs(notesRef);

                this.allNotes = [];
                notesSnap.forEach((doc) => {
                    this.allNotes.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                this.calcularPromedioSimple();
            } catch (error) {
                console.error('❌ Error cargando datos:', error);
            } finally {
                this.isLoading = false;
            }
        },

        // Calcular promedio simple
        calcularPromedioSimple() {
            if (this.allNotes.length === 0) {
                this.promedioSimple = 0;
                return;
            }

            const suma = this.allNotes.reduce((acc, note) => {
                return acc + (note.promedio || 0);
            }, 0);

            this.promedioSimple = suma / this.allNotes.length;
        },

        // Eliminar un curso
        async deleteCurso(cursoId) {
            const authStore = Alpine.store('auth');

            if (!authStore.isLoggedIn) return;

            try {
                const userId = authStore.userId;
                const noteRef = doc(db, 'users', userId, 'saved_notes', cursoId);
                await deleteDoc(noteRef);

                // Actualizar lista local
                this.allNotes = this.allNotes.filter(n => n.id !== cursoId);
                this.calcularPromedioSimple();

                console.log('🗑️ Curso eliminado:', cursoId);
            } catch (error) {
                console.error('❌ Error eliminando curso:', error);
            }
        },

        // Formatear fecha
        formatDate(timestamp) {
            if (!timestamp) return 'Sin fecha';

            // Firestore Timestamp
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

            return date.toLocaleDateString('es-PE', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }));
});

// ============================================================================
// 📤 EXPORTAR FUNCIONES PARA USO GLOBAL (opcional, para debugging)
// ============================================================================
window.firebaseAuth = {
    auth,
    db,
    signInWithPopup: () => signInWithPopup(auth, googleProvider),
    signOut: () => firebaseSignOut(auth)
};

console.log('🔥 Firebase Auth + Firestore inicializado correctamente');

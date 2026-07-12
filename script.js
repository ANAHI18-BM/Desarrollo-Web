/* ==========================================
   LINDA FASHION BOUTIQUE
   SEMANA 7: Plantillas y Contenido Dinámico
   Mantiene todas las validaciones de la Semana 6
========================================== */

// ---------- ELEMENTOS DEL FORMULARIO ----------
const formulario = document.getElementById("formularioRegistro");

const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const descripcion = document.getElementById("descripcion");
const talla = document.getElementById("talla");
const precio = document.getElementById("precio");
const estado = document.getElementById("estado");

const errorNombre = document.getElementById("errorNombre");
const errorCategoria = document.getElementById("errorCategoria");
const errorDescripcion = document.getElementById("errorDescripcion");
const errorTalla = document.getElementById("errorTalla");
const errorPrecio = document.getElementById("errorPrecio");
const errorEstado = document.getElementById("errorEstado");

const mensajeGeneral = document.getElementById("mensajeGeneral");
const listaPrendas = document.getElementById("listaPrendas");
const contenedorProductos = document.getElementById("contenedorProductos");
const mensajeSinProductos = document.getElementById("mensajeSinProductos");
const total = document.getElementById("total");

// ---------- DATOS ALMACENADOS EN ARREGLO (simula base de datos) ----------
let prendas = [
    {
        id: 1,
        nombre: "Vestido Floral Elegante",
        categoria: "Vestidos",
        descripcion: "Diseño suave y femenino, ideal para eventos especiales y reuniones.",
        talla: "M",
        precio: 45.99,
        estado: "Disponible",
        imagen: "imagenes/vestido.jpg"
    },
    {
        id: 2,
        nombre: "Blusa de Encaje Moderna",
        categoria: "Blusas",
        descripcion: "Confeccionada con materiales ligeros, combina comodidad y estilo.",
        talla: "S",
        precio: 29.99,
        estado: "Disponible",
        imagen: "imagenes/ropa3.jpg"
    },
    {
        id: 3,
        nombre: "Conjunto Formal",
        categoria: "Conjuntos",
        descripcion: "Conjunto completo para ocasiones formales, corte entallado y elegante.",
        talla: "L",
        precio: 62.50,
        estado: "Disponible", // ✅ Corregido: ahora se muestra correctamente
        imagen: "imagenes/ropa.jpg"
    }
];

// ======================================================
// FUNCIONES DE APOYO PARA MENSAJES Y ESTILOS
// ======================================================
function mostrarError(campo, contenedor, mensaje) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    contenedor.textContent = mensaje;
    contenedor.className = "mensaje-validacion error";
}

function mostrarExito(campo, contenedor, mensaje = "Campo válido.") {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    contenedor.textContent = mensaje;
    contenedor.className = "mensaje-validacion ok";
}

function limpiarEstadoCampo(campo, contenedor) {
    campo.classList.remove("is-valid", "is-invalid");
    contenedor.textContent = "";
    contenedor.className = "mensaje-validacion";
}

function limpiarFormulario() {
    formulario.reset();
    limpiarEstadoCampo(nombre, errorNombre);
    limpiarEstadoCampo(categoria, errorCategoria);
    limpiarEstadoCampo(descripcion, errorDescripcion);
    limpiarEstadoCampo(talla, errorTalla);
    limpiarEstadoCampo(precio, errorPrecio);
    limpiarEstadoCampo(estado, errorEstado);
}

function mostrarMensajeExito(texto) {
    mensajeGeneral.innerHTML = `<div class="alert alert-success text-center fw-bold">${texto}</div>`;
}

function mostrarMensajeError(texto) {
    mensajeGeneral.innerHTML = `<div class="alert alert-danger text-center fw-bold">${texto}</div>`;
}

// ======================================================
// ✨ FUNCIONES DE RENDERIZADO DINÁMICO
// ======================================================
// Renderiza la colección principal con bucle y condicionales
function renderizarColeccion() {
    contenedorProductos.innerHTML = "";

    // CONDICIÓN: Mostrar mensaje si no hay productos
    if (prendas.length === 0) {
        mensajeSinProductos.classList.remove("d-none");
        return;
    } else {
        mensajeSinProductos.classList.add("d-none");
    }

    // BUCLE: Generar tarjetas automáticamente
    prendas.forEach(prenda => {
        if (prenda.estado === "Disponible") {
            const tarjeta = document.createElement("div");
            tarjeta.className = "col-md-4";
            tarjeta.innerHTML = `
                <div class="card shadow h-100">
                    <img src="${prenda.imagen}" class="card-img-top" alt="${prenda.nombre}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${prenda.nombre}</h5>
                        <p class="card-text">${prenda.descripcion}</p>
                        <p class="precio-prenda">$${prenda.precio.toFixed(2)}</p>
                        <span class="badge bg-success">Disponible</span>
                    </div>
                </div>
            `;
            contenedorProductos.appendChild(tarjeta);
        }
    });
}

// Renderiza el listado completo de prendas registradas
function renderizarListadoPrendas() {
    listaPrendas.innerHTML = "";
    total.textContent = prendas.length;

    // CONDICIÓN: Mensaje si no hay registros
    if (prendas.length === 0) {
        listaPrendas.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    Aún no se han registrado prendas. ¡Agrega la primera desde el formulario!
                </div>
            </div>
        `;
        return;
    }

    // BUCLE: Generar todas las prendas
    prendas.forEach((prenda, index) => {
        let claseEstado = prenda.estado === "Disponible" ? "bg-success" : prenda.estado === "Agotado" ? "bg-danger" : "bg-warning text-dark";

        const columna = document.createElement("div");
        columna.className = "col-md-6 col-lg-4 mb-4";
        columna.innerHTML = `
            <div class="prenda-card p-4 h-100">
                <h5 class="text-center">${prenda.nombre}</h5>
                <span class="badge ${claseEstado} d-block text-center mb-3">${prenda.estado}</span>
                <p><strong>Categoría:</strong> ${prenda.categoria}</p>
                <p><strong>Descripción:</strong> ${prenda.descripcion}</p>
                <p><strong>Talla:</strong> ${prenda.talla}</p>
                <p class="precio-prenda"><strong>Precio:</strong> $${prenda.precio.toFixed(2)}</p>
                <button class="btn btn-danger w-100 mt-2" onclick="eliminarPrenda(${index})">Eliminar</button>
            </div>
        `;
        listaPrendas.appendChild(columna);
    });
}

// Función para eliminar prenda
function eliminarPrenda(indice) {
    prendas.splice(indice, 1);
    renderizarColeccion();
    renderizarListadoPrendas();
    mostrarMensajeError("Prenda eliminada correctamente.");
}

// ======================================================
// VALIDACIONES INDIVIDUALES (Semana 6)
// ======================================================
function validarNombre() {
    const valor = nombre.value.trim();
    if (valor === "") {
        mostrarError(nombre, errorNombre, "El nombre de la prenda es obligatorio.");
        return false;
    }
    if (valor.length < 4) {
        mostrarError(nombre, errorNombre, "El nombre debe tener al menos 4 caracteres.");
        return false;
    }
    mostrarExito(nombre, errorNombre, "Nombre válido.");
    return true;
}

function validarCategoria() {
    if (categoria.value === "") {
        mostrarError(categoria, errorCategoria, "Debe seleccionar una categoría.");
        return false;
    }
    mostrarExito(categoria, errorCategoria, "Categoría seleccionada correctamente.");
    return true;
}

function validarDescripcion() {
    const valor = descripcion.value.trim();
    if (valor === "") {
        mostrarError(descripcion, errorDescripcion, "La descripción es obligatoria.");
        return false;
    }
    if (valor.length < 10) {
        mostrarError(descripcion, errorDescripcion, "La descripción debe tener al menos 10 caracteres.");
        return false;
    }
    mostrarExito(descripcion, errorDescripcion, "Descripción válida.");
    return true;
}

function validarTalla() {
    if (talla.value === "") {
        mostrarError(talla, errorTalla, "Debe seleccionar una talla.");
        return false;
    }
    mostrarExito(talla, errorTalla, "Talla seleccionada correctamente.");
    return true;
}

function validarPrecio() {
    const valor = precio.value.trim();
    if (valor === "") {
        mostrarError(precio, errorPrecio, "El precio es obligatorio.");
        return false;
    }
    const precioNumero = parseFloat(valor);
    if (isNaN(precioNumero)) {
        mostrarError(precio, errorPrecio, "Ingrese un precio válido.");
        return false;
    }
    if (precioNumero <= 0) {
        mostrarError(precio, errorPrecio, "El precio debe ser mayor a 0.");
        return false;
    }
    mostrarExito(precio, errorPrecio, "Precio válido.");
    return true;
}

function validarEstado() {
    if (estado.value === "") {
        mostrarError(estado, errorEstado, "Debe seleccionar el estado de la prenda.");
        return false;
    }
    mostrarExito(estado, errorEstado, "Estado seleccionado correctamente.");
    return true;
}

function validarFormularioCompleto() {
    return validarNombre() && validarCategoria() && validarDescripcion() && validarTalla() && validarPrecio() && validarEstado();
}

// ======================================================
// EVENTO AL ENVIAR FORMULARIO
// ======================================================
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFormularioCompleto()) {
        mostrarMensajeError("Por favor, corrige los errores del formulario antes de registrar la prenda.");
        return;
    }

    // Crear nuevo objeto prenda
    const nuevaPrenda = {
        id: prendas.length + 1,
        nombre: nombre.value.trim(),
        categoria: categoria.value,
        descripcion: descripcion.value.trim(),
        talla: talla.value,
        precio: parseFloat(precio.value),
        estado: estado.value,
        imagen: "imagenes/ropa.jpg"
    };

    // Agregar al arreglo y actualizar vista
    prendas.push(nuevaPrenda);
    renderizarColeccion();
    renderizarListadoPrendas();

    mostrarMensajeExito("Prenda registrada correctamente en Linda Fashion Boutique.");
    limpiarFormulario();
});

// ======================================================
// VALIDACIONES DINÁMICAS EN TIEMPO REAL
// ======================================================
nombre.addEventListener("input", validarNombre);
nombre.addEventListener("blur", validarNombre);

descripcion.addEventListener("input", validarDescripcion);
descripcion.addEventListener("blur", validarDescripcion);

precio.addEventListener("input", validarPrecio);
precio.addEventListener("blur", validarPrecio);

categoria.addEventListener("change", validarCategoria);
categoria.addEventListener("blur", validarCategoria);

talla.addEventListener("change", validarTalla);
talla.addEventListener("blur", validarTalla);

estado.addEventListener("change", validarEstado);
estado.addEventListener("blur", validarEstado);

// ======================================================
// CARGAR DATOS AL INICIAR LA PÁGINA
// ======================================================
window.addEventListener("load", () => {
    renderizarColeccion();
    renderizarListadoPrendas();
});
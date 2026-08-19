const productos = [
  {
    nombre: "Cuaderno profesional",
    categoria: "escolar",
    precio: "$42",
    descripcion: "100 hojas, pasta dura y rayado clásico.",
  },
  {
    nombre: "Kit de colores 24 pz",
    categoria: "arte",
    precio: "$89",
    descripcion: "Colores de madera para escuela y dibujo.",
  },
  {
    nombre: "Folder tamaño carta",
    categoria: "oficina",
    precio: "$18",
    descripcion: "Organiza documentos con pestaña reforzada.",
  },
  {
    nombre: "Pluma gel negra",
    categoria: "escolar",
    precio: "$16",
    descripcion: "Tinta suave, ideal para apuntes diarios.",
  },
  {
    nombre: "Block de notas adhesivas",
    categoria: "oficina",
    precio: "$28",
    descripcion: "Recordatorios rápidos para escritorio.",
  },
  {
    nombre: "Set de acuarelas",
    categoria: "arte",
    precio: "$120",
    descripcion: "12 pastillas y pincel para empezar a pintar.",
  },
];

const lista = document.getElementById("productos-lista");
const chips = document.querySelectorAll(".chip");
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const form = document.getElementById("form-contacto");
const statusEl = document.getElementById("form-status");

document.getElementById("year").textContent = new Date().getFullYear();

function renderProductos(filtro) {
  const visibles =
    filtro === "todos"
      ? productos
      : productos.filter((item) => item.categoria === filtro);

  lista.innerHTML = visibles
    .map(
      (item) => `
      <article class="product-card">
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
        <span class="price">${item.precio}</span>
      </article>
    `
    )
    .join("");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((btn) => btn.classList.remove("is-active"));
    chip.classList.add("is-active");
    renderProductos(chip.dataset.filter);
  });
});

toggle.addEventListener("click", () => {
  const abierto = navLinks.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(abierto));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("is-open"));
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.className = "form-status";
  statusEl.textContent = "Enviando...";

  const data = Object.fromEntries(new FormData(form));

  try {
    const respuesta = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await respuesta.json();
    statusEl.textContent = json.mensaje;
    statusEl.classList.add(json.ok ? "ok" : "err");
    if (json.ok) form.reset();
  } catch {
    statusEl.textContent = "No se pudo enviar. Inténtalo de nuevo.";
    statusEl.classList.add("err");
  }
});

renderProductos("todos");

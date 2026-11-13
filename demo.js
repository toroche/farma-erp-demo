const modules = [
  ["Inventario", [["productos", "Productos"], ["lotes", "Lotes e inventario"], ["kardex", "Kardex"]]],
  ["Compras", [["ordenes", "Órdenes de compra"], ["recepcion", "Recepción técnica"]]],
  ["Ventas", [["pedidos", "Pedidos y preventa"], ["facturacion", "Facturación"]]],
  ["Calidad", [["termico", "Control térmico"], ["retiros", "Retiros y trazabilidad"]]],
  ["Documentación", [["poes", "POES y manuales"], ["validacion", "Expediente de validación"]]],
  ["Administración", [["usuarios", "Usuarios"], ["empresa", "Empresa y RUC"]]],
];

const lots = [
  ["MED-001", "Solución salina 0,9 %", "DEMO-101", "30/06/2027", "120", "Disponible"],
  ["MED-002", "Paracetamol 500 mg", "DEMO-205", "31/08/2027", "80", "Disponible"],
  ["DIS-001", "Jeringa estéril 5 mL", "DEMO-309", "30/09/2027", "60", "Cuarentena"],
];
const screens = {
  resumen: ["Resumen de inventario", "Existencias y estado de los lotes del ejemplo.", ["Código", "Producto", "Lote", "Caducidad", "Saldo", "Estado"], lots],
  productos: ["Productos", "Catálogo de medicamentos y dispositivos.", ["Código", "Producto", "Tipo", "Unidad"], [
    ["MED-001", "Solución salina 0,9 %", "Medicamento", "Frasco"],
    ["MED-002", "Paracetamol 500 mg", "Medicamento", "Caja"],
    ["DIS-001", "Jeringa estéril 5 mL", "Dispositivo", "Unidad"],
  ]],
  lotes: ["Lotes e inventario", "Consulta las existencias por lote, caducidad y estado.", ["Código", "Producto", "Lote", "Caducidad", "Saldo", "Estado"], lots],
  kardex: ["Kardex", "Entradas, liberaciones y salidas registradas por lote.", ["Referencia", "Lote", "Movimiento", "Cantidad", "Saldo"], [
    ["PED-DEMO-01", "DEMO-101", "Despacho FEFO", "−20", "120"],
    ["REC-DEMO-01", "DEMO-101", "Liberación", "0", "140"],
    ["REC-DEMO-01", "DEMO-101", "Recepción", "+140", "140"],
  ]],
  ordenes: ["Órdenes de compra", "Seguimiento de cantidades pedidas y recibidas.", ["Orden", "Proveedor", "Producto", "Pedido", "Recibido"], [
    ["OC-DEMO-01", "Proveedor de ejemplo", "Solución salina 0,9 %", "140", "140"],
    ["OC-DEMO-02", "Proveedor de ejemplo", "Jeringa estéril 5 mL", "60", "60"],
  ]],
  recepcion: ["Recepción técnica", "Estado del checklist y de la recepción documental.", ["Recepción", "Orden", "Lote", "Estado"], [
    ["REC-DEMO-01", "OC-DEMO-01", "DEMO-101", "Aprobada internamente"],
    ["REC-DEMO-02", "OC-DEMO-02", "DEMO-309", "En revisión"],
  ]],
  pedidos: ["Pedidos y preventa", "Pedidos de ejemplo y su estado de despacho.", ["Pedido", "Cliente", "Cantidad", "Estado"], [["PED-DEMO-01", "Cliente de ejemplo", "20", "Despachado"]]],
  facturacion: ["Facturación", "Borradores de documentos internos de ejemplo.", ["Documento", "Pedido", "Cliente", "Estado"], [["DOC-DEMO-01", "PED-DEMO-01", "Cliente de ejemplo", "Borrador interno"]]],
  termico: ["Control térmico", "Bitácora de lecturas de ejemplo.", ["Referencia", "Ubicación", "Lectura", "Estado"], [["TEMP-DEMO-01", "Bodega de ejemplo", "22,5 °C", "En rango"], ["TEMP-DEMO-02", "Ruta de ejemplo", "9,2 °C", "Excursión"]]],
  retiros: ["Retiros y trazabilidad", "Bloqueos y referencias a pedidos afectados.", ["Referencia", "Lote", "Pedido relacionado", "Estado"], [["RET-DEMO-01", "DEMO-309", "Sin despachos", "En revisión"]]],
  poes: ["POES y manuales", "Procedimientos y sus revisiones.", ["Código", "Procedimiento", "Capítulo", "Revisión"], [["POE-DEMO-01", "Limpieza de bodega", "Infraestructura", "01"], ["POE-DEMO-02", "Recepción de productos", "Operaciones", "01"]]],
  validacion: ["Expediente de validación", "Ejemplos de registros para seguimiento de pruebas.", ["Referencia", "Prueba", "Etapa", "Estado"], [["VAL-DEMO-01", "Bloqueo de lote en cuarentena", "OQ", "Borrador"]]],
  usuarios: ["Usuarios", "Perfiles de acceso ilustrativos.", ["Usuario", "Nombre", "Perfil", "Estado"], [["demo-admin", "Administrador de ejemplo", "Administrador", "Activo"], ["demo-operacion", "Operador de ejemplo", "Operación", "Activo"], ["demo-calidad", "Calidad de ejemplo", "Calidad", "Activo"]]],
  empresa: ["Empresa y RUC", "Datos institucionales ilustrativos.", ["Razón social", "Identificación", "Sucursal"], [["Distribuidora de ejemplo", "RUC de demostración", "Principal"]]],
};

const nav = document.querySelector("nav");
const view = document.querySelector("#view");
const links = new Map();
function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content) node.textContent = content;
  return node;
}
function addLink(parent, id, label) {
  const link = element("a", "nav", label);
  link.href = "#" + id;
  links.set(id, link);
  link.addEventListener("click", () => closeMenus());
  parent.append(link);
}
function closeMenus(except) {
  for (const details of nav.querySelectorAll("details")) {
    if (details !== except) details.open = false;
  }
}
addLink(nav, "resumen", "Resumen");
for (const [label, entries] of modules) {
  const details = element("details", "module-group");
  const list = element("div", "module-list");
  details.append(element("summary", "nav", label + " ⌄"), list);
  for (const [id, name] of entries) addLink(list, id, name);
  details.addEventListener("toggle", () => { if (details.open) closeMenus(details); });
  nav.append(details);
}
document.addEventListener("click", (event) => { if (!nav.contains(event.target)) closeMenus(); });
nav.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const open = nav.querySelector("details[open]");
    open?.querySelector("summary")?.focus();
    closeMenus();
  }
});

function render() {
  const requested = location.hash.slice(1);
  const id = links.has(requested) ? requested : "resumen";
  const [title, description, headers, rows] = screens[id];
  for (const [key, link] of links) {
    if (key === id) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
    link.closest("details")?.querySelector("summary").classList.remove("active");
  }
  links.get(id).closest("details")?.querySelector("summary").classList.add("active");
  const heading = element("div", "page-head");
  const text = element("div");
  const titleNode = element("h1", "", title);
  titleNode.id = "view-title";
  text.append(titleNode, element("p", "", description));
  heading.append(text);
  view.replaceChildren(heading);
  if (id === "resumen") {
    const stats = element("div", "stats");
    for (const [label, value] of [["Productos", "3"], ["Lotes", "3"], ["Lotes disponibles", "2"], ["Lotes en cuarentena", "1"]]) {
      const stat = element("div", "stat");
      stat.append(element("span", "", label), element("strong", "", value));
      stats.append(stat);
    }
    view.append(stats);
  }
  const panel = element("div", "panel demo-panel");
  const toolbar = element("div", "demo-toolbar");
  const input = element("input");
  input.type = "search";
  input.placeholder = "Buscar en esta vista";
  input.setAttribute("aria-label", "Buscar en esta vista");
  toolbar.append(input);
  const scroll = element("div", "table-scroll");
  const table = element("table");
  const header = table.createTHead().insertRow();
  for (const name of headers) {
    const cell = element("th", "", name);
    cell.scope = "col";
    header.append(cell);
  }
  const body = table.createTBody();
  const empty = element("p", "demo-empty", "No se encontraron registros.");
  empty.setAttribute("role", "status");
  function fill() {
    const query = input.value.trim().toLocaleLowerCase("es");
    body.replaceChildren();
    for (const row of rows.filter((row) => row.some((value) => value.toLocaleLowerCase("es").includes(query)))) {
      const entry = body.insertRow();
      for (const value of row) {
        const cell = entry.insertCell();
        if (value === "Disponible" || value === "Cuarentena") {
          cell.append(element("span", "badge " + (value === "Disponible" ? "available" : "quarantine"), value));
        } else cell.textContent = value;
      }
    }
    empty.hidden = body.rows.length > 0;
  }
  input.addEventListener("input", fill);
  fill();
  scroll.append(table);
  panel.append(toolbar, scroll, empty);
  view.append(panel);
}
window.addEventListener("hashchange", render);
render();

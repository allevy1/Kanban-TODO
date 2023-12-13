const todo = document.querySelector("#todo");
const doing = document.querySelector("#doing");
const done = document.querySelector("#done");
const button = document.querySelector("#button");
const inputTitulo = document.querySelector("#tituloNovaTarefa");
const inputDescricao = document.querySelector("#descricaoNovaTarefa");
const columns = document.querySelectorAll(".column");
const excluir = document.querySelectorAll(".buttonExcluir");

let tarefas = JSON.parse(localStorage.getItem("todos")) ?? [];

console.log(tarefas);

tarefas.forEach(function (e) {
  createItem(e.Titulo, e.Descricao, e.Estado);
});

button.addEventListener("click", () => {
  if (inputTitulo.value == "" || inputDescricao.value == "") {
    alert("Algum campo não foi descrito");
    return;
  }
  const tarefa = {
    Titulo: inputTitulo.value,
    Descricao: inputDescricao.value,
    Estado: "todo",
  };

  tarefas.push(tarefa);

  localStorage.setItem("todos", JSON.stringify(tarefas));
  createItem(tarefa.Titulo, tarefa.Descricao, "todo");
  inputDescricao.value = "";
  inputTitulo.value = "";
});

function createItem(tituloParametro, descricaoParametro, estado) {
  const item = document.createElement("div");
  item.draggable = true;
  item.classList.add("item");

  const titulo = document.createElement("h3");
  titulo.classList.add("titulo");
  titulo.innerText = tituloParametro;

  item.appendChild(titulo);
  item.appendChild(document.createElement("hr"));

  const descricao = document.createElement("p");
  descricao.classList.add("descricao");
  descricao.innerText = descricaoParametro;
  item.appendChild(descricao);

  const btExcluir = document.createElement("button");
  btExcluir.classList.add("buttonExcluir");
  btExcluir.innerText = "Excluir";
  btExcluir.addEventListener("click", () => {
    tarefas = tarefas.filter((element) => {
      if (
        element.Titulo == tituloParametro &&
        element.Descricao == descricaoParametro
      )
        return false;
      else return true;
    });
    localStorage.setItem("todos", JSON.stringify(tarefas));
    item.remove();
  });

  item.appendChild(btExcluir);

  if (estado == "todo") todo.appendChild(item);
  if (estado == "doing") doing.appendChild(item);
  if (estado == "done") done.appendChild(item);
}

document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item")) e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    if (dragging) {
      item.append(dragging);
      const estado = item.id;
      const titulo = dragging.children[0].innerText;
      const desc = dragging.children[2].innerText;
      tarefas.forEach(function (e) {
        if (e.Titulo == titulo && e.Descricao == desc) {
          e.Estado = estado;
          localStorage.setItem("todos", JSON.stringify(tarefas));
        }
      });
    }
  });
});

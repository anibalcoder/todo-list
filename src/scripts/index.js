// Obtener elementos involucrados
const TASK_CREATE_BTN = document.querySelector('#tasks__create');
const TASK_TEXT_FIELD = document.querySelector('#tasks__textfield');
const TASKS_LIST = document.querySelector('#tasks__list');

// Guardar las tareas en localStorage
function saveTasksToLocalStorage() {
  const TASKS_NODE = TASKS_LIST.querySelectorAll('.tasks__item');
  // Transformar el NodeList en Array y por cada iteración se obtiene el HTML completo del elemento
  const TASKS_ARRAY = Array.from(TASKS_NODE).map(task => task.outerHTML);
  /**
   * JSON.stringify conviertes el array de strings en una única cadena de texto que representa un objeto JSON.
   * Permitiendo su almacenamiento en local ya que los arrays y objetos JavaScript no pueden ser directamente 
   * almacenados en el local.
   */
  localStorage.setItem('tasks', JSON.stringify(TASKS_ARRAY));
}

// Pintar las tareas almacenadas en local
function renderTasksFromLocalStorage() {
  // Convertir la  cadena JSON en un objeto JavaScript para manipular.
  const TASKS = JSON.parse(localStorage.getItem('tasks'));
  
  if(TASKS){
    // Si existe, recorre cada tarea en el arreglo TASKS
    TASKS.forEach(task => {
      // Agrega cada tarea al contenido HTML de la lista de tareas (TASKS_LIST)
      TASKS_LIST.innerHTML += task;
    });
  }
}

// Cargar tareas almacenadas en localStorage al cargar la página
document.addEventListener('DOMContentLoaded', renderTasksFromLocalStorage);

// Crear una nueva tarea
function createTask(){
  // Validar que el campo no esté vacío
  if(!TASK_TEXT_FIELD.value) return alert("Por favor, escribe una tarea.");

  // Crear un nuevo elemento para la tarea
  const NEW_TASK = document.createElement('li');
  NEW_TASK.classList.add('tasks__item');

  // Plantilla literal para el contenido de la tarea
  const taskContent = `
  <span class="tasks__text">${TASK_TEXT_FIELD.value}</span>
  <div class="tasks__actions">
    <button type="button" class="tasks__action tasks__action--checked" title="Tachar">✅</button>
    <button type="button" class="tasks__action tasks__action--delete" title="Eliminar">❎</button>
  </div>
  `;

  // Agregar contenido a la tarea
  NEW_TASK.innerHTML = taskContent;
  // Agregar nueva tarea a la lista
  TASKS_LIST.appendChild(NEW_TASK);
  // Limpiar el campo de texto
  TASK_TEXT_FIELD.value = '';
  // Guardar las tareas en localStorage
  saveTasksToLocalStorage()
}

// Escuchar eventos clic y teclado para crear una tarea
TASK_CREATE_BTN.addEventListener('click', createTask);
TASK_TEXT_FIELD.addEventListener('keydown', (e) =>{
  if (e.key === 'Enter') return createTask();
})

// Eliminar tarea
TASKS_LIST.addEventListener('click', (e) =>{
  // Verificar si se hace clic en un botón de eliminación de tarea
  if(e.target.classList.contains('tasks__action--delete')){
    // Obtener el elemento de lista de la tarea y eliminarlo
    const TASK = e.target.closest('.tasks__item');
    TASKS_LIST.removeChild(TASK);
  }

  // Guardar las tareas actualizadas en localStorage
  saveTasksToLocalStorage();
})

// Marcar una tarea como completada
TASKS_LIST.addEventListener('click', (e) =>{
  // Verificar si se hace clic en un botón de tachar tarea
  if(e.target.classList.contains('tasks__action--checked')){
    // Obtener el texto de la tarea asociada al botón de tachar
    const TASK__TEXT = e.target.closest('.tasks__item').querySelector('.tasks__text');
    // Agrega o quitar la clase "checked" y aplica estilos en consecuencia.
    const CHECKED = TASK__TEXT.classList.toggle('checked');
    CHECKED ? TASK__TEXT.style.textDecoration = "2px line-through" : TASK__TEXT.style.textDecoration = "none";
    // Mantener las tareas completadas o no completadas en local
    saveTasksToLocalStorage();
  }
})
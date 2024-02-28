// Elementos involucrados
const THEMES = document.querySelectorAll('.theme-switcher__btn');
const SUN_ICON = document.querySelector('#sunIcon');
const MOON_ICON = document.querySelector('#moonIcon');

// Función para alternar la visibilidad de los iconos
function updateIcons(showIcon, hideIcon){
  showIcon.style.display = "block";
  hideIcon.style.display = "none";
}

// Iterar por cada botón y agregar evento de clic para alternar el tema y guardar en localStorage.
for (let theme of THEMES){
  theme.addEventListener('click', () =>{
    const BODY_CLASS = document.body.classList.toggle('dark');

    // Guardando en la clase en localStorage
    localStorage.setItem('dark-mode', document.body.classList.contains('dark').toString());

    // Actualizar iconos
    if (BODY_CLASS) return updateIcons(MOON_ICON, SUN_ICON);
    return updateIcons(SUN_ICON, MOON_ICON);
  })
}

// Restaurar el tema desde localStorage al cargar la página
if (localStorage.getItem('dark-mode') === 'true'){
  document.body.classList.add('dark');
  updateIcons(MOON_ICON, SUN_ICON);
}
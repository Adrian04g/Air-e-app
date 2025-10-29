document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        sidebar.classList.add('sidebar-visible');
        sidebar.classList.remove('sidebar-collapsed');
        if (window.innerWidth <= 768) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar-visible');
        sidebar.classList.add('sidebar-collapsed');
        if (window.innerWidth <= 768) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    toggleBtn.addEventListener('click', function () {
        if (sidebar.classList.contains('sidebar-visible')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    overlay.addEventListener('click', function () {
        closeSidebar();
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            overlay.classList.remove('active');
            sidebar.classList.add('sidebar-visible');
            sidebar.classList.remove('sidebar-collapsed');
            document.body.style.overflow = '';
        } else {
            sidebar.classList.remove('sidebar-visible');
            sidebar.classList.add('sidebar-collapsed');
        }
    });
});

// Agregar al final de tu script.js actual
// Mejorar los botones de colapso en móviles
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que Bootstrap se inicialice
    setTimeout(function() {
        const collapseElements = document.querySelectorAll('.collapse');
        
        collapseElements.forEach(collapse => {
            const button = document.querySelector(`[href="#${collapse.id}"]`);
            
            if (button) {
                const buttonText = button.querySelector('.btn-text');
                const buttonIcon = button.querySelector('.btn-icon');
                
                // Evento cuando se muestra el colapso
                collapse.addEventListener('shown.bs.collapse', function() {
                    if (buttonText) buttonText.textContent = 'Ocultar detalles';
                    if (buttonIcon) buttonIcon.textContent = '▲';
                    button.classList.remove('btn-outline-secondary');
                    button.classList.add('btn-primary');
                });
                
                // Evento cuando se oculta el colapso
                collapse.addEventListener('hidden.bs.collapse', function() {
                    if (buttonText) buttonText.textContent = 'Ver más detalles';
                    if (buttonIcon) buttonIcon.textContent = '▼';
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-outline-secondary');
                });
            }
        });
    }, 100);
});
// Script para el filtro de los departamentos
const municipios = {
    atlantico: [
        'Baranoa', 'Barranquilla', 'Candelaria', 'Galapa', 'Juan de Acosta', 'Luruaco',
        'Malambo', 'Manatí', 'Piojo', 'Palmar de Varela', 'Ponedera', 'Puerto Colombia',
        'Polonuevo', 'Repelón', 'Sabanagrande', 'Sabanalarga', 'Santa Lucía', 'Santo Tomás',
        'Soledad', 'Suan', 'Tubará', 'Usiacurí'
    ],
    magdalena: [
        'Algarrobo', 'Aracataca', 'Ariguaní', 'Cerro de San Antonio',
        'Chibolo', 'Ciénaga', 'Concordia', 'El Banco', 'El Piñón', 'El Retén',
        'Fundación', 'Guamal', 'Nueva Granada', 'Pedraza', 'Pijiño del Carmen', 'Pivijay',
        'Plato', 'Puebloviejo', 'Remolino', 'Sabanas de San Ángel', 'Salamina', 'San Zenón',
        'Santa Ana', 'Santa Bárbara de Pinto', 'Santa Marta', 'Sitionuevo', 'Tenerife',
        'Zapayán', 'Zona Bananera'
    ],
    la_guajira: [
        'Riohacha', 'Maicao', 'Fonseca', 'Albania', 'Barrancas', 'Dibulla', 'Distracción',
        'El Molino', 'Hatonuevo', 'La Jagua del Pilar', 'Manaure', 'San Juan del Cesar',
        'Uribia', 'Urumita', 'Villanueva'
    ]
};
// Obtener los elementos select
const departamentoSelect = document.getElementById('id_departamento');
const municipioSelect = document.getElementById('id_municipio');

// Agregar un "event listener" al select de departamento
departamentoSelect.addEventListener('click', (event) => {
  // Limpiar las opciones anteriores del select de municipio
    municipioSelect.innerHTML = '<option value="">Seleccione un municipio...</option>';


  // Obtener el valor del departamento seleccionado
  const departamentoSeleccionado = event.target.value;

  if (departamentoSeleccionado) {
    // Obtener el array de municipios para el departamento seleccionado
    const Municipios = municipios[departamentoSeleccionado].sort();

    // Recorrer el array y agregar las opciones al select de municipio
    Municipios.forEach(municipio => {
      const newOption = document.createElement('option');
      newOption.value = municipio;
      newOption.textContent = municipio;
      municipioSelect.appendChild(newOption);
    });
  }
});
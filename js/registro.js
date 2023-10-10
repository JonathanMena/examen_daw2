// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Define una clase Paciente para representar objetos de pacientes
    class Paciente {
        constructor(nombre, fechaNacimiento, departamento, municipio, tipoDocumento, numeroDocumento, telefono, motivoConsulta) {
            this.nombre = nombre;
            this.fechaNacimiento = fechaNacimiento;
            this.departamento = departamento;
            this.municipio = municipio;
            this.tipoDocumento = tipoDocumento;
            this.numeroDocumento = numeroDocumento;
            this.telefono = telefono;
            this.motivoConsulta = motivoConsulta;
        }
    }

    // Función para guardar un paciente en el almacenamiento local (localStorage)
    function guardarPaciente(paciente) {
        // Obtén la lista actual de pacientes desde el almacenamiento local o crea una lista vacía si no existe
        let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        // Agrega el nuevo paciente a la lista
        pacientes.push(paciente);
        // Guarda la lista actualizada de pacientes en el almacenamiento local
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
    }

    // Función para eliminar un paciente de la lista y actualizar el almacenamiento local
    function eliminarPaciente(index) {
        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        // Elimina el paciente en la posición especificada (index) de la lista
        pacientes.splice(index, 1);
        // Actualiza la lista de pacientes en el almacenamiento local
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
        // Llama a la función mostrarPacientes para actualizar la tabla de pacientes en la página
        mostrarPacientes();
    }

    // Función para mostrar la lista de pacientes en una tabla en la página
    function mostrarPacientes() {
        // Obtiene el elemento de la tabla de pacientes desde el documento HTML
        const pacienteList = document.getElementById("patientList");
        // Limpia cualquier contenido existente en la tabla
        pacienteList.innerHTML = "";

        // Obtiene la lista de pacientes desde el almacenamiento local o crea una lista vacía si no existe
        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

        // Itera a través de la lista de pacientes y crea filas en la tabla para cada paciente
        pacientes.forEach((paciente, index) => {
            const row = document.createElement("tr");
            // Llena la fila con información del paciente y agrega un botón de eliminar
            row.innerHTML = `
                <td>${paciente.nombre}</td>
                <td>${paciente.fechaNacimiento}</td>
                <td>${paciente.departamento}, ${paciente.municipio}</td>
                <td>${paciente.tipoDocumento}</td>
                <td>${paciente.numeroDocumento}</td>
                <td>${paciente.telefono}</td>
                <td>${paciente.motivoConsulta}</td>
                <td><button onclick="eliminarPaciente(${index})">Eliminar</button></td>
            `;
            // Agrega la fila a la tabla de pacientes
            pacienteList.appendChild(row);
        });
    }

    // Llama a la función mostrarPacientes para mostrar la lista de pacientes al cargar la página
    mostrarPacientes();

    // Obtiene el formulario de entrada de datos de paciente desde el documento HTML
    const patientForm = document.getElementById("patientForm");

    // Agrega un evento de escucha al formulario para capturar la información del paciente cuando se envía
    patientForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que el formulario se envíe normalmente y recargue la página

        // Obtiene los valores de entrada del formulario
        const nombre = document.getElementById("nombre").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const departamento = document.getElementById("departamento").value;
        const municipio = document.getElementById("municipio").value;
        const tipoDocumento = document.getElementById("tipoDocumento").value;
        const numeroDocumento = document.getElementById("numeroDocumento").value;
        const telefono = document.getElementById("telefono").value;
        const motivoConsulta = document.getElementById("motivoConsulta").value;

        // Crea un objeto Paciente con los valores ingresados
        const paciente = new Paciente(
            nombre,
            fechaNacimiento,
            departamento,
            municipio,
            tipoDocumento,
            numeroDocumento,
            telefono,
            motivoConsulta
        );

        // Llama a la función guardarPaciente para almacenar el nuevo paciente en el almacenamiento local
        guardarPaciente(paciente);
        // Llama a la función mostrarPacientes para actualizar la tabla de pacientes en la página
        mostrarPacientes();

        // Limpia el formulario después de guardar el paciente
        patientForm.reset();
    });
});

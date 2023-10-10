document.addEventListener("DOMContentLoaded", function () {
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

    function guardarPaciente(paciente) {
        let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        pacientes.push(paciente);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
    }

    function eliminarPaciente(index) {
        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        pacientes.splice(index, 1);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
        mostrarPacientes();
    }

    function mostrarPacientes() {
        const pacienteList = document.getElementById("patientList");
        pacienteList.innerHTML = "";

        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

        pacientes.forEach((paciente, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${paciente.nombre}</td>
                <td>${paciente.fechaNacimiento}</td>
                <td>${paciente.departamento}, ${paciente.municipio}</td>
                <td>${paciente.tipoDocumento}</td>
                <td>${paciente.numeroDocumento}</td>
                <td>${paciente.telefono}</td>
                <td>${paciente.motivoConsulta}</td>
                <td><button class="eliminar-btn" data-index="${index}">Eliminar</button></td>
            `;
            pacienteList.appendChild(row);
        });

        // Agrega un evento delegado para manejar las eliminaciones
        pacienteList.addEventListener("click", function (e) {
            if (e.target.classList.contains("eliminar-btn")) {
                const index = e.target.getAttribute("data-index");
                e.stopPropagation(); // Detiene la propagación del evento
                eliminarPaciente(index);
            }
        });
    }

    mostrarPacientes();

    const patientForm = document.getElementById("patientForm");

    patientForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const departamento = document.getElementById("departamento").value;
        const municipio = document.getElementById("municipio").value;
        const tipoDocumento = document.getElementById("tipoDocumento").value;
        const numeroDocumento = document.getElementById("numeroDocumento").value;
        const telefono = document.getElementById("telefono").value;
        const motivoConsulta = document.getElementById("motivoConsulta").value;

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

        guardarPaciente(paciente);
        mostrarPacientes();

        patientForm.reset();
    });
});

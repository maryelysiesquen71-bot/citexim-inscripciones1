// Variable global para almacenar temporalmente los datos del formulario
let currentRegistrationData = null;

function openSummaryModal(formData) {
    // Guardar los datos actuales para poder enviarlos al confirmar
    currentRegistrationData = formData;

    const modal = document.getElementById('summary-modal');
    const content = document.getElementById('modal-body-content');

    let attendeesHtml = '<ol style="padding-left:20px; margin:5px 0;">';
    formData.attendees.forEach(att => {
        attendeesHtml += `<li><strong>${att.nombre}</strong> (${att.correo} - Tel: ${att.telefono})</li>`;
    });
    attendeesHtml += '</ol>';

    content.innerHTML = `
        <div style="background:#f8fafc; padding:15px; border-radius:8px; line-height:1.6; font-size:0.95rem;">
            <p style="margin:4px 0;"><strong>Responsable:</strong> ${formData.buyerName}</p>
            <p style="margin:4px 0;"><strong>Correo de contacto:</strong> ${formData.buyerEmail}</p>
            <p style="margin:4px 0;"><strong>Tipo de entrada:</strong> ${formData.ticketName}</p>
            <p style="margin:4px 0;"><strong>Cantidad:</strong> ${formData.quantity}</p>
            <p style="margin:4px 0;"><strong>Precio unitario:</strong> S/ ${formData.unitPrice.toFixed(2)}</p>
            <p style="margin:4px 0;"><strong>Total a pagar:</strong> <span style="color:#0b2545; font-weight:bold;">S/ ${formData.totalPrice.toFixed(2)}</span></p>
            <p style="margin:4px 0;"><strong>Comprobante:</strong> ${formData.fileName}</p>
            <hr style="border:0; border-top:1px solid #e2e8f0; margin:10px 0;">
            <p style="margin:4px 0;"><strong>Lista de Asistentes:</strong></p>
            ${attendeesHtml}
        </div>
    `;

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('summary-modal');
    if (modal) modal.style.display = 'none';
}

// Escuchador de clic para el botón CONFIRMAR INSCRIPCIÓN
document.addEventListener('DOMContentLoaded', () => {
    // Busca el botón por ID (Asegúrate de que en index.html tu botón azul tenga id="btn-confirm-modal" o "btn-confirm-final")
    const btnConfirm = document.getElementById('btn-confirm-modal') || document.getElementById('btn-confirm-final');

    if (btnConfirm) {
        btnConfirm.addEventListener('click', async () => {
            if (!currentRegistrationData) {
                alert('No hay datos para procesar.');
                return;
            }

            // Cambiar estado del botón mientras procesa
            btnConfirm.disabled = true;
            btnConfirm.textContent = 'Procesando inscripción...';

            try {
                // Verificar si la función de la API existe en api.js
                if (typeof submitRegistration === 'function') {
                    await submitRegistration(currentRegistrationData);
                } else {
                    console.log('Datos enviados (Simulación):', currentRegistrationData);
                }

                alert('¡Inscripción registrada con éxito!');
                closeModal();
                window.location.reload(); // Recargar la página tras el registro exitoso

            } catch (error) {
                console.error('Error al registrar:', error);
                alert('Hubo un error al procesar el registro. Inténtalo de nuevo.');
                btnConfirm.disabled = false;
                btnConfirm.textContent = 'CONFIRMAR INSCRIPCIÓN';
            }
        });
    }
});
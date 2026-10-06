// ==============================================
// ENVÍO DE DATOS AL WEBHOOK DE MAKE.COM
// ==============================================

async function submitRegistration(formData) {
    if (typeof CONFIG === 'undefined' || !CONFIG.apiEndpoint) {
        throw new Error("No se ha configurado la URL del Webhook (apiEndpoint).");
    }

    // Convertir el archivo a Base64 si existe para poder enviarlo en el JSON
    const fileInput = document.getElementById('payment-receipt');
    let fileBase64 = null;

    if (fileInput && fileInput.files[0]) {
        fileBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(fileInput.files[0]);
        });
    }

    // Estructura completa enviada a Make
    const payloadToSend = {
        ...formData,
        fileData: fileBase64 // Incluye el archivo en Base64
    };

    // Petición HTTP POST hacia Make
    const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payloadToSend)
    });

    if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
    }

    return await response.text();
}

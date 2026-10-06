// ==============================================
// ENVÍO DE DATOS AL WEBHOOK DE GOOGLE APPS SCRIPT
// ==============================================

async function submitRegistration(formData) {
    if (typeof CONFIG === 'undefined' || !CONFIG.apiEndpoint) {
        throw new Error("No se ha configurado la URL del Webhook (apiEndpoint).");
    }

    const fileInput = document.getElementById('payment-receipt');
    let fileBase64 = null;
    let fileName = "";
    let fileType = "";

    if (fileInput && fileInput.files[0]) {
        const file = fileInput.files[0];
        fileName = file.name;
        fileType = file.type;

        fileBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    // Estructura adaptada para los nombres que espera Apps Script
    const payloadToSend = {
        ...formData,
        fileBase64: fileBase64,
        fileName: fileName,
        fileType: fileType
    };

    // Petición HTTP POST hacia Google Apps Script
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

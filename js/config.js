// ==============================================
// EDITAR AQUÍ LOS DATOS CENTRALES DEL EVENTO
// ==============================================
const CONFIG = {
    evento: {
        nombre: "CITEXIM 10ma Edición",
        logo: "assets/images/logo.png",
        favicon: "assets/images/favicon.png"
    },

    entradas: [
        {
            id: "basico",
            nombre: "BÁSICO",
            precios: { default: 30.00 },
            beneficios: ["Certificado virtual", "Participación en sorteos de becas"]
        },
        {
            id: "vip",
            nombre: "VIP",
            precios: { 1: 59.00, 5: 55.00, 20: 49.00 },
            beneficios: ["Certificado físico y virtual", "Kit de bienvenida VIP"]
        },
        {
            id: "premium",
            nombre: "PREMIUM",
            precios: { 1: 129.00, 5: 119.00, 20: 99.00 },
            beneficios: ["Certificado físico y virtual", "Kit PREMIUM", "Merch"]
        }
    ],

    pago: {
        banco: "BCP Soles",
        cuenta: "19113494951062",
        cci: "00219111349495106258",
        titular: "Kevin Y. Vilca"
    },

    comprobante: {
        tiposPermitidos: ['image/jpeg', 'image/png', 'application/pdf'],
        tamanoMaximoMB: 5
    },

    apiEndpoint: "https://script.google.com/macros/s/AKfycbxEka_OtNgdSrgMxd1DXKi5b0clpvG2ha5Ml0KpuPVMX3Y0KTAwaiauaxFTo3cRtxip/exec"
};

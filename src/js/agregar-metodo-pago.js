// Simulando los métodos de pago cargados desde el archivo JSON
let paymentMethods = [
    {
        "id": 1,
        "numero_tarjeta": "1234 5678 9012 3456",
        "fecha_expiracion": "12/25",
        "cvv": "123"
    }
];

// Función para mostrar los métodos de pago
function loadPaymentMethods() {
    const paymentMethodsDiv = document.getElementById('payment-methods');
    paymentMethodsDiv.innerHTML = ''; // Limpiar contenido previo

    paymentMethods.forEach(method => {
        const methodDiv = document.createElement('div');
        methodDiv.classList.add('payment-method');
        methodDiv.innerHTML = `
            <p>Número de Tarjeta: ${method.numero_tarjeta}</p>
            <p>Fecha de Expiración: ${method.fecha_expiracion}</p>
            <button onclick="editPaymentMethod(${method.id})">Editar</button>
            <button onclick="deletePaymentMethod(${method.id})">Eliminar</button>
        `;
        paymentMethodsDiv.appendChild(methodDiv);
    });
}

// Función para agregar un nuevo método de pago
function addPaymentMethod() {
    document.getElementById('payment-form').style.display = 'block';
    clearForm();
}

// Función para editar un método de pago
function editPaymentMethod(id) {
    const method = paymentMethods.find(m => m.id === id);
    if (method) {
        document.getElementById('payment-form').style.display = 'block';
        document.getElementById('card-number').value = method.numero_tarjeta;
        document.getElementById('card-expery').value = method.fecha_expiracion;
        document.getElementById('card-cvv').value = method.cvv;
        document.getElementById('save-payment-method').setAttribute('data-id', id);
    }
}

// Función para guardar o actualizar un método de pago
document.getElementById('save-payment-method').addEventListener('click', function() {
    const id = this.getAttribute('data-id');
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expery').value;
    const cardCVV = document.getElementById('card-cvv').value;

    if (id) {
        // Actualizar método de pago existente
        const method = paymentMethods.find(m => m.id == id);
        if (method) {
            method.numero_tarjeta = cardNumber;
            method.fecha_expiracion = cardExpiry;
            method.cvv = cardCVV;
        }
    } else {
        // Agregar nuevo método de pago
        const newId = paymentMethods.length ? paymentMethods[paymentMethods.length - 1].id + 1 : 1;
        paymentMethods.push({
            id: newId,
            numero_tarjeta: cardNumber,
            fecha_expiracion: cardExpiry,
            cvv: cardCVV
        });
    }

    loadPaymentMethods();
    document.getElementById('payment-form').style.display = 'none';
    clearForm();
});

// Función para eliminar un método de pago
function deletePaymentMethod(id) {
    paymentMethods = paymentMethods.filter(method => method.id !== id);
    loadPaymentMethods();
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('card-number').value = '';
    document.getElementById('card-expery').value = '';
    document.getElementById('card-cvv').value = '';
    document.getElementById('save-payment-method').removeAttribute('data-id');
}

// Función para cancelar la edición/agregar
document.getElementById('cancel-payment').addEventListener('click', function() {
    document.getElementById('payment-form').style.display = 'none';
    clearForm();
});

// Cargar métodos de pago al iniciar
document.getElementById('add-payment-method').addEventListener('click', addPaymentMethod);
window.onload = loadPaymentMethods;

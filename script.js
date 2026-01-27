function handleKeyPress(event) {
    if (event.key === 'Enter') { sendMessage(); }
}

function sendMessage() {
    const inputField = document.getElementById('userInput');
    const userText = inputField.value.trim();
    if (userText === "") return;

    addMessage(userText, 'user-message');
    inputField.value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(userText.toLowerCase());
        addMessage(botResponse, 'bot-message');
    }, 500);
}

function addMessage(text, className) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = text; 
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

/* --- BASE DE CONOCIMIENTO --- */
function getBotResponse(input) {
    
    // 1. ALTA CEDENTE APOLO
    if (input.includes('alta cedente') || (input.includes('apolo') && input.includes('alta'))) {
        return `<strong>PROCEDIMIENTO: ALTA CEDENTE APOLO</strong><br>
                Para registrar al cedente en sistema:<br>
                1. Ingresar a Módulo de Riesgos > Alta de Clientes.<br>
                2. Carga obligatoria: RFC, Acta Constitutiva y Poderes.<br>
                <strong>Importante:</strong> Validar listas negras antes de iniciar.`;
    }
    
    // 3. GRUPO APOLO
    else if (input.includes('grupo apolo')) {
        return `<strong>DEFINICIÓN: GRUPO APOLO</strong><br>
                Segmento Corporativo / Gran Pyme.<br>
                <strong>Criterio:</strong> Ventas anuales > $20 MDP.<br>
                <strong>Beneficio:</strong> Tasa preferencial y dictamen en 24 hrs.`;
    }

    // 2. GRUPO RENTABILIDAD
    else if (input.includes('rentabilidad')) {
        return `<strong>CRITERIO: GRUPO RENTABILIDAD</strong><br>
                Empresas con margen EBITDA positivo últimos 2 ejercicios.<br>
                <strong>Acción:</strong> Si la rentabilidad cae < 10%, solicitar aval con bien raíz libre de gravamen.`;
    }

    // 4. VISITA OCULAR EXTERNA (TABLA 6x3)
    else if (input.includes('externa')) {
        return `<strong>MATRIZ DE RIESGO: VISITA EXTERNA</strong><br>
                Validación cruzada de 6 factores:<br>
                
                <table class="chat-table">
                    <thead>
                        <tr>
                            <th>Monto</th>
                            <th>Cliente</th>
                            <th>Antigüedad</th>
                            <th>Garantía</th>
                            <th>Buró</th>
                            <th>¿Visita?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>< $500k</td>
                            <td>Nuevo</td>
                            <td>< 2 años</td>
                            <td>Sin Aval</td>
                            <td>Regular</td>
                            <td><strong>SÍ</strong></td>
                        </tr>
                        <tr>
                            <td>> $500k</td>
                            <td>Recurrente</td>
                            <td>> 5 años</td>
                            <td>Hipotecaria</td>
                            <td>Bueno</td>
                            <td>NO</td>
                        </tr>
                        <tr>
                            <td>Cualquiera</td>
                            <td>Cualquiera</td>
                            <td>Cualquiera</td>
                            <td>Cualquiera</td>
                            <td>Malo/Alertas</td>
                            <td><strong>SÍ</strong></td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <em>Nota: Cualquier alerta en listas negras detona visita obligatoria.</em>`;
    }

    // 5. VISITA OCULAR INTERNA
    else if (input.includes('interna')) {
        return `<strong>CHECKLIST: VISITA OCULAR INTERNA</strong><br>
                Requerida para montos > $500k:<br>
                <ul>
                    <li>Verificar maquinaria (núm. serie).</li>
                    <li>Inventario físico vs. contable.</li>
                    <li>Personal activo en planta.</li>
                </ul>`;
    }

    // 6. TASA MÁXIMA
    else if (input.includes('tasa máxima') || input.includes('tasa maxima')) {
        return `<strong>POLÍTICA DE RIESGO: TASA MÁXIMA</strong><br>
                Tope autorizado: <strong>45% anual</strong>.<br>
                Solicitudes con riesgo que exijan tasa mayor deben ser declinadas.`;
    }

    /* --- SECCIÓN DE COMISIONES (NUEVA) --- */

    // 7. APERTURA
    else if (input.includes('apertura')) {
        return `<strong>TABULADOR: COMISIÓN POR APERTURA</strong><br>
                Costo único por disposición:<br>
                <ul>
                    <li><strong>Pre-aprobados:</strong> 1%</li>
                    <li><strong>NAFIN:</strong> 0%</li>
                    <li><strong>Bancomext:</strong> 2%</li>
                    <li><strong>Tradicional:</strong> 2%</li>
                </ul>`;
    }

    // 8. PREPAGO
    else if (input.includes('prepago') || input.includes('anticipado')) {
        return `<strong>POLÍTICA DE PREPAGO</strong><br>
                Penalización por liquidación anticipada:<br>
                <ul>
                    <li><strong>Tasa Variable:</strong> 0% (Sin costo).</li>
                    <li><strong>Tasa Fija:</strong> Ver hoja de comisiones (Sujeto a cálculo de quebranto).</li>
                </ul>`;
    }

    // 9. MENÚ COMISIONES (General)
    else if (input.includes('comision') || input.includes('costo')) {
        return `<strong>CONSULTA DE COMISIONES</strong><br>
                Seleccione el tipo de comisión a consultar (Escriba la opción):<br>
                <br>
                1. <strong>Apertura</strong> (Ver porcentajes).<br>
                2. <strong>Prepago</strong> (Ver condiciones).`;
    }

    // SALUDO
    else if (input.includes('hola') || input.includes('menu')) {
        return "Sistema activo. Consultas: Alta Apolo, Rentabilidad, Visita Externa, Tasa Máxima, Comisiones.";
    }

    // ERROR
    else {
        return "<strong>Consulta no válida.</strong><br>Verifique terminología en manual operativo.";
    }
}

// 1. Lógica de las partículas de fondo (Three.js)
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 5000; i++) {
    vertices.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ 
    color: 0x00b4ff, 
    size: 0.02, 
    transparent: true, 
    opacity: 0.6 
});
const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
    renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
animate();

// 2. Lógica para mostrar las tarjetas al hacer clic (LO QUE ME ACABAS DE MANDAR)
function mostrarDetalle(plan) {
    const modal = document.getElementById('modal-venta');
    const titulo = document.getElementById('titulo-modal');
    const contenido = document.getElementById('contenido-modal');

    titulo.innerText = "Plan " + plan;
    
    let detalles = "";
    if (plan === 'Deportista') {
        detalles = "<ul><li>Monitoreo de rendimiento</li><li>Monitoreo de pasos</li><li>Registro de intensidad de entrenamiento</li></ul>";
    } else if (plan === 'Niños') {
        detalles = "<ul><li>Botón de llamada de emergencia</li><li>Mensajes directos con la familia</li><li>Nivel de batería en tiempo real</li></ul>";
    } else if (plan === 'Adulto Mayor') {
        detalles = "<ul><li>Detección de caídas</li><li>Monitoreo de salud constante</li><li>Alertas a cuidadores</li></ul>";
    } else if (plan === 'Familiar') {
        detalles = "<ul><li>Sincronización de todos los dispositivos</li><li>Control centralizado para el hogar</li><li>Protección grupal</li></ul>";
    }

    contenido.innerHTML = detalles;
    modal.style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal-venta').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-venta');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
function mostrarDetalle(plan) {
    const modal = document.getElementById('modal-venta');
    const titulo = document.getElementById('titulo-modal');
    const contenido = document.getElementById('contenido-modal');

    titulo.innerText = "Plan " + plan;
    
    // Añadimos un pequeño emoji o icono según el plan para que se vea más "pro"
    let icono = "";
    if (plan === 'Deportista') icono = "⚡";
    else if (plan === 'Niños') icono = "🛡️";
    else if (plan === 'Adulto Mayor') icono = "❤️";
    else if (plan === 'Familiar') icono = "🏠";

    let detalles = `<h2>${icono}</h2>`; // Esto pone el icono arriba

    if (plan === 'Deportista') {
        detalles += "<ul><li>Monitoreo de rendimiento</li><li>Monitoreo de pasos</li><li>Registro de intensidad</li></ul>";
    } else if (plan === 'Niños') {
        detalles += "<ul><li>Botón de llamada de emergencia</li><li>Mensajes directos con la familia</li><li>Nivel de batería en tiempo real</li></ul>";
    } else if (plan === 'Adulto Mayor') {
        detalles += "<ul><li>Detección de caídas</li><li>Monitoreo de salud constante</li><li>Alertas a cuidadores</li></ul>";
    } else if (plan === 'Familiar') {
        detalles += "<ul><li>Sincronización de todos los dispositivos</li><li>Control centralizado para el hogar</li><li>Protección grupal</li></ul>";
    }

    contenido.innerHTML = detalles;
    modal.style.display = 'block';
}
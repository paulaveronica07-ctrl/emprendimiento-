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
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


function mostrarDetalle(plan) {
    const modal = document.getElementById('modal-venta');
    const titulo = document.getElementById('titulo-modal');
    const contenido = document.getElementById('contenido-modal');

    // Buscamos la tarjeta clicada para obtener su imagen
    const tarjetas = document.querySelectorAll('.plan-card');
    let imagenSrc = "";
    
    tarjetas.forEach(tarjeta => {
        if (tarjeta.querySelector('h3').innerText === plan) {
            imagenSrc = tarjeta.querySelector('.medusa-img').src;
        }
    });

    titulo.innerText = "Plan " + plan;
    
    let detallesHTML = `
        <img src="${imagenSrc}" class="modal-medusa-img" alt="${plan}">
        <div class="detalles-lista">
    `;

    if (plan === 'Deportista') {
        detallesHTML += "<ul><li>Monitoreo de rendimiento</li><li>Monitoreo de pasos</li><li>Registro de intensidad</li></ul>";
    } else if (plan === 'Niños') {
        detallesHTML += "<ul><li>Botón de llamada de emergencia</li><li>Mensajes directos con la familia</li><li>Nivel de batería en tiempo real</li></ul>";
    } else if (plan === 'Adulto Mayor') {
        detallesHTML += "<ul><li>Detección de caídas</li><li>Monitoreo de salud constante</li><li>Alertas a cuidadores</li></ul>";
    } else if (plan === 'Familiar') {
        detallesHTML += "<ul><li>Sincronización de todos los dispositivos</li><li>Control centralizado para el hogar</li><li>Protección grupal</li></ul>";
    }
    
    detallesHTML += "</div>";
    contenido.innerHTML = detallesHTML;
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
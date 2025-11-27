function ofertas() {
    const el3 = document.getElementById('p3');
    const el4 = document.getElementById('p4');
    const boton = document.getElementById('botonoferta');

    if (el3.classList.contains('oculto')) {
    
        el3.classList.remove('oculto');
        el4.classList.remove('oculto');
        boton.textContent = 'Sale%';
    } else {
    
        el3.classList.add('oculto');
        el4.classList.add('oculto');
        boton.textContent = 'Mostrar todos';
    }
}

function catalogo() {
    const catalog = document.getElementById("botonoferta");

    catalog.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.btn-like');

    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.producto');
            const productId = productElement.getAttribute('data-product-id');
            const countElement = productElement.querySelector('.count-like');

            handleLike(productId, countElement);
        });
    });
});

function handleLike(productId, countElement) {

    let currentLikes = parseInt(countElement.textContent);
    currentLikes++;
    countElement.textContent = currentLikes;

    
}

contador = document.getElementById('contadorcarrito')


function añadir(){
    valor = contador.textContent
        contador.textContent = parseInt(valor) + 1
    
}


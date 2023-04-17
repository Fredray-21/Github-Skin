const closeBtn = document.getElementById('close-btn');
const myDiv = document.getElementById('div-customize');
closeBtn.addEventListener('click', () => {
    myDiv.style.display = 'none';
});
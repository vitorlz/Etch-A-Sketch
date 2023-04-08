const gridContainer = document.querySelector('.gridContainer');
const grid = document.createElement('div');
const gridSize = document.querySelector('.gridSize');
const clear = document.querySelector('.clear');
const colorInput = document.querySelector('input');
const gridSlide = document.querySelector('.gridInput');
const gridCurrent = document.querySelector('.gridCurrent');
const rainbow = document.querySelector('.rainbow');
grid.classList.add('grid');
let color = 'white';
let lastColor = 'white';
let gridSizeInput = 16;
let gridSq = gridSlide.value * gridSlide.value;
let mouseDown = false;
let click = false;
let mouseover = false;
let last = false;
gridSlide.value = 16;
gridCurrent.textContent = `Grid size: 16 x 16`;

let rC1;
let rC2;
let rC3;
let randomColor;

function getRandomColor(){
    rC1 = Math.floor(Math.random() * 255);
    rC2 = Math.floor(Math.random() * 255);
    rC3 = Math.floor(Math.random() * 255);
    return `rgb(${rC1}, ${rC2}, ${rC3})`;
}





clear.addEventListener('click', (e) => {
    gridBlocks.forEach((block) => {
        block.style.backgroundColor = 'white';
    })
})

while (gridContainer.childElementCount < 256){
    gridContainer.appendChild(grid.cloneNode(true));
}
let gridBlocks = document.querySelectorAll('.grid');


const buttons = document.querySelectorAll('button');

gridSlide.addEventListener('input', (e) => {
    gridCurrent.textContent = `Grid size: ${gridSlide.value} x ${gridSlide.value}`;
})

draw();

gridSlide.addEventListener('change', (e) => {
    gridSq = gridSlide.value * gridSlide.value;
    while(gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild)
    }
    while (gridContainer.childElementCount < gridSq){
    gridContainer.appendChild(grid.cloneNode(true));
    }
    
    gridBlocks = document.querySelectorAll('.grid');
    
    draw();
})
       
function draw(){
    gridBlocks.forEach((block) => {
        
        block.style.height = `${640/gridSlide.value}px`;
        block.style.width = `${640/gridSlide.value}px`
        
        block.addEventListener('mousedown',(e) => {
            mouseDown = true; 

        })
        block.addEventListener('mouseup', (e) => {
            mouseDown = false;
            last = true;
        })
        
        block.addEventListener('mouseover', (e) => {
            if(mouseDown && !rainbow.checked){
                block.style.backgroundColor = `${colorInput.value}`;
            }
            else if(mouseDown && rainbow.checked){
                block.style.backgroundColor = getRandomColor();
            }
        })
        block.addEventListener('mouseenter', (e) => {
            last = false;
            if(!mouseDown && !rainbow.checked){
                lastColor = window.getComputedStyle(e.target).getPropertyValue('background-color');
                block.style.backgroundColor = `${colorInput.value}`;
            }
            else if(!mouseDown && rainbow.checked){
                lastColor = window.getComputedStyle(e.target).getPropertyValue('background-color');
                block.style.backgroundColor = getRandomColor();
            }
        })
        block.addEventListener('mouseleave', (e) => {
            if(!mouseDown && !last){   
                block.style.backgroundColor = `${lastColor}`;
            }
            
        })
    })
}



/// Add shading, re-add eraser.




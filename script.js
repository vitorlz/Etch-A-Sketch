const gridContainer = document.querySelector('.gridContainer');
const grid = document.createElement('div');
const gridSize = document.querySelector('.gridSize');
const clear = document.querySelector('.clear');
const colorInput = document.querySelector('input');
const gridSlide = document.querySelector('.gridInput');
const gridCurrent = document.querySelector('.gridCurrent');
const rainbow = document.querySelector('.rainbow');
const eraser = document.querySelector('.eraser');
grid.classList.add('grid');
const shading = document.querySelector('.shading');
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
    randomColor = `rgb(${rC1}, ${rC2}, ${rC3})`;
    return randomColor;
}

function shade(){
    let lastColorArray = lastColor.split(',');
    let firstRGBValue = lastColorArray[0].split('').filter(n => {
        return n === '0' || Number(n);
    }).join('');
    let lastRGBvalue = lastColorArray[lastColorArray.length - 1].replace(')', '');
    let shadedRBGValues = [firstRGBValue * 0.9, lastColorArray[1] * 0.9,  lastRGBvalue * 0.9]
    let shadedColor = `rgb(${shadedRBGValues.join(',')})`;
    return shadedColor;

}

rainbow.addEventListener('click', e => {
    if(rainbow.checked){
        shading.checked = false;
        eraser.checked = false;
    }
    else if(shading.checked || eraser.checked){
        rainbow.checked === false;
    }
})

shading.addEventListener('click', e => {
    if(shading.checked){
        rainbow.checked = false;
        eraser.checked = false;
    }
    else if(rainbow.checked || eraser.checked){
        shading.checked = false;
    }
})

eraser.addEventListener('click', e => {
    if(eraser.checked){
        rainbow.checked = false;
        shading.checked = false;
    }
    else if(rainbow.checked || shading.checked){
        eraser.checked = false;
    }
})

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
            if(mouseDown && shading.checked && !eraser.checked){
                block.style.backgroundColor = shade();
            }
            else if(mouseDown && !rainbow.checked && !shading.checked && eraser.checked){
                block.style.backgroundColor = 'rgb(255,255,255)';
            }
            
        })
        block.addEventListener('mouseup', (e) => {
            mouseDown = false;
            last = true;
        })
        
        block.addEventListener('mouseover', (e) => {
            if(mouseDown && !rainbow.checked && !shading.checked && !eraser.checked){
                block.style.backgroundColor = `${colorInput.value}`;
            }
            else if(mouseDown && rainbow.checked && !shading.checked && !eraser.checked){
                block.style.backgroundColor = getRandomColor();
            }
            else if(mouseDown && !rainbow.checked && !shading.checked && eraser.checked){
                block.style.backgroundColor = 'rgb(255,255,255)';
            }
        })
        block.addEventListener('mouseenter', (e) => {
            last = false;
            lastColor = window.getComputedStyle(e.target).getPropertyValue('background-color');
            if(!mouseDown && !rainbow.checked && !shading.checked && !eraser.checked){
                block.style.backgroundColor = `${colorInput.value}`;
            }
            else if(!mouseDown && rainbow.checked && !shading.checked && !eraser.checked){
                block.style.backgroundColor = getRandomColor();
            }
            else if(mouseDown && shading.checked && !eraser.checked){
                block.style.backgroundColor = shade();
            }
            else if(mouseDown && !rainbow.checked && !shading.checked && eraser.checked){
                block.style.backgroundColor = 'rgb(255,255,255)';
            }
        })
        block.addEventListener('mouseleave', (e) => {
            if(!mouseDown && !last && !shading.checked){   
                block.style.backgroundColor = `${lastColor}`;
            }
            
        })
    })
}



/// Add shading, re-add eraser.




const gridContainer = document.querySelector('.gridContainer');
const grid = document.createElement('div');
const gridSize = document.querySelector('.gridSize');
grid.classList.add('grid');
let color = 'white';
let lastColor = 'white';
let gridSizeInput = 16;
let gridSq = gridSizeInput * gridSizeInput;

gridContainer.appendChild(grid);



while (gridContainer.childElementCount < gridSq){
    gridContainer.appendChild(grid.cloneNode(true));
}
let gridBlocks = document.querySelectorAll('.grid');


const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        color = button.classList.value;
    })
})

draw();

gridSize.addEventListener('click', (e) => {
    gridSizeInput = +prompt("Choose the size of the grid: ? x ? \nMinimum: 8x8 \nMaximum: 100x100");
    gridSq = gridSizeInput * gridSizeInput;
    if(gridSizeInput <= 100 && gridSizeInput >= 8){
       while(gridContainer.firstChild){
            gridContainer.removeChild(gridContainer.lastChild)
        }
       while (gridContainer.childElementCount < gridSq){
        gridContainer.appendChild(grid.cloneNode(true));
        }
        
        gridBlocks = document.querySelectorAll('.grid');
        
        draw();
       
    }

})





function draw(){
    gridBlocks.forEach((block) => {
        block.style.height = `${640/gridSizeInput}px`;
        block.style.width = `${640/gridSizeInput}px`
        block.addEventListener('mouseenter', (e) => {
            lastColor = window.getComputedStyle(e.target).getPropertyValue('background-color');
            block.style.backgroundColor = `${color}`;
        })
        block.addEventListener('mouseleave', (e) => {
            block.style.backgroundColor = `${lastColor}`;
        })
        block.addEventListener('mousedown',(e) => {
            lastColor = color;
            block.style.backgroundColor = `${color}`;
            console.log(e);
            
        })
            
        
    })

    
}



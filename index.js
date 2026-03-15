const parentElement = document.querySelector('.parent-element')
const childs = parentElement.querySelectorAll('.child')
const resizeBars = []

parentElement.style.minWidth = '50%'  
const parentSize = getSize(parentElement)
const initialIndividualSize = parentSize / childs.length

function getResizeBar(item) {
	return item.querySelector('.resize-panel')
}

function getSize(element) {
	return element.offsetWidth
}

function resize(curEle, size) {
	curEle.style.width = `${size}px`	
}

function setInitialSize(item, size) {
	item.style.minWidth = size
	item.style.width = size
}

let initialPos;
let finalPos;
let isGrabbed = false;
let currentElement;

childs.forEach( child => setInitialSize(child, initialIndividualSize) )
childs.forEach( child => {
	const resizeBar = child.querySelector('.resize-bar')
	
	resizeBar.addEventListener('mousedown', (e) => {
		e.preventDefault()
		isGrabbed = true
		initialPos = e.clientX
		currentElement = child
	})
})

document.addEventListener('mousemove', e => {
	if (!isGrabbed) return

	finalPos = e.clientX
})

document.addEventListener('mouseup', e => {
	const childSize = currentElement.offsetWidth 
	const diff = finalPos - initialPos 

	const newSize = childSize + diff

	currentElement.style.width = newSize
	
	isGrabbed = false
	currentElement = undefined
})


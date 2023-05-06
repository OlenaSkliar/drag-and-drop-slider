let x = window.matchMedia("(min-width: 768px) and (max-width: 991px)"),
    y = window.matchMedia("(max-width: 768px)");
let sliderMedia = document.querySelector('.slider');
if (sliderMedia){
    if (x.matches){
        document.querySelectorAll('.slider-item-cart').forEach(i=>{
            i.style.width = (i.closest('.slider-container').offsetWidth-250)/2 + 'px'
        })
        document.querySelector('.slider').style.height = document.querySelector('.slider .slider-items').offsetHeight + 'px'
    }else if (y.matches){
        document.querySelectorAll('.slider-item-cart').forEach(i=>{
            i.style.width = i.closest('.slider-container').offsetWidth-70 + 'px'
        })
        document.querySelector('.slider').style.height = document.querySelector('.slider .slider-items').offsetHeight + 'px'
    }
}

document.querySelectorAll('.pagination .long-line').forEach(l=>{
    l.style.width = (document.querySelector('.pagination').offsetWidth-4)/3 + 'px'
})

let sliderContainer = document.querySelector('.slider-container'),
    slider = document.querySelector('.slider-items');
if (slider) {
    let sliderWidth = document.querySelector('.slider').offsetWidth,
        _startX = 0,
        _startY = 0,
        _offsetX = 0,
        _offsetY = 0,
        _dragElement;

    function OnMouseMove(event) {
        if (!
            (
                // якщо драггінг відбувається не в межах контейнера то нічого не робити
                (event.clientX >= sliderContainer.getBoundingClientRect().left) &&
                (event.clientX < sliderContainer.getBoundingClientRect().right) &&
                (event.clientY >= sliderContainer.getBoundingClientRect().top) &&
                (event.clientY < sliderContainer.getBoundingClientRect().bottom)
            )
        ) return;
        let _offsetXMove = document.querySelector('.slider-items').offsetLeft;
        let  _offsetYMove = document.querySelector('.slider-items').offsetTop;

        if (event.clientX > _startX && _offsetXMove >= 0 && _offsetYMove >= 0) {
            _dragElement.style.left = 0 + 'px';
        } else if (event.clientX < _startX && _offsetXMove <= -_dragElement.offsetWidth + sliderContainer.offsetWidth -200 && _offsetYMove >= 0) {
            _dragElement.style.left = -_dragElement.offsetWidth + sliderContainer.offsetWidth -200 + 'px';
        } else if (event.clientX > _startX && _offsetXMove >= 0 && _offsetYMove <= -_dragElement.offsetHeight + sliderContainer.offsetHeight) {
            _dragElement.style.left = 0 + 'px';
        } else if (event.clientX < _startX && _offsetXMove <= -_dragElement.offsetWidth + sliderContainer.offsetWidth -200 && _offsetYMove <= -_dragElement.offsetHeight + sliderContainer.offsetHeight) {
            _dragElement.style.left = -_dragElement.offsetWidth + sliderContainer.offsetWidth -200 + 'px';
        } else if (event.clientY < _startY && _offsetYMove <= -_dragElement.offsetHeight + sliderContainer.offsetHeight) {
            _dragElement.style.left = (_offsetX + event.clientX - _startX) + 'px';
        } else if (event.clientY > _startY && _offsetYMove >= 0) {
            _dragElement.style.left = (_offsetX + event.clientX - _startX) + 'px';
        } else if (event.clientX < _startX && _offsetXMove <= -_dragElement.offsetWidth + sliderContainer.offsetWidth -200) {
            _dragElement.style.left = -_dragElement.offsetWidth + sliderContainer.offsetWidth -200 + 'px';
        } else if (event.clientX > _startX && _offsetXMove >= 0) {
            _dragElement.style.left = 0 + 'px';
        } else {
            _dragElement.style.left = (_offsetX + event.clientX - _startX) + 'px';
        }


        let line1 = document.querySelector('.pagination .line-1'),
            line2 = document.querySelector('.pagination .line-2'),
            line3 = document.querySelector('.pagination .line-3');

        if (Math.abs(_offsetXMove) >= ((_dragElement.offsetWidth-sliderWidth)/3)*2){
            line1.classList.remove('active');
            line2.classList.remove('active');
            line3.classList.add('active');
        }else if(Math.abs(_offsetXMove) >= (_dragElement.offsetWidth-sliderWidth)/3){
            line1.classList.remove('active');
            line3.classList.remove('active');
            line2.classList.add('active');
        }else if (Math.abs(_offsetXMove) <= (_dragElement.offsetWidth-sliderWidth)/3){
            line2.classList.remove('active');
            line3.classList.remove('active');
            line1.classList.add('active');
        }
    }
    function OnMouseDown(event) {
        slider.style.transition = '0s';
        document.onmousemove = OnMouseMove;

        if (!
            (
                // якщо драггінг відбувається не в межах контейнера то нічого не робити
                (event.clientX >= sliderContainer.getBoundingClientRect().left) &&
                (event.clientX < sliderContainer.getBoundingClientRect().right) &&
                (event.clientY >= sliderContainer.getBoundingClientRect().top) &&
                (event.clientY < sliderContainer.getBoundingClientRect().bottom)
            )
        ) return;


        _startX = event.clientX;
        _startY = event.clientY;
        _offsetX = document.querySelector('.slider-items').offsetLeft;
        _offsetY = document.querySelector('.slider-items').offsetTop;
        _dragElement = document.querySelector('.slider-items');
        _dragElement.style.cursor = 'grab';
        _dragElement.style.userSelect = 'none'

    }
    function OnMouseUp(event) {
        if (!
            (
                // якщо драггінг відбувається не в межах контейнера то нічого не робити
                (event.clientX >= sliderContainer.getBoundingClientRect().left) &&
                (event.clientX < sliderContainer.getBoundingClientRect().right) &&
                (event.clientY >= sliderContainer.getBoundingClientRect().top) &&
                (event.clientY < sliderContainer.getBoundingClientRect().bottom)
            )
        ) return;
        // document.body.style.overflow = 'auto';
        _dragElement.style.cursor = 'default';
        document.onmousemove = null;
        _dragElement = null
    }


    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
}
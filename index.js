console.log('%cpixel\n-cool',
`
display: inline-block;
font-size: 19px;
font-family: consolas;
background: blue;
padding: 2px;
color: #fff;
width: 50px;
height: 50px;
line-height: 25px;
border-bottom: 3px solid red;
`, 'oh! pix so cool!');

const _opt = {
  color: '#000000',
  bg: '#777777',
  row: 15,
  col: 15
}
let $paint = document.querySelector('.paint');

!(() => {
  let total = _opt.row * _opt.col;
  let html = '';
  for (let i = 0; i < total; i++) {
    html += `<div class="pixel"></div>`;
  }
  $paint.innerHTML = html;
})();

let $pixel = document.querySelectorAll('.pixel');
let $color = document.querySelector('.color-picker');
let $bg = document.querySelector('.bg');
let $clear = document.querySelector('.clear');

var color = $color.value = _opt.color;
var bg = $bg.value = _opt.bg;

function draw(e) {
  e.target.style.background = color;
}

function resetBg() {
  $paint.style.background = bg;
}

function clear() {
  $pixel.forEach(item => {
    item.style.background = 'transparent';
  });
}

$clear.addEventListener('click', () => {
  clear();
});

$color.addEventListener('change', (e) => {
  color = e.target.value;
});

$bg.addEventListener('change', (e) => {
  bg = e.target.value;
  resetBg();
});

$paint.addEventListener('mouseleave', () => {
  $pixel.forEach(item => {
    item.removeEventListener('mouseover', draw);
  });
});

$pixel.forEach(item => {

  item.addEventListener('mousedown', (e) => {
    // console.log('down');
    draw(e);
    $pixel.forEach(item => {
      item.addEventListener('mouseover', draw);
    });
  });

  item.addEventListener('mouseup', (e) => {
    // console.log('up');
    $pixel.forEach(item => {
      item.removeEventListener('mouseover', draw);
    });
  });

  item.addEventListener('dragend', (e) => {
    $pixel.forEach(item => {
      item.removeEventListener('mouseover', draw);
    });
  });

});

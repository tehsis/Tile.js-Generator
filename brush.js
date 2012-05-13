(function (window) {
   var Dot = brush.figures.Dot;
   var Canvas = brush.collections.VirtualCanvas;	
   var Grid = brush.utils.Grid;

   canvas = document.getElementById('brush'),
   gridCanvas = document.getElementById('grid'),
   context = canvas.getContext('2d'),
   form = document.getElementById('generateForm'),

   grid = new Grid({
     height: canvas.height,
     width: canvas.width,
     dotSize: 10,
     canvas: gridCanvas
   });
   
   
   var virtualCanvas = new Canvas({
     width: 640, 
     height: 480,
     init: function () {
       
     }
   });
   
   canvas.addEventListener('click', onMouseClick, false);

   form.generate.addEventListener('click', onGenerate, false);

   function onGenerate(evt) {
     form = evt.target.form;
     code = document.getElementById('generateArea');
     if (!code) {
       code = document.createElement('textarea');
       code.id = 'generateArea';
       code.cols = 50;
       code.rows = 10;
     }

     code.value = virtualCanvas.getCode(form.dotSize.value);
     form.appendChild(code);
   }



   function onMouseClick(evt) {
     var dot;
     var xBase = canvas.offsetLeft;
     var yBase = canvas.offsetTop;
     var x = evt.clientX-xBase+window.scrollX;
     var y = evt.clientY-yBase+window.scrollY;
     x = Math.floor(x/10) * 10;
     y = Math.floor(y/10) * 10;
     dot = new Dot({
       x: x, 
       y: y, 
       width: 10, 
       height: 10
     });
     if (virtualCanvas.drawDot(dot)) { 
       dot.draw(context);
     } else {
       dot.clear(context);
     }
   }
   
     grid.draw();

}) (window);

(function (window) {
   var Dot = brush.figures.Dot;
   var Canvas = brush.figures.VirtualCanvas;	
   var document = window.document,
   canvas = document.getElementById('brush'),
   context = canvas.getContext('2d'),
   form = document.getElementById('generateForm'),

   gridCanvas = document.getElementById('grid');
   grid = new brush.utils.Grid({
     height: canvas.height,
     width: canvas.width,
     dotSize: 10,
     canvas: gridCanvas,
   });
   grid.draw();

   //---------------------------------------------------------	
   var virtualCanvas = new Canvas(640, 480);
   canvas.addEventListener('click', onMouseClick, false);

   form.dotSize.addEventListener('change', onDotSizeChange, false);
   form.generate.addEventListener('click', onGenerate, false);

   function onDotSizeChange(evt) {
     form = evt.target.form;

   }

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
     dot = new Dot(x, y, 10, 10);
     if (virtualCanvas.drawDot(dot)) { 
       dot.draw(context);
     } else {
       dot.clear(context);
     }
   }	

}) (window);

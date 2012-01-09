(function (window) {
   var Dot = brush.figures.Dot;
   var Canvas = brush.figures.Canvas;	
   var document = window.document,
   canvas = document.getElementById('brush'),
   context = canvas.getContext('2d'),
   form = document.getElementById('generateForm'),
   gridCanvas = document.getElementById('grid');
   gridContext = gridCanvas.getContext('2d');
   // Draws the grid.
   drawGrid(gridCanvas, 10);
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

   function drawGrid(canvas, dotSize) {
     for (var y=0; y<=canvas.height || y<=canvas.width; y+= dotSize) {
       gridContext.moveTo(0, y);
       gridContext.lineTo(canvas.width, y);
       gridContext.moveTo(y, 0);
       gridContext.lineTo(y, canvas.height);
       gridContext.lineWidth = 1;
       gridContext.strokeStyle = "#eae6e6";
       gridContext.stroke();
     }		
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

(function (window) {
	var Dot = brush.classes.Dot;
	var Canvas = brush.classes.Canvas;	
	var document = window.document,
        canvas = document.getElementById('brush'),
        context = canvas.getContext('2d'),
        form = document.getElementById('generateForm'),
        gridCanvas = document.getElementById('grid');
	    gridContext = gridCanvas.getContext('2d');
    ;	
	// Draws the grid.
	for (var y=0; y<=canvas.height || y<=canvas.width; y+=10) {
	    gridContext.moveTo(0, y);
	    gridContext.lineTo(canvas.width, y);
	    gridContext.moveTo(y, 0);
	    gridContext.lineTo(y, canvas.height);
	    gridContext.lineWidth = 1;
	    gridContext.strokeStyle = "#eae6e6";
	    gridContext.stroke();
	}	
    //---------------------------------------------------------	
	var virtualCanvas = new Canvas(640, 480);
	canvas.addEventListener('click', onMouseClick, false);
	
	form.generate.addEventListener('click', onGenerate, false);
	
	function onGenerate(evt) {
	  form = evt.originalTarget.form;
	  code = document.createElement('textarea');
	  code.cols = 50;
	  code.rows = 10;
	  code.value = virtualCanvas.getCode();
	  form.appendChild(code);
	}
	
	function onMouseClick(evt) {
	  var dot;
	  var xBase = canvas.offsetLeft;
	  var yBase = canvas.offsetTop;
	  var x = evt.clientX-xBase;
	  var y = evt.clientY-yBase;
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
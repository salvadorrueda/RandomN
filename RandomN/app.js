( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			
		}
	} );
} () );



var inc = 6;  // Incremento del contador.
//var cont = 0; // Valor del contador.

var min = 1;
var max = 6;

function initv(){
	document.getElementById("rValues").innerHTML=min+" to "+max;
}

(function(){
   var progressBar,
      progressBarWidget,
      resultDiv,
      value,
      direction,
      rotaryDetentHandler = function(e) {
         // Get rotary direction
         direction = e.detail.direction;

         if (direction === "CW") {
            // Right direction
        	 
        	inc = inc + 1; // Incrementar el contador.
        	 
        	 
            if (parseInt(progressBarWidget.value(), 10) < 100) {
               value = parseInt(progressBarWidget.value(), 10) + 1;
            } else {
               value = 100;         
        	 value++;
            }
            
            
         } else if (direction === "CCW") {
            // Left direction
        	if(inc>2){

             	inc = inc - 1; // Decrementa el contador.
        	}
         	 
            if (parseInt(progressBarWidget.value(), 10) > 0) {
               value = parseInt(progressBarWidget.value(), 10) - 1;
            } else {
               value = 0;
            }
            
        	 value--;
         }
         
         // Añadir '+' si el incremento es positivo.
        // if (inc>0) var s = "+"; else var s = "";
         
         //document.getElementById("rValues").innerHTML="MAX:"+s+inc; // Actualizar el visualizador de incremento.
        // document.getElementById("rValues").innerHTML=" "+inc;
         max = inc;
         //document.getElementById("rValues").innerHTML=min+" to "+max;
  	
         initv();
         //resultDiv.innerText = value + "%";
         progressBarWidget.value(value);
      };	

   document.addEventListener("pagebeforeshow", function() {
      resultDiv = document.getElementById("result");

      progressBar = document.getElementById("circleprogress");
      progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: "large"});
      resultDiv.innerText = progressBarWidget.value();

      // Add rotarydetent handler to document
      document.addEventListener("rotarydetent", rotaryDetentHandler);
   });

   document.addEventListener("pagehide", function() {
      progressBarWidget.destroy();
      document.removeEventListener("rotarydetent", rotaryDetentHandler);
   });
}());


function vrandom(){

	document.getElementById("rInfo").innerHTML= getRandomInt(min, max); // Random.
}


function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}


document.addEventListener("click", vrandom);




//circular section changer.
/*global tau */
(function() {

	var page = document.getElementById( "circularSectionchangerPage" ),
		changer = document.getElementById( "circularSectionchanger" ),
		sectionLength = document.querySelectorAll("section").length,
		elPageIndicator = document.getElementById("pageIndicator"),
		sectionChanger,
		pageIndicator,
		pageIndicatorHandler;

	/**
	 * pagebeforeshow event handler
	 * Do preparatory works and adds event listeners
	 */
	page.addEventListener( "pagebeforeshow", function() {
		// make PageIndicator
		pageIndicator =  tau.widget.PageIndicator(elPageIndicator, { numberOfPages: sectionLength });
		pageIndicator.setActive(1);
		
		// make SectionChanger object
		sectionChanger = tau.widget.SectionChanger(changer, {
			circular: false,
			orientation: "horizontal"
		});
	});

	/**
	 * pagehide event handler
	 * Destroys and removes event listeners
	 */
	page.addEventListener( "pagehide", function() {
		// release object
		sectionChanger.destroy();
	});

	/**
	 * sectionchange event handler
	 */
	pageIndicatorHandler = function (e) {
		pageIndicator.setActive(e.detail.active);
		//alert(e.detail.active);  // 0: letf, 1: 3band, 2: 4band
	};

	changer.addEventListener("sectionchange", pageIndicatorHandler, false);
}());




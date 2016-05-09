function DatePicker(divId, callback){
    this.divId = divId;
    this.callback = callback;
}


DatePicker.prototype.render =  function (dateObject){
    
//--> 1- Create a wrapper and append it to the div  
    var entirePage = document.getElementById(this.divId);
    var wrap = document.createElement("div");
    entirePage.appendChild(wrap); //--> it appends the wrap to the page
    
//--> 2- Get the table Id and create its header    
    var myTable = document.createElement("TABLE");
    var self = this; 
    wrap.appendChild(myTable); //-->appends table to outer wrap
    var today = dateObject.getDate();
  
    var header = myTable.createTHead(); //->table headers
    var row1 = header.insertRow(0);
    var cell1 = row1.insertCell(0);
    var cell2 = row1.insertCell(1);
    var cell3 = row1.insertCell(2);
    
    //--------------------- Arrays of info to use later ---------------------//
    var monthList = ["January", "February","March", "April","May", "June", "July", "August", "September",
      "October","November","December"];
    var daysOfWeek = ["Sun", "Mon","Tues","Wed","Thur","Fri","Sat"]; 
     
//--> 3- POPULATE HEADER     
    cell1.innerHTML = "<";
    cell2.innerHTML = monthList[dateObject.getMonth()];
    cell3.innerHTML = ">";
    cell1.setAttribute("id","arrowPrev");
    cell2.setAttribute("id","monthStyle");
    cell2.colSpan = "5"; 
    cell3.setAttribute("id","arrowNext");
  
//--> 4-  ADD EVENT LISTENERS FOR PREVIOUS AND NEXT  
    cell1.addEventListener("click", function(){ 
        wrap.remove();
       if(dateObject.getMonth() === 0){
     	dateObject.setFullYear(dateObject.getFullYear() -1,11,1 );
     } else{
     	dateObject.setMonth(dateObject.getMonth() -1 );
     }
        self.render(dateObject);  
     });
    cell3.addEventListener("click", function(){ 
            wrap.remove();

   if(dateObject.getMonth() === 11){
     	dateObject.setFullYear(dateObject.getFullYear() +1,0,1 );
     } else{
     	dateObject.setMonth(dateObject.getMonth() + 1);
     }
      self.render(dateObject);    
   });
   
 //--> 5-  ADD DAYS OF THE WEEK ON THE SECOND ROW   
    var row2 = header.insertRow(1);   
   for(var i = 0; i < 7; i++){
       var newCell = row2.insertCell(i);
       newCell.innerHTML = daysOfWeek[i];
    }
        
 //--> 6- SAVE CURRENT MONTH AND YEAR FOR LATER   
    var currentMonth = dateObject.getMonth();
    var currentYear =  dateObject.getFullYear();
    dateObject.setDate(1); 
    	//--> # of days for the prev month to backtrace				   
    dateObject.setDate(dateObject.getDate() - dateObject.getDay());
    var rowIterator =2; //--> 3rd row, row0 =Month row1 = Days of the week
  
     while(true){      
     	var row = myTable.insertRow(rowIterator); // -->insert a new row on the table
        for(i = 0; i < 7; i++){ // --> will insert 7 cells per row
           var cell = row.insertCell(i);           
           cell.innerHTML = dateObject.getDate(); // --> put the number date inside the cell
//--> 7- ADD EVENT LISTENER FOR WHEN THE USER CLICKS ON A DATE        
           cell.addEventListener("click", function(event){
              var obk = { //-->object to pass to call back
                month:dateObject.getMonth() + 1, 
                day: event.target.innerText, 
                year: dateObject.getFullYear()
              };
              self.callback (self.divId, obk);
              var oldDay = document.getElementById(self.divId).getElementsByClassName("change");
               oldDay[0].setAttribute("class","active");//->change color of old date to active
               this.setAttribute("class","change");//-->changes the color of the clicked date
            });
         //---------------- Date coloring ----------------- //               
           if(dateObject.getMonth() != currentMonth){ // --> if not in the current month
           		cell.setAttribute("class","inactive");
           } else  if(dateObject.getDate() === today){//--> highlight the current day
           	  console.log("HERE");
           	  cell.setAttribute("class","change");
           	} else{
           		cell.setAttribute("class","active");//--> else set it to active
           }                 
           dateObject.setDate(dateObject.getDate() + 1); //--> increase date by one       
        }       
        rowIterator +=1; // --> increase row by 1   
         //------------------ Stoping condition -----------//     
        if(dateObject.getMonth() > currentMonth || (currentMonth === 11 &&
                                                dateObject.getMonth() ===0)){
        	dateObject.setFullYear(currentYear,currentMonth,today );
        	break;    
        }            
    } 
};


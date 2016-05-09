class TableTemplate{
   static fillIn(idTable, dictionary, columnName){   
   	 var currentTable = document.getElementById(idTable); // --> got the current table
   	 currentTable.style.visibility = "visible"; // ---> set visibility 
   	 var rowNums = currentTable.rows.length; // number of rows in the table
   	 //---- variables to use later:
   	    var template,constructor,string,row,rowIterator;

//--> 1----------- CHECK NUMBER OF ARGUMENTS AND GET THE HEADER --------------------
   	 var argsNum = arguments.length;
//--> 2----------------GET HEADER AND ITS LENGTH -------------------------------
   	 	var header =  currentTable.rows[0];
   		 var header_length = header.cells.length;
//-->  3- ------------SET HEADER IN THE TABLE:-----------------------------------
     var header_elements = [];
     for(var h = 0; h < header_length; h++){
          template = header.cells[h].innerHTML; 
   	      constructor =  new Cs142TemplateProcessor(template);
   	      string = constructor.fillIn(dictionary);
   	     header_elements.push(string); //-->when you remove the curly braces added to this array
   	     if(string !== ""){ // --> if string is not an empty string
   	       	header.cells[h].innerHTML = string;
   	     }
   	  }
//--> 4-------- CHECK IF A COLUMN NAME WAS SPECIFIED ------------------------------  		 
   	 if(argsNum === 3){
    // 4.1 -------   find if the columnName is found in the header
        var index = header_elements.indexOf(columnName);
        if (index === -1) return;
   		 //--> otherwise it found the columnName in the table header so proceed
   		 rowIterator = 1; // --> start from zero bc it needs to do the header
   		 while(true){
   		 	if(rowIterator + 1 > rowNums) break;
   		 	 row =  currentTable.rows[rowIterator];// --> get the current row
   		 	 template = row.cells[index].innerHTML; // --> element at the specified column
   	       	 constructor =  new Cs142TemplateProcessor(template);
   	       	 string = constructor.fillIn(dictionary);
   	       	 if(string !== ""){ // --> if string is not an empty string
   	       			row.cells[index].innerHTML = string;
   	       	 }
   		    rowIterator ++;
   		 }   		 
   	 } 
//--> 5---------- IF COLUMN NAME WASN'T SPECIFIED RUN THROUGH THE ENTIRE TABLE ------   	 
   	 else{   	 
   	 	rowIterator = 1;
 		 while (true){
   	 	    if (rowIterator > rowNums) break; //-->if  rowIterator is greater than the number of rows
   	 	    row =  currentTable.rows[rowIterator];// --> get current row
   	       	    
   		    for (var i = 0;  i< header_length; i++){ // iterate thoru
   	    	   template = row.cells[i].innerHTML; 
   	       		constructor =  new Cs142TemplateProcessor(template);
   	       		string = constructor.fillIn(dictionary);
   	       		if(string !== ""){ // --> if string is not an empty string
   	       			row.cells[i].innerHTML = string;
   	       		}
   	    	} //->for loop
   	  	     rowIterator = rowIterator +1;
   	    } //->while
     } //->else 
   }//-> static function
}// ->class 	 

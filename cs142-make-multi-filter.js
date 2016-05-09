"use strict";
 function cs142MakeMultiFilter (startArray){	
 	 		
 			var originalArray = startArray;
 	return function arrayFilterer (filter,callback) {
 			
 		if(typeof filter === "function"){ // check if the filter is a function
 			startArray = startArray.filter(filter)
 			if(typeof callback === "function"){
 				callback.call(originalArray, startArray);
 			}
 			 return arrayFilterer; 						
 		} else{
 			return startArray;
 		}		
 	}
 }

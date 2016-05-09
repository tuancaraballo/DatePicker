function Cs142TemplateProcessor(template){
    this.template = template;
}
Cs142TemplateProcessor.prototype.fillIn = function (dictionary){
    var curlies= [];
    var noCurlies = []; // properties witout curlybraces
    var getProperties = /\{\{[\w+$]+\}\}/g;
    var removeCurlies = /[\w+$]+/;
    // adds the properties containing curilies
    curlies = this.template.match(getProperties);
    // adds the properies to noCurlies array without curly braces
    for(var i = 0; i < curlies.length; i ++){    
                 var  arr = curlies[i].match(removeCurlies);
                  noCurlies.push(arr[0]);
    }
    // it iterates through the length of the elements to be replaced
    for(var m = 0; m < noCurlies.length; m++){
        if(dictionary.hasOwnProperty(noCurlies[m])){
         //   var tyu = this.template.search(curlies[m]);
            this.template = this.template.replace(curlies[m],dictionary[noCurlies[m]]);
        }else{
            this.template= this.template.replace(curlies[m],"");
        }
    }
    return this.template;
};


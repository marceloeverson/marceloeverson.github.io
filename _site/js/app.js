var query = '';

jQuery(function(){

  if(location.pathname == '/search'){
      
   window.idx = lunr(function () {    
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('tags');
    this.field('categories');   
    });  
   query = queryString('query'); 
   search();
  }
  if(uriToArr()[0]== 'category'){
    var path   =  uriToArr();
    path.shift();

    window.idx = lunr(function () {    
    this.field('id');    
    this.field('categories',{ boost: 10 });   
    });
    query = path.join(' ');
    search();
  }

  if(uriToArr()[0]== 'tag'){

    var path   =  uriToArr();
    path.shift();    
    window.idx = lunr(function () {    
    this.field('id');    
    this.field('tags',{ boost: 10 });   
    });
    query = path.join(' ');
    search();
  }

$('body').on('dataLoaded',function(){
    
        
      var results = window.idx.search(query); 
      display_search_results(results);
    

 });

});


function search() {
  
  // Download the data from the JSON file we generated
  window.data = $.getJSON('/search_data.json');

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
       
  value.tags = JSON.parse(htmlEntitiesDecode(value.tags)).join(' ');   
  value.categories = JSON.parse(htmlEntitiesDecode(value.categories)).join(' ');   
        
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
    $('body').trigger('dataLoaded');
  }); 
 
}

function display_search_results(results) 
{
    var $search_results = $("#search-content");
    var response;
    var data = [];

    data.results = [];
    // Wait for data to load
    window.data.then(function(loaded_data) {       
      // Are there any results?
      if (results.length) {        
         $search_results.empty(); 
        // Iterate over the results
        results.forEach(function(result) {          
          var item = loaded_data[result.ref];
          item.url = $.trim(item.url);
          item.tags = item.tags.split(' ');
          item.categories = item.categories.split(' ');          
          data.results.push(item);

        });

      }       
      
      response = loadTpl(data);
      $search_results.html(response);
    });
}

function htmlEntitiesDecode(str) 
{
   return  $('<div/>').html(str).text();
}
function uriToArr()
{
    var uri = location.pathname.replace(/^\//, '');
    var uriArr;    
    uriArr = uri.split('/');
    return uriArr;
}
function queryString(item)
{
     var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
     return svalue ? svalue[1] : svalue;
}
function loadTpl(data)
{
     var tplText = $('#search-tpl').html();
     var tpl = new jSmart( tplText );
     var res = tpl.fetch( data );
     return res;
}
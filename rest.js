
$(document).ready(function() {
	$("#btnSubmit").click(function(){
     console.clear();
email = $("#email").val(); 
var data = {
  "query":{  
      "query_string":{  
         "query": email
      }
   }
}
$.ajax({
  method: "POST",
  url: "https://hub.springer-sbm.com/mps_es_bps_contracts_ip/_search?size=5000&filter_path=hits.hits._source",
  data: JSON.stringify(data),
  dataType : 'json',
  contentType: 'application/json',
})
.done(function( data ) {
  
 
  $.each(data.hits.hits, function (index, value) {
	 var top_obj = value;
	 $.each(value._source.admins, function (index, value){
	 if (value.EMAIL.toUpperCase() == email.toUpperCase()){
	 $('#bp').val(value.BP); 
	 console.log(top_obj._source.PARTNER);
	 }
	 });
});
})
.fail(function( data ) {
  console.log(data);
});

}); 
});

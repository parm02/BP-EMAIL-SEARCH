$(document).ready(function() {

	
	$("#btnSubmit").click(function(){
     
$('#table').bootstrapTable('refresh');	
email = $("#email").val(); 
var data = {
  "query":{  
      "query_string":{  
         "query": email
      }
   }
}
var items = []; 
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
	
	 items.push(
    {Admin: value.BP, Admin_First_Name: value.FIRSTNAME, Admin_Last_Name: value.LASTNAME , Institution: top_obj._source.PARTNER, ORGANIZATION_NAME_1: top_obj._source.ORGANIZATION_NAME_1 ,ORGANIZATION_NAME_2: top_obj._source.ORGANIZATION_NAME_2,ORGANIZATION_NAME_3: top_obj._source.ORGANIZATION_NAME_3,ORGANIZATION_NAME_4: top_obj._source.ORGANIZATION_NAME_4, COUNTRY: top_obj._source.COUNTRY }
    );
	 }
	 });
});
$(function () {
    $('#table').bootstrapTable({
        data: items
    });  });
})
.fail(function( data ) {
  console.log(data);
});

}); 
});

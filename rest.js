$(document).ready(function() {
 $("#xbtnSubmit").click(function(){
email = $("#email").val();		
var fdata = {
  "_source" : false,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "admins",
            "query": {
              "bool": {
                "must": [
                  {
                    "match": {
                      "admins.EMAIL": email
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
}
var items = []; 
$.ajax({
  method: "POST",
  url: "https://hub.springer-sbm.com/mps_es_bps_contracts_ip/_search?size=5000",
  data: JSON.stringify(fdata),
  dataType : 'json',
  contentType: 'application/json',
})
.done(function( data ) {
  
 
  $.each(data.hits.hits, function (index, value) {

     items.push(
    {Institution: value._id }
    );
	 
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
	 $("#abtnSubmit").click(function(){
email = $("#email").val();		
var fdata = {
  "_source" : false,
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "admins",
            "query": {
              "bool": {
                "must": [
                  {
                    "match": {
                      "admins.EMAIL": email
                    }
                  }
                ]
              }
            },
			"inner_hits" : {}
          }
        }
      ]
    }
  }
}
var items = []; 
$.ajax({
  method: "POST",
  url: "https://hub.springer-sbm.com/mps_es_bps_contracts_ip/_search?size=5000",
  data: JSON.stringify(fdata),
  dataType : 'json',
  contentType: 'application/json',
})
.done(function( data ) {
  
 
  $.each(data.hits.hits, function (index, value) {
	 var top_obj = value;
	 $.each(value.inner_hits.admins.hits.hits, function (index, value){
     items.push(
    {Admin: value._source.BP, Admin_First_Name: value._source.FIRSTNAME, Admin_Last_Name: value._source.LASTNAME , Institution: top_obj._id }
    );
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
	
    $("#fbtnSubmit").click(function(){
email = $("#email").val();		
var fdata = {
  "query": {
    "bool": {
      "must": [
        {
          "nested": {
            "path": "admins",
            "query": {
              "bool": {
                "must": [
                  {
                    "match": {
                      "admins.EMAIL": email
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
}
var items = []; 
$.ajax({
  method: "POST",
  url: "https://hub.springer-sbm.com/mps_es_bps_contracts_ip/_search?size=5000&filter_path=hits.hits._source",
  data: JSON.stringify(fdata),
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

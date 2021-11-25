var fila="<tr><td class='id'></td><td class='foto'></td><td class='since'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='eliminar' ></td></tr>";
	 var aeronaves=null;

	function obtenerAeronaves() {
	  fetch('http://localhost:3000/aeronaves')
            .then(res=>res.json())
            .then(data=>{
				aeronaves=data;
				aeronaves.forEach(
				function(aeronave){
					aeronave.since=parseInt(aeronave.since)
				});
				listarAeronaves(data)})
			.catch(error => {
                    alert(error);
                } )
}

function borrarAeronave(nfila) {
	var delresult;
	var url='http://localhost:3000/aeronaves/'+nfila;
	
	  fetch(url,{method:"DELETE"})
            .then( res=>res.status)
            .then(codigo=>{
switch(codigo) {
			case 200: alert("Aeronave borrado");			         
					  document.querySelector("naves").click();
					  break;
			case 404: alert("Aeronave no existe");break; }
});	  	
		 				 
}

function guardarAeronave(){
	var aeronave ={};

	aeronave['image'] = document.getElementById('image').value;
	aeronave['since'] = document.getElementById('since').value;
	aeronave['title'] = document.getElementById('title').value;
	aeronave['category'] = document.getElementById('category').value;
	aeronave['description'] = document.getElementById('description').value;

	if(aeronave['image']== undefined || aeronave['since'] == undefined ||
	aeronave['title'] == undefined || aeronave['category'] == undefined || aeronave['description']==undefined){
		alert('Debe ingresar todos los campos');
	}else{
		fetch("http://localhost:3000/aeronaves",{
			method: "POST",
			body: JSON.stringify(aeronave),
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json; charset=UTF-8',
			}
		})
		.then(response =>response.json())
		.then(data=>addresult=data);
	}
}


  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "comercial":code="c1";break;
	    case "militar":code="c2";break;
		case "carga":code="c3";break;
		case "experimental":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarAeronaves(aeronaves) {
	  var since=document.getElementById("since"); 
	  since.setAttribute("onclick", "orden*=-1;listarAeronaves(aeronaves);");
	  var num=aeronaves.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,sinces,descriptions,categories,fotos,eliminar;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  sinces=document.getElementsByClassName("since"); 
	  eliminar=document.getElementsByClassName("eliminar");   
	  if(orden===0) {orden=-1;since.innerHTML="Since"}
	  else
	     if(orden==1) {ordenarAsc(aeronaves,"since");since.innerHTML="Since A";since.style.color="Pink"}
	     else 
	       if(orden==-1) {ordenarDesc(aeronaves,"since");since.innerHTML="Since D";since.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=aeronaves[nfila].id;
		titles[nfila].innerHTML=aeronaves[nfila].title;
		descriptions[nfila].innerHTML=aeronaves[nfila].description;
		categories[nfila].innerHTML=aeronaves[nfila].category;
		eliminar[nfila].innerHTML="<button  onclick=\"borrarAeronave("+aeronaves[nfila].id+");\" style=\"color:black;cursor:pointer;\">Eliminar</button>";
		catcode=codigoCat(aeronaves[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		sinces[nfila].innerHTML="Año: "+aeronaves[nfila].since;
		fotos[nfila].innerHTML="<img src='"+aeronaves[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+aeronaves[nfila].image+"');" );
		}
	}


function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}
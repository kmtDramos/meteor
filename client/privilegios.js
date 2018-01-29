/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'

Template.privilegios.onCreated(function(){
	
});

Template.privilegios.helpers({
	Privilegios: function(){
		return db.Privilegio.find({},{});
	},
	Paginas: function(){
		return db.Pagina.find({},{});
	}
});

Template.privilegios.events({
	'click #btnAgregarPrivilegio': function(event){
		var Privilegio = new Object();
		Privilegio.IdPagina = $("select#pagina").val();
		Privilegio.Pagina = $("select#pagina option:selected").text();
		Privilegio.Descripcion = $("#descripcion").val();
		Privilegio.Clave = $("#clave").val();
		if (Privilegio.IdPagina == "" || Privilegio.Descripcion == "" || Privilegio.Clave == "")
		{
			alert("Todos los campos son obligatorios.");
		}
		else{
			db.Privilegio.insert(Privilegio);
			$("select#pagina").val('');
			$("#descripcion").val('');
			$("#clave").val('');
			$("#formaPrivilegio").modal("hide");
		}
	}
});

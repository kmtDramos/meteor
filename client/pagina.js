/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'

Template.pagina.onCreated(function(){
	
});

Template.pagina.helpers({
	Paginas: function(){
		return db.Pagina.find({},{});
	}
});

Template.pagina.events({
	'click #btnAgregarPagina': function(event){
		var Pagina = new Object();
		Pagina.Nombre = $("#pagina").val();
		Pagina.Url = $("#url").val();
		db.Pagina.insert(Pagina);
		if (Pagina.Nombre == '' || Pagina.Url =='')
		{
			alert("Favor de llenar todos los campos");
		}
		else
		{
			$("#formaPagina").modal('hide');
		}
	}
	,
	
	'click .editPagina': function(event){
		var IdPagina = this._id;
		$("#pagina").val(this.Nombre);
		$("#url").val(this.Url);
		$("#formaPagina").modal('show');
	}
	
});
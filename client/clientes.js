/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'


//
Template.clientes.onCreated(function(){

	$(function(){
		
		$("#clientes").DataTable();

	});

});


//
Template.clientes.helpers({
	Usuarios: function(){
		return db.Usuario.find({},{});
	},
	Clientes: function(){
		var Tabla = [];
		var Clientes = db.Cliente.find({},{}).map(function(cliente){
			Tabla.push(cliente);
		});
		for (x in Tabla){
			var Cliente = Tabla[x];
			var Usuario = db.Usuario.findOne({_id:Cliente.IdUsuario},{});
			Tabla[x].Usuario = Usuario.Nombre + " " + Usuario.ApellidoPaterno + " " + Usuario.ApellidoMaterno;
		}
		$("#clientes").DataTable().draw();
		return Tabla;
	}

});


//
Template.clientes.events({
	"click #btnAgregarCliente": function(event){
		var Cliente = new Object();
		Cliente.RazonSocial = $("#razonsocial").val();
		Cliente.RFC = $("#rfc").val();
		Cliente.IdUsuario = $("#usuario").val();
		Cliente.Oportunidades = 0;
		Cliente.Cotizado = 0;
		Cliente.Facturado = 0;
		Cliente.Pagos = 0;
		Cliente.Saldo = 0;
		if (ValidarRFC(Cliente.RFC) && Cliente.RazonSocial.length > 0 ){
			db.Cliente.insert(Cliente);
			$("input,select","#formAgregarCliente").val("");
			$("#formaCliente").modal("hide");
			$("#clientes").DataTable().draw();
		}
		else
		{
			alert("No se pudo agregar el cliente");
		}
	}
	,
	
	'click .editCliente':function(event){
		$('#modalEditarCliente').modal();
		$("#modalEditarCliente").attr("aria-id",this._id);
		document.formEditarUsuario.razonsocial.value = this.RazonSocial;
		document.formEditarUsuario.rfc.value = this.RFC;
		document.formEditarUsuario.usuario.value = this.IdUsuario;
		IdCliente = this._id;
		$("#oportunidades").DataTable();
		Session.set("IdCliente", this._id);
	},

	'click #btnAgregarOportunidad': function(){
		alert("prueba");
	}

});

function ValidarRFC(RFC){
	var valido = false;

	var formato = /([A-Z]){3,4}([0-9]){6}([A-Z0-9]){3}/g

	valido = RFC.match(formato);

	return valido;
}


Template.oportunidades.onCreated(function(){
	$(function(){

        $("#modalAgregarOportunidad").on('shown.bs.modal', function(){
			$(this).appendTo("body");
			$("#modalEditarCliente").modal("hide");
			var Cliente = db.Cliente.findOne({_id: Session.get("IdCliente")});
			$("#cliente","#modalAgregarOportunidad").val(Cliente.RazonSocial);
        }).on('hidden.bs.modal', function(){
			$(this).appendTo("#tab-oportunidades");
            $("#modalEditarCliente").modal("show");
		});
		
	});
});

//
Template.oportunidades.helpers({

	Oportunidades: function(){
		return db.Oportunidades.find({IdOportunidad:Session.get("IdOportunidad")},{});
	},
	
	IdCliente: function(){
		return Session.get("IdCliente");
	},

	Usuarios: function(){
		return db.Usuario.find({},{});
	}

});


//
Template.oportunidades.events({
});
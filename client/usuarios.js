/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'


Template.usuarios.onCreated(function(){
	this.Grid = new ReactiveVar({
		filters:{},
		pagination:10,
		pagina: 1,
		paginas: 1
	});
	Opciones();
});


Template.usuarios.events({
	
	'click #btnAgregarUsuario': function(event){
		var nuevoUsuario = new Object();
		nuevoUsuario.Usuario = document.formAgregarUsuario.usuario.value;
		nuevoUsuario.Password = document.formAgregarUsuario.password.value;
		nuevoUsuario.Nombre = document.formAgregarUsuario.nombre.value;
		nuevoUsuario.ApellidoPaterno = document.formAgregarUsuario.apellidoPaterno.value;
		nuevoUsuario.ApellidoMaterno = document.formAgregarUsuario.apellidoMaterno.value;
		nuevoUsuario.Correo = document.formAgregarUsuario.correo.value;
		nuevoUsuario.FechaCreacion = new Date();
		db.Usuario.insert(nuevoUsuario);
		document.formAgregarUsuario.usuario.value = '';
		document.formAgregarUsuario.password.value = '';
		document.formAgregarUsuario.nombre.value = '';
		document.formAgregarUsuario.apellidoPaterno.value = '';
		document.formAgregarUsuario.apellidoMaterno.value = '';
		document.formAgregarUsuario.correo.value = '';
		$("#formaUsuario").modal('hide');
	}
	,
	
	'click .deleteUsuario': function(event){
		if(confirm('Deseas eliminar el usuario '+ this.Nombre + ' ' + this.ApellidoPaterno + ' ' + this.ApellidoMaterno)){
			db.Usuario.remove(this._id);
		}
	}
	,
	
	'click .editUsuario':function(event){
		$('#formaUsuario').modal();
		document.formAgregarUsuario.usuario.value = this.Usuario;
		document.formAgregarUsuario.password.value = this.Password;
		document.formAgregarUsuario.nombre.value = this.Nombre;
		document.formAgregarUsuario.apellidoPaterno.value = this.ApellidoPaterno;
		document.formAgregarUsuario.apellidoMaterno.value = this.ApellidoMaterno;
		document.formAgregarUsuario.correo.value = this.Correo;
		$("#btnAgregarUsuario").attr('id','btnEditarUsuario');
		$("#formaUsuario").attr('aria-id',this._id);
	}
	,
	
	'click #btnEditarUsuario': function(event){
		var editarUsuario = new Object();
		editarUsuario._id = $("#formaUsuario").attr('aria-id');
		editarUsuario.Usuario = document.formAgregarUsuario.usuario.value;
		editarUsuario.Password = document.formAgregarUsuario.password.value;
		editarUsuario.Nombre = document.formAgregarUsuario.nombre.value;
		editarUsuario.ApellidoPaterno = document.formAgregarUsuario.apellidoPaterno.value;
		editarUsuario.ApellidoMaterno = document.formAgregarUsuario.apellidoMaterno.value;
		editarUsuario.Correo = document.formAgregarUsuario.correo.value;
		db.Usuario.update(editarUsuario._id,editarUsuario);
		$("#btnEditarUsuario").attr('id','btnAgregarUsuario');
		document.formAgregarUsuario.usuario.value = '';
		document.formAgregarUsuario.password.value = '';
		document.formAgregarUsuario.nombre.value = '';
		document.formAgregarUsuario.apellidoPaterno.value = '';
		document.formAgregarUsuario.apellidoMaterno.value = '';
		document.formAgregarUsuario.correo.value = '';
		$("#formaUsuario").modal('hide');
		$("#formaUsuario").removeAttr('aria-id');
	}
	,
	
	'keyup input.filtro': function(event){
		var usuario = $("#fltUsuario").val();
		var nombre = $("#fltNombre").val();
		var apellidoP = $("#fltApellidoP").val();
		var apellidoM = $("#fltApellidoM").val();
		var correo = $("#fltCorreo").val();
	}
	
});


Template.usuarios.helpers({
	
	Usuarios: function(){
		return db.Usuario.find(Template.instance().Grid.get().filters, {});
	}
	,
	
	Encontrados: function(){
		return db.Usuario.find(Template.instance().Grid.get().filters, {}).count();
	}
	,
	
	Registros: function(){
		return db.Usuario.find({},{}).count()
	}
	,
	
	Pagina: function(){
		return Template.instance().Grid.get().pagina;
	}
	,
	
	Paginacion: function(){
		return Template.instance().Grid.get().pagination;
	}
	,
	
	Paginas: function(){
		var paginas = Math.ceil(db.Usuario.find(Template.instance().Grid.get().filters, {}).count());
		Session.set({
			paginas: paginas
		})
		return paginas;
	}
	
});


function Opciones(){
}



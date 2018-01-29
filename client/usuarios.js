/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'

Template.usuarios.onCreated(function(){
	Session.set({
		filters:{},
		pagination:10,
		pagina: 1,
		paginas: 1
	});
	Opciones();
})

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
		Session.set({
			filters: {
				Usuario: new RegExp(usuario,'gi'),
				Nombre: new RegExp(nombre,'gi'),
				ApellidoPaterno: new RegExp(apellidoP,'gi'),
				ApellidoMaterno: new RegExp(apellidoM,'gi'),
				Correo: new RegExp(correo,'gi')
			}
		});
	}
	,
	
	'change .tblPaginacion': function(event){
		var paginacion = parseInt(event.target.value) ;
		Session.set({
			pagination: paginacion
		});
		Opciones();
	}
	,
	
	'keyup input.tblPagina': function(event){
		var actual = (!isNaN(parseInt(event.target.value))) ? parseInt(event.target.value): 1;
		Session.set({
			pagina: actual
		});
		Opciones();
	}
	,
	
	'click .inicio': function(event){
		Session.set({
			pagina: 1
		});
		Opciones();
	}
	,
	
	'click .anterior': function(event){
		var actual = Session.get('pagina');
		var anterior = (actual-1 > 0) ? 1 : actual-1;
		Session.set({
			pagina: anterior
		});
		Opciones();
	}
	,
	
	'click .siguiente': function(event){
		var actual = Session.get('pagina');
		var siguiente = (actual+1 > Session.get('paginas')) ? 1 : actual+1;
		Session.set({
			pagina: siguiente
		});
		Opciones();
	}
	,
	
	'click .fin': function(event){
		Session.set({
			pagina: Session.get('paginas')
		});
		Opciones();
	}
	
});

Template.usuarios.helpers({
	Usuarios: function(){
		return db.Usuario.find(Session.get('filters'),Session.get('options'));
	}
	,
	Encontrados: function(){
		return db.Usuario.find(Session.get('filters'),Session.get('options')).count();
	}
	,
	Registros: function(){
		return db.Usuario.find({},{}).count()
	}
	,
	
	Pagina: function(){
		return Session.get('pagina');
	}
	,
	
	Paginacion: function(){
		return Session.get('pagination');
	}
	,
	
	Paginas: function(){
		var paginas = Math.ceil(db.Usuario.find({},{}).count() / Session.get('pagination'));
		Session.set({
			paginas: paginas
		})
		return paginas;
	}
	
});

function Opciones(){
	var pagina = Session.get('pagina');
	var paginacion = Session.get('pagination');
	var inicio = pagina * paginacion - paginacion;
	Session.set({
		options:{
			sort:{
				Nombre:1
			},
			skip:inicio,
			limit: paginacion
		}
	});
}



/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'

Template.login.events({
	'click #login': function(){
		var usuario = $('#usuario').val();
		var password = $('#password').val();
		if(usuario == '' || password == ''){
			alert('El usuario y la contraseña son obligatorios');
		}
		var Usuario = db.Usuario.findOne({Usuario:usuario, Password:password});
		if (Usuario != undefined){
			Session.set({
				IdUsuario:Usuario._id
			});
			localStorage.setItem("IdUsuario", Usuario._id);
		}
		else
		{
			alert('Usuario o contraseña incorrecta');
		}
	}
});
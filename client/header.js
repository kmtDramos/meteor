/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'

// Header
Template.header.helpers({
	menu:function(){
		var menu = db.Pagina.find({},{});
		return ((UserSession())? menu: []);
	}
});

Template.header.events({
	"click #btn-salir": function(event){
		event.preventDefault();
		Session.set({"IdUsuario" : ""});
		localStorage.setItem("IdUsuario", undefined);
	}
});

function UserSession(){
	var session = false;
	
	if (localStorage.getItem("IdUsuario") != undefined)
	{
		Session.set({ IdUsuario:localStorage.getItem("IdUsuario") });
	}
	
	if (Session.get("IdUsuario") != "")
	{
		session = db.Usuario.findOne( { _id : Session.get("IdUsuario") } ) != undefined;
	}
	
	return session;
}

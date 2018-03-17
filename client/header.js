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
		return ((Session.get('IdUsuario') != '') ? menu: []);
	}
});

Template.header.events({
	"click #btn-salir": function(event){
		event.preventDefault();
		Session.set({"IdUsuario":undefined});
	}
});
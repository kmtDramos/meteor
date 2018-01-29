/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'



var Menu = [
	{url:"/Clientes",name:"Clientes"},
	{url:"/Proveedores",name:"Proveedores"},
	{url:"/Usuarios",name:"Usuarios"},
	{url:"/Pagina",name:"Pagina"}
];

// Header
Template.header.helpers({
	menu:function(){
		var menu = db.Pagina.find({},{});
		return ((Session.get('IdUsuario') != '') ? menu: []);
	}
});
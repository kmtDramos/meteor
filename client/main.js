import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

import { db } from '/imports/api/db';

Router.route('/', function () {
	var template = (!UserSession()) ? 'login': 'inicio';
	this.render(template, {});
});

Router.route('/Usuarios',function(){
	var template = (!UserSession()) ? 'login': 'usuarios';
	this.render(template, {});
});

Router.route('/Proveedores',function(){
	var template = (!UserSession()) ? 'login': 'proveedores';
	this.render(template, {});
});

Router.route('/Clientes',function(){
	var template = (!UserSession()) ? 'login': 'clientes';
	this.render(template, {});
});

Router.route('/Paginas',function(){
	var template = (!UserSession()) ? 'login': 'pagina';
	this.render(template, {});
});

Router.route('/Privilegios',function(){
	var template = (!UserSession()) ? 'login': 'privilegios';
	this.render(template, {});
});

Router.route('/CentroCostos',function(){
	var template = (!UserSession()) ? 'login' : 'centrodecostos';
	this.render(template, {});
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



import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

import { db } from '/imports/api/db';

Session.set({IdUsuario:''});

Router.route('/', function () {
	var template = (Session.get('IdUsuario') == '') ? 'login': 'inicio';
	this.render(template, {});
});

Router.route('/Usuarios',function(){
	var template = (Session.get('IdUsuario') == '') ? 'login': 'usuarios';
	this.render(template, {});
});

Router.route('/Proveedores',function(){
	var template = (Session.get('IdUsuario') == '') ? 'login': 'proveedores';
	this.render(template, {});
});

Router.route('/Clientes',function(){
	var template = (Session.get('IdUsuario') == '') ? 'login': 'clientes';
	this.render(template, {});
});

Router.route('/Paginas',function(){
	var template = (Session.get('IdUsuario') == '') ? 'login': 'pagina';
	this.render(template, {});
});

Router.route('/Privilegios',function(){
	var template = (Session.get('IdUsuario') == '') ? 'login': 'privilegios';
	this.render(template, {});
});
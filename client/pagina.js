/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'

Template.pagina.onCreated(function(){
	$(function(){
        $("#paginas").DataTable();
    });
});

Template.pagina.helpers({
	Paginas: function(){
        return db.Pagina.find({},{Nombre:1});
    }
});

Template.pagina.events({
	'click #btnAgregarPagina': function(){
        var Pagina = new Object();
        Pagina.Nombre = $("#nombre").val();
        Pagina.Url = $("#url").val();
        db.Pagina.insert(Pagina);
        $("input","#formAgregarPagina").val('');
    },
    'click .deletePagina': function(){
        if(confirm('¿Desea eliminar la página '+ this.Nombre +'?')){
            db.Pagina.remove(this._id);
        }
    }
});
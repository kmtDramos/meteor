/**/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { db } from '/imports/api/db';
import { Session } from 'meteor/session'


//
Template.centrodecostos.onCreated(function(){

    $(function(){
        
        $("#centrosdecostos").DataTable();

    });

});

Template.centrodecostos.events({
    'click #btnAgregarCentroDeCostos': function(){
        var CentroDeCostos = new Object();
        CentroDeCostos.Nombre = $("#nombre").val();
        CentroDeCostos.Margen = parseFloat($("#nombre").val());
        var valid = (!isNaN(CentroDeCostos.Margen) && CentroDeCostos.Margen > 0);
        if (valid){
            db.CentroDeCosto.insert(CentroDeCostos);
            $("#modalAgregarCentroDeCostos").modal("hide");
        }
        else
        {
            alert("El margen no es valido");
        }
    }
});
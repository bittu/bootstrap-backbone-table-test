$(function(){	var TableItemView = Backbone.View.extend({		template: _.template($('#tpl-table-list-item').html()),		events: {			"click input[type=checkbox]": "publish"		},		render: function (eventName) {		   var html=this.template(this.model.toJSON());		   this.setElement($(html));		   return this;		},		publish: function (e) {			console.log('checked - ' + e);		}	});	});
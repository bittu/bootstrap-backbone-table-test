$(function(){

	var coll=new TableCollection();
	var view=new TableView({collection:coll})
	$("body").append(view.render().el);

});
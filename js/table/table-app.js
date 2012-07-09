$(function () {

    "use strict"; // jshint ;_;
    
	var coll = new TableCollection(), view = new TableView({collection : coll});
    
	$("body").append(view.render().el);

});
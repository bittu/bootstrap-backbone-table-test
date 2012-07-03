$(function () {

	var TableView = Backbone.View.extend({
		tagName: 'table',
		initialize: function () {
			this.collection.bind("reset", this.render, this);
		},
		render: function (eventName) {
			this.$el.html();
			
			this.collection.each(function(table) {
				var tableview=new TableItemView({ model: table });
				var $tr=tableview.render().$el;            
				this.$el.append($tr);
			},this);

			return this;
		}
	});
	
});
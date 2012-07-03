$(function () {

	var TableView = Backbone.View.extend({
		tagName: 'table',
		initialize: function () {
			this.collection.bind("reset", this.render, this);
		},
		render: function (eventName) {
			this.$el.html();
			
			this.collection.each(function(table) {
				var tableitemview=new TableItemView({ model: table });
				var $tr=tableitemview.render().$el;            
				this.$el.append($tr);
			},this);

			return this;
		}
	});
	
});
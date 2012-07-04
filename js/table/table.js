$(function () {

	var TableModel = Backbone.Model.extend({
		initialize: function(){
			console.log('Table-Model initialized');
		}
	});
	
	var TableCollection = Backbone.Collection.extend({
		url: 'js/table/data/',
		model: TableModel,

		parse: function(page) {
			var retChild = {};
			
			$.ajax({
				url: this.url+page+'.js',
				dataType: 'json',
				async: false,
				success: function(response)
				{
					//this.CurrentModel=new TableModel(response.CurrentModel);
					retChild = response;				
				}
			});
			
			return retChild;
		}
	});
	
	var TableItemView = Backbone.View.extend({
		template: _.template($('#tpl-table-list-item').html()),
		events: {
			"click input[type=checkbox]": "publish"
		},
		render: function (eventName) {
			
		   var html=this.template(this.model.toJSON());
		   this.setElement($(html));
		   return this;
		},
		publish: function (e) {
			console.log('checked - ' + e);
		}
	});
	
	var TableView = Backbone.View.extend({
		initialize: function () {
			this.collection.bind("reset", this.render, this);
		},
		events: {
			"click a[data-rel=page]": "publish"
		},
		render: function (eventName) {
			this.$el.html();
			
			this.collection.each(function(table) {
				var tableitemview=new TableItemView({ model: table });
				var $tr=tableitemview.render().$el;            
				this.$el.append($tr);
			},this);

			return this;
		},
		publish: function (e) {
			
			if(!$(e.target).parent().hasClass('disabled'))
				coll.reset(coll.parse($(e.target).data('href').trim()));
			return false;
			
			//console.log($(e.target).data('href'));
		}
	});
	
	var coll=new TableCollection();
	var view=new TableView({collection:coll})
	$(".span12").append(view.render().el);
	
	coll.reset(coll.parse('page1'));
	
});
!function ($) {
	
	"use strict"; // jshint ;_;


	/* SORTER CLASS DEFINITION
	 * ====================== */
  
	var Sorter = function (el) {
		this.table = el
		this.init()
		$(el).on('click', 'th', $.proxy(this.clickSort, this))
		console.log('sort created')
	}
	
	Sorter.prototype = {
	
		constructor : Sorter
		
	,	cache : []
		
	,	sort : function (col, order) {
			console.log('sort called - ' + col + ' - ' + order)
			
			var tempArray = []
			,	tempCache = this.cache
			
			tempCache.sortById = function () {
				this.sort (function(a,b) {
					return a[col] - b[col];
				})
			}
		}
		
	,	init : function () {	
			var	lrows = this.table.rows.length
			,	lcolumns = this.table.rows[0].cells.length
			,	i = 0
			
			$(this.table).find('th').each(function(){
				$(this).data({'col': i++, 'ord': 'asc'}).css({'cursor' : 'pointer'})
			})
			
			i = 1
			for( ; i < lrows; i++) {
				var row = this.table.rows[i]
				,	tempCache = {}
				
				for(var j = 0 ; j < lcolumns ; j++) {
					tempCache[j] = $(row.cells[j]).text()
				}
				this.cache[i] = tempCache
			}
			console.log('sorter initialized')
			console.log(this.cache)
		}
		
	,	clickSort : function (e) {
			console.log('sort col clicked - ' + $(e.target))
			this.sort($(e.target).data('col'), $(e.target).data('ord'))
		}
	}
	
	/* SORTER PLUGIN DEFINITION
	 * ===================== */
	
	$.fn.sorter = function (option) {
		return this.each(function () {
			var $this = $(this)
			, 	data = $this.data('sort')
			, 	options = $.extend({}, $.fn.sorter.defaults, $this.data(), typeof option == 'object' && option)
			if (!data) $this.data('sort', (data = new Sorter(this)))
			data['sort'](options.sortCol, options.sortOrder)			
		})
	}
	
	$.fn.sorter.defaults = {
		sortOrder: 'asc'
	, 	sortCol: 0
	}
	
	$.fn.sorter.Constructor = Sorter
	
	/* SORTER DATA-API
	 * ============ */

	$(function () {
		$('table[data-toggle="sort"]').each(function (e) {
			$(this).sorter({sortOrder: 'desc', sortCol: 2})
		})
	})
	
}(window.jQuery);
/**
 * jQuery Grid Picker plugin
 *
 * @version 1.0
 * @author Chris Lyon <flushot@gmail.com>
 */
(function($) {

    /**
     * @param [options.cols] number of columns
     * @param [options.rows] number of rows
     * @param [options.cellSize] size of each cell (in pixels)
     */
    $.fn.gridpicker = function(options) {
        var grid = this,
            component = this,
            options = $.extend({
                name: this.data('name'),
                rows: this.data('rows') || 5,
                cols: this.data('cols') || 5,
                defaultRow: this.data('default-row'),
                defaultCol: this.data('default-col'),
                cellSize: this.data('cell-size') || 40,
                valueTransformer: function(row, col) {
                    return row + ',' + col;
                }
            }, options),
            row, col, cell;
        
        var gridArea = grid.find('.grid-picker-area');
        if (gridArea.length === 0) {
            gridArea = $('<div class="grid-picker-area"/>');
            grid.append(gridArea);
        }

        var hiddenEl = $('<input type="hidden" value=""/>');
        if (options.name)
            hiddenEl.attr('name', options.name);
        grid.append(hiddenEl);
        
        grid.css({
            width: (options.cols * options.cellSize) + 'px',
            height: (options.rows * options.cellSize) + 'px'
        });
        
        grid._value = { row: null, col: null };
        grid.val = function() {
            return grid._value;
        };
        
        var refreshSelection = function(row, col) {
            // Select all relevant cells between 1x1 this
            gridArea.find('.grid-cell').each(function() {
                var otherCell = $(this),
                    isSelected = otherCell.hasClass('selected');
                if (otherCell.data('row') <= row && 
                    otherCell.data('col') <= col) {
                    if (!isSelected)
                        otherCell.addClass('selected');
                }
                else if (isSelected) {
                    otherCell.removeClass('selected');
                }
            });
            
            // Trigger change event
            hiddenEl.val(options.valueTransformer(row, col));
        };

        var onCellClicked = function(cell) {
            var row = cell.data('row'),
                col = cell.data('col');
            
            refreshSelection(row, col);
            grid.trigger('change', [row, col]);
        };
        
        for (row = 1; row <= options.rows; ++row) {
            for (col = 1; col <= options.cols; ++col) {
                cell = $('<div/>')
                    .addClass('grid-cell')
                    .data('row', row)
                    .data('col', col)
                    .css({
                        'line-height': options.cellSize + 'px',
                        width: options.cellSize + 'px',
                        height: options.cellSize + 'px'
                    })
                    .html('<span>' + row + '&times;' + col + '</span>');

                cell.click(onCellClicked.bind(component, cell));
                gridArea.append(cell);
            }
        }

        if (options.defaultRow && options.defaultCol)
            refreshSelection(options.defaultRow, options.defaultCol);

        return grid;
    };

})(jQuery);

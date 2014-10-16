/**
 * jQuery Grid Picker plugin
 *
 * @version 1.0.0
 * @author Chris Lyon <flushot@gmail.com>
 */
(function($) {

    /**
     * Create a grid picker component
     *
     * @param [options.cols] number of columns
     * @param [options.rows] number of rows
     * @param [options.cellSize] size of each cell (in pixels)
     */
    $.fn.gridpicker = function(options) {
        $.each($(this), function() {
            var grid = $(this), row, col, cell,
                // Options and defaults
                opts = $.extend({
                    name: grid.data('name'),
                    rows: grid.data('rows') || 5,
                    cols: grid.data('cols') || 5,
                    defaultRow: grid.data('default-row'),
                    defaultCol: grid.data('default-col'),
                    cellSize: grid.data('cell-size') || 40,
                    valueTransformer: function(row, col) {
                        return row + ',' + col;
                    }
                }, options);

            // Create grid area
            var gridArea = grid.find('.grid-picker-area');
            if (gridArea.length === 0) {
                gridArea = $('<div class="grid-picker-area"/>');
                grid.append(gridArea);
            }

            // Create hidden form field
            var hiddenEl = $('<input type="hidden" value=""/>');
            if (opts.name)
                hiddenEl.attr('name', opts.name);
            grid.append(hiddenEl);
            
            // Size the grid
            grid.css({
                width: (opts.cols * opts.cellSize) + 'px',
                height: (opts.rows * opts.cellSize) + 'px'
            });
            
            /**
             * Select all relevant cells between 1x1 this
             *
             * @param row the row to select
             * @param the column to select
             */
            var refreshSelection = function(row, col) {
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
                hiddenEl.val(opts.valueTransformer(row, col));
            };

            /**
             * Grid cell was clicked
             *
             * @param cell the cell element that was clicked
             */
            var onCellClicked = function(cell) {
                var row = cell.data('row'),
                    col = cell.data('col');
                
                refreshSelection(row, col);
                grid.trigger('change', [row, col]);
            };
            
            // Create cells
            for (row = 1; row <= opts.rows; ++row) {
                for (col = 1; col <= opts.cols; ++col) {
                    cell = $('<div/>')
                        .addClass('grid-cell')
                        .data('row', row)
                        .data('col', col)
                        .css({
                            'line-height': opts.cellSize + 'px',
                            width: opts.cellSize + 'px',
                            height: opts.cellSize + 'px'
                        })
                        .html('<span>' + row + '&times;' + col + '</span>');

                    cell.click(onCellClicked.bind(grid, cell));
                    gridArea.append(cell);
                }
            }

            // Set default selection
            if (opts.defaultRow && opts.defaultCol)
                refreshSelection(opts.defaultRow, opts.defaultCol);

        });

        return this;
    };

})(jQuery);

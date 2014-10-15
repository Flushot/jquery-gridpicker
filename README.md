# jQuery GridPicker

Acts a a form input that allows a user to select an arbitrary grid size.
Useful for user-selectable table dimensions and other things.


## Example Usage

See (example)[example.html] for a better example.

Markup:

    <div id="grid-picker"></div>

Javascript code:

    $('#grid-picker')
        .gridpicker({
            cols: 5,
            rows: 4
        })
        .on('change', function(evt, row, col) {
            alert('Selected ' + row + 'x' + col + ' grid size');
        });


## Options

The gridpicker() constructor takes the following options:

| Option     | Type    | Description                          |
|------------|---------|--------------------------------------|
| name       | String  | Name of the hidden input field       |
| rows       | Integer | Number of rows in grid               |
| cols       | Integer | Number of columns in grid            |
| defaultRow | Integer | Default selected row                 |
| defaultCol | Integer | Default selected column              |
| cellSize   | Integer | Size of each cell square (in pixels) |
| valueTransformer | Function | Function that serializes the selected value in hidden input field |

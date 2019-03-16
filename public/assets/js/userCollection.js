console.log('test')
var searchTerm = '';
var lastQuery = '';

$(document).ready(() => {
    function searchTimer() {
        searchTerm = $('#searchTerm').val().trim();
        if (searchTerm.length < 2) {
            $('#searchResults').css('display', 'none');
        } else if (searchTerm != lastQuery) {
            $('#searchResults').css('display', 'block');
            lastQuery = searchTerm;
            getAutocomplete();
        };
        setTimeout(function () {
            searchTimer();
        }, 500);
    }

    function getAutocomplete() {
        $.get('https://api.scryfall.com/cards/autocomplete?q=' + lastQuery, function (autoComplete) {
            $('#searchResults').empty();
            autoCompleteList = '<ul>';
            $.each(autoComplete.data, function (i, v) {
                autoCompleteList += '<li class="acList">' + v;
            });
            $('#searchResults').append(autoCompleteList);
            $('.acList').on('click', function (event) {
                event.preventDefault();
                $('#searchTerm').val($(this).text());
            })
        });
    };
    searchTimer();
});
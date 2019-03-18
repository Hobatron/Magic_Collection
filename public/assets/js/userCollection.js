var searchTerm = '';
var lastSearch = '';

$(document).ready(() => {
    const user = $('footer').text().split(',');
    $('footer').remove();
    $('.addCard').click(function () {
        dataToSend = {
            cardJSON: {
                cardName: $('#currentCard').attr('data-name'),
                imgURL: $('#searchImg').attr('src'),
                isWishList: $(this).attr('data-isWishList'),
                detailsURL: $('#currentCard').attr('data-details'),
            },
            userInfo: user,
        }
        $.post('/api/addCard', dataToSend).then(() => {
            location.reload();
            //This is to not require the page to be refreshed 
            //Cut due to time restraints
            // if ($(this).attr('data-isWishList') == 'false') {
            //     target = $('#collection');
            //     btns = ['<button class="btn btn-danger">-1</button>', '<span class="badge badge-secondary">' + 1 + '</span><button class="btn btn-success">+1</button>']
            // } else {
            //     target = $('#wishList > ul');
            //     btns = ['<button class="btn btn-danger">X</button>', '<span class="btn btn-success">&uarr;</span>']
            // };
            // newLi = $('<li>' +
            //     btns[0] +
            //     '<a id=' + results.insertId +
            //     ' href=' + cardJSON.detailsURL + '>' +
            //     cardJSON.cardName + '</a>' +
            //     btns[1] +
            //     '<li>');
            // target.append(newLi)

        });
    });

    function updateCards(cardId) {

    }

    function searchTimer() {
        searchTerm = $('#searchTerm').val().trim();
        if (searchTerm.length < 2) {
            $('#searchResults').css('display', 'none');
        } else if (searchTerm != lastSearch) {
            $('#searchResults').css('display', 'block');
            lastSearch = searchTerm;
            getAutocomplete();
        };
        setTimeout(function () {
            searchTimer();
        }, 500);
    };

    function getAutocomplete() {
        $.get('https://api.scryfall.com/cards/autocomplete?q=' + lastSearch, function (autoComplete) {
            $('#searchResults').empty();
            autoCompleteList = '<ul>';
            $.each(autoComplete.data, function (i, v) {
                autoCompleteList += '<li class="acList">' + v;
            });
            $('#searchResults').append(autoCompleteList);
            $('.acList').on('click', function (event) {
                url = 'https://api.scryfall.com/cards/named?exact=' + $(this).text();
                $.get(url, function (cardJSON) {
                    $('#searchImg').attr('src', cardJSON.image_uris.normal);
                    $('#searchImg').attr('alt', $(this).text() + ' card image');
                    setDataToHTML(cardJSON.scryfall_uri, cardJSON.name);
                });
                lastSearch = $(this).text();
                $('#searchResults').css('display', 'none');
                event.preventDefault();
                $('#searchTerm').val($(this).text());
            })
        });
    };

    function setDataToHTML(details, name) {
        cc = $('#currentCard');
        cc.attr('data-details', details);
        cc.attr('data-name', name);
    }
    searchTimer();
});
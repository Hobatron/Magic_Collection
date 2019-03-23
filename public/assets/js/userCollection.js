var searchTerm = '';
var lastSearch = '';

$(document).ready(() => {
    var user = $('footer').text().split(',');
    user = user[0] + user[1] + '_cdb'
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
            //This is to not require the page to be refreshed 
            //Cut due to time restraints
            location.reload();

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

    $('.subtract').click(function (event) {
        event.preventDefault();
        updateCards($(this).siblings($('a')).attr('id'), -1)
    });
    $('.add').click(function (event) {
        event.preventDefault();
        updateCards($(this).siblings('a').attr('id'), 1)
    });
    $('.delete').click(function (event) {
        event.preventDefault();
        deleteCard($(this).siblings('a').attr('id'));
    });
    $('.moveToCollection').click(function (event) {
        event.preventDefault();
        card = $(this).siblings('a');
        //refact by combining this with .addCard class on click function
        deleteCard(card.attr('id'), true);
        dataToSend = {
            cardJSON: {
                cardName: card.text(),
                imgURL: card.attr('data-img'),
                isWishList: 'false',
                detailsURL: card.attr('href'),
            },
            userInfo: user,
        };
        $.post('/api/addCard', dataToSend).then(() => {
            console.log('test')
            location.reload();
        });
    })

    function updateCards(cardId, value) {
        if ($('#' + cardId).siblings('span').text() == 1 && value == -1) {
            deleteCard(cardId);
            return;
        };
        info = {
            cardId: cardId,
            value: value,
            userInfo: user
        }
        $.ajax({
            url: '/api/updateCard',
            type: 'PUT',
            data: info
        }).done(function (results) {
            location.reload();
        });
    };

    function deleteCard(cardId, willReturn) {
        info = {
            cardId: cardId,
            userInfo: user
        };
        $.ajax({
            url: '/api/deleteCard',
            type: 'DELETE',
            data: info
        }).done(function (results) {
            if (willReturn) {
                return;
            }
            location.reload();
        });
    };

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
jQuery(document).ready(function($){

    let card = $(".card");
    let cards = [...card];
    let cardType;  
    let currentCardType; 

    showCards();

    // Shuffle cards array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    // show shuffeled cards in html
    function showCards() {
        $('#card-container').html(shuffle(cards));
    }
    
    // reset on click
    $('.reset').on('click', function(e){
        e.preventDefault();
        $('body').css('overflow','visible');
        $('#popup').removeClass('open');
        $('.card').removeClass().addClass('card');
        showCards();
    });
      

    $('body').on('click', '.card', function(){
        currentCard = $(this);
        unfoldCards(currentCard); 
        setTimeout(function() {
            resultMessage();
        }, 500);
    });

    function unfoldCards(card) {
        card.addClass('show');
        let activeCards = $('.card.show');
        if(activeCards.length == 1) {
           cardType = card.attr('data-type');
        }

        if(activeCards.length == 2) {
            
            currentCardType = card.attr('data-type');

            if(cardType === currentCardType) {
                activeCards.removeClass('show').addClass('matched');
                console.log('matched')
            } else {
                setTimeout(function() {
                    activeCards.removeClass('show');
                }, 500);
            }
        }

    }

    function resultMessage() {
        var totalMatchedCards = $('.card.matched').length;
        if(cards.length == totalMatchedCards) {
            $('body').css('overflow','hidden');
            $('#popup').addClass('open');
        }
    }

})
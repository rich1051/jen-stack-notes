console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');

    $('#addJokeButton').on('click', addJoke);

// calling getJoke function here loads the list of pre-made jokes on start-up
    getJoke();
}

function getJoke() {
    $.ajax({
        type: 'GET',
        url: '/laugh'

// this allows it to appear on the DOM using renderToDom function
    }).then(function (response) {
        console.log('Success!', response);
        renderToDom(response);

// if it doesn't work, gives an alert:
    }).catch(function(error) {
        alert('Request failed! :(');
        console.log('Request failed: ', error);
    });
};


function addJoke(event) {
    event.preventDefault

    console.log('submit called')
    // creating variables to hold input fields:
        const whoseJoke = $('#whoseJokeIn').val();
        const jokeQuestion = $('#questionIn').val();
        const punchLine = $('#punchlineIn').val();
        
    // clear input fields on submit:
        $('#whoseJokeIn').val('');
        $('#questionIn').val('');
        $('#punchlineIn').val('');
    
        $.ajax({
            method: 'POST',
            url: '/joke',
            data: {
                whoseJoke,
                jokeQuestion,
                punchLine
            }
        }).then(function(response) {
            console.log('Success!');
    // call getJoke function:
            getJoke();
        }).catch(function(error) {
            alert('Error with math post!');
            console.log('Error with post: ', error);
        });
    };

    function renderToDom(jokes) {
        // getting rid of any "old" data
                $('#outputDiv').empty();
        // appending server output to DOM using for-of loop:
                for (let joke of jokes) {
                    $('#outputDiv').append(`
                    <li>${joke.whoseJoke}'s Joke: ${joke.jokeQuestion} The punchline: ${joke.punchLine}</li>
                `);
            };
        };
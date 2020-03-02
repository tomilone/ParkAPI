const apiKey = 'g4ktZPgZBAYfeMSBeitnpKfZrzQd0YmdJTiaRyKe';
const searchUrl = 'https://developer.nps.gov/api/v1/parks'

function formatQuery(states, lim) {

    query = states.map(a => `?stateCode=${a}`);
    return  searchUrl + query.join('&') + `&limit=${lim}` + `&api_key=${apiKey}`
}




function getParks(states, lim) {
    let url = formatQuery(states,lim);
    const options = {
        headers: new Headers({
            "x-api-key": apiKey
        })
    };

    fetch(`${url}`)
        .then(response => {

            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson =>
            displayResults(responseJson, lim))
        .catch(err => {
            $(`#js-error-message`).text(`Something went wrong: ${err}`)
        });

}

function displayResults(responseJson, lim){
    
    if(responseJson.data.length < 10){
        lim = responseJson.data.length
    }
    
    $('.results').html('');
    for(let i = 0; i < lim; i ++){
    $('.results').append(
        `</br>${responseJson.data[i].fullName}</br></br>
        ${responseJson.data[i].description}</br></br>
        ${responseJson.data[i].url}</br>`
     )}
     


}

function watchForm() {
    $('form').submit(event => {
        $( `#js-error-message`).text('')
        event.preventDefault();
        
        let x =[$(`.goop`).val()]
        let y =$(`.lim`).val()
        if(y.length == 0){
            y = 10;
        }
        

        getParks(x,y);


    });
}

function final(){
    $(watchForm);
}

$(final);
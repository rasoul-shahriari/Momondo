(function() {
  function init() {
    getData(getUniqueSearchIdentifier());
  }

  function  getUniqueSearchIdentifier() {
     return Math.floor(Math.random()*1E16);
  }

  function callApi(randomNumber) {
    return $.ajax({
      type: 'GET',
      url: 'http://momondodevapi.herokuapp.com/api/1.0/FlightSearch/' + randomNumber,
      data: JSON.stringify(),
      dataType: 'json'
    });
  }

  function getData(uniqueSearchIdentifier) {
    callApi(uniqueSearchIdentifier).done(function(result) {
    template.extractData(result);
      if (!result.Done) {
        getData(uniqueSearchIdentifier);
      }
      else {
        addTicketsToDom(template.extractedData);
      }
    }).fail(function(error) {
      console.log('some thing is wrong, Error code is: ');
      console.log(error);
    });
  }

  function addTicketsToDom(data) {
    $('#template-place').html(template.getTemplate(data));
  }

  var template = new this.template();
  init();
}());

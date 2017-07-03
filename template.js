function template() {
  this.ticketObjects = [];
  this.extractedData = {Flights:[], Offers:[], Segments: [] ,Legs: []};
}

template.prototype.getTemplate = function(data) {
  return _.template($('#template').html())({ data:this.getSortedTickets(data) });
};

template.prototype.getSortedTickets = function(data) {
  return _.sortBy(this.getTickets(data), 'Price');
};

template.prototype.getTickets = function(data) {
  var self = this;
  _.each(data.Offers, function(tickets) {
    self.creatTicket(data,tickets);
  });
  return self.ticketObjects;
};

// Create Ticket which is going to be shown on the page based on one way or round trip
template.prototype.creatTicket = function(data, tickets) {
  var FlightIndex = tickets.FlightIndex;
  var segment = this.getFlightSegments(data,FlightIndex);
  this.ticketObjects.push({
    origin : data.Legs[this.getFlightSegmentByIndex(data,FlightIndex, 0)],
    destination: segment.length == 2 ? data.Legs[this.getFlightSegmentByIndex(data,FlightIndex, 1)] : 'undefined',
    Price: tickets.Price,
    Deeplink: tickets.Deeplink
  });
};

template.prototype.getFlightSegmentByIndex = function(data,FlightIndex, index) {
   return  data.Flights[FlightIndex].SegmentIndexes[index] ;
};

template.prototype.getFlightSegments = function(data,FlightIndex) {
   return  data.Flights[FlightIndex].SegmentIndexes ;
};

// Extract reqiured information of API response
template.prototype.extractData = function(data){
  var self = this;
  _.each(data.Flights,function(flight){
    self.extractedData.Flights.push(_.pick(flight,'SegmentIndexes'));
  });
  _.each(data.Offers,function(offer){
     self.extractedData.Offers.push(_.pick(offer,'FlightIndex','Deeplink','Price'));
  });
  _.each(data.Segments,function(segment){
     self.extractedData.Segments.push(_.pick(segment,'LegIndexes'));
  });
  _.each(data.Legs,function(leg){
     self.extractedData.Legs.push(leg);
  });
};

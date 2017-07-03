var formatting = {
  formatDuration: function(duration) {
    var minutes = duration % 60;
    var hours = (duration - minutes) / 60;
    return hours > 0 ? hours.toString() + "h " + (minutes<10?"0":"") + minutes.toString() + 'm':(minutes<10?"0":"") + minutes.toString() + 'min';
  },
  formatCityName: function(cityName) {
    return cityName.substr(0, cityName.indexOf("("));
  },
  getTime: function(Time) {
    return Time.substr(Time.indexOf("T") + 1, 5);
  }
};

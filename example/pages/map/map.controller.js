function MapController () {
    this.text = "Angular Framework7 Rocks!";
    this.map = {
      center: {
        latitude: -3.7390651,
        longitude: -38.5147881
      },
      zoom: 12,
      options: {
        disableDefaultUI: true,
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f78f30"},{"visibility":"on"}]}],
      }
    };
}

angular.module('app.map')
.controller('MapController', MapController)

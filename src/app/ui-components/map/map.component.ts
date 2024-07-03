import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: '../style/component-style.css'
})
export class MapComponent {
  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    const mapElement = document.getElementById('map') as HTMLElement;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const mapOptions: google.maps.MapOptions = {
          center: userLatLng,
          zoom: 15
        };

        const map = new google.maps.Map(mapElement, mapOptions);

        const marker = new google.maps.Marker({
          position: userLatLng,
          map: map,
          title: 'You are here'
        });
      }, (error) => {
        console.error('Error getting user location', error);
        this.handleLocationError(true, mapElement, { lat: -25.363, lng: 131.044 });
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, mapElement, { lat: -25.363, lng: 131.044 });
    }
  }

  handleLocationError(browserHasGeolocation: boolean, mapElement: HTMLElement, pos: google.maps.LatLngLiteral) {
    const map = new google.maps.Map(mapElement, {
      center: pos,
      zoom: 6
    });

    const infoWindow = new google.maps.InfoWindow({
      position: pos,
      content: browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.'
    });

    infoWindow.open(map);
  }
}

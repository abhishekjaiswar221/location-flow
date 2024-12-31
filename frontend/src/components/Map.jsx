import { Input } from "./ui/input";
import { useRef, useEffect } from "react";
import { Card } from "./ui/card";

const Map = () => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      const searchBox = new window.google.maps.places.SearchBox(
        searchBoxRef.current
      );

      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="absolute z-10 w-full top-5">
        <div className="flex items-center justify-center">
          <Card className="flex w-full max-w-md gap-5 p-4">
            <div className="w-full">
              <Input
                type="text"
                ref={searchBoxRef}
                placeholder="Search Map"
                className="border-gray-200"
              />
            </div>
            {/* <div className="flex w-2/5 gap-5">
              <Button className="w-auto text-white bg-blue-500 hover:bg-blue-600">
                Search
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 hover:bg-gray-100"
              >
                <Navigation2 className="w-4 h-4" />
              </Button>
            </div> */}
          </Card>
        </div>
      </div>
      <div className="w-full h-full" ref={mapRef} />
    </div>
  );
};

export default Map;

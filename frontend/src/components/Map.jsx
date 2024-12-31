// Import necessary hooks from React
import { useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

// Define the Map component
const Map = () => {
  // Create references for the map and search box elements
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  // useEffect hook to run the code once the component mounts
  useEffect(() => {
    // Function to load the Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap(); // Initialize map once script is loaded
      document.head.appendChild(script);
    };

    // Function to initialize the map and search box
    const initializeMap = () => {
      // Create a new map instance
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      // Create a new search box instance
      const searchBox = new window.google.maps.places.SearchBox(
        searchBoxRef.current
      );

      // Add a listener to update the search box bounds when the map bounds change
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      // Add a listener to handle the event when places are changed in the search box
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }

        // Create a new bounds object to fit the map to the selected places
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          // Extend the bounds to include each place's location
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds); // Fit the map to the new bounds
      });
    };

    // Check if the Google Maps script is already loaded, if not, load it
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }
  }, []); // Empty dependency array to run the effect only once

  // Return the JSX for rendering the map and search box
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
            {/* Uncomment the following block to add search and navigation buttons */}
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
      <div className="w-full h-full" ref={mapRef} /> {/* Map container */}
    </div>
  );
};

export default Map; // Export the Map component

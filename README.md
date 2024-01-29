# Djungelskog Hunter

<img alt="Logo" align="right" src="./src/assets/images/big-djungelskog.png" width="20%" />

Djungelskog Hunter is a web tool for finding out where your favorite Ikea products can be bought all over the world.

Deployed Site: [djungelskog.netlify.app](djungelskog.netlify.app)

## How to run it:
**Requirements:** Node 14.0.0 or later  

1. Clone [this repo](https://github.com/alex-oh/ikea-product-locator).
2. Run the app by typing `npm start` in the terminal while in the top level directory.  
3. Open http://localhost:3000 to view it in the browser.

## Demo
### Searching a country for a product:
![Demo - Search Country](src/assets/demos/search-country.gif)

### Searching a new product in a different country:
![Demo - Search product in new country](src/assets/demos/search-new-product.gif)

## How it's made:
### Tech Used: React, Javascript, HTML, CSS, Netlify (deploy)
### Libraries & APIs:
- [ikea-availability-checker](https://github.com/Ephigenia/ikea-availability-checker) - Ikea API library
- [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [react-geocode](https://github.com/shukerullah/react-geocode) - React library for Google Maps Geocode API
- [react-google-maps]() - React library for Google Maps Maps API

## Background
"DJUNGELSKOG Soft toy, brown bear" is a very cute stuffed animal product that Ikea sells. However, many people think that it's cute, and on top of that, DJUNGELSKOG is not sold in every country, even if there are Ikea stores there. These two points mean that locating DJUNGELSKOG can be more difficult than expected.

I wanted a quick way to find DJUNGELSKOG near me since it was very cute. This tool also works to search any other product made by Ikea.

*__Caveat__: Product numbers are issued by region. This means that a product in the United States has a different article number than the same product in the European or Asia-Pacific regions.*

## Future Improvements
- Handle API responses more predictably - sometimes, an API request is rejected but the component still renders, without that requested data.
- Use Google Maps API directly instead of using libraries for more control over maps objects (FMarker, FOverlay, etc are a bit hard to work with). This might simplify the logic used to work with the maps components.
- Feature: correlate ikea product numbers across different countries.
- Feature: toggle switch to search for big djungelskog or small djungelskog on command
- Improve visual search result feedback to improve user experience

## What I learned
I learned a lot more about using callback functions to pass data between components more easily, as well as handling asynchronous requests/responses in varying capacities. In my efforts to use different portions of the Google Maps API (Maps, Places, Geocoder) with the help of various libraries and documentation, I developed a much stronger conceptualization of APIs and their usage. Lastly, I grew far more comfortable with `useState` and `useEffect` and passing props into components.

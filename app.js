//let

let favoriteCityId = "rome";

console.log(favoriteCityId);

favoriteCityId = "paris";
console.log(favoriteCityId);

//const 

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];

//citiesId = [];

console.log(citiesId);

citiesId.push("tokyo");
console.log(citiesId);

//Creation d'objet
function getWeather(cityId) {

    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };

}

const weather = getWeather(favoriteCityId);

console.log(weather);


//Affectation destructurer

let { city, temperature } = weather;

console.log(city);
console.log(temperature);

let [parisId, nycId, ...otherCitiesId] = citiesId;

console.log(parisId);
console.log(nycId);
console.log(otherCitiesId.length);


class Trip {

    constructor(id, name, imageUrl) {
        this._id = id;
        this._name = name;
        this._imageUrl = imageUrl;
    }

    toString() {

        return "Trip " + "[" + this._id + "," + this._name + "," + this._imageUrl + "," + this._price + "]";
    }

    get price() {
        return this._price;
    }

    set price(val) {
        this._price = val;
    }

    static getDefaultTrip() {

        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");

    }

}

let parisTrip = new Trip("paris", "Paris", "img/paris.jpg");

console.log(parisTrip);

console.log(parisTrip.toString());

parisTrip.price = 100;

console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();

console.log(defaultTrip.toString());


class FreeTrip extends Trip {

    constructor(id, name, imageUrl) {
        super(id, name, imageUrl)
        this._price = 0;
    }

    toString() {
        return "Free" + super.toString();
    }

}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");

console.log(freeTrip.toString());

class TripService {
    constructor() {
        this._trip = new Set();
        this._trip.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this._trip.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this._trip.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));

    }
    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
             
                this._trip.forEach(trip=>{
                    if(trip._name===tripName){
                       
                        resolve(trip);
                    }
                });                                              
                 reject("No trip with name "+tripName); // en cas d'erreur
                       
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
            }, 2000);
        });
    };
}



class PriceService {

    constructor() {

        this._priceService = new Map();
        this._priceService.set("Paris", 100);
        this._priceService.set("Rio de Janeiro", 800);

        // 'paris' --> price == 100
        // 'rio-de-janeiro' --> price == 800)
        // no price for 'nantes'
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

            

                this._priceService.forEach(function(valeur,cle){
                   
                    if(cle===tripId){
                       
                        resolve(valeur);
                    }
                });                                              
                 reject("No price found for id "+tripId);


            }, 2000)
        });
    }
}


const tripService = new TripService();

tripService.findByName("Paris")
.then(trip=> console.log(trip))
.catch(error=>{ console.log(error);
});
tripService.findByName("Toulouse")
.then(trip=> console.log(trip))
.catch(error=>{ console.log(error);
});

const priceService = new PriceService();


tripService.findByName("Rio de Janeiro")
.then(trip=>priceService.findPriceByTripId(trip._name))
.then(price=>console.log("Price found : "+price))
.catch(error=>console.log(error));


tripService.findByName("Nantes")
.then(trip=>priceService.findPriceByTripId(trip._name))
.then(price=>console.log("Price found : "+price))
.catch(error=>console.log(error));



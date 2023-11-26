// import ikea availability checker library
const checker = require("ikea-availability-checker");

const getItem = async (countryCode, productId) => {
    // make a list of all the stores in the region by country code
    const stores = checker.stores.findByCountryCode(countryCode);
    console.log(stores);
    // get availabilities of product in each store in the region
    const storesAvailable = JSON.stringify(
        await checker.availabilities(stores, [productId])
    );

    // return json object of all stores with item in stock
    return JSON.parse(storesAvailable);
}

async function getItemGlobal(productId) {
    /*
    Input: productId (string) - the product id
    Output: storesAvailableGlobal (list) - 
    */
    // list of all country codes
    countryCodes = [
        "au",
        "at",
        "be",
        "ca",
        "ch",
        "cn",
        "cz",
        "de",
        "dk",
        "es",
        "fi",
        "fr",
        "gb",
        "hk",
        "hu",
        "hr",
        "ie",
        "it",
        "jo",
        "jp",
        "kr",
        "kw",
        "lt",
        "lv",
        "my",
        "nl",
        "no",
        "pl",
        "pt",
        "qa",
        "ro",
        "sa",
        "se",
        "sg",
        "sk",
        "th",
        "tw",
        "us",
    ];

    // initialize the global stores available dict
    var storesAvailableGlobal = {};

    flag = 0
    countryCodes.forEach(async (c) => {
        // get the stores available in a particular region
        var storesAvailableRegion = await getItem(c, productId);

        // add the stores available in a region to the global dictionary
        // accessible by region
        storesAvailableGlobal[c] = storesAvailableRegion;
    });

    // return dictionary of json objects
    // console.log("loop exited");
    // console.log("stores available global final: %o", storesAvailableGlobal);
    res.JSON(storesAvailableGlobal);
}

async function main() {
    const items = await getItem("de", "00402813");
    console.log(items[0]);
    items.map((item) => console.log("store %d: %s", item.buCode, item.store.name));
   

    // const itemsGlobal = await getItemGlobal("20402831");
    // if (itemsGlobal) {
    //     console.log(itemsGlobal);
    // }
}

// make main() the default function run
if (require.main === module) {
    main();
}

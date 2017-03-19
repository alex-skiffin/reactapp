const getLocations = () => {
    if (typeof (Storage) === 'undefined')
        return { 'locations': ['Moscow'] };

    let locations = localStorage.getItem('weatherapp_storage');
    let locationsJson = JSON.parse(locations);
    if (!locationsJson)
        locationsJson = { 'locations': ['Moscow'] };

    localStorage.setItem('weatherapp_storage', JSON.stringify(locationsJson));

    return locationsJson.locations;
}
export default getLocations;
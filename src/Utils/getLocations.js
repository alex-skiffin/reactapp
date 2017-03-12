const getLocations = () => {
    if (typeof (Storage) === 'undefined')
        return ['Moscow'];

    let locations = localStorage.getItem('locations');
    let locationsJson = JSON.parse(locations);
    if (!locationsJson)
        locationsJson = ['Moscow'];

    localStorage.setItem('locations', JSON.stringify(locationsJson));

    return locationsJson;
}
export default getLocations;
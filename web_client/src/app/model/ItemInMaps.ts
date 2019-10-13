export class ItemInMaps{
    userName: string;
    lng: Number;
    lat: Number;
    constructor(usn, lng, lat){
        this.userName = usn;
        this.lat = lat;
        this.lng = lng;
    }
}
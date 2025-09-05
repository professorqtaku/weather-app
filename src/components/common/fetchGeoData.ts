import axios from "axios";

const endpoint = "https://geocoding-api.open-meteo.com/v1/search"

export enum Status {
    SUCCESS,
    LOADING,
    ERROR,
    IDLE
}

export type GeoProps = {
    name: String;
}

export type GeoData = {
    name: String;
    country: String;
    latitude: number;
    longitude: number;
}

const getEndpoint = ({name}: GeoProps) => {
    return `${endpoint}?name=${name}&count=1&language=en&format=json`;
}

const fetchGeoData = async (props: GeoProps): Promise<GeoData[] | null> => {
    const res = await axios.get(getEndpoint(props));
    if(res.status == 200 && res.data.results != null) {        
        return res.data.results as GeoData[];
    }
    return null;
}

export default fetchGeoData;
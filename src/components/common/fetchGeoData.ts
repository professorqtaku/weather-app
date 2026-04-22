import axios from "axios";

const endpoint = "https://geocoding-api.open-meteo.com/v1/search"

export enum Status {
    SUCCESS,
    LOADING,
    ERROR,
    IDLE
}

export type GeoProps = {
    name: string;
    count?: number;
}

export type GeoData = {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

const getEndpoint = ({name, count = 1}: GeoProps) => {
    return `${endpoint}?name=${name}&count=${count}&language=en&format=json`;
}

const fetchGeoData = async (props: GeoProps): Promise<GeoData[] | null> => {
    const res = await axios.get(getEndpoint(props));
    if(res.status == 200 && res.data.results != null) {        
        return res.data.results as GeoData[];
    }
    return null;
}

export default fetchGeoData;
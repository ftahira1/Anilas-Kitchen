import { useQuery } from "@apollo/client"
import {QUERY_GOOGLE_MAPS_KEY} from '../utils/queries'
import MapRender from "../components/MapRender";

export default function Maps2 (props) {
    const {loading,data} = useQuery(QUERY_GOOGLE_MAPS_KEY)
    const apiKey = data?.googleApikey.apiKey || '';
    return (
        <> 
        
        {loading ? (
            <h1>loading</h1>
        ): (
            <MapRender apiKey={apiKey}/>
        )}
        
        
        
        
        </>


    )
}
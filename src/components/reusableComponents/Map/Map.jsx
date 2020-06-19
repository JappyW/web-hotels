import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, GoogleMapWrapper } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import {LOCALITY, ROUTE, STREET_NUMBER, COUNTRY, ACCURACY_LAT, API_KEY, GOOGLE_MAP_URL} from "../../../constants/actionTypes";
Geocode.setApiKey(API_KEY);

class Map extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            address: '',
            house: '',
            street: '',
            city: '',
            country: '',
            location: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }

     //Get the current address from the default map position and set those values in the state
    componentDidMount() {
        Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
            response => {
                const address      = response.results[0].formatted_address;
                const addressArray =  response.results[0].address_components;
                const city         = this.getAddress(addressArray, LOCALITY);
                const house        = this.getAddress(addressArray, STREET_NUMBER);
                const street       = this.getAddress(addressArray, ROUTE);
                const country      = this.getAddress(addressArray, COUNTRY);
                const location     = response.results[0].geometry.location;
                this.setState( {
                    address: ( address ) ? address : '',
                    house: ( house ) ? house : '',
                    street: ( street ) ? street : '',
                    city: ( city ) ? city : '',
                    country: ( country ) ? country : '',
                    location: ( location ) ? location : '',
                } )
            },
            error => {
                console.error(error);
            }
        );
    };

    getAddress = ( addressArray = [], param ) => {
        const res = addressArray.find((item) => (
            item.hasOwnProperty('types') && item.types[0] && param === item.types[0]
        ));
        return res ? res.long_name || '': '';
    }

     //Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
    shouldComponentUpdate( nextProps, nextState ){
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.house !== nextState.house ||
            this.state.street !== nextState.street ||
            this.state.city !== nextState.city ||
            this.state.country !== nextState.country ||
            this.state.location !== nextState.location
        ) {
            return true
        } else if ( this.props.center.lat === nextProps.center.lat ){
            return false
        }
    }

    onInfoWindowClose = ( event ) => {
    };

     //When the user types an address in the search box
    onPlaceSelected = ( place ) => {
        const address      = place.formatted_address;
        const addressArray = place.address_components;
        const city         = this.getAddress(addressArray, LOCALITY);
        const house        = this.getAddress(addressArray, STREET_NUMBER);
        const street       = this.getAddress(addressArray, ROUTE);
        const country      = this.getAddress(addressArray, COUNTRY);
        const location     = place.geometry.location;
        const latValue     = place.geometry.location.lat();
        const lngValue     = place.geometry.location.lng();
        this.setState({
            address: (address) ? address : '',
            house: (house) ? house : '',
            street: (street) ? street : '',
            city: (city) ? city : '',
            country: (country) ? country : '',
            location: (location) ? location : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
        this.props.mapGetStateToParent({
            address: (address) ? address : '',
            house: (house) ? house : '',
            street: (street) ? street : '',
            city: (city) ? city : '',
            country: (country) ? country : '',
            location: (location) ? location : ''

        });
    }

     //When the marker is dragged you get the lat and long using the functions available from event object.
     //Use geocode to get the address, city, area and state from the lat and lng positions.
     //And then set those values in the state.
    onMarkerDragEnd = ( event ) => {
        let newLat       = event.latLng.lat();
        let newLng       = event.latLng.lng();
        let addressArray = [];
        Geocode.fromLatLng( newLat , newLng ).then(
            response => {
                const address      = response.results[0].formatted_address;
                const addressArray =  response.results[0].address_components;
                const city         = this.getAddress(addressArray, LOCALITY);
                const house        = this.getAddress(addressArray, STREET_NUMBER);
                const street       = this.getAddress(addressArray, ROUTE);
                const country      = this.getAddress(addressArray, COUNTRY);
                const location     = response.results[0].geometry.location;
                this.setState( {
                    address: ( address ) ? address : '',
                    house: ( house ) ? house : '',
                    street: ( street ) ? street : '',
                    city: ( city ) ? city : '',
                    country: ( country ) ? country : '',
                    location: (location) ? location : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLng,
                        lng: newLng
                    },
                } )
                this.props.mapGetStateToParent({
                    address: ( address ) ? address : '',
                    house: ( house ) ? house : '',
                    street: ( street ) ? street : '',
                    city: ( city ) ? city : '',
                    country: ( country ) ? country : '',
                    location: (location) ? location : ''
                })

            },
            error => {
                console.error(error);
            }
        );

    };

    render(){
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                               defaultZoom={this.props.zoom}
                               defaultCenter={{ lat: this.state.mapPosition.lat,
                                                lng: this.state.mapPosition.lng }}
                    >
                        {this.props.autocomplete ?(
                        <Autocomplete className="w-100 mt-2 mb-2 p-2"
                            onPlaceSelected={ this.onPlaceSelected }
                            types={[ ]}
                            placeholder='Please enter street, number, city, country'
                        />) : null}

                        {this.props.readOnly ?(
                        <Marker
                                google={this.props.google}
                                draggable={true}
                                onDragEnd={ this.onMarkerDragEnd }
                                position={{ lat: this.state.markerPosition.lat, 
                                            lng: this.state.markerPosition.lng }}
                        />) :
                            (<Marker google={this.props.google}
                                draggable={false}
                                onDragEnd={ this.onMarkerDragEnd }
                                position={{ lat: this.state.markerPosition.lat, 
                                            lng: this.state.markerPosition.lng }}
                        />)}

                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: ( this.state.markerPosition.lat + ACCURACY_LAT ), 
                                        lng: this.state.markerPosition.lng }}
                        >
                            <div>
                                <span>{ this.state.address }</span>
                            </div>
                        </InfoWindow>
                    </GoogleMap>
                )
            )
        );
        let map;
        if( this.props.center.lat !== undefined ) {
            map = <div>
                <AsyncMap
                    googleMapURL={ GOOGLE_MAP_URL }
                    loadingElement={
                        <div className="h-100" />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div className="h-100" />
                    }
                />
            </div>
        }
        return( map )
    }
}
export default Map

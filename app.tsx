declare var require: any

import { useState } from 'react';

var React = require('react');
var ReactDOM = require('react-dom');

/**
 * Parent component representing the properties table and raw JSON
 * output below it.
 *
 * Modern, functional implementation using state hook.
 */
function PropertiesListModern() {
    const [properties, setProperties] = useState([]);
    const [rawResponseData, setRawResponseData] = useState([]);

    var fetch = require('whatwg-fetch');
    fetch.fetch('/api/properties').then((response) => {
        return response.json();
    }).then((json) => {
        setProperties(json.value);
        setRawResponseData(json);
    }).catch((ex) => {
        console.log('Parsing failed.', ex)
    })

    // If there are any issues getting the data, backend will return an
    // empty JSON object.
    if (!properties) {
        return (
            <div class="error">
                No property data available.
            </div>
        );
    }

    // Table header.
    var header = (
        <tr>
            <th>Listing ID</th>
            <th></th>
            <th></th>
        </tr>
    );

    // Table rows are composed of PropertyRow components. Row data and
    // index are passed as props.
    var rows = properties.map((row, index) => {
        return (<PropertyRowModern propertyData={row} key={row.ListingId} />);
    });

    return (
        <div id="properties">
            <h1>Properties List</h1>
            <table id="properties-list">
                <thead>{ header }</thead>
                <tbody>{ rows }</tbody>
            </table>

            <h1>Parsed API output.</h1>
            <div id="rawOutput">
                { JSON.stringify(rawResponseData) }
            </div>
        </div>
    );
}

/**
 * Child component representing an individual row in the PropertiesList parent.
 *
 * Modern, functional implementation using state hook.
 *
 * Encapsulating each row in a component instance simplifies access to and
 * control of that row's state.
 */
function PropertyRowModern(props) {
    const [propertyData, setPropertyData] = useState(props.propertyData);
    const [lookupProperty, setLookupProperty] = useState('');
    const [lookupValue, setLookupValue] = useState('');

    // An onClick handler for the "Look Up" button. Queries row state for the
    // data property requested by the user.
    var getLookupVal = function () {
        var lookupValue = '';

        // Rudimentary validation & error handling.
        if (!lookupProperty) {
            lookupValue = 'Please enter an Item Name to look up.';
        }
        else if (propertyData[lookupProperty] == undefined) {
            lookupValue = 'Specified Item Name is not set.';
        }
        else {
            lookupValue = propertyData[lookupProperty];
            // Data is re-encoded into JSON to simplify visual display of complex
            // objects.
            lookupValue = JSON.stringify(lookupValue);
        }

        // Update state with the result of our query; two-way binding will show
        // it to the user.
        setLookupValue(lookupValue);
    };

    return (
        <tr key={ propertyData.ListingId + '-tr' }>
            <td>{ propertyData.ListingId }</td>
            <td>
                <input type="text" className="form-input" placeholder="Item name" onChange={ (event) => {
                    setLookupProperty(event.target.value.trim());
                } } />

                <button type="submit" className="form-submit" onClick={ getLookupVal }>Look up</button>
            </td>
            <td>{ lookupValue }</td>
        </tr>
    );
}

// --
// --
// -- Original, "traditional-style" implementation of both components
// -- below.
// --
// --

/**
 * Parent component representing the properties table and raw JSON
 * output below it.
 *
 * Traditional implementation.
 */
export class PropertiesListTraditional extends React.Component {
    constructor() {
        super();

        this.state = {
            properties: [],
            rawResponseData: [],
        };

        var fetch = require('whatwg-fetch');
        fetch.fetch('/api/properties').then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                properties: json.value,
                rawResponseData: json
            });
        }).catch((ex) => {
            console.log('Parsing failed.', ex)
        })
    }

    render() {
        // If there are any issues getting the data, backend will return an
        // empty JSON object.
        if (!this.state.properties) {
            return (
                <div class="error">
                    No property data available.
                </div>
            );
        }

        // Table header.
        var header = (
            <tr>
                <th>Listing ID</th>
                <th></th>
                <th></th>
            </tr>
        );

        // Table rows are composed of PropertyRow components. Row data and
        // index are passed as props.
        var rows = this.state.properties.map((row, index) => {
            return (<PropertyRowTraditional propertyData={row} key={row.ListingId} />);
        });

        return (
            <div id="properties">
                <h1>Properties List</h1>
                <table id="properties-list">
                    <thead>{ header }</thead>
                    <tbody>{ rows }</tbody>
                </table>

                <h1>Parsed API output.</h1>
                <div id="rawOutput">
                    { JSON.stringify(this.state.rawResponseData) }
                </div>
            </div>
        );
    }
}

/**
 * Child component representing an individual row in the PropertiesList parent.
 *
 * Traditional implementation.
 *
 * Encapsulating each row in a component instance simplifies access to and
 * control of that row's state.
 */
export class PropertyRowTraditional extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Complete data object for this row. Straight from the API
            // and unsanitized.
            propertyData: props.propertyData,
            // User input for data lookup.
            lookupProperty: '',
            // Value of last lookup query.
            lookupValue: ''
        };
    }

    // An onChange handler for user input. Tracks the input data.
    setLookupProperty = (event) => {
        this.setState({
            // Input is trimmed to eliminate trailing whitespace (often
            // found in copy/paste operations).
            lookupProperty: event.target.value.trim()
        });
    }

    // An onClick handler for the "Look Up" button. Queries row state for the
    // data property requested by the user.
    getLookUpValue = () => {
        var lookupValue = '';

        // Rudimentary validation & error handling.
        if (!this.state.lookupProperty) {
            lookupValue = 'Please enter an Item Name to look up.';
        }
        else if (this.state.propertyData[this.state.lookupProperty] == undefined) {
            lookupValue = 'Specified Item Name is not set.';
        }
        else {
            lookupValue = this.state.propertyData[this.state.lookupProperty];
            // Data is re-encoded into JSON to simplify visual display of complex
            // objects.
            lookupValue = JSON.stringify(lookupValue);
        }

        // Update state with the result of our query; two-way binding will show
        // it to the user.
        this.setState({
            lookupValue: lookupValue
        });
    }

    render() {
        return (
            <tr key={ this.state.propertyData.ListingId + '-tr' }>
                <td>{ this.state.propertyData.ListingId }</td>
                <td>
                    <input type="text" className="form-input" placeholder="Item name" onChange={ this.setLookupProperty } />
                    <button type="submit" className="form-submit" onClick={ this.getLookUpValue }>Look up</button>
                </td>
                <td>{ this.state.lookupValue }</td>
            </tr>
        );
    }
}

ReactDOM.render(<PropertiesListModern />, document.getElementById('root'));
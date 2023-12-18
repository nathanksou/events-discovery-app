import { useEffect, useState } from 'react';
import './App.css';
import Filters from './components/Filters/Filters';
import { Pagination } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function App() {
  const url = 'https://app.ticketmaster.com/discovery/v2/events.json';

  const [page, setPage] = useState(0);
  const [events, setEvents] = useState([]);
  const [numPages, setNumPages] = useState(0);
  
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  useEffect(() => {
    getEvents();
  }, [page, city, countryCode, stateCode, startDateTime, endDateTime]);

  const getEvents = async () => {
    const options = { apikey: process.env.REACT_APP_DISCOVERY_API_KEY };
    if (page) options.page = page;
    if (city) options.city = city;
    if (countryCode) options.countryCode = countryCode;
    if (stateCode) options.stateCode = stateCode;
    if (startDateTime) options.startDateTime = startDateTime;
    if (endDateTime) options.endDateTime = endDateTime;
    const queryParams = new URLSearchParams(options);
    const response = await fetch(`${url}?${queryParams}`);
    const data = await response.json();

    setEvents(data?._embedded?.events || []);

    // Rate Limit - Deep Paging: we only support retrieving the 1000th item. i.e. ( size * page < 1000)
    // https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#rate-limits
    setNumPages((data?.page?.totalPages < 50 ? data?.page?.totalPages : 49) || 0);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div data-testid="App" className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Filters setPage={setPage} setCity={setCity} setCountryCode={setCountryCode} setStateCode={setStateCode} setStartDateTime={setStartDateTime} setEndDateTime={setEndDateTime} />
        <Pagination page={page} count={numPages} onChange={handlePageChange}/>
        <ul>{events?.map((event) => {
          return event ? (<li key={event?.id}>{event?.name}</li>) : <div></div>
        })}</ul>
    </LocalizationProvider>
    </div>
  );
}

export default App;

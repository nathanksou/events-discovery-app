import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filters from './Filters';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

describe('<Filters />', () => {
  test('it should mount', () => {
    render(<LocalizationProvider dateAdapter={AdapterDateFns}>
      <Filters setPage={jest.fn()} setCity={jest.fn()} setCountryCode={jest.fn()} 
        setStateCode={jest.fn()} setStartDateTime={jest.fn()} setEndDateTime={jest.fn()
      }/>
    </LocalizationProvider>);
    
    const filters = screen.getByTestId('Filters');
    expect(filters).toBeInTheDocument();
  });
});
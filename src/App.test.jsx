import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

test('renders learn react link', () => {
  render(<LocalizationProvider dateAdapter={AdapterDateFns}><App /></LocalizationProvider>);
  const app = screen.getByTestId('App');
  expect(app).toBeInTheDocument();
});

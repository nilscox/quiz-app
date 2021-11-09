import { render, screen } from '@testing-library/react';
import { expect } from 'earljs';

import { App } from './App';

describe('App', () => {
  it('displays the app', () => {
    render(<App />);

    expect(screen.getByText('app')).toBeVisible();
  });
});

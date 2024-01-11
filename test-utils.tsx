import {RenderOptions, render} from '@testing-library/react-native';
import React from 'react';
import {AppProvider} from './src/state/app-context';
import {FilterProvider} from './src/state/filter-context';

const AllTheProviders = ({children}: React.PropsWithChildren) => {
  return (
    <AppProvider>
      <FilterProvider>{children}</FilterProvider>
    </AppProvider>
  );
};

const customRender = (
  ui: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  options: RenderOptions | undefined = {},
) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};

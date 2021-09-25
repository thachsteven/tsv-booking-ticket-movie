import { Fragment, useEffect } from 'react';
import { Route } from 'react-router';
import Footer from '../../pages/Home/Footer/Footer';
import Header from '../../pages/Home/Header';

//path, exact, Component
export const HomeTemplate = (props) => {
  const { Component, ...resProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      {...resProps}
      //props.location, props.history, props.match
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header />
            <Component {...propsRoute} />
            <Footer />
          </Fragment>
        );
      }}
    />
  );
};

import React from 'react';

const Layout = ( { children } ) => {
  return(
    <>
      <h1>Navbar</h1>
      { children }
      <h1>Footer</h1>
    </>
  )
}

export default Layout;
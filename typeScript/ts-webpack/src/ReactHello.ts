import React from 'react';
import ReactDom from 'react-dom';

import React from 'react'

export const App: (() => JSX.Element) = () => {
  return (
    <div>App</div>
  )
}
ReactDom.render(<App />, document.getElementById('root'))

import React from 'react';
import {
  H2
} from '@blueprintjs/core';

import { hookInWorker } from '../../observables/webworker-messaging/webworker';


export class AppPythonEngine extends React.Component {

  componentDidMount() {
    hookInWorker()

  }

  render() {
    return (
      <div>
        <H2>Python Engine</H2>
      </div >
    )
  }
}
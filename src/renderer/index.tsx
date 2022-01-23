import { render } from 'react-dom';

import '../../node_modules/framework7/framework7-bundle.min.css';
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';
import 'framework7-icons';

import AppHome from './App';

Framework7.use(Framework7React);

render(<AppHome />, document.getElementById('app'));

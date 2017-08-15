/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ProjectPage from './containers/ProjectPage';
import ProjectCreate from './components/ProjectCreate';
import TicketList from './components/TicketList';
import TicketCreate from './components/TicketCreate';
import TicketDetail from './components/TicketDetail';

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/project" component={ProjectPage} />
      <Route path="/project-create" component={ProjectCreate} />
      <Route path="/ticket" component={TicketList} />
      <Route path="/ticket-create" component={TicketCreate} />
      <Route path="/ticket-detail/:tid" component={TicketDetail} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);

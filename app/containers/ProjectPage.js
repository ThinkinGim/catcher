// @flow
import React, { Component } from 'react';
import ProjectList from '../components/ProjectList';

export default class ProjectPage extends Component {
  constructor(props) {
        super(props);
        console.log('ProjectPage properties:');
        console.log(this.props);
    }
  

  render() {
    return (
        <ProjectList />
    );
  }
}

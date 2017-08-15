// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import fs from 'fs';

export default class Home extends Component {

  render() {
    var sshClient = require('ssh2').Client;
    var ssh = new sshClient();
   
    
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}

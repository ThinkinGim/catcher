// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import AppNav from '../components/AppNav'

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    const styles = {
      container: {
        margin: '0 auto',
        maxWidth: '1400px',
        width: '100%',
        paddingTop: '50px'
      },
      ContentPane: {
        width: 'calc(100% - 308px)',
        float: 'right'
      },
      LeftPane: {
        width: '308px',
        height: '500px',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        float: 'left'
      }
    };

    return (
      <div style={styles.container}>
        <div style={styles.LeftPane}>
          <AppNav />
        </div>
        <div style={styles.ContentPane}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

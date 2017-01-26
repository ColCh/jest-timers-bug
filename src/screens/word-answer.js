import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import { connect } from 'react-redux';

export class WordAnswer extends Component  {

  handleAnswerPress(variant) {
    setTimeout(() => {
      console.log('TEST');
      this.props.nextTask();
    }, 800);
  }
  
  render() {
    return null;
  }


}


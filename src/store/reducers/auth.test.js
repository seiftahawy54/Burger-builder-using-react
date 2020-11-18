import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

configure({adapter: new Adapter()});

describe('auth reducer', () => {
  let initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should store token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'some-token',
      userId: "Some-UserID"
    })).toEqual({
      token: 'some-token',
      userId: "Some-UserID",
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });
});



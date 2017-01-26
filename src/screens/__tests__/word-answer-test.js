import React from 'react';
import renderer from 'react-test-renderer';

describe('WordAnswer', () => {
  let WordAnswer;
  let WordAnswerModule;
  let tree;
  let instance;
  let navigator;
  let addAnswer;
  let submitResult;
  let nextTask;

  function runPlatformDependentTests() {
    beforeEach(() => {
      navigator = { replace: jest.fn() };
      addAnswer = jest.fn();
      submitResult = jest.fn();
      nextTask = jest.fn();
      setTimeout.mockReset();
    });

    fit('should call to next task if some task remaining', () => {
      const props = {
        addAnswer,
        currentTaskIndex: 0,
        navigator,
        nextTask,
        selectedVariant: undefined,
        submitResult,
        word: {
        },
      };
      tree = renderer.create(
        <WordAnswer {...props} />,
      );
      instance = tree.getInstance();
      
      instance.handleAnswerPress('диабет');

      // FIXME https://github.com/facebook/jest/issues/2707
      // jest.runAllTimers();
      setTimeout.mock.calls[0][0]();

      expect(nextTask).toBeCalled();
    });

  }

  describe('iOS', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      WordAnswerModule = require.requireActual('../word-answer');
      WordAnswer = WordAnswerModule.WordAnswer;
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    runPlatformDependentTests();
  });

  describe('Android', () => {
    beforeAll(() => {
      jest.resetModules();
      jest.useFakeTimers();
      require('react-native').Platform.OS = 'android';
      WordAnswerModule = require.requireActual('../word-answer');
      WordAnswer = WordAnswerModule.WordAnswer;
    });

    runPlatformDependentTests();

    afterAll(() => {
      // reset specific to test cases react-native patches
      jest.resetModules();
      jest.useRealTimers();
    });
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Option from '../src/Option';
import SmallTypeahead from '../src/Typeahead';

let colors = ['Red', 'Green', 'Blue', 'Pink', 'White', 'Purple'];
let defaultValue = 'Colors';

function getResultsFor(component, input, text) {
  input.value = text;
  TestUtils.Simulate.change(input);
  return TestUtils.scryRenderedComponentsWithType(component, Option);
}

describe('Typeahead', () => {
  let component;
  let input;
  let mocks = {};

  beforeEach(() => {
    mocks.onOptionSelected = jest.fn();
    component = TestUtils.renderIntoDocument(
      <SmallTypeahead defaultValue={defaultValue} options={colors}
                      onOptionSelected={mocks.onOptionSelected}
                      maxOptionsCount={4}
      />
    );
    input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
  });

  it('should set default value', () => {
    expect(input.value).toBe(defaultValue);
  });

  describe('when typing', function () {
    it('should show no results', () => {
      let results = getResultsFor(component, input, 'qwe');
      expect(results.length).toBe(0);
    });

    it('should show one result', () => {
      let results = getResultsFor(component, input, 'pink');
      expect(results.length).toBe(1);
      expect(component.state.selectedIndex).toBe(0);
    });

    it('should show multiple results', () => {
      let results = getResultsFor(component, input, 'e');
      expect(results.length).toBe(4);
      expect(component.state.selectedIndex).toBe(0);
    });
  });

  describe('when mouse clicked', () => {
    it('should call on option selected', () => {
      let results = getResultsFor(component, input, 'Red');
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithTag(results[0], 'li')
      );
      expect(mocks.onOptionSelected).toBeCalledWith('Red');
    });

    it('should call on option selected', () => {
      let results = getResultsFor(component, input, 'e');
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithTag(results[2], 'li')
      );
      expect(mocks.onOptionSelected).toBeCalledWith('Blue');
    });
  });

  describe('when enter pressed', () => {
    it('should call on option selected', () => {
      getResultsFor(component, input, 'White');
      TestUtils.Simulate.keyUp(input, {keyCode: 13});
      expect(mocks.onOptionSelected).toBeCalledWith('White');
    });
  });

  describe('when press', function () {
    const KEY_DOWN = 40;
    const KEY_UP = 38;
    beforeEach(function() {
      //'Red', 'Green', 'Blue', 'White' // down -KEY_DOWN up -38
      getResultsFor(component, input, 'e');
    });

    it('should go down for one position when arrow down pressed', () => {
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      expect(component.state.selectedIndex).toBe(1);
    });

    it('should go down for three position when arrow down pressed three times', () => {
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      expect(component.state.selectedIndex).toBe(3);
    });

    it('should go down for four position and return to the beginning', () => {
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_DOWN});
      expect(component.state.selectedIndex).toBe(0);
    });

    it('should go to last position when arrow up pressed once', () => {
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      expect(component.state.selectedIndex).toBe(3);
    });

    it('should go first position when arrow up key pressed three times', () => {
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      expect(component.state.selectedIndex).toBe(1);
    });

    it('should be at position 0 when arrow up key pressed four times', () => {
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      TestUtils.Simulate.keyUp(input, {keyCode: KEY_UP});
      expect(component.state.selectedIndex).toBe(0);
    });
  });
});

# React simple typeahead

React simple typeahead is a react based typeahead(autocomplete) component.

### Demo
- [Simple demo](http://nagogus.github.io/react-simple-typeahead/examples)

### Installation
```
npm install react-simple-typeahead
```
If you are using npm and CommonJS modules you simply require react-simple-typeahead:
```
var Typehead = require('react-simple-typeahead');
```
or you can load `react-simple-typeahead.js` file from `dist` folder.

### Usage

```
<SimpleTypeahead
      options={['Red', 'Green', 'Yellow', 'Blue']}
      onOptionSelected={function(option) { console.log("Option selected:", option)}}
      maxOptionsCount={4}
      placeholder="Type color here"
      customClasses={{
        input: 's-typeahead-input',
        list: 's-typeahead-list',
        listItem: 's-typeahead-list-item',
        listItemSelected: 's-typeahead-list-item--selected'
      }}
    />
```

### API
Component properties:  

**defaultValue**  
Type: `String`  
Default: ""  
Default value will be shown when no option selected

**placeholder**  
Type: `String`  
Default: ""  
Placeholder text for the input field

**options**  
Type: `Array`  
Default: `[]`  
List of options available for selection  

**onOptionSelected**  
Type: `Function`  
Default: none  
Callback function which will be called on each option selection by user, function will receive as parameter an `option`

**onInputEmpty**
Type: `Function`  
Default: none  
Callback function which will be called once the input of component get empty

**maxOptionsCount**
Type: `Number`  
Default: `-1`  
Limit number of suggested options to show. By default there is no limit

**customClasses**  
Type: `Object`  
Default: 
```
      wrapper: 'ss-typeahead-wrapper',
      input: 'ss-typeahead-input',
      list: 'ss-typeahead-list',
      listItem: 'ss-typeahead-list-item',
      listItemSelected: 'ss-typeahead-list-item--selected',
      listItemValue: 'ss-typeahead-list-item__value'
```
Object of CSS class names to apply to the component.  
Possible property names:  
- **wrapper**: reference to the class property of wrapping `div` of the component
- **input: reference to the class property of `input` element
- **list**: reference to the class property of `ul` element  
- **listItem**: refernce to the class property of `li` element
- **listItemSelected**: refernce to the class property of `li` element in selected state
- **listItemValue**: refernce to the class property of `span` element which used for displaying an option  

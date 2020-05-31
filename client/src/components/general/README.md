# general folder

The general folder contains reusable components that are used through out the application.

## form folder

The form folder contains the components used to build forms on the web application. More information can be found [here](./form)

## table folder

The table folder contains the components used to build tables. The README can be found [here](./table)

## DeleteModal.component.js

The delete modal component is a modal (A pop up box) that double checks the user wants to delete a peice of data. It works by forcing the user to type in a string to confirm the action.

### Example

```javascript
import React from 'react';
import DeleteModal from 'DeleteModal.component.js';

const Example = () => {
    return (
        <DeleteModal 
            // The data's database id.
            id="123456789"
            // The word the user needs to type in.
            safeWord="56789"
            // The web page to navigate to once done.
            page="patient"
            // The api path to send the delete message to.
            path="patient"
            // A function that handles the open state of the modal. e.g. closes it.
            close={() => toggleModalState();}
        />
    );
}

export default Example;
```

### Properties

```javascript
DeleteModal.propTypes = {
    id: propTypes.string,
    safeWord: propTypes.string,
    page: propTypes.string,
    path: propTypes.string,
    close: propTypes.func
}
```

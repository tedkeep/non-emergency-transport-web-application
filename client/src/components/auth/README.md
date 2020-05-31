# auth folder

The auth folder contains components which are related to the authentication of the user.

[[_TOC_]]

## Login.component.js

The Login component handles the login page layout, inputs, and sends the user details to the auth api to check the details.

### Example

```javascript
import React from 'react';
import Login from './Login.component.js';

const Example = () => {
    return (
        <Login />
    );
}

export default Example;
```

### Properties

No props are needed for this component.

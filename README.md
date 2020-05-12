# basket-challenge

## Main structure
This projects includes 4 main folders:
- `front-side` -  it is a client-side of the app.
- `functions` it is a server-side([Firebase Cloud Function](https://firebase.google.com/products/functions)).
- `security-rules` - there are specific rules(to the [Cloud Firestore](https://firebase.google.com/products/firestore)) 
of which documents we may read or write without affecting the server-side.
- `types` - there are TypeScript types and interfaces.

## front-side
- I used [create-react-app](https://create-react-app.dev/) to initialize the project.
- In the [actions](./front-side/src/actions) folder described all relatives with Firestore and Cloud Functions. 
In the big project it is better to use some state store like [Redux](https://redux.js.org/) or [MobX](https://mobx-state-tree.js.org/). 
But I decided to make it as simple as possible. 
- I made the website mobile responsive and optimized loading time. Please, don't hesitate to look at it.
- all icons are by [Font Awesome](https://fontawesome.com/).

## security-rules
- Security rules described in the [firestore.rules](./security-rules/firestore.rules) file. 
- All tests are in the [security-rules/\_\_tests\_\_](./security-rules/__tests__) folder. We need to run emulator(`yarn rules:run-emulator`) first to run tests.
- product __price__ in the store in cents. It is easier to calculate integer values instead of floats.

In most cases, there is only `read` permission.
And only for the `/baskets/{userID}/products/{productID}` there is permission to `write` too.

## functions (back-end)
- functions are in folders according to their firestore structure.
- [calcTotal](./functions/src/basket/calcTotal.ts) is the main function to return the total basket value with applied offers. 
- [mayApplyOffer](./functions/src/basket/mayApplyOffer.ts) is a helper function to check if we may apply the current offer and how many times. 
For exampe, when there are 2 soups and 2 breads. Discount for the bread is only __$0.4__(bread price is __$0.8__). 
In the case when we have 4 soups in the basket, discount will be __$0.8__.
- all tests are in the [functions/src/\_\_tests\_\_](./functions/src/__tests__) folder.

## types (TypeScript)
- filenames are also according to the firestore structure.
- it is useful to have types written once and be able to use them anywhere(on the client and server sides)
- might be it is not perfect, because of firestore is not very well with TypeScript. But it is ok. IMHO 😄

## firestore structure
there are 2 main collections `baskets` and `products`. 

### __products__ collection:
Every product have `image`, `name`, `price` and `type` fields. And may have `offers` sub-collection.

__main collections and products:__
![main collections and products](./security-rules/static/main%20collections%20and%20products.png)

There are 2 types of offers: `discount`(for apples) and `group`(for bread):

- __discount type offer:__
![product offer](./security-rules/static/product%20offers.png)

- __group type offer:__
![bread offer](./security-rules/static/bread%20offer.png)

### __baskets__ collections
Every basket product have `count`, `price`, `productID`, `timestamp` fields and may have `offerID` field.

__basket products:__
![basket products](./security-rules/static/basket%20products.png)

# services

Why not use `Meteor.callAsync` and `Meteor.methods` directly? Since we don't want Meteor to pollute our codebase here and there, we have this abstract layer to make fewer dependencies on Meteor so that we can easily move to other architectures in the future.

Also, there abstract layer make it more simple for users to call server methods (just like calling local async function).

```typescript
async function foo() {
  const isEmailAvilable = await Services.get('account').checkEmailAvailability('shiqi')
  console.log({ isEmailAvilable })
}
```

## How to add a new Service?

// TODO

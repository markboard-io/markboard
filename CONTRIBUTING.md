# Contribution Guidelines

## Project Structure

```typescript
|- `excalidraw/`
  |- `actions/` store all actions taking effects to canvas
	|- `app/` ExclidrawApp react component entry point
	|- `charts/` excalidraw charts support
	|- `components/` react components
	  |- `LayerUI` react entry point, core react components are aggregated here
	     |- `<Island className='menu-container' />` App Menu
		|- `MenuUtisl` MenuLinks & Menu Seperator in the App Menu
		|- `Island` the common react components to create a floating panel, aka "island"
		|- `InitializeApp` The loading wrapper for <ExclidrawApp />. Presents <LoadingMessage /> if `i18n` is not ready.
	|- `css/` common stylesheets
	|- `data/` data operation utilities
	|- `element/` excalidraw canvas elements & helpers
	|- `hooks/` react hooks
	|- `renderer/` excalidraw canvas rendering implementations
	  |- `renderElement` control details about drawing element on canvas
		|- `renderScene` draw scene on canvas
		  |- `strokeGrid` controls the implementation of grid rendering
		|- `roundRect` draw round rectangle on canvas
	|- `scene/` excalidraw scene related code
	|- `tests/` unit tests and e2e tests
	|- `align`
	|- `analytics`
	|- `appState` global app state
	|- `bug-issue-template` excalidraw github bug issue report template
	|- `clients` getClient Colors & getClientInitials
```

## Troubleshooting

1. Failed to run `meteor run` or `meteor add accounts-password`

   It probably is cased by `install request to https://github.com/kelektiv/node.bcrypt.js/releases/download/v5.0.1/bcrypt_lib-v5.0.1-napi-v3-darwin-x64-unknown.tar.gz failed, reason: connect ETIMEDOUT 20.205.243.166:443`.

   You can run meteor behind a proxy to fix the problem:

   ```bash
   export HTTP_PROXY=http://user:password@1.2.3.4:5678
   export HTTPS_PROXY=http://user:password@1.2.3.4:5678
   ```

   See: https://github.com/meteor/meteor/wiki/Using-Meteor-behind-a-proxy

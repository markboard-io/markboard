# Contribution Guidelines

## Project Structure

```typescript
|- `excalidraw/`
  |- `actions/` store all actions taking effects to canvas
	|- `components/` react components
	|- `css/` common stylesheets
	|- `data/` data operation utilities
	|- `element/` excalidraw canvas elements & helpers
	|- `excalidraw-app/` react entry point
	|- `hooks/` react hooks
	|- `package/` react entry point
	|- `renderer/` excalidraw canvas rendering implementations
	  |- `renderElement` control details about drawing element on canvas
		|- `renderScene` draw scene on canvas
		|- `roundRect` draw round rectangle on canvas
	|- `scene/` excalidraw scene related code
	|- `tests/` unit tests and e2e tests
	|- `align`
	|- `analytics`
	|- `appState` global app state
	|- `bug-issue-template` excalidraw github bug issue report template
```

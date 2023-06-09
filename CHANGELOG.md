# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.0

### Added

- Types for some of Bento HTML elements (`<bento-embed />` and `<bento-sidebar />`)
- Types for new document event `bento-onComponentVisibilityChange`

## 1.0.0

### Added

- Typings for new Bento embed SDK functions
  - `getEventMetadataForAccount`
  - `getEventMetadataForAccountUser`

### Removed

- Remove deprecated `identify()` typings

### Fixed

- Remove `CHANGELOG.md` from the list of ignored files to NPM

## 0.0.3

### Added

- `BentoWindowEvents` and `BentoDocumentEvents` enums
- `bento-initialized` window event
- `bento-buttonClicked`, `bento-noGuideFound`, `bento-onGuideLoad`, `bento-sidebarClose`, `bento-sidebarOpen`, `bento-onInlineEmbedLoad`, `bento-onSidebarEmbedLoad`, `bento-onModalEmbedLoad`, `bento-onBannerEmbedLoad`, and `bento-onTooltipEmbedLoad` document events

### Changed

- Increase descriptions of `BentoInstance` and `BentoSettings`

### Removed

- `bento-sidebarToggled` document event

## 0.0.2

### Changed

- Added comments to each property in `BentoSettings`

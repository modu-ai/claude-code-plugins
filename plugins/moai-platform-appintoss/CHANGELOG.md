# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-01-19

### Added

- TDS Mobile documentation module (modules/tds-mobile.md)
  - Installation and provider setup
  - Color palette (Grey, Blue, Red, Green, Orange, Yellow, Teal, Purple)
  - Typography tokens (13 levels with accessibility support)
  - Core components: Button, Badge, Toast, BottomSheet
  - Overlay hooks: useToast, useDialog, useBottomSheet
  - CSS customization variables
  - Accessibility guidelines
- TDS React Native documentation module (modules/tds-react-native.md)
  - Installation and TDSProvider setup
  - Color palette (consistent with TDS Mobile)
  - Core components: Button, Toast, AlertDialog, ConfirmDialog, ListRow
  - useToast hook
  - Overlay pattern with Promise-based API
  - TDS Mobile vs TDS React Native comparison
- Added "tds", "디자인시스템", "design-system" keywords to plugin.json

### Changed

- Updated plugin.json version to 2.2.0
- Updated SKILL.md with TDS modules in Module Index
- Updated README.md with TDS module documentation
- Added TDS documentation URLs to Resources section

### Fixed

- Fixed version inconsistency in SKILL.md frontmatter (2.0.0 → 2.2.0)
- Fixed date inconsistency in SKILL.md frontmatter (2026-01-18 → 2026-01-19)

---

## [2.1.0] - 2026-01-19

### Added

- Unity WebGL game development guide (modules/unity-guide.md)
- Cocos Creator 3.8.7 game development guide (modules/cocos-guide.md)
- Comprehensive examples index (modules/examples-index.md)
- 24+ official example projects from GitHub
- 3 Cocos Creator example projects
- Game engine keywords (unity, cocos, game, webgl)

### Changed

- Updated plugin.json with game development keywords
- Enhanced README with game development documentation
- Updated SKILL.md with game development modules

### Example Projects Added

- Framework examples: weekly-todo-jquery, weekly-todo-react, weekly-todo-vue
- Feature examples: with-app-login, with-in-app-purchase, with-rewarded-ad, etc.
- Game examples: with-game, random-balls
- Cocos examples: basic, environment, inappads

---

## [2.0.0] - 2026-01-19

### Added

- Plugin structure conversion for Claude Code marketplace
- Complete plugin.json manifest with proper metadata
- README.md with installation and usage instructions
- CHANGELOG.md following Keep a Changelog format
- MIT LICENSE file

### Changed

- Reorganized directory structure to plugin format
- Moved skill files to `skills/moai-platform-appintoss/` directory
- Updated for marketplace distribution compatibility

### Skill Contents (Inherited from v1.x)

- Core SKILL.md with quick reference
- Detailed API reference (reference.md)
- Comprehensive design guide (design-guide.md)
- 7 specialized modules:
  - getting-started.md
  - development.md
  - authentication.md
  - payment.md
  - marketing.md
  - launch.md
  - monetization.md

## [1.0.0] - 2026-01-18

### Added

- Initial skill implementation for Apps in Toss platform
- WebView and React Native (Granite) development guides
- Toss Login OAuth2 integration
- TossPay mTLS payment integration
- In-app purchase documentation
- Push notification API reference
- Advertising integration (fullscreen, rewarded)
- Promotion and Toss Points system
- Toss Cert authentication
- Design guide with TDS components
- Dark pattern prevention guidelines
- UX writing standards
- Launch checklist and review process
- Monetization and settlement guides

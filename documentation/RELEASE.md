## Release Process

### 1. Update Version

Update the version in `package.json`:

```json
{
  "name": "next-assignment",
  "version": "1.2.0", // Update this version number
  ...
}
```

Follow [Semantic Versioning](https://semver.org/):

- MAJOR version for incompatible API changes (1.x.x)
- MINOR version for new functionality (x.2.x)
- PATCH version for bug fixes (x.x.3)

### 2. Document Changes

Create a section in [CHANGELOG.md](./CHANGELOG.MD)! for the new version:

```markdown
## [1.2.0]

### New Features

- Feature description (#123) - [PR Link](https://github.com/your-repo/pull/123)
- Another feature (#124) - [PR Link](https://github.com/your-repo/pull/124)

### Bug Fixes

- Fix description (#125) - [PR Link](https://github.com/your-repo/pull/125)

### Chores

- Chore (#126) - [PR Link](https://github.com/your-repo/pull/126)
```

### 3. Release Steps

1. Ensure all PRs for this release are merged into `main`
2. Create a new release on GitHub:
   - Go to `Releases` > `New release`
   - Tag version: `v1.2.0`
   - Title: `Release v1.2.0`
   - Copy changelog content into release description
3. Close the associated milestone:
   - Go to `Issues` > `Milestones`
   - Find the milestone for this release
   - Click `Close milestone`
4. Create a new milestone for the next release

### Release Checklist

- [ ] Version updated in package.json
- [ ] Changelog updated with all PRs
- [ ] All PRs merged to main
- [ ] GitHub release created
- [ ] Milestone closed
- [ ] New milestone created

### Notes

- Always test the release in staging before deploying to production
- Tag collaborators in the release notes if specific testing is needed
- Update documentation if there are breaking changes

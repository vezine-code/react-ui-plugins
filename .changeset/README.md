# Using Changesets for Versioning and Releasing

`@changesets/cli`, a build tool that works with multi-package repos, or single-package repos 
to help you version and publish your code. You can find the full documentation for it [in our repository](https://github.com/changesets/changesets)

We have a quick list of common questions to get you started engaging with this project in
[our documentation](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)

Changesets is a tool that helps you manage versioning and changelog entries for your packages. This guide will walk you through the process of setting up and using Changesets in your project.

## Installation

First, install the Changesets CLI as a development dependency in your project:

```bash
yarn add --dev @changesets/cli
# or
npm install --save-dev @changesets/cli
```

## Initialization

Initialize Changesets in your project. This will create a `.changeset` directory with a `config.json` file and a README file:

```bash
yarn changeset init
# or
npx changeset init
```

## Creating a Changeset

When you make changes that you want to release, create a changeset. This documents what has changed and what type of version bump (patch, minor, major) is required.

```bash
yarn changeset
# or
npx changeset
```

Follow the prompts to specify the changes and the version bump type:
1. Select the packages that have changed.
2. Choose the type of version bump for each package (patch, minor, major).
3. Provide a summary of the changes.

This will create a markdown file in the `.changeset` directory describing the changes.

## Versioning Packages

After creating changesets, you need to update the versions of your packages. Run the following command:

```bash
yarn changeset version
# or
npx changeset version
```

This command will:
- Bump the version numbers in your `package.json` files based on the changesets.
- Update any dependents that need to be updated.
- Create/update `CHANGELOG.md` file(s) with the changeset summaries.

## Committing the Changes

You need to commit the changes made by the version command to your repository:

1. Stage the changes:
    ```bash
    git add .
    ```

2. Commit the changes:
    ```bash
    git commit -m "Version packages"
    ```

## Publishing the Packages

After versioning and committing the changes, you can publish the new versions to npm:

```bash
yarn changeset publish
# or
npx changeset publish
```

This command will:
- Publish the updated packages to npm.
- Create git tags for the new versions.

## Pushing Changes to Repository

Finally, push the changes (including tags) to your remote repository:

```bash
git push --follow-tags
```

## Example Workflow

Here’s a detailed example workflow:

1. **Create a Changeset**:
    ```bash
    yarn changeset
    # or
    npx changeset
    ```
    Follow the prompts. For example, select the changed package, choose a minor bump, and write a summary.

2. **Version the Packages**:
    ```bash
    yarn changeset version
    # or
    npx changeset version
    ```

3. **Commit the Changes**:
    ```bash
    git add .
    git commit -m "Version packages"
    ```

4. **Publish the New Version**:
    ```bash
    yarn changeset publish
    # or
    npx changeset publish
    ```

5. **Push the Changes**:
    ```bash
    git push --follow-tags
    ```

## Troubleshooting

### 402 Payment Required Error

If you encounter the "402 Payment Required" error, it means your npm account or organization is configured to only allow publishing private packages. Ensure that your package is set to be published as public.

- Add the `publishConfig` to your `package.json`:

    ```json
    {
      "publishConfig": {
        "access": "public"
      }
    }
    ```

- Run the publish command with the `--access public` flag:

    ```bash
    yarn changeset publish --access public
    # or
    npx changeset publish --access public
    ```

### Fixing Package Errors

If npm suggests running `npm pkg fix` to correct errors in your `package.json`, follow these steps:

1. Run the suggested command:
    ```bash
    npm pkg fix
    ```

2. Commit the fixed `package.json`:
    ```bash
    git add package.json
    git commit -m "Fix package.json"
    ```

3. Retry the publish process.

By following these steps, you can effectively manage versioning and releases for your packages using Changesets.

## Future Enhancements

### Render a Single Plugin

One potential enhancement is the ability to render a single plugin from the array of registered plugins. This feature would allow developers to selectively render individual plugins based on specific conditions or user interactions. 

#### Benefits

- **Selective Rendering**: Improve performance by rendering only the necessary plugins based on the current context or user actions.
- **Enhanced Control**: Provide more granular control over the display of plugins, allowing for dynamic and conditional rendering logic.
- **Optimized Resource Usage**: Reduce resource consumption by avoiding the rendering of unused plugins, leading to a more efficient application.

### Implementation Ideas

To achieve this functionality, consider the following approaches:

1. **Filter Method**: Implement a method to filter and retrieve a specific plugin from the array of registered plugins.
2. **Conditional Logic**: Use conditional rendering within the component to determine which plugin(s) to render based on props or state.
3. **Configuration Options**: Introduce configuration options that allow developers to specify which plugins should be rendered under certain conditions.

By incorporating these enhancements, the plugin architecture can become even more flexible and powerful, catering to a wider range of use cases and optimizing the overall user experience.

## License

MIT

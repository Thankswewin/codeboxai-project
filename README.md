# CodeBox AI

Browser-based coding-assistant interface experiments with editor, chat and
account-workflow prototypes.

## Status

**Prototype, not a published VS Code extension.** The current repository
contains browser assets and a Node dependency manifest, but no VS Code extension
manifest, extension entry point or `compile` script.

`package.json` currently refers to `server.js`, which is not included in this
repository. Consequently, `npm start` is not a working backend setup command.
The repository does not establish a working checkout, production credit system
or the privacy guarantees described by earlier documentation.

## Repository Layout

| File | Purpose |
| --- | --- |
| `all-in-one.html` | Combined browser-interface prototype |
| `script.js` | Browser interaction experiments |
| `ide-functionality.js` | Editor-related interface logic |
| `openrouter_models.json` | Model-list data |
| `package.json` | Node dependency manifest and incomplete server entry point |

## Development

Inspect `all-in-one.html` and the accompanying scripts to explore the interface.
Some referenced pages or service endpoints are not included. Do not treat the
prototype as a functioning paid service or enter real credentials into it.

A working service would require a server implementation, secure authentication,
server-side model-provider credentials, real payment handling and tests. These
are development requirements, not claims about the current build.

## Author

[Philemon Ofotan](https://github.com/Thankswewin), founder of
[Archyy Studio](https://archyy.live).

## License

This extension is licensed under the MIT License. See the LICENSE file for details.

The statement above is retained from the previous README. No `LICENSE` file is
currently included; this documentation update does not add or change a license.

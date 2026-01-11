# Dither Me This

Generate dithered images at build time for your static website.

Dither me this is just does the dithering.

Specific site generators will require different packages that use
dither-me-this.

for sites built with 11ty see @11ty-dither

Dither me this takes an image and a set of options, and outputs a dithered image

## Installation

Install dither-me-this with npm and add it to your dev dependencies like so:

```
npm install dither-me-this --save-dev
```

## Usage

TODO

## What and Why?

Dithering is a method of reducing the colors in an image and emulating the
missing colors with strategically placed dots.

It's used to display images in print or on devices with a limited color range.

It has the modern advantage of reducing the file size of images in a stylistic
way.

To learn more
[Wikipedia has a good article](https://en.wikipedia.org/wiki/Dither).

You can also play with the client-side version:
[Dither Me This](https://doodad.dev/dither-me-this).

## Project Scope

TODO

### The main goal

TODO

### Other Goals

TODO

## Project Priorities

Before anything else... A good experience for the end user of the images.

Then, a good developer experience.

Then, readable code so others can learn from it.

Then, finally, the speed of the dithering itself. If an optimization makes it
harder for someone to understand the code it won't be merged.

## Contributing

Feel free to contribute to this project.

### Pull Request Process

TODO

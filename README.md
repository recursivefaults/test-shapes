# test-shapes

## How to use

This is a little example showing a few different styles of tests and what happens when they fail. The idea is to get a
sense of how the shape, scope, and complexity of a test impacts your understanding when a failure occurs.

While this is far from a science, one quality of good tests is that they are very instructive when they fail. Writing
a test that is helpful when it fails takes practice and even then there will be cases you can't make it as obvious as
you want.

So, there are two basic test shapes that each test the same production code. Each takes a very different approach to
the test. I recommend running the passing version of each, then the failing version of each.

Make a note of how clear your understanding of the expected behavior is, the failure, and how long it takes to get that
sense.

You can look at the test code, but the production code is off limits. After all, this is about how helpful your tests
are, not how good you are at tracing production code.

## Installation

After cloning the repo, you should be able to do a simple `npm install` to fetch the required dependencies.

## Running

There are two test suites. One is called, `lump` and the other is called `field`.

To run the passing lump tests you run `npm run lump`
Similarly to run the field tests you run `npm run field`

When you're done with that you can run the failing variations:

`npm run lump-failing`

`npm run field-failing`

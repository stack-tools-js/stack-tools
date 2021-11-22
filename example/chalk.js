const { relative } = require('path');
const chalk = require('chalk');
const {
  parseErrors,
  cleanErrors,
  PrintVisitor: V8PrintVisitor,
} = require('@stack-tools/node-tools');

class PrintVisitor extends V8PrintVisitor {
  ErrorChain(errors) {
    return chalk.magenta.bold`${super.ErrorChain(errors)}`;
  }

  Error(error) {
    return chalk.magenta.bold`${super.Error(error)}`;
  }

  ErrorMessage(message) {
    return chalk.white`${super.ErrorMessage(message)}`;
  }

  Frame(frame) {
    return chalk.reset.magenta`${super.Frame(frame).replace(/^ {2}/, '')}`;
  }

  Call(call) {
    return chalk.white`${super.Call(call)}`;
  }

  Site(site) {
    return chalk.white.underline`${super.Site(site)}`;
  }

  PathLocator(locator) {
    const { cwd } = this.options;
    const { path } = locator;

    return super.PathLocator({
      ...locator,
      path: path.startsWith('/') ? relative(cwd, path) : path,
    });
  }
}

function doLowLevelStuff() {
  throw new Error('fubar');
}

function doStuff() {
  try {
    doLowLevelStuff();
  } catch (cause) {
    throw Object.assign(new Error('Uh oh'), { cause });
  }
}

try {
  doStuff();
} catch (e) {
  process.stdout.write(
    `${PrintVisitor.visit(cleanErrors(parseErrors(e)), { cwd: process.cwd() })}\n\n`,
  );
}

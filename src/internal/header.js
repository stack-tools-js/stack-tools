function printHeader(error) {
  const { name, message } = error;
  return name && message ? `${name}: ${message}` : message ? `Error: ${message}` : name || 'Error';
}

module.exports = { printHeader };

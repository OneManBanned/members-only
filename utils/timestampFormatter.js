function timestampFormatter() {
  const dateObj = new Date();
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
}

export default timestampFormatter;

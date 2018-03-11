import chalk from 'chalk';

function pad(number, digits) {
  if (typeof number === 'undefined') {
    return '00';
  }
  let hex = number.toString(16).toUpperCase();
  // pad with zeroes as long as their aren't digits chars
  while (hex.length < digits) {
    hex = `0${hex}`;
  }
  return hex;
}

function calculateOffsetLength(buffer) {
  // string length of the hex representation of the buffer length
  const offset = buffer.length.toString(16).length;
  // make sure that it is at least 6 chars long
  return offset < 6 ? 6 : offset;
}

/**
 * Maps each byte to a pre-defined char map. Only ASCII letters are displayed,
 * everything else is rendered as a dot.
 * @param {byte} value The buffer value that is currently getting processed.
 */
function getMapCharacter(value) {
  return (value > 31 && value < 127) || value > 159 ? String.fromCharCode(value) : '.';
}

export default function print(buffer, options = {}) {
  // only proceed if their is actual data in the buffer
  if (buffer.length === 0) {
    return '';
  }

  // quicker access later on.
  const {
    columns = 16,
    map = true,
    color = true,
  } = options;

  // determine the number of lines needed for the buffer to be displayed
  const lines = Math.ceil(buffer.length / columns);
  // needed to display the current offset correctly
  const offsetLength = calculateOffsetLength(buffer);
  // the position of the last char, if it is 0 it means that we need a whole line
  const lastIndex = buffer.length % columns || columns;

  // create the table body
  let body = '';
  let pointer = 0;
  let bytesAvailable = 0;
  for (let i = 0; i < lines; i += 1) {
    // create the offset to the left
    let offset;
    if (color === true) {
      offset = `${chalk.dim(pad(pointer, offsetLength))}  `;
    } else {
      offset = `${pad(pointer, offsetLength)}  `;
    }
    // calculate the remaining bytes for the current line
    // if we aren't in the last line, the number of bytes will always be ${columns}
    const lastLine = (i === lines - 1);
    bytesAvailable = lastLine ? lastIndex : columns;

    // create the content in the middle
    let content = '';
    let rightMap = '';
    for (let j = 0; j < bytesAvailable; j += 1) {
      const value = buffer[pointer];
      content += `${pad(value, 2)} `;

      // populate the right side map
      if (map === true) {
        rightMap += getMapCharacter(value);
      }
      // increase the pointer to the current byte
      pointer += 1;
    }

    // pad the rest if we are in the last line
    if (lastLine) {
      const space = '   ';
      content += space.repeat(columns - lastIndex);
    }

    // add to body
    body += offset + content;
    if (map) {
      body += ` ${rightMap}`;
    }
    // only append new line if it is not the last element
    if ((i + 1) !== lines) {
      body += '\n';
    }
  }

  return body;
}

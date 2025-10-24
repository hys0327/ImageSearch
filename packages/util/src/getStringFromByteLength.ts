const getStringFromByteLength = (text: string, length: number) => {
  let str_character;
  let int_char_count = 0;
  let int_contents_length = text.length;

  let returnValue = '';

  for (let k = 0; k < int_contents_length; k++) {
    str_character = text.charAt(k);
    if (encodeURI(str_character).length > 4) int_char_count += 2;
    else int_char_count++;

    if (int_char_count > length) {
      break;
    }

    returnValue += str_character;
  }

  return returnValue;
};

export default getStringFromByteLength;

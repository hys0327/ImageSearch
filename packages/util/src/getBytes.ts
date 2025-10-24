const getBytes = (text: string) => {
  let str_character;
  let int_char_count = 0;
  let int_contents_length = text.length;

  for (let k = 0; k < int_contents_length; k++) {
    str_character = text.charAt(k);
    if (encodeURI(str_character).length > 4) int_char_count += 2;
    else int_char_count++;
  }

  return int_char_count;
};

export default getBytes;

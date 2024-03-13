export const capitalize = (text) => {
  let newText = text.split(" ");
  let upperCaseText = newText.map((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
  return upperCaseText.toString().replaceAll(",", " ");
}

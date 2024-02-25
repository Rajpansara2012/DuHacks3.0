const id = "123abc456";

const transformedId = id
  .split("")
  .map((ch, index) => {
    if (ch >= "0" && ch <= "9") {
      ch = (parseInt(ch) + 10).toString(); // Convert to number, add 10, and convert back to string
      ch += "a"; // Append "a" to the string
    }
    return ch;
  })
  .join("");

console.log(transformedId);

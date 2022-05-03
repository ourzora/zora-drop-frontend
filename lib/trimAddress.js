export const trimAddress = (address) => {
  const PREFIX_ADDRESS = "0x";
  try {
    const addressFirst = address.slice(0, 4 + PREFIX_ADDRESS.length);
    const addressLast = address.slice(address.length - 4);
    return `${addressFirst}...${addressLast}`
  } catch (err) {
    return address
  }
}

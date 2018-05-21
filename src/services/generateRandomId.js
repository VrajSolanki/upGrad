import shortid from 'shortid'

export const generateRandomId = () => {
  return shortid.generate();
}

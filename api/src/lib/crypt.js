import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

/**
 * @param {{ value: String, saltRounds?: Number }} data
 * @returns
 */
export async function hashPassword ({ value, saltRounds = SALT_ROUNDS }) {
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(value, salt)

  return hash
}

/**
 * @param {{ value: String, hash: String }} data
 * @returns
 */
export async function comparePassword ({ value, hash }) {
  const isValid = await bcrypt.compare(value, hash)
  return isValid
}

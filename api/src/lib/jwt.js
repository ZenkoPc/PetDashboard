import jwt from 'jsonwebtoken'

/**
 * @param {*} data
 * @returns
 */
export function signToken ({ data }) {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '24h' })
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  return {
    value: token,
    expires: new Date(decoded.exp * 1000)
  }
}

/**
 * @param {{ token: String }} data
 */
export function verifyToken ({ token }) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    return {
      verified: true,
      payload: decoded
    }
  } catch (error) {
    return {
      verified: false
    }
  }
}

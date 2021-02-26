import md5 from 'md5'

export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: object) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

const createCode = ( length: number ) =>{
  const params = '1234567890abcdefghijklmnopqrstuvwxyz!@#$%^&*'
  let result = ''
  for( let i = 0 ; i < length; i ++){
    result += params.charAt(Math.floor(Math.random()*44))
  }
  return result
}

// 生产token
export const createToken = ( username: string, password: string)  => {
  const enCode = createCode(4)
  return {
    code: enCode,
    token: md5(md5(md5(username + new Date().getTime()) + password) + enCode)
  }
}



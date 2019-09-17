let str = '1ssswww12s2ss3s3ssww344ww4'

let r = str.match(/(\d)(s)\1/g)
console.log(r)
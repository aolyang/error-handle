import { base64Table } from "./shared";

const enum Vlq {
  Length = 5,
  Base = 1 << Vlq.Length, // 100000 32
  BaseMask = Vlq.Base - 1, // 011111 31
  Continuation = Vlq.Base
}

const encoder = (num: number) => {
  // 1. 负数末尾标志位设1
  if (num < 0) num = (Math.abs(num) << 1) | 1
  else {
    num <<= 1
  }

  let result = ""
  while (true) {
    const digit = num & Vlq.BaseMask
    result += base64Table.get(num < Vlq.Continuation ? digit : digit | Vlq.Continuation)

    if ((num >>>= Vlq.Length) <= 0) break
  }
  return result
}

export const encode = (num: number | number[]) => {
  if (typeof num === "number") return encoder(num)
  else {
    return num.reduce((pre, n) => pre += encoder(n), "")
  }
}

//在线检测 https://www.murzwin.com/base64vlq.html
console.log(encode(7)) // O
console.log(encode(16)) // gB
console.log(encode(1200)) // grC
console.log(encode(-17)) // jB
console.log(encode([710,0,0,0])) // ssBAAA

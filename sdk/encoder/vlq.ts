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

console.log(encoder(7)) // O
console.log(encoder(1200)) // grC
console.log(encoder(-17)) // jB

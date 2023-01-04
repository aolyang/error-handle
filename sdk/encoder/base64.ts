import { base64Table } from "./shared";

// to base64
// 在普通32位程序里，base64的6位和字节单元的8位进行对齐，取公倍数4x6=3x8
const encoder = (str: string) => {
  let u32, c0, c1, c2, asc = ''

  const pad = str.length % 3

  for (let i = 0; i < str.length;) {
    c0 = str.charCodeAt(i++)
    c1 = str.charCodeAt(i++)
    c2 = str.charCodeAt(i++)

    if ((c0) > 255 || (c1) > 255 || (c2) > 255) throw new TypeError('invalid character found');

    u32 = (c0 << 16) | (c1 << 8) | c2

    // 63 = 111111 取低6位映射base64字母表
    asc += base64Table.get(u32 >> 18 & 63)!
      + base64Table.get(u32 >> 12 & 63)!
      + base64Table.get(u32 >> 6 & 63)!
      + base64Table.get(u32 & 63)!
  }
  // 不足的补等号（=）
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc
}

console.log(encoder("hello")) // aGVsbG8=

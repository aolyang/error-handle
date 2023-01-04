import sourceMap, { RawSourceMap } from "source-map"

// 根据行数获取源文件行数
export const getPosition = async (map: RawSourceMap, rolno: number, colno: number) => {
  const consumer = await new sourceMap.SourceMapConsumer(map)

  if (colno < 0 || colno < 0) return
  const position = consumer.originalPositionFor({
    line: rolno,
    column: colno
  })

  const content = position.source ? consumer.sourceContentFor(position.source) : ""

  return { position, content }
}

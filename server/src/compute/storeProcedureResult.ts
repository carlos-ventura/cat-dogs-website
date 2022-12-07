import { Connection } from 'mysql2'

export async function storeProcedureResult (n: number, connection: Connection): Promise<void> {
  const sql = 'CALL doglogic.dogIndexLogic(?)'
  return await new Promise((resolve, reject) => {
    connection.query(sql, n, function (error, results) {
      if (error !== null) reject(error)
      resolve(results[0][0].indexNumber)
    })
  })
}

import { Client } from 'pg'

export const getNativePgConnection = async (connectionString = ''): Promise<Client> => {
  const client = new Client({ connectionString })
  try {
    const url = new URL(connectionString)

    await client.connect()
    const schema = url.searchParams.get('schema')
    if (schema) await client.query(`SET search_path TO '${schema}';`)
  } catch (error) {
    throw new Error(`Native PG connection error: ` + error)
  }
  return client
}

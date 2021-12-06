async function handler(req, res) {
  const { id } = req.query
  const versions = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
  const [atualVersion] = await versions.json()
  const champion = await fetch(`http://ddragon.leagueoflegends.com/cdn/${atualVersion}/data/pt_BR/champion/${id}.json`)
  const championData = await champion.json()
  res.status(200).json(
    championData
  )
}

export default handler
export default async function handler(req, res) {
  const versions = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
  const [atualVersion] = await versions.json()
  const championsResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${atualVersion}/data/pt_BR/champion.json`)
  const championsData = await championsResponse.json()
  const justNamesAndKeys = Object.keys(championsData.data).map((key, value) => {
    const champion = {
      key: key,
      name: championsData.data[key].name,
    }
    return champion
  })
  res.send(JSON.stringify(justNamesAndKeys))
}
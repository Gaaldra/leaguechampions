import Head from "next/head"
import Link from "next/link"
import { Component } from "react"
import Search from "../components/Search"
import style from "../styles/home.module.css"

export async function getStaticProps() {
  const versions = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
  const [atualVersion] = await versions.json()
  const championsResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${atualVersion}/data/pt_BR/champion.json`)
  const championsData = await championsResponse.json()
  let justNamesAndKeys = Object.keys(championsData.data).map((key, value) => {
    const champion = {
      key: key,
      name: championsData.data[key].name,
    }
    return champion
  })

  if (!championsData) {
    return {
      notFound: true
    }
  }

  justNamesAndKeys = justNamesAndKeys.map((champion) => {
    return { ...champion, view: true }
  })

  return {
    props: {
      ChampionsData: justNamesAndKeys
    },
    revalidate: 86400
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      champions: props.ChampionsData,
      busca: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log(this.state.champions)
    const orderedList = this.state.champions.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    })
    this.setState({ champions: orderedList })
  }

  handleChange(e) {
    const newValue = e.target.value
    this.setState({ busca: newValue })
    const newList = this.state.champions.map((value) => {
      const newItem = value
      if (!String(value.name).toLowerCase().includes(newValue.toLowerCase())) {
        newItem.view = false
        return newItem
      }
      newItem.view = true
      return newItem
    })
    this.setState({ champions: newList })
    console.log(this.state.champions)
  }

  render() {
    return (
      <>
        <Head>
          <title>League Champions</title>
          <meta
            name="description"
            content="Informações dos campeões de League of Legends"
          />
        </Head>
        <div className={style.container_search}>
          <Search onChange={this.handleChange} value={this.state.busca} />
        </div>
        <main className={style.main}>
          <div className={style.title}>
            <h1>Campeões</h1>
          </div>

          <section id="champions_list" className={style.section_champions}>
            <div className={style.collections}>
              {this.state.champions.map((champion, index) => {
                return (
                  <Link key={index} href={`/champion/${champion.key}`} passHref>
                    <div
                      className={style.card}
                      style={{
                        backgroundImage: `url("./images/centered/${champion.key}_0.jpg")`,
                        display: `${champion.view ? 'block' : 'none'}`
                      }}>
                      <div className={`${style.face} ${style.face_front}`}>
                        <div className={style.card_body}>
                          <p>{champion.name}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        </main>
      </>
    )
  }
}
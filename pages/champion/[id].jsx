import Spells from "../../components/Spells";
import Head from "next/head";
import style from "../../styles/champion.module.css";
import Image from "next/image";

export async function getStaticPaths() {
  const paths = [];
  const champions = require("../../public/champions.json");
  Object.keys(champions.data).map((key, value) => {
    paths.push({ params: { id: key } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const versions = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
  const [atualVersion] = await versions.json()
  const championResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${atualVersion}/data/pt_BR/champion/${id}.json`)
  const championData = await championResponse.json()


  if (!atualVersion || !championData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      champion: championData.data[id],
    },
    revalidate: 86400
  };
}

export default function Champion({ champion }) {
  return (
    <>
      <Head>
        <title>{`${champion.name} - Lore, Dicas e Habilidades`}</title>
        <meta name="description" content={champion.blurb}></meta>
      </Head>
      <main className={style.main_content}>
        <div className={style.background_title}>
          <Image
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
          alt="SplashScreen"
          width={1280}
          height={720}
             />
            <div className={style.page_title}>
              <h1>{champion.name}</h1>
              <h2>{champion.title}</h2>
            </div>
        </div>
        <div className="container-fluid justify-content-center d-flex flex-column pt-3">
          <div className="mb-3 text" style={{ textAlign: "justify" }}>
            <p>{champion.lore}</p>
          </div>
        </div>
        <div className="container-fluid justify-content-center d-flex flex-column">
          <div>
            <table className="table table-dark text-white table-bordered">
              <thead>
                <tr className="text-center">
                  <td className="bolder" colSpan={2}>
                    Dicas para {champion.name}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="10vw" style={{ color: "#0f0" }}>
                    Aliado
                  </td>
                  <td>
                    {champion.allytips.map((element, index) => {
                      return (
                        <h6 key={index} style={{ color: "#0f0" }}>
                          {element}
                        </h6>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <td width="10vw" style={{ color: "#F33" }}>
                    Inimigo
                  </td>
                  <td>
                    {champion.enemytips.map((element, index) => {
                      return (
                        <h6 key={index} style={{ color: "#F33" }}>
                          {element}
                        </h6>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Spells champion={champion} />
        </div>
      </main>
    </>
  );
}

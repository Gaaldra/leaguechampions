import Spells from "../../components/Spells";
import Head from 'next/head'

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
  const { data } = require(`../../public/champion_json/${id}.json`);

  return {
    props: {
      champion: data[id]
    },
  };
}

export default function Champion({ champion }) {
  return (
    <>
      <Head>
        <title>{`${champion.name} - Lore, Dicas e Habilidades`}</title>
      </Head>
      <div className="container-fluid text-white" style={{ width: "85vw" }}>
        <div className="container-fluid justify-content-center d-flex flex-column pt-3">
          <div className="mb-3">
            <h1 className="text-center">{champion.name}</h1>
            <h2 className="text-center">{champion.title}</h2>
          </div>
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
      </div>
    </>
  );
}

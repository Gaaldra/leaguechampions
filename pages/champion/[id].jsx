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
  const { data } = require(`../../public/champion_json/${id}.json`);

  return {
    props: {
      champion: data[id],
    },
  };
}

export default function Champion(props) {
  return (
    <div className="container-fluid text-white" style={{ width: "85vw" }}>
      <div className="container-fluid justify-content-center d-flex flex-column pt-3">
        <div className="mb-3">
          <h1 className="text-center">{props.champion.name}</h1>
          <h2 className="text-center">{props.champion.title}</h2>
        </div>
        <div className="mb-3">
          <p>{props.champion.lore}</p>
        </div>
      </div>
      <div className="container-fluid justify-content-center d-flex">
        <table className="table table-dark text-white">
          <thead>
            <tr className="table-dark">
              <th colSpan="2" className="text-center">
                Habilidades
              </th>
            </tr>
          </thead>
          <tbody>
            {props.champion.spells.map((item, index) => (
              <tr key={item.id}>
                <td className="table-dark align-middle">
                  <Image
                    className="align-self-center rounded shadow"
                    src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${props.champion.spells[index].id}.png`}
                    width={64}
                    height={64}
                    alt={props.champion.spells[3].id}
                    layout="fixed"
                  ></Image>
                </td>
                <td>
                  <tr className="bolder" style={{ fontWeight: "bolder" }}>
                    {String(props.champion.spells[index].name).replace(
                      /<.+?>/gm,
                      " "
                    )}
                  </tr>
                  <tr>
                    {String(props.champion.spells[index].description).replace(
                      /<.+?>/gm,
                      " "
                    )}
                  </tr>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

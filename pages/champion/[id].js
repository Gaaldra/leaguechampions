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
    <div className="container-fluid text-white">
      <div className="container-fluid justify-content-center d-flex flex-column">
        <h1>Campeão: {props.champion.name}</h1>
        <p>Historia</p>
        <p>{props.champion.lore}</p>
      </div>
      <div className="container-fluid justify-content-center d-flex">
        <table
          className="table table-dark text-white"
        >
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
                <td>{String(props.champion.spells[index].description).replace(/<.+?>/gm, " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
      <h1>Campeão: {props.champion.name}</h1>
      <p>Historia</p>
      <p>{props.champion.lore}</p>
      <table className="table table-dark table-striped text-white">
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
              <th scope="row" className="table-dark">
                <Image
                  src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${props.champion.spells[index].id}.png`}
                  width={64}
                  height={64}
                  alt={props.champion.spells[3].id}
                ></Image>
              </th>
              <td>{props.champion.spells[index].description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
      <h5>Habilidades</h5>
      <p>{props.champion.spells[0].description}</p>
    </div>
  );
}

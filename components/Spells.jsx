import Image from "next/image";

export default function Spells({ champion }) {
  return (
    <table className="table table-dark text-white table-striped">
      <thead>
        <tr className="table-dark">
          <th colSpan="2" className="text-center">
            Habilidades
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-dark align-middle">
            <Image
              className="align-self-center rounded shadow"
              src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/passive/${champion.passive.image.full}`}
              width={64}
              height={64}
              alt={champion.passive.name}
              layout="fixed"
            ></Image>
          </td>
          <td>
            <h5 className="bolder">{champion.passive.name}<span className="text-muted"> - Passiva</span></h5>
            <p>{String(champion.passive.description).replace(/<.+?>/gm, " ")}</p>
          </td>
        </tr>
        {champion.spells.map((item, index) => (
          <tr key={index}>
            <td className="table-dark align-middle">
              <Image
                className="align-self-center rounded shadow"
                src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${champion.spells[index].id}.png`}
                width={64}
                height={64}
                alt={champion.spells[index].id}
                layout="fixed"
              ></Image>
            </td>
            <td>
              <h5 className="bolder">
                {champion.spells[index].name}
              </h5>
              {champion.spells[index].cooldownBurn != "0" ? (
                <h6 className="fs-6 text-muted">
                  Tempo de Recarga (Segundos):{" "}
                  {champion.spells[index].cooldownBurn}
                </h6>
              ) : (
                <></>
              )}
              <h6 className="text-muted">
                Custo:{" "}
                {String(champion.spells[index].resource).replace(
                  /{{(.*?)}}/g,
                  (x) => {
                    if (x === "{{ cost }}")
                      return champion.spells[index].costBurn;
                    if (x === "{{ abilityresourcename }}")
                      return champion.partype;
                    return "?";
                  }
                )}
              </h6>
              <p>
                {String(champion.spells[index].description).replace(
                  /<.+?>/gm,
                  " "
                )}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

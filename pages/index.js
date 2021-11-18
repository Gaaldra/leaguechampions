import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Champions from "../public/champions.json";

export default function Home() {
  const champions = [];
  Object.keys(Champions.data).map((key, value) => {
    const champion = {
      key: key,
      name: Champions.data[key].name,
    };
    champions.push(champion);
  });
  champions.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return (
    <>
      <Head>
        <title>League Champions</title>
        <meta
          name="description"
          content="Informações dos campeões de League of Legends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid pt-3">
        <div className="row d-flex justify-content-center pb-3">
          {champions.map((champion, value) => (
            <Link key={value} href={`/champion/${champion.key}`} passHref>
              <div className="card col-5 col-md-2 bg-dark text-white p-0 mt-2 mb-3 mx-2">
                <Image
                  className="card-img"
                  src={require(`../public/champion/${champion.key}_0.jpg`)}
                  alt={champion.key}
                  height={560}
                  width={308}
                />
                <div className="card-img-overlay d-flex px-0 pb-0">
                  <div
                    className="card-body align-self-end d-flex justify-content-center bg-dark"
                    style={{ "--bs-bg-opacity": ".9" }}
                  >
                    <h5 className="card-title">{champion.name}</h5>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

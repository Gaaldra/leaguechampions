import style from "./index.module.css"
import Link from "next/link"
import Image from "next/image"

import logo from "../../public/images/logotipo.png"

export default function Header() {
  return (<header className={style.navbar}>
    <div className={style.navbar_image} >
      <Link href="/" passHref>
        <Image
        className={style.navbar_link}
        src={logo} width={120}
          height={40} alt="Logo" />
      </Link>
    </div>
    <nav className={style.container_nav_list}>
      <Link href="/about" passHref>
        <p className={style.navbar_link}>Champions</p>
      </Link>
      <Link href="/" passHref>
        <p className={style.navbar_link}>Itens</p>
      </Link>
      <Link href="/" passHref>
        <p className={style.navbar_link}>Modos de Jogo</p>
      </Link>
    </nav>
  </header>
  )
}
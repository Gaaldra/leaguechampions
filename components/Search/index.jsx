import style from './index.module.css'

export default function Search({ onChange, value }) {
  return(
    <input 
    type="text" 
    className={style.input_text}
    placeholder="Buscar..."
    aria-label="Procurar campeão"
    onChange={onChange}
    value={value} />
  )
}